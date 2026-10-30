import BaseRepository from './base.repository.js';

class VotesRepository extends BaseRepository {
    constructor() {
        super('votes');
    }


    /**
     * Массовое сохранение голосов в рамках одной транзакции
     * Принимает dbClient (подключение из pool.connect()), чтобы гарантировать атомарность
     */
    async bulkCreate(votesData, dbClient) {
        // Формируем один массив значений для многострочного INSERT
        // (user_id, team_id, category_id, points)
        const values = [];
        const valueStrings = [];
        let counter = 1;

        for (const vote of votesData) {
            valueStrings.push(`($${counter}, $${counter + 1}, $${counter + 2}, $${counter + 3})`);
            values.push(vote.user_id, vote.team_id, vote.category_id, vote.points);
            counter += 4;
        }

        const queryText = `
            INSERT INTO votes (user_id, team_id, category_id, points)
            VALUES ${valueStrings.join(', ')}
        `;

        // Выполняем строго через переданный клиент транзакции
        await dbClient.query(queryText, values);
    }


    /**
     * Получить результаты голосования по всем категориям (включая Абсолютную)
     */
    async getResults() {
        const queryText = `
            SELECT 
                c.id AS category_id,
                COALESCE(c.name, 'Абсолютная категория') AS category_name,
                t.id AS team_id,
                t.name AS team_name,
                SUM(v.points)::INT AS total_points
            FROM teams t
            -- Подтягиваем голоса, оставленные за команду
            JOIN votes v ON t.id = v.team_id
            -- Левое соединение с категориями, так как для Абсолютной v.category_id IS NULL
            LEFT JOIN categories c ON v.category_id = c.id
            GROUP BY c.id, c.name, t.id, t.name
            ORDER BY c.id NULLS LAST, total_points DESC;
        `;

        const { rows } = await this.pool.query(queryText);
        return rows;
    }


    /**
     * Получить все именованные категории
     */
    async getCategories() {
        const queryText = `SELECT id, name FROM categories ORDER BY id ASC;`;
        const { rows } = await this.pool.query(queryText);

        return rows;
    }


    /**
     * Получить все команды
     */
    async getTeams() {
        const queryText = `SELECT id, name, category_id FROM teams ORDER BY id ASC;`;
        const { rows } = await this.pool.query(queryText);

        return rows;
    }

    /**
     * Получить все команды
     */
    async getTeamsByCategory(userId) {
        const queryText = `
            SELECT json_object_agg(category_id, teams_list) AS data
            FROM (
            SELECT 
                category_id, 
                json_agg(json_build_object('id', id, 'name', name, 'category_id', category_id, 'photo_url', photo_url) ORDER BY id ASC) AS teams_list
            FROM teams
            WHERE id NOT IN (
                SELECT team_id 
                FROM users 
                WHERE id = $1 AND team_id IS NOT NULL
            )
            GROUP BY category_id
            ) sub;
        `;
        
        const { rows } = await this.pool.query(queryText, [userId]);
        if (rows[0]?.data) {
            return { ...rows[0].data, 'absolute': Object.values(rows[0].data).reduce((total, teamList) => [...total, ...teamList], [])}
        } else {
            return {}
        }
    }


    /**
     * Получить итоги
     */
    async getTotalVotes() {
        const queryText = `
            WITH team_scores AS (
                SELECT 
                    COALESCE(c.name, 'Абсолютная категория') AS category_name,
                    v.team_id,
                    t.name AS team_name,
                    SUM(v.points) AS total_score
                FROM votes v
                LEFT JOIN categories c ON v.category_id = c.id
                LEFT JOIN teams t ON v.team_id = t.id
                GROUP BY COALESCE(c.name, 'Абсолютная категория'), v.team_id, t.name
                ORDER BY category_name, total_score DESC
            ),
            category_arrays AS (
                SELECT 
                    category_name,
                    jsonb_agg(
                        jsonb_build_object(
                            'team_id', team_id,
                            'team_name', team_name,
                            'totalScore', total_score
                        )
                    ) AS teams_list
                FROM team_scores
                GROUP BY category_name
            )
            SELECT jsonb_object_agg(category_name, teams_list) AS result
            FROM category_arrays;
        `;
        
        const { rows } = await this.pool.query(queryText);

        console.log('rows', rows);
        

        if (rows[0]?.result) {
            return { ...rows[0].result }
        } else {
            return {}
        }
    }
    /**
     * Получить все команды
     */
    async getVotedUsers(userId) {
        const queryText = `
            SELECT 
                u.username AS username,
                (COUNT(v.id) > 0) AS alreadyVoted
            FROM users u
            LEFT JOIN votes v ON u.id = v.user_id
            GROUP BY u.id, u.username
            ORDER BY u.username;
        `;
        
        const { rows } = await this.pool.query(queryText);
        if (rows) {
            console.log('rows', rows);
            
            return rows
        } else {
            return {}
        }
    }


    /**
     * Получить итоги
     */
    async getTotalVotes() {
        const queryText = `
            WITH team_scores AS (
                SELECT 
                    COALESCE(c.name, 'Абсолютная категория') AS category_name,
                    v.team_id,
                    t.name AS team_name,
                    SUM(v.points) AS total_score
                FROM votes v
                LEFT JOIN categories c ON v.category_id = c.id
                LEFT JOIN teams t ON v.team_id = t.id
                GROUP BY COALESCE(c.name, 'Абсолютная категория'), v.team_id, t.name
                ORDER BY category_name, total_score DESC
            ),
            category_arrays AS (
                SELECT 
                    category_name,
                    jsonb_agg(
                        jsonb_build_object(
                            'team_id', team_id,
                            'team_name', team_name,
                            'totalScore', total_score
                        )
                    ) AS teams_list
                FROM team_scores
                GROUP BY category_name
            )
            SELECT jsonb_object_agg(category_name, teams_list) AS result
            FROM category_arrays;
        `;
        
        const { rows } = await this.pool.query(queryText);

        console.log('rows', rows);
        

        if (rows[0]?.result) {
            return { ...rows[0].result }
        } else {
            return {}
        }
    }


    /**
     * Найти команду по id
     */
    async findTeamById(id) {
        const { rows } = await this.pool.query('SELECT id, photo_url FROM teams WHERE id = $1', [id])
        return rows[0] || null;
    }

    /**
     * Добавить фотку
     */
    async updatePhoto(id, photoUrl) {
        const { rows } = await this.pool.query(
            'UPDATE teams SET photo_url = $1 WHERE id = $2 RETURNING id, name, photo_url',
            [photoUrl, id]
        )

        return rows[0];
    }
}

export const votesRepository = new VotesRepository();
