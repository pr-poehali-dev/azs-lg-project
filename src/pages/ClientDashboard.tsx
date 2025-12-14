import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

interface ClientDashboardProps {
  clientLogin: string;
  onLogout: () => void;
}

export default function ClientDashboard({ clientLogin, onLogout }: ClientDashboardProps) {
  const navigate = useNavigate();
  const [clientData] = useState<ClientData>({
    name: 'ООО "Транспортная компания"',
    inn: '7707083893',
    email: 'info@transport.ru',
    phone: '+79991234567'
  });

  const [cards] = useState<FuelCard[]>([
    { id: 1, card_code: '0001', fuel_type: 'АИ-95', balance_liters: 955.00 }
  ]);

  const handleViewCardOperations = (cardId: number) => {
    navigate(`/card-operations?cardId=${cardId}`);
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
                  <TableHead className="text-foreground font-bold py-2">Номер карты</TableHead>
                  <TableHead className="text-foreground font-bold py-2">Вид топлива</TableHead>
                  <TableHead className="text-foreground font-bold text-right py-2">Баланс (л)</TableHead>
                  <TableHead className="text-foreground font-bold text-center py-2 no-print">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((card) => (
                  <TableRow key={card.id} className="border-b border-border">
                    <TableCell className="font-mono text-accent py-2">{card.card_code}</TableCell>
                    <TableCell className="text-foreground py-2">{card.fuel_type}</TableCell>
                    <TableCell className="text-right font-bold text-accent py-2">{card.balance_liters.toFixed(2)}</TableCell>
                    <TableCell className="text-center py-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleViewCardOperations(card.id)}
                      >
                        <Icon name="Eye" size={16} className="mr-1" />
                        Показать операции
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>


      </main>
    </div>
  );
}