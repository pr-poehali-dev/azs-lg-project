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
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === 'admin' && password === 'admin123') {
      navigate('/admin');
    } else {
      navigate('/client');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold text-accent">СОЮЗ</h1>
            <p className="text-2xl text-foreground font-semibold">Сеть АЗС</p>
          </div>
          
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-64">
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-primary to-primary/80 rounded-t-lg shadow-2xl border-4 border-accent">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="Fuel" size={40} className="text-background" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                    <div className="text-accent font-bold text-lg">АЗС</div>
                    <div className="text-foreground text-sm">СОЮЗ</div>
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-32 bg-muted shadow-md"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-primary/40 backdrop-blur-sm border-2 border-accent flex items-center justify-center text-accent font-bold text-2xl shadow-xl rounded-lg">
                  СОЮЗ
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-4 border-accent shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-foreground">Вход в кабинет</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login" className="text-foreground text-lg">Логин</Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="Введите логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="h-12 text-lg bg-input border-2 border-border focus:border-accent text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground text-lg">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-lg bg-input border-2 border-border focus:border-accent text-foreground"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 text-xl font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
              >
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}