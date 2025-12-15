ALTER TABLE t_p39946729_azs_lg_project.fuel_cards 
ADD COLUMN status VARCHAR(20) DEFAULT 'активна' NOT NULL,
ADD COLUMN block_reason TEXT;

UPDATE t_p39946729_azs_lg_project.fuel_cards 
SET status = 'активна' 
WHERE status IS NULL;