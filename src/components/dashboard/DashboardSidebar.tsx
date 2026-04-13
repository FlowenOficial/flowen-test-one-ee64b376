import { useState } from "react";
import { usePlan, FEATURES, PLAN_LABELS, PLAN_ORDER, isFeatureUnlocked, PlanTier } from "@/contexts/PlanContext";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import {
  Bot, CalendarCheck, BellRing, BarChart3, AlertTriangle,
  HeartHandshake, Phone, CreditCard, CalendarClock, Repeat,
  UserCheck, TrendingUp, Lock, Activity, LifeBuoy, Calendar, Bell,
  Clock, Settings, FileText,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  bot: Bot, "calendar-check": CalendarCheck, "bell-ring": BellRing,
  "bar-chart-3": BarChart3, "alert-triangle": AlertTriangle,
  "heart-handshake": HeartHandshake, phone: Phone, "credit-card": CreditCard,
  "calendar-clock": CalendarClock, repeat: Repeat, "user-check": UserCheck,
  "trending-up": TrendingUp,
};

const tierGroupConfig: { tier: PlanTier; label: string; emoji: string }[] = [
  { tier: "prime", label: "PRIME — Organização Inicial", emoji: "📦" },
  { tier: "scale", label: "SCALE — Crescimento Estruturado", emoji: "📈" },
  { tier: "executive", label: "EXECUTIVE — Controlo Total", emoji: "👑" },
];

const tierBadgeClass: Record<string, string> = {
  scale: "bg-primary/20 text-primary border-primary/30 text-[10px] px-1.5 py-0",
  executive: "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-1.5 py-0",
};

function SidebarItemWithTooltip({ collapsed, label, children }: { collapsed: boolean; label: string; children: React.ReactNode }) {
  if (!collapsed) return <>{children}</>;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export default function DashboardSidebar() {
  const { currentPlan } = usePlan();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [execDialog, setExecDialog] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* General nav */}
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { to: "/dashboard", label: "Visão Geral", icon: Activity, end: true },
                  { to: "/dashboard/calendario", label: "Calendário", icon: Calendar, end: true },
                  { to: "/dashboard/relatorios", label: "Relatórios", icon: FileText, end: true },
                  { to: "/dashboard/suporte", label: "Suporte", icon: LifeBuoy, end: true },
                ].map(item => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarItemWithTooltip collapsed={collapsed} label={item.label}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.to} end={item.end} activeClassName="bg-sidebar-accent text-primary font-medium">
                          <item.icon className="mr-2 h-4 w-4" />
                          {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarItemWithTooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Feature tiers */}
          {tierGroupConfig.map(({ tier, label, emoji }) => {
            const features = FEATURES.filter((f) => f.tier === tier);
            return (
              <SidebarGroup key={tier}>
                <SidebarGroupLabel className="text-[11px] tracking-wider">
                  {!collapsed ? `${emoji} ${label}` : emoji}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {features.map((feature) => {
                      const unlocked = isFeatureUnlocked(feature.tier, currentPlan);
                      const isExec = feature.tier === "executive";
                      const Icon = iconMap[feature.icon] || Bot;

                      if (!unlocked && isExec) {
                        return (
                          <SidebarMenuItem key={feature.id}>
                            <SidebarItemWithTooltip collapsed={collapsed} label={`${feature.label} — Em Breve`}>
                              <SidebarMenuButton
                                className="opacity-40 cursor-pointer"
                                onClick={() => setExecDialog(true)}
                              >
                                <Icon className="mr-2 h-4 w-4 shrink-0" />
                                {!collapsed && (
                                  <span className="flex items-center gap-2 min-w-0">
                                    <span className="truncate text-sm">{feature.label}</span>
                                    <Clock size={12} className="shrink-0 text-amber-400" />
                                    <Badge className="shrink-0 bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-1.5 py-0">
                                      Em Breve
                                    </Badge>
                                  </span>
                                )}
                              </SidebarMenuButton>
                            </SidebarItemWithTooltip>
                          </SidebarMenuItem>
                        );
                      }

                      return (
                        <SidebarMenuItem key={feature.id}>
                          <SidebarItemWithTooltip collapsed={collapsed} label={feature.label}>
                            <SidebarMenuButton asChild>
                              <NavLink
                                to={`/dashboard/feature/${feature.id}`}
                                end
                                className={unlocked ? "" : "opacity-50"}
                                activeClassName="bg-sidebar-accent text-primary font-medium"
                              >
                                <Icon className="mr-2 h-4 w-4 shrink-0" />
                                {!collapsed && (
                                  <span className="flex items-center gap-2 min-w-0">
                                    <span className="truncate text-sm">{feature.label}</span>
                                    {!unlocked && <Lock size={12} className="shrink-0 text-muted-foreground" />}
                                    {!unlocked && (
                                      <Badge className={`shrink-0 ${tierBadgeClass[feature.tier] || ""}`}>
                                        {PLAN_LABELS[feature.tier]}
                                      </Badge>
                                    )}
                                  </span>
                                )}
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarItemWithTooltip>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}

          {/* Account section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] tracking-wider">
              {!collapsed ? "⚙️ Conta" : "⚙️"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { to: "/dashboard/escalacoes", label: "Escalações", icon: AlertTriangle },
                  { to: "/dashboard/subscricao", label: "Subscrição", icon: CreditCard },
                  { to: "/dashboard/notificacoes", label: "Notificações", icon: Bell },
                  { to: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
                ].map(item => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarItemWithTooltip collapsed={collapsed} label={item.label}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.to} end activeClassName="bg-sidebar-accent text-primary font-medium">
                          <item.icon className="mr-2 h-4 w-4" />
                          {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarItemWithTooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Executive "Em Breve" Dialog */}
      <Dialog open={execDialog} onOpenChange={setExecDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock size={32} className="text-amber-400" />
              </div>
            </div>
            <DialogTitle className="text-center">Plano Executive — Em Breve</DialogTitle>
            <DialogDescription className="text-center">
              Este plano está temporariamente indisponível. Estamos a preparar algo ainda melhor.
              Contacta-nos para ficares na lista de espera.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-center mt-4">
            <Button variant="outline" onClick={() => setExecDialog(false)}>Fechar</Button>
            <Link to="/contacto" onClick={() => setExecDialog(false)}>
              <Button variant="hero">Contactar</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
