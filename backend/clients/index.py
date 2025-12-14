import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    CRUD операции для клиентов
    Args: event - dict с httpMethod (GET/POST/PUT/DELETE), body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с данными клиентов или результатом операции
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
    
    try:
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
        
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if method == 'GET':
            cursor.execute("""
                SELECT id, inn, name, address, phone, email, login, admin 
                FROM clients 
                ORDER BY id
            """)
            rows = cursor.fetchall()
            clients = []
            for row in rows:
                clients.append({
                    'id': row[0],
                    'inn': row[1],
                    'name': row[2],
                    'address': row[3],
                    'phone': row[4],
                    'email': row[5],
                    'login': row[6],
                    'admin': row[7]
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'clients': clients}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cursor.execute("""
                INSERT INTO clients (inn, name, address, phone, email, login, password, admin)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, inn, name, address, phone, email, login, admin
            """, (
                body_data.get('inn'),
                body_data.get('name'),
                body_data.get('address'),
                body_data.get('phone'),
                body_data.get('email'),
                body_data.get('login'),
                body_data.get('password'),
                body_data.get('admin', False)
            ))
            
            row = cursor.fetchone()
            conn.commit()
            
            client = {
                'id': row[0],
                'inn': row[1],
                'name': row[2],
                'address': row[3],
                'phone': row[4],
                'email': row[5],
                'login': row[6],
                'admin': row[7]
            }
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'client': client}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            client_id = body_data.get('id')
            
            cursor.execute("""
                UPDATE clients 
                SET inn = %s, name = %s, address = %s, phone = %s, email = %s, login = %s
                WHERE id = %s
                RETURNING id, inn, name, address, phone, email, login, admin
            """, (
                body_data.get('inn'),
                body_data.get('name'),
                body_data.get('address'),
                body_data.get('phone'),
                body_data.get('email'),
                body_data.get('login'),
                client_id
            ))
            
            row = cursor.fetchone()
            conn.commit()
            
            if row:
                client = {
                    'id': row[0],
                    'inn': row[1],
                    'name': row[2],
                    'address': row[3],
                    'phone': row[4],
                    'email': row[5],
                    'login': row[6],
                    'admin': row[7]
                }
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'client': client}),
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
                    'body': json.dumps({'error': 'Client not found'}),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            client_id = query_params.get('id')
            
            if not client_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Client ID is required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("DELETE FROM clients WHERE id = %s", (client_id,))
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
        
        else:
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
        if 'conn' in locals():
            conn.close()
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Server error: {str(e)}'}),
            'isBase64Encoded': False
        }
