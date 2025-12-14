import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ login: string; role: 'client' | 'admin' } | null>(null);

  const handleLogin = (login: string, password: string) => {
    if (login === 'admin' && password === 'admin123') {
      setUser({ login: 'admin', role: 'admin' });
    } else {
      setUser({ login, role: 'client' });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : user.role === 'admin' ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <ClientDashboard clientLogin={user.login} onLogout={handleLogout} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;