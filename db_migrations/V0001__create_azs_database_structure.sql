-- Таблица клиентов
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    inn VARCHAR(12) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица видов топлива
CREATE TABLE IF NOT EXISTS fuel_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code_1c VARCHAR(6) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица топливных карт
CREATE TABLE IF NOT EXISTS fuel_cards (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    fuel_type_id INTEGER NOT NULL REFERENCES fuel_types(id),
    balance_liters DECIMAL(10, 2) DEFAULT 0,
    card_code VARCHAR(4) NOT NULL UNIQUE CHECK (card_code ~ '^[0-9]{1,4}$'),
    pin_code VARCHAR(4) NOT NULL CHECK (pin_code ~ '^[0-9]{4}$'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица операций по картам
CREATE TABLE IF NOT EXISTS card_operations (
    id SERIAL PRIMARY KEY,
    fuel_card_id INTEGER NOT NULL REFERENCES fuel_cards(id),
    station_name VARCHAR(255) NOT NULL,
    operation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    operation_type VARCHAR(50) NOT NULL CHECK (operation_type IN ('пополнение', 'заправка', 'списание', 'оприходование')),
    quantity DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2),
    amount DECIMAL(10, 2),
    comment VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_fuel_cards_client ON fuel_cards(client_id);
CREATE INDEX IF NOT EXISTS idx_card_operations_card ON card_operations(fuel_card_id);
CREATE INDEX IF NOT EXISTS idx_card_operations_date ON card_operations(operation_date);

-- Тестовые данные: виды топлива
INSERT INTO fuel_types (name, code_1c) VALUES 
('АИ-92', '100001'),
('АИ-95', '100002'),
('АИ-98', '100003'),
('ДТ', '100004')
ON CONFLICT (code_1c) DO NOTHING;

-- Тестовый клиент (пароль: admin123)
INSERT INTO clients (inn, name, address, phone, email, login, password) VALUES 
('7707083893', 'ООО "Транспортная компания"', 'г. Москва, ул. Ленина, д. 1', '+79991234567', 'info@transport.ru', 'admin', 'admin123')
ON CONFLICT (inn) DO NOTHING;

-- Тестовая топливная карта
INSERT INTO fuel_cards (client_id, fuel_type_id, balance_liters, card_code, pin_code) VALUES 
(1, 2, 1000.00, '0001', '1234')
ON CONFLICT (card_code) DO NOTHING;

-- Тестовые операции
INSERT INTO card_operations (fuel_card_id, station_name, operation_type, quantity, price, amount, comment) VALUES 
(1, 'АЗС СОЮЗ №5', 'пополнение', 1000.00, 52.50, 52500.00, 'Первоначальное пополнение'),
(1, 'АЗС СОЮЗ №3', 'заправка', 45.00, 52.50, 2362.50, 'Заправка автомобиля А123БВ');
