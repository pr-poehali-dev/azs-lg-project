import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [clients] = useState([
    {
      id: 1,
      inn: '7707083893',
      name: 'ООО "Транспортная компания"',
      address: 'г. Москва, ул. Ленина, д. 1',
      phone: '+79991234567',
      email: 'info@transport.ru',
      login: 'admin'
    }
  ]);

  const [fuelTypes] = useState([
    { id: 1, name: 'АИ-92', code_1c: '100001' },
    { id: 2, name: 'АИ-95', code_1c: '100002' },
    { id: 3, name: 'АИ-98', code_1c: '100003' },
    { id: 4, name: 'ДТ', code_1c: '100004' }
  ]);

  const [cards] = useState([
    {
      id: 1,
      client_name: 'ООО "Транспортная компания"',
      fuel_type: 'АИ-95',
      balance_liters: 955.00,
      card_code: '0001',
      pin_code: '****'
    }
  ]);

  const [operations] = useState([
    {
      id: 1,
      card_code: '0001',
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
      card_code: '0001',
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
              <p className="text-sm text-muted-foreground">Панель администратора</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
            <Icon name="LogOut" size={20} className="mr-2" />
            Выход
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border-2 border-accent p-1">
            <TabsTrigger value="clients" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-foreground">
              <Icon name="Users" size={18} className="mr-2" />
              Клиенты
            </TabsTrigger>
            <TabsTrigger value="cards" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-foreground">
              <Icon name="CreditCard" size={18} className="mr-2" />
              Карты
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-foreground">
              <Icon name="History" size={18} className="mr-2" />
              Операции
            </TabsTrigger>
            <TabsTrigger value="fuel-types" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-foreground">
              <Icon name="Droplet" size={18} className="mr-2" />
              Топливо
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Icon name="Users" size={28} className="text-accent" />
                  Клиенты
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить клиента
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-2 border-accent">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Новый клиент</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="inn" className="text-foreground">ИНН</Label>
                        <Input id="inn" placeholder="7707083893" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="name" className="text-foreground">Наименование</Label>
                        <Input id="name" placeholder="ООО Компания" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-foreground">Адрес</Label>
                        <Input id="address" placeholder="г. Москва..." className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-foreground">Телефон</Label>
                        <Input id="phone" placeholder="+79991234567" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-foreground">Email</Label>
                        <Input id="email" type="email" placeholder="info@company.ru" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="login" className="text-foreground">Логин</Label>
                        <Input id="login" placeholder="client1" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="password" className="text-foreground">Пароль</Label>
                        <Input id="password" type="password" placeholder="••••••••" className="bg-input text-foreground" />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Создать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-border">
                        <TableHead className="text-foreground font-bold">ИНН</TableHead>
                        <TableHead className="text-foreground font-bold">Наименование</TableHead>
                        <TableHead className="text-foreground font-bold">Адрес</TableHead>
                        <TableHead className="text-foreground font-bold">Телефон</TableHead>
                        <TableHead className="text-foreground font-bold">Email</TableHead>
                        <TableHead className="text-foreground font-bold">Логин</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id} className="border-b border-border">
                          <TableCell className="font-mono text-accent">{client.inn}</TableCell>
                          <TableCell className="text-foreground font-semibold">{client.name}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{client.address}</TableCell>
                          <TableCell className="text-foreground">{client.phone}</TableCell>
                          <TableCell className="text-foreground">{client.email}</TableCell>
                          <TableCell className="font-mono text-accent">{client.login}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Icon name="CreditCard" size={28} className="text-accent" />
                  Топливные карты
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить карту
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-2 border-accent">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Новая карта</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="client" className="text-foreground">Клиент</Label>
                        <Select>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите клиента" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-2 border-accent">
                            {clients.map(c => (
                              <SelectItem key={c.id} value={c.id.toString()} className="text-foreground">{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fuel-type" className="text-foreground">Вид топлива</Label>
                        <Select>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите топливо" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-2 border-accent">
                            {fuelTypes.map(f => (
                              <SelectItem key={f.id} value={f.id.toString()} className="text-foreground">{f.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="card-code" className="text-foreground">Номер карты (1-9999)</Label>
                        <Input id="card-code" placeholder="0001" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="pin" className="text-foreground">Пин-код (4 цифры)</Label>
                        <Input id="pin" placeholder="1234" maxLength={4} className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="balance" className="text-foreground">Начальный баланс (л)</Label>
                        <Input id="balance" type="number" placeholder="0.00" className="bg-input text-foreground" />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Создать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-border">
                      <TableHead className="text-foreground font-bold">Номер карты</TableHead>
                      <TableHead className="text-foreground font-bold">Клиент</TableHead>
                      <TableHead className="text-foreground font-bold">Топливо</TableHead>
                      <TableHead className="text-foreground font-bold text-right">Баланс (л)</TableHead>
                      <TableHead className="text-foreground font-bold">Пин-код</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cards.map((card) => (
                      <TableRow key={card.id} className="border-b border-border">
                        <TableCell className="font-mono text-lg text-accent font-bold">{card.card_code}</TableCell>
                        <TableCell className="text-foreground">{card.client_name}</TableCell>
                        <TableCell className="text-foreground">{card.fuel_type}</TableCell>
                        <TableCell className="text-right font-bold text-lg text-accent">{card.balance_liters.toFixed(2)}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{card.pin_code}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Icon name="History" size={28} className="text-accent" />
                  Операции по картам
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить операцию
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-2 border-accent">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Новая операция</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="op-card" className="text-foreground">Карта</Label>
                        <Select>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите карту" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-2 border-accent">
                            {cards.map(c => (
                              <SelectItem key={c.id} value={c.id.toString()} className="text-foreground">{c.card_code} - {c.client_name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="station" className="text-foreground">АЗС</Label>
                        <Input id="station" placeholder="АЗС СОЮЗ №1" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="op-type" className="text-foreground">Тип операции</Label>
                        <Select>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-2 border-accent">
                            <SelectItem value="пополнение" className="text-foreground">Пополнение</SelectItem>
                            <SelectItem value="заправка" className="text-foreground">Заправка</SelectItem>
                            <SelectItem value="списание" className="text-foreground">Списание</SelectItem>
                            <SelectItem value="оприходование" className="text-foreground">Оприходование</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quantity" className="text-foreground">Количество (л)</Label>
                        <Input id="quantity" type="number" placeholder="0.00" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="price" className="text-foreground">Цена за литр</Label>
                        <Input id="price" type="number" placeholder="0.00" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="op-comment" className="text-foreground">Комментарий</Label>
                        <Input id="op-comment" placeholder="Дополнительная информация" className="bg-input text-foreground" />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Создать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-border">
                        <TableHead className="text-foreground font-bold">Карта</TableHead>
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
                          <TableCell className="font-mono text-accent">{op.card_code}</TableCell>
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
          </TabsContent>

          <TabsContent value="fuel-types">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Icon name="Droplet" size={28} className="text-accent" />
                  Виды топлива
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить топливо
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-2 border-accent">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Новый вид топлива</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fuel-name" className="text-foreground">Название</Label>
                        <Input id="fuel-name" placeholder="АИ-95" className="bg-input text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor="code" className="text-foreground">Код 1С (6 цифр)</Label>
                        <Input id="code" placeholder="100001" maxLength={6} className="bg-input text-foreground" />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Создать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-border">
                      <TableHead className="text-foreground font-bold">Название</TableHead>
                      <TableHead className="text-foreground font-bold">Код 1С</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelTypes.map((fuel) => (
                      <TableRow key={fuel.id} className="border-b border-border">
                        <TableCell className="text-lg font-semibold text-foreground">{fuel.name}</TableCell>
                        <TableCell className="font-mono text-accent">{fuel.code_1c}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
