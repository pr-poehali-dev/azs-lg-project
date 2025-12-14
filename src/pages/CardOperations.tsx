import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useOperations } from '@/contexts/OperationsContext';
import * as XLSX from 'xlsx';

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
  daily_limit: number;
  status: 'активна' | 'заблокирована';
  block_reason: string;
  owner: string;
}

interface Operation {
  id: number;
  card_id: number;
  station_name: string;
  operation_date: string;
  operation_type: string;
  quantity: number;
  price: number;
  amount: number;
  comment: string;
}

export default function CardOperations() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cardId = parseInt(searchParams.get('cardId') || '1');
  const { operations: contextOperations } = useOperations();

  const [clientData] = useState<ClientData>({
    name: 'ООО "Транспортная компания"',
    inn: '7707083893',
    email: 'info@transport.ru',
    phone: '+79991234567'
  });

  const [cards] = useState<FuelCard[]>([
    { id: 1, card_code: '0001', fuel_type: 'АИ-95', balance_liters: 955.00, daily_limit: 100, status: 'активна', block_reason: '', owner: 'ООО "Транспортная компания"' },
    { id: 2, card_code: '0002', fuel_type: 'АИ-95', balance_liters: 500.00, daily_limit: 150, status: 'активна', block_reason: '', owner: 'ООО "Транспортная компания"' },
    { id: 3, card_code: '0003', fuel_type: 'ДТ', balance_liters: 300.00, daily_limit: 200, status: 'заблокирована', block_reason: 'Утеря карты', owner: 'ООО "Транспортная компания"' }
  ]);

  const [stations] = useState([
    { id: 0, name: 'Склад', code_1c: '200000', address: 'Центральный склад' },
    { id: 1, name: 'АЗС СОЮЗ №3', code_1c: '200001', address: 'г. Москва, ул. Ленина, д. 10' },
    { id: 2, name: 'АЗС СОЮЗ №5', code_1c: '200002', address: 'г. Москва, пр-т Мира, д. 25' }
  ]);

  const operations = contextOperations;

  const [selectedCard] = useState<number>(cardId);
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const uniqueStations = Array.from(new Set(operations.filter(op => op.card_id === selectedCard).map(op => op.station_name)));

  const filteredOperations = operations.filter(op => {
    const matchesCard = op.card_id === selectedCard;
    const matchesStation = selectedStation === 'all' || op.station_name === selectedStation;
    const matchesDateFrom = !dateFrom || op.operation_date >= dateFrom;
    const matchesDateTo = !dateTo || op.operation_date <= dateTo + ' 23:59';
    return matchesCard && matchesStation && matchesDateFrom && matchesDateTo;
  });

  const handlePrintOperations = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const exportData = operationsWithBalance.map(op => ({
      'Дата': op.operation_date,
      'АЗС': op.station_name,
      'Тип операции': op.operation_type,
      'Количество (л)': op.quantity,
      'Цена (руб/л)': op.price,
      'Сумма (руб)': op.amount,
      'Баланс после операции (л)': op.balance,
      'Комментарий': op.comment
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Операции');
    
    const fileName = `operations_card_${selectedCardData?.card_code}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleShowAllOperations = () => {
    setDateFrom('');
    setDateTo('');
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

  const selectedCardData = cards.find(c => c.id === selectedCard);

  const operationsWithBalance = filteredOperations.map((op, index) => {
    let runningBalance = 0;
    for (let i = 0; i <= index; i++) {
      const currentOp = filteredOperations[i];
      if (currentOp.operation_type === 'пополнение' || currentOp.operation_type === 'оприходование') {
        runningBalance += currentOp.quantity;
      } else if (currentOp.operation_type === 'заправка' || currentOp.operation_type === 'списание') {
        runningBalance -= currentOp.quantity;
      }
    }
    return { ...op, balance: runningBalance };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <header className="bg-card border-b-4 border-accent shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Fuel" size={32} className="text-accent" />
            <div>
              <h1 className="text-2xl font-bold text-accent">СОЮЗ</h1>
              <p className="text-sm text-muted-foreground">История операций</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/client')} 
            variant="outline" 
            className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground no-print"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <div className="print-header" style={{ display: 'none' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: '5px 0', fontSize: '16pt', fontWeight: 'bold' }}>СЕТЬ АВТОЗАПРАВОЧНЫХ СТАНЦИЙ "СОЮЗ"</h2>
          <h3 style={{ margin: '5px 0', fontSize: '14pt' }}>История операций по топливной карте</h3>
        </div>
        
        <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #333' }}>
          <h4 style={{ margin: '5px 0', fontSize: '12pt', fontWeight: 'bold' }}>Информация о клиенте</h4>
          <p style={{ margin: '3px 0' }}><strong>Клиент:</strong> {clientData.name}</p>
          <p style={{ margin: '3px 0' }}><strong>ИНН:</strong> {clientData.inn}</p>
        </div>

        {selectedCardData && (
          <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #333', backgroundColor: '#f5f5f5' }}>
            <h4 style={{ margin: '5px 0', fontSize: '12pt', fontWeight: 'bold' }}>Информация о карте</h4>
            <p style={{ margin: '3px 0' }}><strong>Номер карты:</strong> {selectedCardData.card_code}</p>
            <p style={{ margin: '3px 0' }}><strong>Вид топлива:</strong> {selectedCardData.fuel_type}</p>
            <p style={{ margin: '3px 0' }}><strong>Текущий баланс:</strong> {selectedCardData.balance_liters.toFixed(2)} л</p>
            <p style={{ margin: '3px 0' }}><strong>Дневной лимит:</strong> {selectedCardData.daily_limit.toFixed(2)} л</p>
            <p style={{ margin: '3px 0' }}><strong>Статус:</strong> {selectedCardData.status}</p>
            {selectedCardData.status === 'заблокирована' && selectedCardData.block_reason && (
              <p style={{ margin: '3px 0' }}><strong>Причина блокировки:</strong> {selectedCardData.block_reason}</p>
            )}
          </div>
        )}

        {(selectedStation !== 'all' || dateFrom || dateTo) && (
          <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #333' }}>
            <h4 style={{ margin: '5px 0', fontSize: '12pt', fontWeight: 'bold' }}>Фильтры</h4>
            {selectedStation !== 'all' && <p style={{ margin: '3px 0' }}><strong>АЗС:</strong> {selectedStation}</p>}
            {dateFrom && <p style={{ margin: '3px 0' }}><strong>Период с:</strong> {dateFrom}</p>}
            {dateTo && <p style={{ margin: '3px 0' }}><strong>Период по:</strong> {dateTo}</p>}
          </div>
        )}
      </div>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <Card className="border-2 border-accent bg-card/95 backdrop-blur-sm no-print">
          <CardContent className="py-4">
            <div className="grid md:grid-cols-4 gap-4 items-center">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Клиент</p>
                <p className="text-sm font-semibold text-foreground">{clientData.name}</p>
                <p className="text-xs text-muted-foreground">ИНН: {clientData.inn}</p>
              </div>
              
              {selectedCardData && (
                <>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Номер карты</p>
                    <p className="text-xl font-bold text-accent">{selectedCardData.card_code}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Вид топлива</p>
                    <p className="text-lg font-bold text-foreground">{selectedCardData.fuel_type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Баланс</p>
                    <p className="text-2xl font-bold text-primary">{selectedCardData.balance_liters.toFixed(2)} л</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary bg-card/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <Icon name="History" size={28} className="text-accent" />
              История операций
            </CardTitle>
            <div className="flex gap-2 no-print">
              <Button
                onClick={handleExportToExcel}
                variant="outline"
                className="border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <Icon name="FileSpreadsheet" size={16} className="mr-2" />
                Экспорт в Excel
              </Button>
              <Button
                onClick={handlePrintOperations}
                variant="outline"
                className="border-2 border-accent text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Icon name="Printer" size={16} className="mr-2" />
                Печать
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 no-print">
              <div className="space-y-2">
                <Label className="text-foreground">Фильтр по АЗС</Label>
                <Select value={selectedStation} onValueChange={setSelectedStation}>
                  <SelectTrigger className="bg-input border-2 border-border text-foreground">
                    <SelectValue placeholder="Все АЗС" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все АЗС</SelectItem>
                    {uniqueStations.map((station) => (
                      <SelectItem key={station} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Дата с</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-input border-2 border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Дата по</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-input border-2 border-border text-foreground"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-border">
                    <TableHead className="text-foreground font-bold py-2">АЗС</TableHead>
                    <TableHead className="text-foreground font-bold py-2">Дата</TableHead>
                    <TableHead className="text-foreground font-bold py-2">Операция</TableHead>
                    <TableHead className="text-foreground font-bold text-right py-2">Литры</TableHead>
                    <TableHead className="text-foreground font-bold text-right py-2">Цена</TableHead>
                    <TableHead className="text-foreground font-bold text-right py-2 no-print">Сумма</TableHead>
                    <TableHead className="text-foreground font-bold text-right py-2">Баланс</TableHead>
                    <TableHead className="text-foreground font-bold py-2">Комментарий</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOperations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Операций не найдено
                      </TableCell>
                    </TableRow>
                  ) : (
                    operationsWithBalance.map((op) => (
                      <TableRow key={op.id} className="border-b border-border">
                        <TableCell className="text-foreground py-2">{op.station_name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm py-2">{op.operation_date}</TableCell>
                        <TableCell className="py-2">
                          <Badge className={getOperationColor(op.operation_type)}>
                            {op.operation_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-foreground py-2">{op.quantity.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-foreground py-2">{op.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-bold text-accent py-2 no-print">{op.amount.toFixed(2)} ₽</TableCell>
                        <TableCell className="text-right font-bold text-accent py-2">{op.balance.toFixed(2)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm py-2">{op.comment}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}