import { createContext, useContext, useState, ReactNode } from 'react';

export interface Operation {
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

interface OperationsContextType {
  operations: Operation[];
  addOperation: (operation: Omit<Operation, 'id'>) => void;
  addTransferOperations: (
    sourceCardId: number,
    targetCardId: number,
    amount: number,
    price: number,
    sourceCardCode: string,
    targetCardCode: string
  ) => void;
}

const OperationsContext = createContext<OperationsContextType | undefined>(undefined);

export function OperationsProvider({ children }: { children: ReactNode }) {
  const [operations, setOperations] = useState<Operation[]>([
    {
      id: 1,
      card_id: 1,
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
      card_id: 1,
      station_name: 'АЗС СОЮЗ №3',
      operation_date: '2024-12-12 09:15',
      operation_type: 'заправка',
      quantity: 45.00,
      price: 52.50,
      amount: 2362.50,
      comment: 'Заправка автомобиля А123БВ'
    }
  ]);

  const addOperation = (operation: Omit<Operation, 'id'>) => {
    const newId = Math.max(...operations.map(op => op.id), 0) + 1;
    setOperations([...operations, { ...operation, id: newId }]);
  };

  const addTransferOperations = (
    sourceCardId: number,
    targetCardId: number,
    amount: number,
    price: number,
    sourceCardCode: string,
    targetCardCode: string
  ) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newId = Math.max(...operations.map(op => op.id), 0) + 1;

    const debitOperation: Operation = {
      id: newId,
      card_id: sourceCardId,
      station_name: 'Склад',
      operation_date: dateStr,
      operation_type: 'списание',
      quantity: amount,
      price: price,
      amount: amount * price,
      comment: `Перемещение на карту ${targetCardCode}`
    };

    const creditOperation: Operation = {
      id: newId + 1,
      card_id: targetCardId,
      station_name: 'Склад',
      operation_date: dateStr,
      operation_type: 'оприходование',
      quantity: amount,
      price: price,
      amount: amount * price,
      comment: `Перемещение с карты ${sourceCardCode}`
    };

    setOperations([...operations, debitOperation, creditOperation]);
  };

  return (
    <OperationsContext.Provider value={{ operations, addOperation, addTransferOperations }}>
      {children}
    </OperationsContext.Provider>
  );
}

export function useOperations() {
  const context = useContext(OperationsContext);
  if (context === undefined) {
    throw new Error('useOperations must be used within an OperationsProvider');
  }
  return context;
}
