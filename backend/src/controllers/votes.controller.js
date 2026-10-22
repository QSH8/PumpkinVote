import pool from '../config/db.js';
import { votesRepository } from '../repositories/votes.repository.js';
import { AppError } from '../utils/appErrors.js';
import { catchAsync } from '../utils/catchAsync.js';

export const votesController = {
    // 1. Отправка всей пачки голосов (15 штук)
    submitVotes: catchAsync(async (req, res, next) => {
        const userId = req.user.id;
        const userTeamId = req.user.team_id; // Наш checkAuth должен вытащить team_id юзера из базы
        const { votes } = req.body; // Ожидаем массив [{ team_id, category_id, points }]

        // --- ВАЛИДАЦИЯ НА УРОВНЕ ПРИЛОЖЕНИЯ ---

        // Проверка 1: Массив вообще прилетел и в нем ровно 15 элементов
        if (!Array.isArray(votes) || votes.length !== 15) {
            return next(new AppError('Необходимо распределить ровно 15 голосов (по 3 в каждой из 5 категорий).', 400));
        }

        // Группируем голоса по категориям для проверки структуры номиналов
        // Используем 'absolute' как ключ для null-категории
        const votesByCategory = {};

        for (const vote of votes) {
            const catKey = vote.category_id === null ? 'absolute' : vote.category_id;
            
            if (!votesByCategory[catKey]) {
                votesByCategory[catKey] = [];
            }
            votesByCategory[catKey].push(vote.points);

            // Проверка 2: Запрет голосования за свою собственную команду
            if (Number(vote.team_id) === Number(userTeamId)) {
                return next(new AppError('Вы не можете голосовать за команду, участником которой являетесь.', 400));
            }
        }

        const categoryKeys = Object.keys(votesByCategory);

        // Проверка 3: Должно быть заполнено ровно 5 уникальных категорий
        if (categoryKeys.length !== 5) {
            return next(new AppError('Должны быть заполнены все 5 категорий голосования.', 400));
        }

        // Проверка 4: В каждой категории должен быть строгий набор баллов [1, 2, 3]
        for (const catKey of categoryKeys) {
            const pointsInCat = votesByCategory[catKey];

            if (pointsInCat.length !== 3) {
                return next(new AppError('В каждой категории нужно выбрать ровно 3 команды.', 400));
            }

            // Сортируем баллы, на выходе обязано быть [1, 2, 3]
            const sortedPoints = [...pointsInCat].sort((a, b) => a - b);
            if (JSON.stringify(sortedPoints) !== JSON.stringify([1, 2, 3])) {
                return next(new AppError('Неверное распределение баллов. Допустимы только номиналы 1, 2 и 3 по одному разу.', 400));
            }
        }

        // Обогащаем данные для вставки идентификатором пользователя
        const finalVotesData = votes.map(vote => ({
            user_id: userId,
            team_id: vote.team_id,
            category_id: vote.category_id,
            points: vote.points
        }));

        // --- ВЫПОЛНЕНИЕ ТРАНЗАКЦИИ ---
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Проверяем, не голосовал ли этот юзер ранее (защита от повторного сабмита)
            const { rowCount } = await client.query(
                'SELECT 1 FROM votes WHERE user_id = $1 LIMIT 1', 
                [userId]
            );
            if (rowCount > 0) {
                throw new AppError('Вы уже приняли участие в голосовании.', 400);
            }

            // Передаем клиент транзакции в репозиторий для атомарной вставки
            await votesRepository.bulkCreate(finalVotesData, client);

            await client.query('COMMIT');
            
            res.status(201).json({
                status: 'success',
                message: 'Ваш голос успешно учтен!'
            });
        } catch (error) {
            await client.query('ROLLBACK');
            next(error); // Прокидываем в твой error.middleware.js
        } finally {
            client.release(); // Обязательно возвращаем клиента в пул
        }
    }),

    // 2. Получение результатов (для админки или финального экрана)
    getResults: catchAsync(async (req, res, next) => {
        const results = await votesRepository.getResults();
        
        res.status(200).json({
            status: 'success',
            data: results
        });
    })
};
