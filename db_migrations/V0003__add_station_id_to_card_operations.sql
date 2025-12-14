-- Добавление нового поля station_id
ALTER TABLE card_operations ADD COLUMN IF NOT EXISTS station_id INTEGER;

-- Заполнение station_id на основе station_name
UPDATE card_operations 
SET station_id = (
    SELECT id FROM stations WHERE stations.name = card_operations.station_name
);

-- Установка NOT NULL для station_id после заполнения данных
ALTER TABLE card_operations ALTER COLUMN station_id SET NOT NULL;

-- Добавление внешнего ключа
ALTER TABLE card_operations 
ADD CONSTRAINT fk_card_operations_station 
FOREIGN KEY (station_id) REFERENCES stations(id) ON UPDATE CASCADE;

-- Создание индекса для улучшения производительности
CREATE INDEX IF NOT EXISTS idx_card_operations_station_id ON card_operations(station_id);

-- Комментарий для документации
COMMENT ON COLUMN card_operations.station_id IS 'Foreign key to stations table';
COMMENT ON COLUMN card_operations.station_name IS 'Deprecated: use station_id instead';