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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl flex flex-col space-y-8">
        <h1 className="md:text-6xl font-bold text-center text-accent drop-shadow-2xl tracking-tight text-4xl">
          СЕТЬ АВТОЗАПРАВОЧНЫХ СТАНЦИЙ
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-start">
            <img 
              src="https://cdn.poehali.dev/files/сеть азс 3.png" 
              alt="Сеть АЗС" 
              className="w-full h-auto max-w-lg"
            />
          </div>

          <div className="flex justify-center md:justify-end">
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
                  <Button 
                    type="submit" 
                    className="w-full h-11 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                  >
                    Войти
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}