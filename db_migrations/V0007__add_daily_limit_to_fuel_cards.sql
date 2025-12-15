-- Добавление поля дневной лимит для топливных карт
ALTER TABLE t_p39946729_azs_lg_project.fuel_cards 
ADD COLUMN daily_limit NUMERIC(10,3) DEFAULT 0 NOT NULL;

COMMENT ON COLUMN t_p39946729_azs_lg_project.fuel_cards.daily_limit IS 'Дневной лимит заправки в литрах. 0 = без лимита';