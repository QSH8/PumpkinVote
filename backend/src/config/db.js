import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
// Заставляем драйвер возвращать типы TIMESTAMP (1114) и TIMESTAMPTZ (1184) как обычные строки
pg.types.setTypeParser(1114, stringValue => stringValue);
pg.types.setTypeParser(1184, stringValue => stringValue);

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export const initDatabase = async () => {
  try {
    const sqlPath = path.join(process.cwd(), 'src/database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await pool.query(sql);
    console.log(' БД успешно проинициализирована (таблицы созданы или уже существовали)');
  } catch (err) {
    console.error('💥 Ошибка инициализации таблиц БД:', err);
    process.exit(1); // Останавливаем сервер, если таблицы не создались
  }
};

export default pool;
