import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для управления топливными картами: получение, создание, обновление и удаление
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration error'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if method == 'GET':
            cursor.execute("""
                SELECT 
                    fc.id, 
                    fc.card_code, 
                    fc.balance_liters, 
                    fc.pin_code,
                    c.name as client_name,
                    ft.name as fuel_type,
                    fc.client_id,
                    fc.fuel_type_id
                FROM fuel_cards fc
                LEFT JOIN clients c ON fc.client_id = c.id
                LEFT JOIN fuel_types ft ON fc.fuel_type_id = ft.id
                ORDER BY fc.id
            """)
            rows = cursor.fetchall()
            
            cards = []
            for row in rows:
                cards.append({
                    'id': row[0],
                    'card_code': row[1],
                    'balance_liters': float(row[2]) if row[2] else 0.0,
                    'pin_code': row[3],
                    'client_name': row[4],
                    'fuel_type': row[5],
                    'client_id': row[6],
                    'fuel_type_id': row[7]
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'cards': cards}),
                'isBase64Encoded': False
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                INSERT INTO fuel_cards (card_code, client_id, fuel_type_id, balance_liters, pin_code)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, card_code, client_id, fuel_type_id, balance_liters, pin_code
            """, (
                body_data.get('card_code'),
                body_data.get('client_id'),
                body_data.get('fuel_type_id'),
                body_data.get('balance_liters', 0),
                body_data.get('pin_code')
            ))
            
            row = cursor.fetchone()
            
            cursor.execute("""
                SELECT c.name, ft.name
                FROM clients c, fuel_types ft
                WHERE c.id = %s AND ft.id = %s
            """, (row[2], row[3]))
            
            names = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            
            card = {
                'id': row[0],
                'card_code': row[1],
                'client_id': row[2],
                'fuel_type_id': row[3],
                'balance_liters': float(row[4]) if row[4] else 0.0,
                'pin_code': row[5],
                'client_name': names[0] if names else '',
                'fuel_type': names[1] if names else ''
            }
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'card': card}),
                'isBase64Encoded': False
            }
        
        if method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            card_id = body_data.get('id')
            
            # Динамическое формирование UPDATE запроса только для переданных полей
            update_fields = []
            update_values = []
            
            if 'card_code' in body_data:
                update_fields.append('card_code = %s')
                update_values.append(body_data['card_code'])
            if 'client_id' in body_data:
                update_fields.append('client_id = %s')
                update_values.append(body_data['client_id'])
            if 'fuel_type_id' in body_data:
                update_fields.append('fuel_type_id = %s')
                update_values.append(body_data['fuel_type_id'])
            if 'balance_liters' in body_data:
                update_fields.append('balance_liters = %s')
                update_values.append(body_data['balance_liters'])
            if 'pin_code' in body_data:
                update_fields.append('pin_code = %s')
                update_values.append(body_data['pin_code'])
            
            if not update_fields:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'No fields to update'}),
                    'isBase64Encoded': False
                }
            
            update_values.append(card_id)
            update_query = f"""
                UPDATE fuel_cards
                SET {', '.join(update_fields)}
                WHERE id = %s
                RETURNING id, card_code, client_id, fuel_type_id, balance_liters, pin_code
            """
            
            cursor.execute(update_query, tuple(update_values))
            
            row = cursor.fetchone()
            
            if row:
                cursor.execute("""
                    SELECT c.name, ft.name
                    FROM clients c, fuel_types ft
                    WHERE c.id = %s AND ft.id = %s
                """, (row[2], row[3]))
                
                names = cursor.fetchone()
                conn.commit()
                cursor.close()
                conn.close()
                
                card = {
                    'id': row[0],
                    'card_code': row[1],
                    'client_id': row[2],
                    'fuel_type_id': row[3],
                    'balance_liters': float(row[4]) if row[4] else 0.0,
                    'pin_code': row[5],
                    'client_name': names[0] if names else '',
                    'fuel_type': names[1] if names else ''
                }
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'card': card}),
                    'isBase64Encoded': False
                }
            else:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Card not found'}),
                    'isBase64Encoded': False
                }
        
        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            card_id = params.get('id')
            
            if not card_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Card ID required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("DELETE FROM fuel_cards WHERE id = %s", (card_id,))
            conn.commit()
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        cursor.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        }