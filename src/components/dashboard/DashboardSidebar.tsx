import { usePlan, FEATURES, PLAN_LABELS, PLAN_ORDER, isFeatureUnlocked, PlanTier } from "@/contexts/PlanContext";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import {
  Bot, CalendarCheck, BellRing, BarChart3, AlertTriangle,
  HeartHandshake, Phone, CreditCard, CalendarClock, Repeat,
  UserCheck, TrendingUp, Lock, Activity, LifeBuoy,
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

export default function DashboardSidebar() {
  const { currentPlan } = usePlan();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* General nav */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" end activeClassName="bg-sidebar-accent text-primary font-medium">
                    <Activity className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Visão Geral</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard/suporte" end activeClassName="bg-sidebar-accent text-primary font-medium">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Suporte</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
                    const Icon = iconMap[feature.icon] || Bot;
                    return (
                      <SidebarMenuItem key={feature.id}>
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
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
