import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface LoginProps {
  onLogin: (login: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/9f5ff2f8-a6c2-489f-8a85-40f260bbac9e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        sessionStorage.removeItem('fromAdmin');
        
        if (data.user.admin) {
          navigate('/admin');
        } else {
          navigate('/client');
        }
      } else {
        setError(data.error || 'Ошибка авторизации');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col items-center px-8 pt-5 relative overflow-hidden">
      <div className="fixed bottom-8 right-8 z-50 animate-bounce">
        <div className="relative">
          <div className="text-6xl animate-pulse">🎄</div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <p className="text-accent font-bold text-lg drop-shadow-lg animate-pulse">
              С Новым Годом!
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="md:text-4xl font-bold text-center text-accent drop-shadow-2xl tracking-tight text-3xl">
          СЕТЬ АВТОЗАПРАВОЧНЫХ СТАНЦИЙ
        </h1>
        
        <div className="mt-[30px] flex justify-center">
          <img 
            src="https://cdn.poehali.dev/files/сеть азс 3.png" 
            alt="Сеть АЗС" 
            className="w-[80%] h-auto max-w-md"
          />
        </div>

        <div className="mt-[30px] flex justify-center w-full">
          <Card className="w-full max-w-md border-2 border-accent shadow-xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-foreground">Вход в кабинет</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login" className="text-foreground">Логин</Label>
                  <Input
                    id="login"
                    type="text"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="h-10 bg-input border-2 border-border focus:border-accent text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 bg-input border-2 border-border focus:border-accent text-foreground"
                    required
                  />
                </div>
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-11 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Вход...' : 'Войти'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}