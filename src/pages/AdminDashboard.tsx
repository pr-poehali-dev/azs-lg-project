import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const [stations, setStations] = useState([
    { id: 1, name: 'АЗС СОЮЗ №3', code_1c: '200001', address: 'г. Москва, ул. Ленина, д. 10' },
    { id: 2, name: 'АЗС СОЮЗ №5', code_1c: '200002', address: 'г. Москва, пр-т Мира, д. 25' }
  ]);

  const [editingStation, setEditingStation] = useState<any>(null);
  const [isStationDialogOpen, setIsStationDialogOpen] = useState(false);
  const [isAddStationDialogOpen, setIsAddStationDialogOpen] = useState(false);
  const [newStation, setNewStation] = useState({name: '', code_1c: '', address: ''});

  const handleDeleteStation = (id: number) => {
    if (confirm('Удалить АЗС?')) {
      setStations(stations.filter(s => s.id !== id));
    }
  };

  const handleEditStation = (station: any) => {
    setEditingStation(station);
    setIsStationDialogOpen(true);
  };

  const handleSaveStation = () => {
    if (editingStation) {
      setStations(stations.map(s => s.id === editingStation.id ? editingStation : s));
      setIsStationDialogOpen(false);
      setEditingStation(null);
    }
  };

  const handleCreateStation = () => {
    const newId = stations.length > 0 ? Math.max(...stations.map(s => s.id)) + 1 : 1;
    setStations([...stations, { id: newId, ...newStation }]);
    setNewStation({name: '', code_1c: '', address: ''});
    setIsAddStationDialogOpen(false);
  };

  const handlePrintStations = () => {
    window.print();
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
  const [newCard, setNewCard] = useState({card_code: '', client_id: '', fuel_type_id: '', balance_liters: 0, pin_code: ''});
  const [cardSuccessDialog, setCardSuccessDialog] = useState<{open: boolean, card: any}>({open: false, card: null});
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
    const selectedClient = clients.find(c => c.id.toString() === newCard.client_id);
    const selectedFuelType = fuelTypes.find(f => f.id.toString() === newCard.fuel_type_id);
    
    if (!selectedClient || !selectedFuelType) return;
    
    const cardToCreate = {
      id: newId,
      client_name: selectedClient.name,
      fuel_type: selectedFuelType.name,
      balance_liters: newCard.balance_liters,
      card_code: newCard.card_code,
      pin_code: newCard.pin_code
    };
    
    setCards([...cards, cardToCreate]);
    
    // Если баланс не равен нулю, создаем операцию пополнения
    if (newCard.balance_liters > 0) {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const newOperationId = operations.length > 0 ? Math.max(...operations.map(op => op.id)) + 1 : 1;
      
      const initialOperation = {
        id: newOperationId,
        card_code: newCard.card_code,
        station_name: 'Склад',
        operation_date: dateStr,
        operation_type: 'пополнение',
        quantity: newCard.balance_liters,
        price: 0,
        amount: 0,
        comment: 'Первоначальное пополнение карты'
      };
      
      setOperations([...operations, initialOperation]);
    }
    
    setNewCard({card_code: '', client_id: '', fuel_type_id: '', balance_liters: 0, pin_code: ''});
    setIsAddCardDialogOpen(false);
    setCardSuccessDialog({open: true, card: cardToCreate});
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
    const newOp = { id: newId, ...newOperation };
    const updatedOperations = [...operations, newOp];
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

  const filteredOperations = operations.filter(op => {
    if (filterCard !== 'all' && op.card_code !== filterCard) return false;
    if (filterStation !== 'all' && op.station_name !== filterStation) return false;
    if (filterOperationType !== 'all' && op.operation_type !== filterOperationType) return false;
    return true;
  });

  const uniqueCardCodes = Array.from(new Set(operations.map(o => o.card_code)));
  const uniqueStationNames = Array.from(new Set(operations.map(o => o.station_name)));
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
      <header className="bg-card border-b-4 border-accent shadow-lg no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="w-8 h-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-accent">Панель администратора</h1>
                <p className="text-sm text-muted-foreground">Управление системой</p>
              </div>
            </div>
            <Button onClick={onLogout} variant="outline" className="flex items-center gap-2 border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
              <Icon name="LogOut" className="w-4 h-4" />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="no-print bg-card/50 border-2 border-primary">
            <TabsTrigger value="clients" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Клиенты</TabsTrigger>
            <TabsTrigger value="cards" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Карты</TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Операции</TabsTrigger>
            <TabsTrigger value="stations" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">АЗС</TabsTrigger>
            <TabsTrigger value="fuel-types" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Виды топлива</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Icon name="Users" className="text-accent" />
                    Клиенты
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handlePrintClients} variant="outline" size="sm" className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-card border-2 border-primary">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Добавить клиента</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-inn" className="text-right text-foreground">ИНН</Label>
                            <Input id="new-inn" value={newClient.inn} onChange={(e) => setNewClient({...newClient, inn: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-name" className="text-right text-foreground">Название</Label>
                            <Input id="new-name" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-address" className="text-right text-foreground">Адрес</Label>
                            <Input id="new-address" value={newClient.address} onChange={(e) => setNewClient({...newClient, address: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-phone" className="text-right text-foreground">Телефон</Label>
                            <Input id="new-phone" value={newClient.phone} onChange={(e) => setNewClient({...newClient, phone: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-email" className="text-right text-foreground">Email</Label>
                            <Input id="new-email" type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-login" className="text-right text-foreground">Логин</Label>
                            <Input id="new-login" value={newClient.login} onChange={(e) => setNewClient({...newClient, login: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-password" className="text-right text-foreground">Пароль</Label>
                            <Input id="new-password" type="password" value={newClient.password} onChange={(e) => setNewClient({...newClient, password: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddClientDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
                          <Button onClick={handleCreateClient} className="bg-accent text-accent-foreground hover:bg-accent/90">Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-border">
                      <TableHead className="text-foreground font-bold">ИНН</TableHead>
                      <TableHead className="text-foreground font-bold">Название</TableHead>
                      <TableHead className="text-foreground font-bold">Адрес</TableHead>
                      <TableHead className="text-foreground font-bold">Телефон</TableHead>
                      <TableHead className="text-foreground font-bold">Email</TableHead>
                      <TableHead className="text-foreground font-bold">Логин</TableHead>
                      <TableHead className="text-foreground font-bold">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="border-b border-border">
                        <TableCell className="font-mono text-foreground">{client.inn}</TableCell>
                        <TableCell 
                          className="font-medium text-accent cursor-pointer hover:underline transition-all"
                          onClick={() => navigate('/client')}
                          title="Перейти в кабинет клиента"
                        >
                          {client.name}
                        </TableCell>
                        <TableCell className="text-foreground">{client.address}</TableCell>
                        <TableCell className="text-foreground">{client.phone}</TableCell>
                        <TableCell className="text-foreground">{client.email}</TableCell>
                        <TableCell className="font-mono text-foreground">{client.login}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditClient(client)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
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
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Icon name="CreditCard" className="text-accent" />
                    Карты
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handlePrintCards} variant="outline" size="sm" className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddCardDialogOpen} onOpenChange={setIsAddCardDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-card border-2 border-primary">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Добавить карту</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-code" className="text-right text-foreground">Код карты</Label>
                            <Input id="new-card-code" value={newCard.card_code} onChange={(e) => setNewCard({...newCard, card_code: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-client" className="text-right text-foreground">Клиент</Label>
                            <Select value={newCard.client_id} onValueChange={(value) => setNewCard({...newCard, client_id: value})}>
                              <SelectTrigger id="new-card-client" className="col-span-3">
                                <SelectValue placeholder="Выберите клиента" />
                              </SelectTrigger>
                              <SelectContent>
                                {clients.map((client) => (
                                  <SelectItem key={client.id} value={client.id.toString()}>
                                    {client.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-fuel" className="text-right text-foreground">Вид топлива</Label>
                            <Select value={newCard.fuel_type_id} onValueChange={(value) => setNewCard({...newCard, fuel_type_id: value})}>
                              <SelectTrigger id="new-card-fuel" className="col-span-3">
                                <SelectValue placeholder="Выберите вид топлива" />
                              </SelectTrigger>
                              <SelectContent>
                                {fuelTypes.map((fuelType) => (
                                  <SelectItem key={fuelType.id} value={fuelType.id.toString()}>
                                    {fuelType.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-balance" className="text-right text-foreground">Баланс (л)</Label>
                            <Input id="new-card-balance" type="number" value={newCard.balance_liters} onChange={(e) => setNewCard({...newCard, balance_liters: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-card-pin" className="text-right text-foreground">PIN-код</Label>
                            <Input id="new-card-pin" type="password" value={newCard.pin_code} onChange={(e) => setNewCard({...newCard, pin_code: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddCardDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
                          <Button onClick={handleCreateCard} disabled={!newCard.card_code || !newCard.client_id || !newCard.fuel_type_id || !newCard.pin_code} className="bg-accent text-accent-foreground hover:bg-accent/90">Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-foreground">Клиент</Label>
                    <Select value={filterCardClient} onValueChange={setFilterCardClient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все клиенты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все клиенты</SelectItem>
                        {uniqueClientNames.map((name) => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground">Вид топлива</Label>
                    <Select value={filterCardFuelType} onValueChange={setFilterCardFuelType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все виды топлива" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все виды топлива</SelectItem>
                        {uniqueCardFuelTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-border">
                      <TableHead className="text-foreground font-bold">Код карты</TableHead>
                      <TableHead className="text-foreground font-bold">Клиент</TableHead>
                      <TableHead className="text-foreground font-bold">Вид топлива</TableHead>
                      <TableHead className="text-foreground font-bold">Баланс (л)</TableHead>
                      <TableHead className="text-foreground font-bold">PIN-код</TableHead>
                      <TableHead className="text-foreground font-bold">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards.map((card) => (
                      <TableRow key={card.id} className="border-b border-border">
                        <TableCell className="font-mono text-accent">{card.card_code}</TableCell>
                        <TableCell className="text-foreground">{card.client_name}</TableCell>
                        <TableCell className="text-foreground">{card.fuel_type}</TableCell>
                        <TableCell className="font-bold text-accent">{card.balance_liters.toFixed(2)}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{card.pin_code}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditCard(card)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
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
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Icon name="History" className="text-accent" />
                    Операции
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handlePrintOperations} variant="outline" size="sm" className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddOperationDialogOpen} onOpenChange={setIsAddOperationDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-card border-2 border-primary">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Добавить операцию</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-card" className="text-right text-foreground">Карта</Label>
                            <Select value={newOperation.card_code} onValueChange={(value) => setNewOperation({...newOperation, card_code: value})}>
                              <SelectTrigger id="new-op-card" className="col-span-3">
                                <SelectValue placeholder="Выберите карту" />
                              </SelectTrigger>
                              <SelectContent>
                                {cards.map((card) => (
                                  <SelectItem key={card.id} value={card.card_code}>
                                    {card.card_code} - {card.client_name} ({card.fuel_type})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-station" className="text-right text-foreground">АЗС</Label>
                            <Select value={newOperation.station_name} onValueChange={(value) => setNewOperation({...newOperation, station_name: value})}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Выберите АЗС" />
                              </SelectTrigger>
                              <SelectContent>
                                {stations.map((station) => (
                                  <SelectItem key={station.id} value={station.name}>{station.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-date" className="text-right text-foreground">Дата</Label>
                            <Input id="new-op-date" type="datetime-local" value={newOperation.operation_date} onChange={(e) => setNewOperation({...newOperation, operation_date: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-type" className="text-right text-foreground">Тип операции</Label>
                            <Select value={newOperation.operation_type} onValueChange={(value) => setNewOperation({...newOperation, operation_type: value})}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="пополнение">Пополнение</SelectItem>
                                <SelectItem value="заправка">Заправка</SelectItem>
                                <SelectItem value="списание">Списание</SelectItem>
                                <SelectItem value="оприходование">Оприходование</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-quantity" className="text-right text-foreground">Литры</Label>
                            <Input id="new-op-quantity" type="number" value={newOperation.quantity} onChange={(e) => setNewOperation({...newOperation, quantity: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-price" className="text-right text-foreground">Цена</Label>
                            <Input id="new-op-price" type="number" value={newOperation.price} onChange={(e) => setNewOperation({...newOperation, price: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-amount" className="text-right text-foreground">Сумма</Label>
                            <Input id="new-op-amount" type="number" value={newOperation.amount} onChange={(e) => setNewOperation({...newOperation, amount: parseFloat(e.target.value)})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-op-comment" className="text-right text-foreground">Комментарий</Label>
                            <Input id="new-op-comment" value={newOperation.comment} onChange={(e) => setNewOperation({...newOperation, comment: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddOperationDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
                          <Button onClick={handleCreateOperation} className="bg-accent text-accent-foreground hover:bg-accent/90">Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-foreground">Карта</Label>
                    <Select value={filterCard} onValueChange={setFilterCard}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все карты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все карты</SelectItem>
                        {uniqueCardCodes.map((code) => (
                          <SelectItem key={code} value={code}>{code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground">АЗС</Label>
                    <Select value={filterStation} onValueChange={setFilterStation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все АЗС" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все АЗС</SelectItem>
                        {uniqueStationNames.map((name) => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground">Тип операции</Label>
                    <Select value={filterOperationType} onValueChange={setFilterOperationType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все типы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        {uniqueOperationTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-border">
                        <TableHead className="text-foreground font-bold">Карта</TableHead>
                        <TableHead className="text-foreground font-bold">АЗС</TableHead>
                        <TableHead className="text-foreground font-bold">Дата</TableHead>
                        <TableHead className="text-foreground font-bold">Операция</TableHead>
                        <TableHead className="text-foreground font-bold">Литры</TableHead>
                        <TableHead className="text-foreground font-bold">Цена</TableHead>
                        <TableHead className="text-foreground font-bold">Сумма</TableHead>
                        <TableHead className="text-foreground font-bold">Комментарий</TableHead>
                        <TableHead className="text-foreground font-bold">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOperations.map((op) => (
                        <TableRow key={op.id} className="border-b border-border">
                          <TableCell className="font-mono text-accent">{op.card_code}</TableCell>
                          <TableCell className="text-foreground">{op.station_name}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{op.operation_date}</TableCell>
                          <TableCell>
                            <Badge className={getOperationColor(op.operation_type)}>
                              {op.operation_type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">{op.quantity.toFixed(2)}</TableCell>
                          <TableCell className="text-foreground">{op.price.toFixed(2)}</TableCell>
                          <TableCell className="font-bold text-accent">{op.amount.toFixed(2)} ₽</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{op.comment}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditOperation(op)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
                                <Icon name="Pencil" className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteOperation(op.id)}>
                                <Icon name="Trash2" className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stations">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Icon name="MapPin" className="text-accent" />
                    АЗС
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handlePrintStations} variant="outline" size="sm" className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddStationDialogOpen} onOpenChange={setIsAddStationDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-card border-2 border-primary">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Добавить АЗС</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-station-name" className="text-right text-foreground">Наименование</Label>
                            <Input id="new-station-name" value={newStation.name} onChange={(e) => setNewStation({...newStation, name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-station-code" className="text-right text-foreground">Код 1С</Label>
                            <Input id="new-station-code" value={newStation.code_1c} onChange={(e) => setNewStation({...newStation, code_1c: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-station-address" className="text-right text-foreground">Адрес</Label>
                            <Input id="new-station-address" value={newStation.address} onChange={(e) => setNewStation({...newStation, address: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddStationDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
                          <Button onClick={handleCreateStation} className="bg-accent text-accent-foreground hover:bg-accent/90">Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-border">
                      <TableHead className="text-foreground font-bold">Наименование</TableHead>
                      <TableHead className="text-foreground font-bold">Код 1С</TableHead>
                      <TableHead className="text-foreground font-bold">Адрес</TableHead>
                      <TableHead className="text-foreground font-bold">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stations.map((station) => (
                      <TableRow key={station.id} className="border-b border-border">
                        <TableCell className="font-medium text-foreground">{station.name}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{station.code_1c}</TableCell>
                        <TableCell className="text-foreground">{station.address}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditStation(station)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
                              <Icon name="Pencil" className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteStation(station.id)}>
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
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Icon name="Fuel" className="text-accent" />
                    Виды топлива
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handlePrintFuelTypes} variant="outline" size="sm" className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
                      <Icon name="Printer" className="w-4 h-4 mr-2" />
                      Печать
                    </Button>
                    <Dialog open={isAddFuelTypeDialogOpen} onOpenChange={setIsAddFuelTypeDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Icon name="Plus" className="w-4 h-4 mr-2" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-card border-2 border-primary">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Добавить вид топлива</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-fuel-name" className="text-right text-foreground">Название</Label>
                            <Input id="new-fuel-name" value={newFuelType.name} onChange={(e) => setNewFuelType({...newFuelType, name: e.target.value})} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-fuel-code" className="text-right text-foreground">Код 1С</Label>
                            <Input id="new-fuel-code" value={newFuelType.code_1c} onChange={(e) => setNewFuelType({...newFuelType, code_1c: e.target.value})} className="col-span-3" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAddFuelTypeDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
                          <Button onClick={handleCreateFuelType} className="bg-accent text-accent-foreground hover:bg-accent/90">Создать</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-border">
                      <TableHead className="text-foreground font-bold">Название</TableHead>
                      <TableHead className="text-foreground font-bold">Код 1С</TableHead>
                      <TableHead className="text-foreground font-bold">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelTypes.map((fuelType) => (
                      <TableRow key={fuelType.id} className="border-b border-border">
                        <TableCell className="font-medium text-foreground">{fuelType.name}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{fuelType.code_1c}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditFuelType(fuelType)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">
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
        <DialogContent className="max-w-2xl bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Редактировать клиента</DialogTitle>
          </DialogHeader>
          {editingClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-inn" className="text-right text-foreground">ИНН</Label>
                <Input id="edit-inn" value={editingClient.inn} onChange={(e) => setEditingClient({...editingClient, inn: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right text-foreground">Название</Label>
                <Input id="edit-name" value={editingClient.name} onChange={(e) => setEditingClient({...editingClient, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right text-foreground">Адрес</Label>
                <Input id="edit-address" value={editingClient.address} onChange={(e) => setEditingClient({...editingClient, address: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right text-foreground">Телефон</Label>
                <Input id="edit-phone" value={editingClient.phone} onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right text-foreground">Email</Label>
                <Input id="edit-email" value={editingClient.email} onChange={(e) => setEditingClient({...editingClient, email: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-login" className="text-right text-foreground">Логин</Label>
                <Input id="edit-login" value={editingClient.login} onChange={(e) => setEditingClient({...editingClient, login: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsClientDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
            <Button onClick={handleSaveClient} className="bg-accent text-accent-foreground hover:bg-accent/90">Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Редактировать карту</DialogTitle>
          </DialogHeader>
          {editingCard && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-card-code" className="text-right text-foreground">Код карты</Label>
                <Input id="edit-card-code" value={editingCard.card_code} onChange={(e) => setEditingCard({...editingCard, card_code: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-card-client" className="text-right text-foreground">Клиент</Label>
                <Input id="edit-card-client" value={editingCard.client_name} onChange={(e) => setEditingCard({...editingCard, client_name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-card-fuel" className="text-right text-foreground">Вид топлива</Label>
                <Input id="edit-card-fuel" value={editingCard.fuel_type} onChange={(e) => setEditingCard({...editingCard, fuel_type: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-card-balance" className="text-right text-foreground">Баланс (л)</Label>
                <Input id="edit-card-balance" type="number" value={editingCard.balance_liters} onChange={(e) => setEditingCard({...editingCard, balance_liters: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-card-pin" className="text-right text-foreground">PIN-код</Label>
                <Input id="edit-card-pin" type="password" value={editingCard.pin_code} onChange={(e) => setEditingCard({...editingCard, pin_code: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCardDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
            <Button onClick={handleSaveCard} className="bg-accent text-accent-foreground hover:bg-accent/90">Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOperationDialogOpen} onOpenChange={setIsOperationDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Редактировать операцию</DialogTitle>
          </DialogHeader>
          {editingOperation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-card" className="text-right text-foreground">Код карты</Label>
                <Input id="edit-op-card" value={editingOperation.card_code} onChange={(e) => setEditingOperation({...editingOperation, card_code: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-station" className="text-right text-foreground">АЗС</Label>
                <Select value={editingOperation.station_name} onValueChange={(value) => setEditingOperation({...editingOperation, station_name: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station.id} value={station.name}>{station.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-date" className="text-right text-foreground">Дата</Label>
                <Input id="edit-op-date" value={editingOperation.operation_date} onChange={(e) => setEditingOperation({...editingOperation, operation_date: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-type" className="text-right text-foreground">Тип операции</Label>
                <Select value={editingOperation.operation_type} onValueChange={(value) => setEditingOperation({...editingOperation, operation_type: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="пополнение">Пополнение</SelectItem>
                    <SelectItem value="заправка">Заправка</SelectItem>
                    <SelectItem value="списание">Списание</SelectItem>
                    <SelectItem value="оприходование">Оприходование</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-quantity" className="text-right text-foreground">Литры</Label>
                <Input id="edit-op-quantity" type="number" value={editingOperation.quantity} onChange={(e) => setEditingOperation({...editingOperation, quantity: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-price" className="text-right text-foreground">Цена</Label>
                <Input id="edit-op-price" type="number" value={editingOperation.price} onChange={(e) => setEditingOperation({...editingOperation, price: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-amount" className="text-right text-foreground">Сумма</Label>
                <Input id="edit-op-amount" type="number" value={editingOperation.amount} onChange={(e) => setEditingOperation({...editingOperation, amount: parseFloat(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-op-comment" className="text-right text-foreground">Комментарий</Label>
                <Input id="edit-op-comment" value={editingOperation.comment} onChange={(e) => setEditingOperation({...editingOperation, comment: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOperationDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
            <Button onClick={handleSaveOperation} className="bg-accent text-accent-foreground hover:bg-accent/90">Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isFuelTypeDialogOpen} onOpenChange={setIsFuelTypeDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Редактировать вид топлива</DialogTitle>
          </DialogHeader>
          {editingFuelType && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fuel-name" className="text-right text-foreground">Название</Label>
                <Input id="edit-fuel-name" value={editingFuelType.name} onChange={(e) => setEditingFuelType({...editingFuelType, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fuel-code" className="text-right text-foreground">Код 1С</Label>
                <Input id="edit-fuel-code" value={editingFuelType.code_1c} onChange={(e) => setEditingFuelType({...editingFuelType, code_1c: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsFuelTypeDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
            <Button onClick={handleSaveFuelType} className="bg-accent text-accent-foreground hover:bg-accent/90">Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isStationDialogOpen} onOpenChange={setIsStationDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Редактировать АЗС</DialogTitle>
          </DialogHeader>
          {editingStation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-station-name" className="text-right text-foreground">Наименование</Label>
                <Input id="edit-station-name" value={editingStation.name} onChange={(e) => setEditingStation({...editingStation, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-station-code" className="text-right text-foreground">Код 1С</Label>
                <Input id="edit-station-code" value={editingStation.code_1c} onChange={(e) => setEditingStation({...editingStation, code_1c: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-station-address" className="text-right text-foreground">Адрес</Label>
                <Input id="edit-station-address" value={editingStation.address} onChange={(e) => setEditingStation({...editingStation, address: e.target.value})} className="col-span-3" />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsStationDialogOpen(false)} className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground">Отмена</Button>
            <Button onClick={handleSaveStation} className="bg-accent text-accent-foreground hover:bg-accent/90">Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={balanceChangeDialog.open} onOpenChange={(open) => setBalanceChangeDialog({...balanceChangeDialog, open})}>
        <DialogContent className="bg-card border-2 border-primary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Изменение баланса карты</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-foreground mb-2">Карта: <span className="font-mono text-accent">{balanceChangeDialog.cardCode}</span></p>
            <p className="text-foreground mb-2">Старый баланс: <span className="font-bold text-accent">{balanceChangeDialog.oldBalance.toFixed(2)} л</span></p>
            <p className="text-foreground mb-2">Новый баланс: <span className="font-bold text-accent">{balanceChangeDialog.newBalance.toFixed(2)} л</span></p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setBalanceChangeDialog({...balanceChangeDialog, open: false})} className="bg-accent text-accent-foreground hover:bg-accent/90">OK</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={cardSuccessDialog.open} onOpenChange={(open) => setCardSuccessDialog({...cardSuccessDialog, open})}>
        <DialogContent className="bg-card border-2 border-primary max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="CheckCircle2" size={28} className="text-primary" />
              </div>
              <DialogTitle className="text-2xl text-foreground">Карта успешно создана!</DialogTitle>
            </div>
          </DialogHeader>
          {cardSuccessDialog.card && (
            <div className="py-4 space-y-4">
              <div className="p-4 rounded-lg bg-accent/10 border-2 border-accent">
                <h3 className="text-lg font-bold text-accent mb-3">Данные новой карты:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Номер карты:</span>
                    <span className="font-mono text-xl font-bold text-accent">{cardSuccessDialog.card.card_code}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Клиент:</span>
                    <span className="font-semibold text-foreground">{cardSuccessDialog.card.client_name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Вид топлива:</span>
                    <span className="font-semibold text-foreground">{cardSuccessDialog.card.fuel_type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Начальный баланс:</span>
                    <span className="font-bold text-primary text-lg">{cardSuccessDialog.card.balance_liters.toFixed(2)} л</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">PIN-код:</span>
                    <span className="font-mono text-foreground">{cardSuccessDialog.card.pin_code}</span>
                  </div>
                </div>
              </div>
              {cardSuccessDialog.card.balance_liters > 0 && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={20} className="text-primary mt-0.5" />
                    <p className="text-sm text-foreground">
                      Автоматически создана операция пополнения на <strong>{cardSuccessDialog.card.balance_liters.toFixed(2)} л</strong> со Склада
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setCardSuccessDialog({open: false, card: null})} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Icon name="CheckCircle2" size={16} className="mr-2" />
              Отлично!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}