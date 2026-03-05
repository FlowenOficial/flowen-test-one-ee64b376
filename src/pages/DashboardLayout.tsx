import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PlanIndicator from "@/components/dashboard/PlanIndicator";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();

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
