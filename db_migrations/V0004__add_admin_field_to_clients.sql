-- Добавление поля admin в таблицу clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS admin BOOLEAN NOT NULL DEFAULT false;

-- Комментарий для документации
COMMENT ON COLUMN clients.admin IS 'Флаг администратора: true - админ, false - обычный клиент';