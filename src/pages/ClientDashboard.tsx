import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ClientData {
  name: string;
  inn: string;
  email: string;
  phone: string;
}

interface FuelCard {
  id: number;
  card_code: string;
  fuel_type: string;
  balance_liters: number;
}

interface Operation {
  id: number;
  station_name: string;
  operation_date: string;
  operation_type: string;
  quantity: number;
  price: number;
  amount: number;
  comment: string;
}

interface ClientDashboardProps {
  clientLogin: string;
  onLogout: () => void;
}

export default function ClientDashboard({ clientLogin, onLogout }: ClientDashboardProps) {
  const [clientData] = useState<ClientData>({
    name: 'ООО "Транспортная компания"',
    inn: '7707083893',
    email: 'info@transport.ru',
    phone: '+79991234567'
  });

  const [cards] = useState<FuelCard[]>([
    { id: 1, card_code: '0001', fuel_type: 'АИ-95', balance_liters: 955.00 }
  ]);

  const [operations] = useState<Operation[]>([
    {
      id: 1,
      station_name: 'АЗС СОЮЗ №5',
      operation_date: '2024-12-10 14:30',
      operation_type: 'пополнение',
      quantity: 1000.00,
      price: 52.50,
      amount: 52500.00,
      comment: 'Первоначальное пополнение'
    },
    {
      id: 2,
      station_name: 'АЗС СОЮЗ №3',
      operation_date: '2024-12-12 09:15',
      operation_type: 'заправка',
      quantity: 45.00,
      price: 52.50,
      amount: 2362.50,
      comment: 'Заправка автомобиля А123БВ'
    }
  ]);

  const getOperationColor = (type: string) => {
    switch (type) {
      case 'пополнение':
        return 'bg-primary text-primary-foreground';
      case 'заправка':
        return 'bg-accent text-accent-foreground';
      case 'списание':
        return 'bg-destructive text-destructive-foreground';
      case 'оприходование':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <header className="bg-card border-b-4 border-accent shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Fuel" size={32} className="text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-accent">СОЮЗ</h1>
              <p className="text-sm text-muted-foreground">Кабинет клиента</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
            <Icon name="LogOut" size={20} className="mr-2" />
            Выход
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <Icon name="Building2" size={28} className="text-accent" />
              Информация о клиенте
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Наименование</p>
              <p className="text-lg font-semibold text-foreground">{clientData.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ИНН</p>
              <p className="text-lg font-semibold text-foreground">{clientData.inn}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-lg font-semibold text-foreground">{clientData.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Телефон</p>
              <p className="text-lg font-semibold text-foreground">{clientData.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <Icon name="CreditCard" size={28} className="text-accent" />
              Топливные карты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-border">
                  <TableHead className="text-foreground font-bold">Номер карты</TableHead>
                  <TableHead className="text-foreground font-bold">Вид топлива</TableHead>
                  <TableHead className="text-foreground font-bold text-right">Баланс (л)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((card) => (
                  <TableRow key={card.id} className="border-b border-border">
                    <TableCell className="font-mono text-lg text-accent">{card.card_code}</TableCell>
                    <TableCell className="text-foreground">{card.fuel_type}</TableCell>
                    <TableCell className="text-right font-bold text-lg text-accent">{card.balance_liters.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <Icon name="History" size={28} className="text-accent" />
              История операций
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-border">
                    <TableHead className="text-foreground font-bold">АЗС</TableHead>
                    <TableHead className="text-foreground font-bold">Дата</TableHead>
                    <TableHead className="text-foreground font-bold">Операция</TableHead>
                    <TableHead className="text-foreground font-bold text-right">Литры</TableHead>
                    <TableHead className="text-foreground font-bold text-right">Цена</TableHead>
                    <TableHead className="text-foreground font-bold text-right">Сумма</TableHead>
                    <TableHead className="text-foreground font-bold">Комментарий</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operations.map((op) => (
                    <TableRow key={op.id} className="border-b border-border">
                      <TableCell className="text-foreground">{op.station_name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{op.operation_date}</TableCell>
                      <TableCell>
                        <Badge className={getOperationColor(op.operation_type)}>
                          {op.operation_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">{op.quantity.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-foreground">{op.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-bold text-accent">{op.amount.toFixed(2)} ₽</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{op.comment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
