import express from 'express';
import usersRouter from './routes/users.routes.js';

import { catchAsync } from './utils/catchAsync.js';
import { CheckAuthMiddleware, ErrorMiddleware } from './middlewares/index.js';
import { initDatabase } from './config/db.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());


// LOGIN
app.use('/api/login', usersRouter);
app.use(CheckAuthMiddleware);

// Подключение роутеров сущностей
// Сюда роутеры ->
// Проверочный роут (Health-check)
app.get('/api/status', catchAsync(async (req, res) => {
    const dbStatus = await await query('SELECT NOW()');

    res.json({
      status: 'Server is running',
      db_time: dbStatus.rows[0].now
    });
  })
);

// ЧТО ДОБАВИЛОСЬ: Перехват 404 и передача в middleware ошибок
app.use((req, res, next) => {
    const error = new Error(`Маршрут ${req.originalUrl} не найден`);
    error.status = 404; // Можно задать статус для вашей middleware
    next(error); // Передаем ошибку дальше в ErrorMiddleware
});

app.use(ErrorMiddleware);

const startServer = async () => {
  await initDatabase()

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}

startServer();
