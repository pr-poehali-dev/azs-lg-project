import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Выполнение операции заправки: уменьшение баланса карты и запись в историю операций
    Args: event - dict с httpMethod, body (card_code, quantity, price, station_name, comment)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с результатом операции
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается. Используйте POST'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Некорректный JSON'})
        }
    
    card_code = body_data.get('card_code', '').strip()
    quantity = body_data.get('quantity', 0)
    price = body_data.get('price', 0)
    station_name = body_data.get('station_name', '').strip()
    comment = body_data.get('comment', '').strip()
    
    if not card_code:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указан номер карты (card_code)'})
        }
    
    if not quantity or quantity <= 0:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Количество топлива должно быть больше 0'})
        }
    
    if not station_name:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указано название АЗС (station_name)'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'DATABASE_URL не настроен'})
        }
    
    conn = psycopg2.connect(dsn)
    try:
        conn.autocommit = False
        with conn.cursor() as cur:
            escaped_card_code = card_code.replace("'", "''")
            
            cur.execute(f"""
                SELECT id, card_code, balance_liters
                FROM fuel_cards
                WHERE card_code = '{escaped_card_code}'
            """)
            
            card_row = cur.fetchone()
            
            if not card_row:
                conn.rollback()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': f'Карта {card_code} не найдена'})
                }
            
            card_id = card_row[0]
            current_balance = float(card_row[2]) if card_row[2] is not None else 0.0
            
            if current_balance < quantity:
                conn.rollback()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'error': 'Недостаточно топлива на карте',
                        'current_balance': current_balance,
                        'requested_quantity': quantity
                    })
                }
            
            new_balance = current_balance - quantity
            
            cur.execute(f"""
                UPDATE fuel_cards
                SET balance_liters = {new_balance}
                WHERE id = {card_id}
            """)
            
            amount = quantity * price
            operation_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            escaped_station = station_name.replace("'", "''")
            escaped_comment = comment.replace("'", "''")
            
            cur.execute(f"""
                SELECT id FROM stations WHERE name = '{escaped_station}' LIMIT 1
            """)
            station_row = cur.fetchone()
            station_id = station_row[0] if station_row else 'NULL'
            
            cur.execute(f"""
                INSERT INTO card_operations 
                (fuel_card_id, station_id, operation_date, operation_type, quantity, price, amount, comment)
                VALUES 
                ({card_id}, {station_id}, '{operation_date}', 'заправка', {quantity}, {price}, {amount}, '{escaped_comment}')
            """)
            
            conn.commit()
            
            result = {
                'success': True,
                'card_code': card_code,
                'operation_type': 'заправка',
                'quantity': quantity,
                'price': price,
                'amount': amount,
                'previous_balance': current_balance,
                'new_balance': new_balance,
                'station_name': station_name,
                'operation_date': operation_date
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(result, ensure_ascii=False)
            }
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка выполнения операции: {str(e)}'})
        }
    finally:
        conn.close()