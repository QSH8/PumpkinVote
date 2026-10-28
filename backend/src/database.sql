-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS teams CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS votes CASCADE;

-- 1. Справочник категорий (только 4 именованные)
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Таблица команд
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    photo_url VARCHAR(255),
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT
);

-- 3. Таблица пользователей (участников команд)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    user_role VARCHAR(100) NOT NULL DEFAULT 'user',
    team_id INT NOT NULL REFERENCES teams(id) ON DELETE RESTRICT,
    password_hash VARCHAR(255) NOT NULL -- для авторизации
);

-- 4. Таблица голосов с жесткими ограничениями
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    team_id INT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    
    -- category_id может быть NULL. Если NULL — это голос в "Абсолютной" категории.
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    
    -- Баллы могут быть строго 1, 2 или 3
    points INT NOT NULL CHECK (points IN (1, 2, 3)),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- ОГРАНИЧЕНИЕ 1: Один юзер может поставить конкретный номинал (например, 3 балла) 
    -- строго один раз в рамках одной категории (и один раз в Абсолютной, где category_id IS NULL)
    CONSTRAINT unique_user_category_points UNIQUE NULLS NOT DISTINCT (user_id, category_id, points),

    -- ОГРАНИЧЕНИЕ 2: Один юзер может проголосовать за конкретную команду 
    -- строго один раз в рамках одной категории (и один раз в Абсолютной)
    CONSTRAINT unique_user_category_team UNIQUE NULLS NOT DISTINCT (user_id, category_id, team_id)
);

-- Валидация на уровне БД: Запрет голосования за свою команду через триггер
CREATE OR REPLACE FUNCTION check_vote_self_team()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM users 
        WHERE id = NEW.user_id AND team_id = NEW.team_id
    ) THEN
        RAISE EXCEPTION 'Вы не можете голосовать за команду, участником которой являетесь.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_no_self_voting ON votes;

CREATE TRIGGER enforce_no_self_voting
BEFORE INSERT OR UPDATE ON votes
FOR EACH ROW
EXECUTE FUNCTION check_vote_self_team();


INSERT INTO categories (name) VALUES 
('Хоррор и фэнтези'), 
('Мультфильмы, игры и сказки'), 
('Юмор, пародии и предметы'), 
('Кино и сериалы')
ON CONFLICT (name) DO NOTHING;