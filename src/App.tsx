import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OperationsProvider } from "./contexts/OperationsContext";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CardOperations from "./pages/CardOperations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <OperationsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login onLogin={() => {}} />} />
              <Route path="/client" element={<ClientDashboard clientLogin="client" onLogout={() => window.location.href = '/'} />} />
              <Route path="/card-operations" element={<CardOperations />} />
              <Route path="/admin" element={<AdminDashboard onLogout={() => window.location.href = '/'} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </OperationsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;