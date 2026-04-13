import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import Index from "./pages/Index";
import Pacotes from "./pages/Pacotes";
import Sobre from "./pages/Sobre";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardSupport from "./pages/DashboardSupport";
import DashboardCalendario from "./pages/DashboardCalendario";
import DashboardEscalacoes from "./pages/DashboardEscalacoes";
import DashboardSubscricao from "./pages/DashboardSubscricao";
import DashboardNotificacoes from "./pages/DashboardNotificacoes";
import DashboardConfiguracoes from "./pages/DashboardConfiguracoes";
import DashboardRelatorios from "./pages/DashboardRelatorios";
import FeaturePage from "./components/dashboard/FeaturePage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminClientes from "./pages/admin/AdminClientes";
import AdminClienteDetalhe from "./pages/admin/AdminClienteDetalhe";
import AdminPagamentos from "./pages/admin/AdminPagamentos";
import AdminEscalacoes from "./pages/admin/AdminEscalacoes";
import NotFound from "./pages/NotFound";
import { PlanProvider } from "./contexts/PlanContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = localStorage.getItem("flowen_auth") === "true";
  if (!isAuth) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = localStorage.getItem("flowen_auth") === "true";
  const isAdmin = localStorage.getItem("adminMode") === "true";
  if (!isAuth || !isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      <Navbar />
      {children}
      {!isDashboard && !isAdmin && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlanProvider>
        <Toaster />
        <Sonner />
        <SplashScreen />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pacotes" element={<Pacotes />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<DashboardOverview />} />
                <Route path="suporte" element={<DashboardSupport />} />
                <Route path="calendario" element={<DashboardCalendario />} />
                <Route path="escalacoes" element={<DashboardEscalacoes />} />
                <Route path="subscricao" element={<DashboardSubscricao />} />
                <Route path="notificacoes" element={<DashboardNotificacoes />} />
                <Route path="configuracoes" element={<DashboardConfiguracoes />} />
                <Route path="relatorios" element={<DashboardRelatorios />} />
                <Route path="feature/:featureId" element={<FeaturePage />} />
              </Route>
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminOverview />} />
                <Route path="clientes" element={<AdminClientes />} />
                <Route path="clientes/:id" element={<AdminClienteDetalhe />} />
                <Route path="pagamentos" element={<AdminPagamentos />} />
                <Route path="escalacoes" element={<AdminEscalacoes />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PlanProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
