import FadeIn from "@/components/FadeIn";
import {
  Bot, CalendarCheck, AlertTriangle, TrendingUp, MessageSquare,
} from "lucide-react";

const mockKPIs = [
  { label: "Automações Ativas", value: "12", icon: Bot, trend: "+3 este mês" },
  { label: "Consultas Agendadas", value: "148", icon: CalendarCheck, trend: "+22% vs mês anterior" },
  { label: "No-Shows Evitados", value: "34", icon: AlertTriangle, trend: "89% taxa de comparência" },
  { label: "Eficiência Operacional", value: "94%", icon: TrendingUp, trend: "+8pp vs mês anterior" },
];

const mockActivity = [
  { id: 1, text: "Novo agendamento confirmado automaticamente — Maria Santos", time: "Há 5 min" },
  { id: 2, text: "Relatório mensal de Fevereiro disponível", time: "Há 2h" },
  { id: 3, text: "Follow-up automático executado — 8 clientes contactados", time: "Ontem" },
];

export default function DashboardOverview() {
  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Visão Geral</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockKPIs.map((kpi, i) => (
          <div key={i} className="gradient-border rounded-xl p-6 bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <kpi.icon size={20} className="text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{kpi.label}</span>
            </div>
            <p className="font-display text-3xl font-bold mb-1">{kpi.value}</p>
            <p className="text-xs text-primary">{kpi.trend}</p>
          </div>
        ))}
      </div>
      <div className="gradient-border rounded-xl p-6 bg-card">
        <h3 className="font-display font-semibold mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {mockActivity.map((n) => (
            <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <MessageSquare size={16} className="text-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{n.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
