import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const OPERATOR_API = 'https://functions.poehali.dev/63d97170-36d0-4590-bf1f-e247777c20db';
const AUTH_API = 'https://functions.poehali.dev/9f5ff2f8-a6c2-489f-8a85-40f260bbac9e';

interface CardInfo {
  card_code: string;
  fuel_type: string;
  balance_liters: number;
  daily_limit: number;
  available_balance: number;
  client_name: string;
}

type Stage = 'login' | 'scan' | 'card' | 'confirm';

export default function OperatorPanel() {
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>('login');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [barcode, setBarcode] = useState('');
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [cardError, setCardError] = useState('');
  const [cardLoading, setCardLoading] = useState(false);

  const [quantity, setQuantity] = useState('');
  const [dispenseError, setDispenseError] = useState('');
  const [dispenseLoading, setDispenseLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const barcodeRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === 'scan' && barcodeRef.current) {
      barcodeRef.current.focus();
    }
    if (stage === 'card' && quantityRef.current) {
      quantityRef.current.focus();
    }
  }, [stage]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await fetch(AUTH_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user.admin) {
        setStage('scan');
      } else if (res.ok && data.success && !data.user.admin) {
        setAuthError('Доступ только для операторов');
      } else {
        setAuthError(data.error || 'Неверный логин или пароль');
      }
    } catch {
      setAuthError('Ошибка соединения с сервером');
    } finally {
      setAuthLoading(false);
    }
  };

  const extractCardCode = (raw: string): string => {
    const cleaned = raw.trim();
    if (cleaned.length >= 12) {
      return cleaned.substring(8, 12);
    }
    return cleaned;
  };

  const handleBarcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode.trim()) return;
    setCardError('');
    setCardLoading(true);
    const code = extractCardCode(barcode);
    try {
      const res = await fetch(`${OPERATOR_API}?card_code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (res.ok) {
        setCardInfo(data);
        setQuantity('');
        setDispenseError('');
        setSuccessMsg('');
        setStage('card');
      } else {
        setCardError(data.error || 'Карта не найдена');
        setBarcode('');
        if (barcodeRef.current) barcodeRef.current.focus();
      }
    } catch {
      setCardError('Ошибка соединения с сервером');
    } finally {
      setCardLoading(false);
    }
  };

  const handleDispense = async () => {
    if (!cardInfo) return;
    const qty = parseFloat(quantity.replace(',', '.'));
    if (isNaN(qty) || qty <= 0) {
      setDispenseError('Введите корректное количество топлива');
      return;
    }
    if (qty > cardInfo.available_balance) {
      setDispenseError(`Превышает доступный остаток: ${cardInfo.available_balance.toFixed(3)} л`);
      return;
    }
    setStage('confirm');
  };

  const handleConfirmYes = async () => {
    if (!cardInfo) return;
    setDispenseError('');
    setDispenseLoading(true);
    const qty = parseFloat(quantity.replace(',', '.'));
    try {
      const res = await fetch(OPERATOR_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_code: cardInfo.card_code, quantity: qty }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`Отпущено ${qty.toFixed(3)} л. Остаток: ${data.new_balance.toFixed(3)} л`);
        setTimeout(() => handleReset(), 4000);
      } else {
        setDispenseError(data.error || 'Ошибка списания');
        setStage('card');
      }
    } catch {
      setDispenseError('Ошибка соединения с сервером');
      setStage('card');
    } finally {
      setDispenseLoading(false);
    }
  };

  const handleReset = () => {
    setBarcode('');
    setCardInfo(null);
    setCardError('');
    setQuantity('');
    setDispenseError('');
    setSuccessMsg('');
    setStage('scan');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const qty = parseFloat(quantity.replace(',', '.'));
  const validQty = !isNaN(qty) && qty > 0;

  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-accent mb-8 text-center">Панель оператора</h1>
        <Card className="w-full max-w-sm border-2 border-accent shadow-xl bg-card/95">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-foreground font-medium">Логин</label>
                <Input
                  type="text"
                  placeholder="Введите логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="h-11 bg-input border-2 border-border focus:border-accent text-foreground"
                  autoFocus
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-foreground font-medium">Пароль</label>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-input border-2 border-border focus:border-accent text-foreground"
                  required
                />
              </div>
              {authError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
                  {authError}
                </div>
              )}
              <Button
                type="submit"
                disabled={authLoading}
                className="w-full h-11 font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {authLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/80">
        <h1 className="text-2xl font-bold text-accent tracking-wide">Панель оператора</h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-6"
        >
          <Icon name="LogOut" size={16} className="mr-2" />
          ВЫХОД
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">

        {stage === 'scan' && (
          <div className="w-full max-w-lg flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-center text-lg">
              Поднесите штрихкод карты к сканеру или введите код вручную
            </p>
            <form onSubmit={handleBarcodeSubmit} className="w-full flex flex-col gap-3">
              <Input
                ref={barcodeRef}
                type="text"
                placeholder="Сканируйте штрихкод карты..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="h-14 text-xl text-center bg-input border-2 border-accent focus:border-accent text-foreground font-mono tracking-widest"
                disabled={cardLoading}
                autoComplete="off"
              />
              {cardError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm text-center">
                  {cardError}
                </div>
              )}
              <Button
                type="submit"
                disabled={cardLoading || !barcode.trim()}
                className="h-12 font-bold text-lg bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {cardLoading ? 'Поиск...' : 'Найти карту'}
              </Button>
            </form>
          </div>
        )}

        {(stage === 'card' || stage === 'confirm') && cardInfo && (
          <div className="w-full max-w-lg flex flex-col gap-4">

            <Card className="border-2 border-accent bg-card shadow-lg">
              <CardContent className="pt-5 pb-4 grid grid-cols-2 gap-y-3 gap-x-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Номер карты</div>
                  <div className="font-mono text-xl font-bold text-accent">{cardInfo.card_code}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Клиент</div>
                  <div className="text-foreground font-medium">{cardInfo.client_name}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Вид топлива</div>
                  <div className="text-foreground font-medium">{cardInfo.fuel_type}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Баланс</div>
                  <div className="text-foreground font-bold text-lg">{cardInfo.balance_liters.toFixed(3)} л</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Дневной лимит</div>
                  <div className="text-foreground">
                    {cardInfo.daily_limit > 0 ? `${cardInfo.daily_limit.toFixed(3)} л` : 'без лимита'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Доступно</div>
                  <div className={`font-bold text-lg ${cardInfo.available_balance > 0 ? 'text-green-500' : 'text-destructive'}`}>
                    {cardInfo.available_balance.toFixed(3)} л
                  </div>
                </div>
              </CardContent>
            </Card>

            {successMsg ? (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500 text-green-500 text-center text-lg font-bold">
                <Icon name="CheckCircle" size={24} className="mx-auto mb-1" />
                {successMsg}
              </div>
            ) : stage === 'confirm' ? (
              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-lg bg-accent/10 border-2 border-accent text-foreground text-center text-lg font-semibold">
                  Отпустить <span className="text-accent font-bold">{parseFloat(quantity.replace(',', '.')).toFixed(3)} л</span> на карту{' '}
                  <span className="font-mono text-accent">{cardInfo.card_code}</span>?
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleConfirmYes}
                    disabled={dispenseLoading}
                    className="flex-1 h-12 font-bold text-lg bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {dispenseLoading ? 'Выполняется...' : 'Да, отпустить'}
                  </Button>
                  <Button
                    onClick={() => setStage('card')}
                    variant="outline"
                    disabled={dispenseLoading}
                    className="flex-1 h-12 font-bold text-lg border-2 border-border"
                  >
                    Нет
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground font-medium text-center">
                    Количество топлива для отпуска (литры)
                  </label>
                  <Input
                    ref={quantityRef}
                    type="text"
                    inputMode="decimal"
                    placeholder="0000.000"
                    value={quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^[\d]*[.,]?[\d]{0,3}$/.test(val) || val === '') {
                        setQuantity(val);
                        setDispenseError('');
                      }
                    }}
                    className="h-16 text-3xl text-center font-mono bg-input border-2 border-accent focus:border-accent text-foreground tracking-widest"
                    autoComplete="off"
                  />
                  {dispenseError && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm text-center">
                      {dispenseError}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleDispense}
                    disabled={!validQty}
                    className="flex-1 h-12 font-bold text-lg bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
                  >
                    <Icon name="Fuel" size={18} className="mr-2" />
                    Отпустить топливо
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 h-12 font-bold text-lg border-2 border-border"
                  >
                    <Icon name="X" size={18} className="mr-2" />
                    Отмена
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
