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
          cardCode,
          oldBalance,
          newBalance
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
        cardCode,
        oldBalance,
        newBalance
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

  const uniqueCards = Array.from(new Set(operations.map(op => op.card_code)));
  const uniqueStations = Array.from(new Set(operations.map(op => op.station_name)));
  const uniqueOperationTypes = Array.from(new Set(operations.map(op => op.operation_type)));

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
                <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
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
                        <Input id="inn" placeholder="7707083893" className="bg-input text-foreground" value={newClient.inn} onChange={(e) => setNewClient({...newClient, inn: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="name" className="text-foreground">Наименование</Label>
                        <Input id="name" placeholder="ООО Компания" className="bg-input text-foreground" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-foreground">Адрес</Label>
                        <Input id="address" placeholder="г. Москва, ул. Ленина, д. 1" className="bg-input text-foreground" value={newClient.address} onChange={(e) => setNewClient({...newClient, address: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-foreground">Телефон</Label>
                        <Input id="phone" placeholder="+79991234567" className="bg-input text-foreground" value={newClient.phone} onChange={(e) => setNewClient({...newClient, phone: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-foreground">Email</Label>
                        <Input id="email" type="email" placeholder="info@company.ru" className="bg-input text-foreground" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="login" className="text-foreground">Логин</Label>
                        <Input id="login" placeholder="company" className="bg-input text-foreground" value={newClient.login} onChange={(e) => setNewClient({...newClient, login: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="password" className="text-foreground">Пароль</Label>
                        <Input id="password" type="password" placeholder="••••••••" className="bg-input text-foreground" value={newClient.password} onChange={(e) => setNewClient({...newClient, password: e.target.value})} />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCreateClient}>
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
                        <TableHead className="text-foreground font-bold">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id} className="border-b border-border">
                          <TableCell className="py-2 px-3 font-mono text-accent">{client.inn}</TableCell>
                          <TableCell className="py-2 px-3 text-foreground font-semibold">{client.name}</TableCell>
                          <TableCell className="py-2 px-3 text-muted-foreground text-sm">{client.address}</TableCell>
                          <TableCell className="py-2 px-3 text-foreground">{client.phone}</TableCell>
                          <TableCell className="py-2 px-3 text-foreground">{client.email}</TableCell>
                          <TableCell className="py-2 px-3 font-mono text-accent">{client.login}</TableCell>
                          <TableCell className="py-2 px-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditClient(client)} className="h-8 w-8 p-0">
                                <Icon name="Pencil" size={16} />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeleteClient(client.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                <Icon name="Trash2" size={16} />
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

            {/* Edit Client Dialog */}
            <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
              <DialogContent className="bg-card border-2 border-accent">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Редактировать клиента</DialogTitle>
                </DialogHeader>
                {editingClient && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-inn" className="text-foreground">ИНН</Label>
                      <Input 
                        id="edit-inn" 
                        value={editingClient.inn}
                        onChange={(e) => setEditingClient({...editingClient, inn: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-name" className="text-foreground">Наименование</Label>
                      <Input 
                        id="edit-name" 
                        value={editingClient.name}
                        onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-address" className="text-foreground">Адрес</Label>
                      <Input 
                        id="edit-address" 
                        value={editingClient.address}
                        onChange={(e) => setEditingClient({...editingClient, address: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-phone" className="text-foreground">Телефон</Label>
                      <Input 
                        id="edit-phone" 
                        value={editingClient.phone}
                        onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email" className="text-foreground">Email</Label>
                      <Input 
                        id="edit-email" 
                        type="email" 
                        value={editingClient.email}
                        onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-login" className="text-foreground">Логин</Label>
                      <Input 
                        id="edit-login" 
                        value={editingClient.login}
                        onChange={(e) => setEditingClient({...editingClient, login: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <Button onClick={handleSaveClient} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Сохранить
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="cards">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Icon name="CreditCard" size={28} className="text-accent" />
                  Топливные карты
                </CardTitle>
                <Dialog open={isAddCardDialogOpen} onOpenChange={setIsAddCardDialogOpen}>
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
                        <Select value={newCard.client_name} onValueChange={(value) => setNewCard({...newCard, client_name: value})}>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите клиента" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map(client => (
                              <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fuel" className="text-foreground">Вид топлива</Label>
                        <Select value={newCard.fuel_type} onValueChange={(value) => setNewCard({...newCard, fuel_type: value})}>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите топливо" />
                          </SelectTrigger>
                          <SelectContent>
                            {fuelTypes.map(fuel => (
                              <SelectItem key={fuel.id} value={fuel.name}>{fuel.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="card-code" className="text-foreground">Код карты</Label>
                        <Input id="card-code" placeholder="0001" className="bg-input text-foreground" value={newCard.card_code} onChange={(e) => setNewCard({...newCard, card_code: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="pin" className="text-foreground">PIN-код</Label>
                        <Input id="pin" type="password" placeholder="1234" className="bg-input text-foreground" value={newCard.pin_code} onChange={(e) => setNewCard({...newCard, pin_code: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="balance" className="text-foreground">Начальный баланс (литры)</Label>
                        <Input id="balance" type="number" step="0.01" placeholder="0.00" className="bg-input text-foreground" value={newCard.balance_liters} onChange={(e) => setNewCard({...newCard, balance_liters: parseFloat(e.target.value) || 0})} />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCreateCard}>
                        Создать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground mb-2">Клиент</Label>
                    <Select value={filterCardClient} onValueChange={setFilterCardClient}>
                      <SelectTrigger className="bg-input text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        {uniqueClientNames.map(client => (
                          <SelectItem key={client} value={client}>{client}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-foreground mb-2">Вид топлива</Label>
                    <Select value={filterCardFuelType} onValueChange={setFilterCardFuelType}>
                      <SelectTrigger className="bg-input text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        {uniqueCardFuelTypes.map(fuel => (
                          <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-border">
                        <TableHead className="text-foreground font-bold">Код карты</TableHead>
                        <TableHead className="text-foreground font-bold">Клиент</TableHead>
                        <TableHead className="text-foreground font-bold">Вид топлива</TableHead>
                        <TableHead className="text-foreground font-bold">Баланс (л)</TableHead>
                        <TableHead className="text-foreground font-bold">PIN</TableHead>
                        <TableHead className="text-foreground font-bold">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCards.map((card) => (
                        <TableRow key={card.id} className="border-b border-border">
                          <TableCell className="py-2 px-3 font-mono text-accent font-bold">{card.card_code}</TableCell>
                          <TableCell className="py-2 px-3 text-foreground">{card.client_name}</TableCell>
                          <TableCell className="py-2 px-3">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">{card.fuel_type}</Badge>
                          </TableCell>
                          <TableCell className="py-2 px-3 font-semibold text-accent">{card.balance_liters.toFixed(2)}</TableCell>
                          <TableCell className="py-2 px-3 font-mono text-muted-foreground">{card.pin_code}</TableCell>
                          <TableCell className="py-2 px-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditCard(card)} className="h-8 w-8 p-0">
                                <Icon name="Pencil" size={16} />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeleteCard(card.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                <Icon name="Trash2" size={16} />
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

            {/* Edit Card Dialog */}
            <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
              <DialogContent className="bg-card border-2 border-accent">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Редактировать карту</DialogTitle>
                </DialogHeader>
                {editingCard && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-card-code" className="text-foreground">Код карты</Label>
                      <Input 
                        id="edit-card-code" 
                        value={editingCard.card_code}
                        onChange={(e) => setEditingCard({...editingCard, card_code: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-client-name" className="text-foreground">Клиент</Label>
                      <Select value={editingCard.client_name} onValueChange={(value) => setEditingCard({...editingCard, client_name: value})}>
                        <SelectTrigger className="bg-input text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-fuel-type" className="text-foreground">Вид топлива</Label>
                      <Select value={editingCard.fuel_type} onValueChange={(value) => setEditingCard({...editingCard, fuel_type: value})}>
                        <SelectTrigger className="bg-input text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map(fuel => (
                            <SelectItem key={fuel.id} value={fuel.name}>{fuel.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-balance" className="text-foreground">Баланс (литры)</Label>
                      <Input 
                        id="edit-balance" 
                        type="number"
                        step="0.01"
                        value={editingCard.balance_liters}
                        onChange={(e) => setEditingCard({...editingCard, balance_liters: parseFloat(e.target.value)})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-pin" className="text-foreground">PIN-код</Label>
                      <Input 
                        id="edit-pin" 
                        value={editingCard.pin_code}
                        onChange={(e) => setEditingCard({...editingCard, pin_code: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <Button onClick={handleSaveCard} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Сохранить
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="operations">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Icon name="History" size={28} className="text-accent" />
                  Операции
                </CardTitle>
                <Dialog open={isAddOperationDialogOpen} onOpenChange={setIsAddOperationDialogOpen}>
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
                        <Select value={newOperation.card_code} onValueChange={(value) => setNewOperation({...newOperation, card_code: value})}>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите карту" />
                          </SelectTrigger>
                          <SelectContent>
                            {cards.map(card => (
                              <SelectItem key={card.id} value={card.card_code}>{card.card_code}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="op-type" className="text-foreground">Тип операции</Label>
                        <Select value={newOperation.operation_type} onValueChange={(value) => setNewOperation({...newOperation, operation_type: value})}>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="пополнение">Пополнение</SelectItem>
                            <SelectItem value="заправка">Заправка</SelectItem>
                            <SelectItem value="списание">Списание</SelectItem>
                            <SelectItem value="оприходование">Оприходование</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="op-date" className="text-foreground">Дата и время</Label>
                        <Input id="op-date" type="datetime-local" className="bg-input text-foreground" value={newOperation.operation_date} onChange={(e) => setNewOperation({...newOperation, operation_date: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="op-station" className="text-foreground">АЗС</Label>
                        <Input id="op-station" placeholder="АЗС СОЮЗ №1" className="bg-input text-foreground" value={newOperation.station_name} onChange={(e) => setNewOperation({...newOperation, station_name: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="op-quantity" className="text-foreground">Количество (литры)</Label>
                        <Input id="op-quantity" type="number" step="0.01" placeholder="0.00" className="bg-input text-foreground" value={newOperation.quantity} onChange={(e) => {
                          const quantity = parseFloat(e.target.value) || 0;
                          setNewOperation({...newOperation, quantity, amount: quantity * newOperation.price});
                        }} />
                      </div>
                      <div>
                        <Label htmlFor="op-price" className="text-foreground">Цена за литр</Label>
                        <Input id="op-price" type="number" step="0.01" placeholder="0.00" className="bg-input text-foreground" value={newOperation.price} onChange={(e) => {
                          const price = parseFloat(e.target.value) || 0;
                          setNewOperation({...newOperation, price, amount: newOperation.quantity * price});
                        }} />
                      </div>
                      <div>
                        <Label htmlFor="op-amount" className="text-foreground">Сумма</Label>
                        <Input id="op-amount" type="number" step="0.01" placeholder="0.00" className="bg-input text-foreground" value={newOperation.amount} readOnly />
                      </div>
                      <div>
                        <Label htmlFor="op-comment" className="text-foreground">Комментарий</Label>
                        <Input id="op-comment" placeholder="Комментарий" className="bg-input text-foreground" value={newOperation.comment} onChange={(e) => setNewOperation({...newOperation, comment: e.target.value})} />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCreateOperation}>
                        Создать
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <Label className="text-foreground mb-2 block">Фильтр по карте</Label>
                    <Select value={filterCard} onValueChange={setFilterCard}>
                      <SelectTrigger className="bg-input text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все карты</SelectItem>
                        {uniqueCards.map(card => (
                          <SelectItem key={card} value={card}>{card}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Label className="text-foreground mb-2 block">Фильтр по АЗС</Label>
                    <Select value={filterStation} onValueChange={setFilterStation}>
                      <SelectTrigger className="bg-input text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все АЗС</SelectItem>
                        {uniqueStations.map(station => (
                          <SelectItem key={station} value={station}>{station}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Label className="text-foreground mb-2 block">Фильтр по типу</Label>
                    <Select value={filterOperationType} onValueChange={setFilterOperationType}>
                      <SelectTrigger className="bg-input text-foreground">
                        <SelectValue />
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
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-border">
                        <TableHead className="text-foreground font-bold">Дата и время</TableHead>
                        <TableHead className="text-foreground font-bold">Карта</TableHead>
                        <TableHead className="text-foreground font-bold">АЗС</TableHead>
                        <TableHead className="text-foreground font-bold">Тип</TableHead>
                        <TableHead className="text-foreground font-bold">Количество (л)</TableHead>
                        <TableHead className="text-foreground font-bold">Цена</TableHead>
                        <TableHead className="text-foreground font-bold">Сумма</TableHead>
                        <TableHead className="text-foreground font-bold">Комментарий</TableHead>
                        <TableHead className="text-foreground font-bold">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOperations.map((op) => (
                        <TableRow key={op.id} className="border-b border-border">
                          <TableCell className="py-2 px-3 text-foreground font-mono text-sm">{op.operation_date}</TableCell>
                          <TableCell className="py-2 px-3 font-mono text-accent font-bold">{op.card_code}</TableCell>
                          <TableCell className="py-2 px-3 text-foreground">{op.station_name}</TableCell>
                          <TableCell className="py-2 px-3">
                            <Badge className={getOperationColor(op.operation_type)}>{op.operation_type}</Badge>
                          </TableCell>
                          <TableCell className="py-2 px-3 font-semibold text-accent">{op.quantity.toFixed(2)}</TableCell>
                          <TableCell className="py-2 px-3 text-foreground">{op.price.toFixed(2)} ₽</TableCell>
                          <TableCell className="py-2 px-3 font-bold text-accent">{op.amount.toFixed(2)} ₽</TableCell>
                          <TableCell className="py-2 px-3 text-muted-foreground text-sm">{op.comment}</TableCell>
                          <TableCell className="py-2 px-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditOperation(op)} className="h-8 w-8 p-0">
                                <Icon name="Pencil" size={16} />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeleteOperation(op.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                <Icon name="Trash2" size={16} />
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

            {/* Edit Operation Dialog */}
            <Dialog open={isOperationDialogOpen} onOpenChange={setIsOperationDialogOpen}>
              <DialogContent className="bg-card border-2 border-accent">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Редактировать операцию</DialogTitle>
                </DialogHeader>
                {editingOperation && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-op-card" className="text-foreground">Карта</Label>
                      <Select value={editingOperation.card_code} onValueChange={(value) => setEditingOperation({...editingOperation, card_code: value})}>
                        <SelectTrigger className="bg-input text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cards.map(card => (
                            <SelectItem key={card.id} value={card.card_code}>{card.card_code}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-op-type" className="text-foreground">Тип операции</Label>
                      <Select value={editingOperation.operation_type} onValueChange={(value) => setEditingOperation({...editingOperation, operation_type: value})}>
                        <SelectTrigger className="bg-input text-foreground">
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
                    <div>
                      <Label htmlFor="edit-op-station" className="text-foreground">АЗС</Label>
                      <Input 
                        id="edit-op-station" 
                        value={editingOperation.station_name}
                        onChange={(e) => setEditingOperation({...editingOperation, station_name: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-op-date" className="text-foreground">Дата и время</Label>
                      <Input 
                        id="edit-op-date" 
                        value={editingOperation.operation_date}
                        onChange={(e) => setEditingOperation({...editingOperation, operation_date: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-op-quantity" className="text-foreground">Количество (литры)</Label>
                      <Input 
                        id="edit-op-quantity" 
                        type="number"
                        step="0.01"
                        value={editingOperation.quantity}
                        onChange={(e) => setEditingOperation({...editingOperation, quantity: parseFloat(e.target.value)})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-op-price" className="text-foreground">Цена за литр</Label>
                      <Input 
                        id="edit-op-price" 
                        type="number"
                        step="0.01"
                        value={editingOperation.price}
                        onChange={(e) => setEditingOperation({...editingOperation, price: parseFloat(e.target.value), amount: parseFloat(e.target.value) * editingOperation.quantity})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-op-comment" className="text-foreground">Комментарий</Label>
                      <Input 
                        id="edit-op-comment" 
                        value={editingOperation.comment}
                        onChange={(e) => setEditingOperation({...editingOperation, comment: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <Button onClick={handleSaveOperation} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Сохранить
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="fuel-types">
            <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Icon name="Droplet" size={28} className="text-accent" />
                  Виды топлива
                </CardTitle>
                <Dialog open={isAddFuelTypeDialogOpen} onOpenChange={setIsAddFuelTypeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить вид топлива
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-2 border-accent">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Новый вид топлива</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fuel-name" className="text-foreground">Наименование</Label>
                        <Input id="fuel-name" placeholder="АИ-92" className="bg-input text-foreground" value={newFuelType.name} onChange={(e) => setNewFuelType({...newFuelType, name: e.target.value})} />
                      </div>
                      <div>
                        <Label htmlFor="fuel-code" className="text-foreground">Код 1С</Label>
                        <Input id="fuel-code" placeholder="100001" className="bg-input text-foreground" value={newFuelType.code_1c} onChange={(e) => setNewFuelType({...newFuelType, code_1c: e.target.value})} />
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCreateFuelType}>
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
                        <TableHead className="text-foreground font-bold">Наименование</TableHead>
                        <TableHead className="text-foreground font-bold">Код 1С</TableHead>
                        <TableHead className="text-foreground font-bold">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fuelTypes.map((fuel) => (
                        <TableRow key={fuel.id} className="border-b border-border">
                          <TableCell className="py-2 px-3">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary font-semibold">{fuel.name}</Badge>
                          </TableCell>
                          <TableCell className="py-2 px-3 font-mono text-accent">{fuel.code_1c}</TableCell>
                          <TableCell className="py-2 px-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditFuelType(fuel)} className="h-8 w-8 p-0">
                                <Icon name="Pencil" size={16} />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeleteFuelType(fuel.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                <Icon name="Trash2" size={16} />
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

            {/* Edit Fuel Type Dialog */}
            <Dialog open={isFuelTypeDialogOpen} onOpenChange={setIsFuelTypeDialogOpen}>
              <DialogContent className="bg-card border-2 border-accent">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Редактировать вид топлива</DialogTitle>
                </DialogHeader>
                {editingFuelType && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-fuel-name" className="text-foreground">Наименование</Label>
                      <Input 
                        id="edit-fuel-name" 
                        value={editingFuelType.name}
                        onChange={(e) => setEditingFuelType({...editingFuelType, name: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-fuel-code" className="text-foreground">Код 1С</Label>
                      <Input 
                        id="edit-fuel-code" 
                        value={editingFuelType.code_1c}
                        onChange={(e) => setEditingFuelType({...editingFuelType, code_1c: e.target.value})}
                        className="bg-input text-foreground" 
                      />
                    </div>
                    <Button onClick={handleSaveFuelType} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Сохранить
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={balanceChangeDialog.open} onOpenChange={(open) => setBalanceChangeDialog({...balanceChangeDialog, open})}>
        <DialogContent className="bg-card border-4 border-accent shadow-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground text-center flex items-center justify-center gap-2">
              <Icon name="CheckCircle2" size={32} className="text-primary" />
              Баланс карты изменен
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Icon name="CreditCard" size={24} className="text-accent" />
                <p className="text-xl font-mono text-accent">{balanceChangeDialog.cardCode}</p>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Было</p>
                  <p className="text-2xl font-bold text-muted-foreground line-through">
                    {balanceChangeDialog.oldBalance.toFixed(2)} л
                  </p>
                </div>
                
                <Icon name="ArrowRight" size={32} className="text-accent" />
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Стало</p>
                  <p className="text-3xl font-bold text-primary">
                    {balanceChangeDialog.newBalance.toFixed(2)} л
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  balanceChangeDialog.newBalance > balanceChangeDialog.oldBalance 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  <Icon 
                    name={balanceChangeDialog.newBalance > balanceChangeDialog.oldBalance ? 'TrendingUp' : 'TrendingDown'} 
                    size={20} 
                  />
                  <span className="font-semibold">
                    {balanceChangeDialog.newBalance > balanceChangeDialog.oldBalance ? '+' : ''}
                    {(balanceChangeDialog.newBalance - balanceChangeDialog.oldBalance).toFixed(2)} л
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setBalanceChangeDialog({open: false, cardCode: '', oldBalance: 0, newBalance: 0})}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-lg"
            >
              Понятно
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}