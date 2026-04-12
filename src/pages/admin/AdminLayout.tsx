import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Users, CreditCard, AlertTriangle, LogOut } from "lucide-react";

const links = [
  { to: "/admin", label: "Visão Geral", icon: LayoutDashboard, end: true },
  { to: "/admin/clientes", label: "Clientes", icon: Users, end: false },
  { to: "/admin/pagamentos", label: "Pagamentos", icon: CreditCard, end: true },
  { to: "/admin/escalacoes", label: "Escalações", icon: AlertTriangle, end: true },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            {!collapsed && <span className="font-display font-bold gradient-text">Flowen</span>}
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">Admin</Badge>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((l) => (
                <SidebarMenuItem key={l.to}>
                  <SidebarMenuButton asChild>
                    <NavLink to={l.to} end={l.end} activeClassName="bg-sidebar-accent text-primary font-medium">
                      <l.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{l.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("flowen_auth");
    localStorage.removeItem("adminMode");
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full pt-16">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-4 border-b border-border px-4">
            <SidebarTrigger />
            <span className="font-display font-bold text-lg">Painel Flowen</span>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">Admin</Badge>
            <div className="flex-1" />
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
