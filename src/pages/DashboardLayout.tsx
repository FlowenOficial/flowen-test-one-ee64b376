import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PlanIndicator from "@/components/dashboard/PlanIndicator";
import { Button } from "@/components/ui/button";
import { LogOut, Bell } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const mockNotifications = [
  { emoji: "🚨", text: "Nova escalação — Maria Santos enviou mensagem" },
  { emoji: "📅", text: "Agendamento confirmado — João Ferreira, amanhã 14h" },
  { emoji: "💳", text: "Faturação em 3 dias — €129 em 28 Abr" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [notifCount] = useState(3);

  const handleLogout = () => {
    localStorage.removeItem("flowen_auth");
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full pt-16">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-4 border-b border-border px-4">
            <SidebarTrigger />
            <div className="flex-1">
              <PlanIndicator />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={18} />
                  {notifCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                      {notifCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {mockNotifications.map((n, i) => (
                  <DropdownMenuItem key={i} className="py-3">
                    <span className="mr-2">{n.emoji}</span>
                    <span className="text-sm">{n.text}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/notificacoes" className="text-sm text-primary justify-center">
                    Ver todas as notificações
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} /> Sair
            </Button>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
