import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Users, CreditCard, AlertTriangle, LogOut, Activity, AlertCircle } from "lucide-react";
import { mockClients } from "./adminData";

const links = [
  { to: "/admin", label: "Visão Geral", icon: LayoutDashboard, end: true },
  { to: "/admin/clientes", label: "Clientes", icon: Users, end: false },
  { to: "/admin/pagamentos", label: "Pagamentos", icon: CreditCard, end: true },
  { to: "/admin/escalacoes", label: "Escalações", icon: AlertTriangle, end: true },
  { to: "/admin/monitor", label: "Monitor", icon: Activity, end: true },
  { to: "/admin/triagens", label: "Triagens", icon: AlertCircle, end: true },
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
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <NavLink to={l.to} end={l.end} activeClassName="bg-sidebar-accent text-primary font-medium">
                            <l.icon className="mr-2 h-4 w-4" />
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">{l.label}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink to={l.to} end={l.end} activeClassName="bg-sidebar-accent text-primary font-medium">
                        <l.icon className="mr-2 h-4 w-4" />
                        <span>{l.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  // /admin → ["admin"]
  // /admin/clientes → ["admin", "clientes"]
  // /admin/clientes/3 → ["admin", "clientes", "3"]

  const crumbs: { label: string; to?: string }[] = [{ label: "Admin", to: "/admin" }];

  if (parts.length >= 2) {
    const section = parts[1];
    const labelMap: Record<string, string> = {
      clientes: "Clientes",
      pagamentos: "Pagamentos",
      escalacoes: "Escalações",
    };
    if (labelMap[section]) {
      crumbs.push({ label: labelMap[section], to: parts.length > 2 ? `/admin/${section}` : undefined });
    }
    if (parts.length >= 3 && section === "clientes") {
      const id = parseInt(parts[2]);
      const client = mockClients.find(c => c.id === id);
      crumbs.push({ label: client?.clinica || `Cliente ${id}` });
    }
  }

  return (
    <div className="text-sm flex items-center gap-1.5 px-4 py-1 border-b border-border/50">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted-foreground">→</span>}
          {c.to ? (
            <Link to={c.to} className="text-muted-foreground hover:text-foreground transition-colors">{c.label}</Link>
          ) : (
            <span className={i === crumbs.length - 1 ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    await signOut();
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
          <Breadcrumbs />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
