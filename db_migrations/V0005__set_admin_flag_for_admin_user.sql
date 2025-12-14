-- Установка флага admin для пользователя admin
UPDATE clients SET admin = true WHERE login = 'admin';