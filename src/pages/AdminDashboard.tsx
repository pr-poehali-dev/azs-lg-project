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
  const [clients, setClients] = useState([
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

  const [editingClient, setEditingClient] = useState<any>(null);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({inn: '', name: '', address: '', phone: '', email: '', login: '', password: ''});

  const handleDeleteClient = (id: number) => {
    if (confirm('Удалить клиента?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setIsClientDialogOpen(true);
  };

  const handleSaveClient = () => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? editingClient : c));
      setIsClientDialogOpen(false);
      setEditingClient(null);
    }
  };

  const handleCreateClient = () => {
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    setClients([...clients, { id: newId, ...newClient }]);
    setNewClient({inn: '', name: '', address: '', phone: '', email: '', login: '', password: ''});
    setIsAddClientDialogOpen(false);
  };

  const [fuelTypes, setFuelTypes] = useState([
    { id: 1, name: 'АИ-92', code_1c: '100001' },
    { id: 2, name: 'АИ-95', code_1c: '100002' },
    { id: 3, name: 'АИ-98', code_1c: '100003' },
    { id: 4, name: 'ДТ', code_1c: '100004' }
  ]);

  const [editingFuelType, setEditingFuelType] = useState<any>(null);
  const [isFuelTypeDialogOpen, setIsFuelTypeDialogOpen] = useState(false);
  const [isAddFuelTypeDialogOpen, setIsAddFuelTypeDialogOpen] = useState(false);
  const [newFuelType, setNewFuelType] = useState({name: '', code_1c: ''});

  const handleDeleteFuelType = (id: number) => {
    if (confirm('Удалить вид топлива?')) {
      setFuelTypes(fuelTypes.filter(f => f.id !== id));
    }
  };

  const handleEditFuelType = (fuelType: any) => {
    setEditingFuelType(fuelType);
    setIsFuelTypeDialogOpen(true);
  };

  const handleSaveFuelType = () => {
    if (editingFuelType) {
      setFuelTypes(fuelTypes.map(f => f.id === editingFuelType.id ? editingFuelType : f));
      setIsFuelTypeDialogOpen(false);
      setEditingFuelType(null);
    }
  };

  const handleCreateFuelType = () => {
    const newId = fuelTypes.length > 0 ? Math.max(...fuelTypes.map(f => f.id)) + 1 : 1;
    setFuelTypes([...fuelTypes, { id: newId, ...newFuelType }]);
    setNewFuelType({name: '', code_1c: ''});
    setIsAddFuelTypeDialogOpen(false);
  };

  const [cards, setCards] = useState([
    {
      id: 1,
      client_name: 'ООО "Транспортная компания"',
      fuel_type: 'АИ-95',
      balance_liters: 955.00,
      card_code: '0001',
      pin_code: '****'
    }
  ]);

  const [editingCard, setEditingCard] = useState<any>(null);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({card_code: '', client_name: '', fuel_type: '', balance_liters: 0, pin_code: ''});
  const [filterCardClient, setFilterCardClient] = useState<string>('all');
  const [filterCardFuelType, setFilterCardFuelType] = useState<string>('all');

  const handleDeleteCard = (id: number) => {
    if (confirm('Удалить карту?')) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  const handleEditCard = (card: any) => {
    setEditingCard(card);
    setIsCardDialogOpen(true);
  };

  const handleSaveCard = () => {
    if (editingCard) {
      setCards(cards.map(c => c.id === editingCard.id ? editingCard : c));
      setIsCardDialogOpen(false);
      setEditingCard(null);
    }
  };

  const handleCreateCard = () => {
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    setCards([...cards, { id: newId, ...newCard }]);
    setNewCard({card_code: '', client_name: '', fuel_type: '', balance_liters: 0, pin_code: ''});
    setIsAddCardDialogOpen(false);
  };

  const filteredCards = cards.filter(card => {
    if (filterCardClient !== 'all' && card.client_name !== filterCardClient) return false;
    if (filterCardFuelType !== 'all' && card.fuel_type !== filterCardFuelType) return false;
    return true;
  });

  const uniqueClientNames = Array.from(new Set(cards.map(c => c.client_name)));
  const uniqueCardFuelTypes = Array.from(new Set(cards.map(c => c.fuel_type)));

  const [operations, setOperations] = useState([
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

  const [editingOperation, setEditingOperation] = useState<any>(null);
  const [isOperationDialogOpen, setIsOperationDialogOpen] = useState(false);
  const [isAddOperationDialogOpen, setIsAddOperationDialogOpen] = useState(false);
  const [newOperation, setNewOperation] = useState({card_code: '', station_name: '', operation_date: '', operation_type: 'пополнение', quantity: 0, price: 0, amount: 0, comment: ''});
  const [filterCard, setFilterCard] = useState<string>('all');
  const [filterStation, setFilterStation] = useState<string>('all');
  const [filterOperationType, setFilterOperationType] = useState<string>('all');
  const [balanceChangeDialog, setBalanceChangeDialog] = useState<{open: boolean, cardCode: string, oldBalance: number, newBalance: number}>({open: false, cardCode: '', oldBalance: 0, newBalance: 0});

  const handleDeleteOperation = (id: number) => {
    if (confirm('Удалить операцию?')) {
      setOperations(operations.filter(o => o.id !== id));
    }
  };

  const handleEditOperation = (operation: any) => {
    setEditingOperation(operation);
    setIsOperationDialogOpen(true);
  };

  const calculateCardBalance = (cardCode: string, updatedOperations: any[]) => {
    return updatedOperations
      .filter(op => op.card_code === cardCode)
      .reduce((balance, op) => {
        if (op.operation_type === 'пополнение' || op.operation_type === 'оприходование') {
          return balance + op.quantity;
        } else if (op.operation_type === 'заправка' || op.operation_type === 'списание') {
          return balance - op.quantity;
        }
        return balance;
      }, 0);
  };

  const handleSaveOperation = () => {
    if (editingOperation) {
      const updatedOperations = operations.map(o => o.id === editingOperation.id ? editingOperation : o);
      setOperations(updatedOperations);
      
      const cardCode = editingOperation.card_code;
      const card = cards.find(c => c.card_code === cardCode);
      
      if (card) {
        const oldBalance = card.balance_liters;
        const newBalance = calculateCardBalance(cardCode, updatedOperations);
        
        setCards(cards.map(c => 
          c.card_code === cardCode ? {...c, balance_liters: newBalance} : c
        ));
        
        setBalanceChangeDialog({
          open: true,
          cardCode: cardCode,
          oldBalance: oldBalance,
          newBalance: newBalance
        });
      }
      
      setIsOperationDialogOpen(false);
      setEditingOperation(null);
    }
  };

  const handleCreateOperation = () => {
    const newId = operations.length > 0 ? Math.max(...operations.map(o => o.id)) + 1 : 1;
    const updatedOperations = [...operations, { id: newId, ...newOperation }];
    setOperations(updatedOperations);
    
    const cardCode = newOperation.card_code;
    const card = cards.find(c => c.card_code === cardCode);
    
    if (card) {
      const oldBalance = card.balance_liters;
      const newBalance = calculateCardBalance(cardCode, updatedOperations);
      
      setCards(cards.map(c => 
        c.card_code === cardCode ? {...c, balance_liters: newBalance} : c
      ));
      
      setBalanceChangeDialog({
        open: true,
        cardCode: cardCode,
        oldBalance: oldBalance,
        newBalance: newBalance
      });
    }
    
    setNewOperation({card_code: '', station_name: '', operation_date: '', operation_type: 'пополнение', quantity: 0, price: 0, amount: 0, comment: ''});
    setIsAddOperationDialogOpen(false);
  };

  const filteredOperations = operations.filter(operation => {
    if (filterCard !== 'all' && operation.card_code !== filterCard) return false;
    if (filterStation !== 'all' && operation.station_name !== filterStation) return false;
    if (filterOperationType !== 'all' && operation.operation_type !== filterOperationType) return false;
    return true;
  });

  const uniqueCardCodes = Array.from(new Set(operations.map(o => o.card_code)));
  const uniqueStations = Array.from(new Set(operations.map(o => o.station_name)));
  const uniqueOperationTypes = Array.from(new Set(operations.map(o => o.operation_type)));

  const handlePrintClients = () => {
    window.print();
  };

  const handlePrintCards = () => {
    window.print();
  };

  const handlePrintOperations = () => {
    window.print();
  };

  const handlePrintFuelTypes = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Панель администратора</h1>
                <p className="text-sm text-gray-600">Управление системой</p>
              </div>
            </div>
            <Button onClick={onLogout} variant="outline" className="flex items-center gap-2">
              <Icon name="LogOut" className="w-4 h-4" />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="no-print">
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="cards">Карты</TabsTrigger>
            <TabsTrigger value="operations">Операции</TabsTrigger>
            <TabsTrigger value="fuel-types">Виды топлива</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Клиенты</CardTitle>
                  <div className="flex gap-2 no-print">
                    <Button onClick={handlePrintClients} variant="outline" size="sm">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Добавить клиента</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-inn" className="text-right">ИНН</Label>
                            <Input id="new-inn" value={newClient.inn} onChange={(e) => setNewClient({...newClient, inn: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-name" className="text-right">Название</Label>
                            <Input id="new-name" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-address" className="text-right">Адрес</Label>
                            <Input id="new-address" value={newClient.address} onChange={(e) => setNewClient({...newClient, address: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-phone" className="text-right">Телефон</Label>
                            <Input id="new-phone" value={newClient.phone} onChange={(e) => setNewClient({...newClient, phone: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-email" className="text-right">Email</Label>
                            <Input id="new-email" type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-login" className="text-right">Логин</Label>
                            <Input id="new-login" value={newClient.login} onChange={(e) => setNewClient({...newClient, login: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-password" className="text-right">Пароль</Label>
                            <Input id="new-password" type="password" value={newClient.password} onChange={(e) => setNewClient({...newClient, password: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddClientDialogOpen(false)}>Отмена</Button>
                          <Button onClick={handleCreateClient}>Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ИНН</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Адрес</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Логин</TableHead>
                      <TableHead className="no-print">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-mono">{client.inn}</TableCell>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.address}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell className="font-mono">{client.login}</TableCell>
                        <TableCell className="no-print">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                              <Icon name="Pencil" className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteClient(client.id)}>
                              <Icon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Карты</CardTitle>
                  <div className="flex gap-2 no-print">
                    <Button onClick={handlePrintCards} variant="outline" size="sm">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddCardDialogOpen} onOpenChange={setIsAddCardDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Добавить карту</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-code" className="text-right">Код карты</Label>
                            <Input id="new-card-code" value={newCard.card_code} onChange={(e) => setNewCard({...newCard, card_code: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-client" className="text-right">Клиент</Label>
                            <Input id="new-card-client" value={newCard.client_name} onChange={(e) => setNewCard({...newCard, client_name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-fuel" className="text-right">Вид топлива</Label>
                            <Input id="new-card-fuel" value={newCard.fuel_type} onChange={(e) => setNewCard({...newCard, fuel_type: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-balance" className="text-right">Баланс (л)</Label>
                            <Input id="new-card-balance" type="number" value={newCard.balance_liters} onChange={(e) => setNewCard({...newCard, balance_liters: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-pin" className="text-right">PIN-код</Label>
                            <Input id="new-card-pin" type="password" value={newCard.pin_code} onChange={(e) => setNewCard({...newCard, pin_code: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddCardDialogOpen(false)}>Отмена</Button>
                          <Button onClick={handleCreateCard}>Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4 no-print">
                  <div>
                    <Label>Клиент</Label>
                    <Select value={filterCardClient} onValueChange={setFilterCardClient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все клиенты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все клиенты</SelectItem>
                        {uniqueClientNames.map(name => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Вид топлива</Label>
                    <Select value={filterCardFuelType} onValueChange={setFilterCardFuelType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все виды" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все виды</SelectItem>
                        {uniqueCardFuelTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Код карты</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Вид топлива</TableHead>
                      <TableHead>Баланс (л)</TableHead>
                      <TableHead>PIN-код</TableHead>
                      <TableHead className="no-print">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell className="font-mono">{card.card_code}</TableCell>
                        <TableCell>{card.client_name}</TableCell>
                        <TableCell><Badge variant="outline">{card.fuel_type}</Badge></TableCell>
                        <TableCell className="font-mono">{card.balance_liters.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">{card.pin_code}</TableCell>
                        <TableCell className="no-print">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditCard(card)}>
                              <Icon name="Pencil" className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteCard(card.id)}>
                              <Icon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Операции</CardTitle>
                  <div className="flex gap-2 no-print">
                    <Button onClick={handlePrintOperations} variant="outline" size="sm">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddOperationDialogOpen} onOpenChange={setIsAddOperationDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Добавить операцию</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-card" className="text-right">Код карты</Label>
                            <Input id="new-op-card" value={newOperation.card_code} onChange={(e) => setNewOperation({...newOperation, card_code: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-station" className="text-right">АЗС</Label>
                            <Input id="new-op-station" value={newOperation.station_name} onChange={(e) => setNewOperation({...newOperation, station_name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-date" className="text-right">Дата</Label>
                            <Input id="new-op-date" type="datetime-local" value={newOperation.operation_date} onChange={(e) => setNewOperation({...newOperation, operation_date: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-type" className="text-right">Тип</Label>
                            <Select value={newOperation.operation_type} onValueChange={(value) => setNewOperation({...newOperation, operation_type: value})}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="пополнение">Пополнение</SelectItem>
                                <SelectItem value="заправка">Заправка</SelectItem>
                                <SelectItem value="оприходование">Оприходование</SelectItem>
                                <SelectItem value="списание">Списание</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-quantity" className="text-right">Количество (л)</Label>
                            <Input id="new-op-quantity" type="number" step="0.01" value={newOperation.quantity} onChange={(e) => setNewOperation({...newOperation, quantity: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-price" className="text-right">Цена (₽/л)</Label>
                            <Input id="new-op-price" type="number" step="0.01" value={newOperation.price} onChange={(e) => setNewOperation({...newOperation, price: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-amount" className="text-right">Сумма (₽)</Label>
                            <Input id="new-op-amount" type="number" step="0.01" value={newOperation.amount} onChange={(e) => setNewOperation({...newOperation, amount: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-comment" className="text-right">Комментарий</Label>
                            <Input id="new-op-comment" value={newOperation.comment} onChange={(e) => setNewOperation({...newOperation, comment: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddOperationDialogOpen(false)}>Отмена</Button>
                          <Button onClick={handleCreateOperation}>Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4 no-print">
                  <div>
                    <Label>Карта</Label>
                    <Select value={filterCard} onValueChange={setFilterCard}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все карты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все карты</SelectItem>
                        {uniqueCardCodes.map(code => (
                          <SelectItem key={code} value={code}>{code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>АЗС</Label>
                    <Select value={filterStation} onValueChange={setFilterStation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все АЗС" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все АЗС</SelectItem>
                        {uniqueStations.map(station => (
                          <SelectItem key={station} value={station}>{station}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Тип операции</Label>
                    <Select value={filterOperationType} onValueChange={setFilterOperationType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все типы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        {uniqueOperationTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Карта</TableHead>
                      <TableHead>АЗС</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Количество (л)</TableHead>
                      <TableHead>Цена (₽/л)</TableHead>
                      <TableHead>Сумма (₽)</TableHead>
                      <TableHead>Комментарий</TableHead>
                      <TableHead className="no-print">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOperations.map((operation) => (
                      <TableRow key={operation.id}>
                        <TableCell className="font-mono text-sm">{operation.operation_date}</TableCell>
                        <TableCell className="font-mono">{operation.card_code}</TableCell>
                        <TableCell>{operation.station_name}</TableCell>
                        <TableCell>
                          <Badge variant={operation.operation_type === 'заправка' || operation.operation_type === 'списание' ? 'destructive' : 'default'}>
                            {operation.operation_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{operation.quantity.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">{operation.price.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">{operation.amount.toFixed(2)}</TableCell>
                        <TableCell>{operation.comment}</TableCell>
                        <TableCell className="no-print">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditOperation(operation)}>
                              <Icon name="Pencil" className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteOperation(operation.id)}>
                              <Icon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fuel-types">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Виды топлива</CardTitle>
                  <div className="flex gap-2 no-print">
                    <Button onClick={handlePrintFuelTypes} variant="outline" size="sm">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddFuelTypeDialogOpen} onOpenChange={setIsAddFuelTypeDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Добавить вид топлива</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-fuel-name" className="text-right">Название</Label>
                            <Input id="new-fuel-name" value={newFuelType.name} onChange={(e) => setNewFuelType({...newFuelType, name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-fuel-code" className="text-right">Код 1С</Label>
                            <Input id="new-fuel-code" value={newFuelType.code_1c} onChange={(e) => setNewFuelType({...newFuelType, code_1c: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddFuelTypeDialogOpen(false)}>Отмена</Button>
                          <Button onClick={handleCreateFuelType}>Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Код 1С</TableHead>
                      <TableHead className="no-print">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelTypes.map((fuelType) => (
                      <TableRow key={fuelType.id}>
                        <TableCell className="font-medium">{fuelType.name}</TableCell>
                        <TableCell className="font-mono">{fuelType.code_1c}</TableCell>
                        <TableCell className="no-print">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditFuelType(fuelType)}>
                              <Icon name="Pencil" className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteFuelType(fuelType.id)}>
                              <Icon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
          </DialogHeader>
          {editingClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="inn" className="text-right">ИНН</Label>
                <Input id="inn" value={editingClient.inn} onChange={(e) => setEditingClient({...editingClient, inn: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Название</Label>
                <Input id="name" value={editingClient.name} onChange={(e) => setEditingClient({...editingClient, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">Адрес</Label>
                <Input id="address" value={editingClient.address} onChange={(e) => setEditingClient({...editingClient, address: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Телефон</Label>
                <Input id="phone" value={editingClient.phone} onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={editingClient.email} onChange={(e) => setEditingClient({...editingClient, email: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="login" className="text-right">Логин</Label>
                <Input id="login" value={editingClient.login} onChange={(e) => setEditingClient({...editingClient, login: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsClientDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveClient}>Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать карту</DialogTitle>
          </DialogHeader>
          {editingCard && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="card-code" className="text-right">Код карты</Label>
                <Input id="card-code" value={editingCard.card_code} onChange={(e) => setEditingCard({...editingCard, card_code: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client-name" className="text-right">Клиент</Label>
                <Input id="client-name" value={editingCard.client_name} onChange={(e) => setEditingCard({...editingCard, client_name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fuel-type" className="text-right">Вид топлива</Label>
                <Input id="fuel-type" value={editingCard.fuel_type} onChange={(e) => setEditingCard({...editingCard, fuel_type: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">Баланс (л)</Label>
                <Input id="balance" type="number" value={editingCard.balance_liters} onChange={(e) => setEditingCard({...editingCard, balance_liters: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pin-code" className="text-right">PIN-код</Label>
                <Input id="pin-code" type="password" value={editingCard.pin_code} onChange={(e) => setEditingCard({...editingCard, pin_code: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCardDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveCard}>Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOperationDialogOpen} onOpenChange={setIsOperationDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать операцию</DialogTitle>
          </DialogHeader>
          {editingOperation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-card" className="text-right">Код карты</Label>
                <Input id="op-card" value={editingOperation.card_code} onChange={(e) => setEditingOperation({...editingOperation, card_code: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-station" className="text-right">АЗС</Label>
                <Input id="op-station" value={editingOperation.station_name} onChange={(e) => setEditingOperation({...editingOperation, station_name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-date" className="text-right">Дата</Label>
                <Input id="op-date" value={editingOperation.operation_date} onChange={(e) => setEditingOperation({...editingOperation, operation_date: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-type" className="text-right">Тип</Label>
                <Select value={editingOperation.operation_type} onValueChange={(value) => setEditingOperation({...editingOperation, operation_type: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="пополнение">Пополнение</SelectItem>
                    <SelectItem value="заправка">Заправка</SelectItem>
                    <SelectItem value="оприходование">Оприходование</SelectItem>
                    <SelectItem value="списание">Списание</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-quantity" className="text-right">Количество (л)</Label>
                <Input id="op-quantity" type="number" step="0.01" value={editingOperation.quantity} onChange={(e) => setEditingOperation({...editingOperation, quantity: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-price" className="text-right">Цена (₽/л)</Label>
                <Input id="op-price" type="number" step="0.01" value={editingOperation.price} onChange={(e) => setEditingOperation({...editingOperation, price: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-amount" className="text-right">Сумма (₽)</Label>
                <Input id="op-amount" type="number" step="0.01" value={editingOperation.amount} onChange={(e) => setEditingOperation({...editingOperation, amount: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="op-comment" className="text-right">Комментарий</Label>
                <Input id="op-comment" value={editingOperation.comment} onChange={(e) => setEditingOperation({...editingOperation, comment: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOperationDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveOperation}>Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isFuelTypeDialogOpen} onOpenChange={setIsFuelTypeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать вид топлива</DialogTitle>
          </DialogHeader>
          {editingFuelType && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fuel-name" className="text-right">Название</Label>
                <Input id="fuel-name" value={editingFuelType.name} onChange={(e) => setEditingFuelType({...editingFuelType, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fuel-code" className="text-right">Код 1С</Label>
                <Input id="fuel-code" value={editingFuelType.code_1c} onChange={(e) => setEditingFuelType({...editingFuelType, code_1c: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsFuelTypeDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSaveFuelType}>Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={balanceChangeDialog.open} onOpenChange={(open) => setBalanceChangeDialog({...balanceChangeDialog, open})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменение баланса карты</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">Карта: <span className="font-mono font-medium">{balanceChangeDialog.cardCode}</span></p>
            <p className="text-sm text-gray-600 mt-2">Старый баланс: <span className="font-mono font-medium">{balanceChangeDialog.oldBalance.toFixed(2)} л</span></p>
            <p className="text-sm text-gray-600 mt-2">Новый баланс: <span className="font-mono font-medium">{balanceChangeDialog.newBalance.toFixed(2)} л</span></p>
            <p className="text-sm text-gray-600 mt-2">Изменение: <span className={`font-mono font-medium ${balanceChangeDialog.newBalance >= balanceChangeDialog.oldBalance ? 'text-green-600' : 'text-red-600'}`}>
              {balanceChangeDialog.newBalance >= balanceChangeDialog.oldBalance ? '+' : ''}{(balanceChangeDialog.newBalance - balanceChangeDialog.oldBalance).toFixed(2)} л
            </span></p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setBalanceChangeDialog({...balanceChangeDialog, open: false})}>Закрыть</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
