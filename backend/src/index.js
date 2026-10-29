import express from 'express';
import usersRouter from './routes/users.routes.js';
import votesRouter from './routes/votes.routes.js';
import { catchAsync } from './utils/catchAsync.js';
import { CheckAuthMiddleware, ErrorMiddleware } from './middlewares/index.js';
import { initDatabase, pool } from './config/db.js';
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// LOGIN
app.use('/api/login', usersRouter);
app.use(CheckAuthMiddleware);

// Подключение роутеров сущностей
app.use('/api/votes', votesRouter);
// Проверочный роут (Health-check)
app.get('/api/status', catchAsync(async (req, res) => {
    const dbStatus = await pool.query('SELECT NOW()');

    res.json({
      status: 'Server is running',
      db_time: dbStatus.rows[0].now
    });
  })
);

app.use((req, res, next) => {
    const error = new Error(`Маршрут ${req.originalUrl} не найден`);
    error.statusCode = 404;
    next(error);
});

app.use(ErrorMiddleware);

const startServer = async () => {
  await initDatabase()

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
}

startServer();
