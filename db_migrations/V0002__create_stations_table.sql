-- Создание таблицы станций (АЗС)
CREATE TABLE IF NOT EXISTS stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code_1c VARCHAR(50) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление начальных данных
INSERT INTO stations (name, code_1c, address) VALUES
    ('Склад', '200000', 'Центральный склад'),
    ('АЗС СОЮЗ №3', '200001', 'г. Москва, ул. Ленина, д. 10'),
    ('АЗС СОЮЗ №5', '200002', 'г. Москва, пр-т Мира, д. 25')
ON CONFLICT (code_1c) DO NOTHING;