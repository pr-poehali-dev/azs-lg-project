# API получения баланса и состояния топливной карты

## URL функции
```
https://functions.poehali.dev/fddadc1c-62d5-49fb-964f-4e166ae1f857
```

## Метод
`GET`

## Параметры запроса
- `card_code` (обязательный) - номер топливной карты

## Пример запроса из 1С

### HTTP-запрос
```
GET https://functions.poehali.dev/fddadc1c-62d5-49fb-964f-4e166ae1f857?card_code=0001
```

### Код 1С (HTTPСоединение)
```bsl
Соединение = Новый HTTPСоединение("functions.poehali.dev", 443, , , , 30, Новый ЗащищенноеСоединениеOpenSSL);
Запрос = Новый HTTPЗапрос("/fddadc1c-62d5-49fb-964f-4e166ae1f857?card_code=0001");
Ответ = Соединение.Получить(Запрос);

Если Ответ.КодСостояния = 200 Тогда
    ЧтениеJSON = Новый ЧтениеJSON;
    ЧтениеJSON.УстановитьСтроку(Ответ.ПолучитьТелоКакСтроку());
    Данные = ПрочитатьJSON(ЧтениеJSON);
    ЧтениеJSON.Закрыть();
    
    НомерКарты = Данные["card_code"];
    ВидТоплива = Данные["fuel_type"];
    БалансЛитров = Данные["balance_liters"];
    НаименованиеКлиента = Данные["client_name"];
    ИННКлиента = Данные["client_inn"];
КонецЕсли;
```

## Формат ответа

### Успешный ответ (200 OK)
```json
{
  "card_code": "0001",
  "fuel_type": "АИ-95",
  "balance_liters": 1000.0,
  "client_name": "ООО \"Транспортная компания\"",
  "client_inn": "7707083893"
}
```

### Ошибка - карта не найдена (404 Not Found)
```json
{
  "error": "Карта 9999 не найдена"
}
```

### Ошибка - не указан номер карты (400 Bad Request)
```json
{
  "error": "Не указан номер карты (параметр card_code)"
}
```

## Поля ответа

| Поле | Тип | Описание |
|------|-----|----------|
| card_code | string | Номер топливной карты |
| fuel_type | string | Вид топлива (АИ-92, АИ-95, ДТ и т.д.) |
| balance_liters | number | Текущий баланс в литрах |
| client_name | string | Наименование клиента |
| client_inn | string | ИНН клиента |

## Примеры использования

### cURL
```bash
curl "https://functions.poehali.dev/fddadc1c-62d5-49fb-964f-4e166ae1f857?card_code=0001"
```

### PowerShell
```powershell
$response = Invoke-RestMethod -Uri "https://functions.poehali.dev/fddadc1c-62d5-49fb-964f-4e166ae1f857?card_code=0001"
$response
```

### Python
```python
import requests

response = requests.get(
    'https://functions.poehali.dev/fddadc1c-62d5-49fb-964f-4e166ae1f857',
    params={'card_code': '0001'}
)
data = response.json()
print(f"Баланс карты {data['card_code']}: {data['balance_liters']} л")
```
