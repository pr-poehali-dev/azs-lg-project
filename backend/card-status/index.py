import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение баланса и состояния топливной карты для интеграции с 1С
    Args: event - dict с httpMethod, queryStringParameters (card_code)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с данными карты
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    card_code = params.get('card_code', '').strip()
    
    if not card_code:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указан номер карты (параметр card_code)'})
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
        with conn.cursor() as cur:
            escaped_card_code = card_code.replace("'", "''")
            query = f"""
                SELECT 
                    fc.card_code,
                    ft.name as fuel_type,
                    fc.balance_liters,
                    c.name as client_name,
                    c.inn as client_inn
                FROM fuel_cards fc
                LEFT JOIN clients c ON fc.client_id = c.id
                LEFT JOIN fuel_types ft ON fc.fuel_type_id = ft.id
                WHERE fc.card_code = '{escaped_card_code}'
            """
            cur.execute(query)
            
            row = cur.fetchone()
            
            if not row:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': f'Карта {card_code} не найдена'})
                }
            
            result = {
                'card_code': row[0],
                'fuel_type': row[1] or '',
                'balance_liters': float(row[2]) if row[2] is not None else 0.0,
                'client_name': row[3] or '',
                'client_inn': row[4] or ''
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(result, ensure_ascii=False)
            }
    finally:
        conn.close()