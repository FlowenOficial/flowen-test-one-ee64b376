import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/NumberTicker";
import {
  CalendarCheck, AlertTriangle, TrendingUp, CreditCard,
  MessageSquare, Bell, Calendar, Heart, Bot,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const kpis = [
  { label: "Agendamentos Este Mês", value: 148, icon: CalendarCheck, trend: "+22%", trendColor: "text-emerald-400" },
  { label: "No-Shows Evitados", value: 34, icon: AlertTriangle, trend: "89% comparência", trendColor: "text-primary" },
  { label: "Escalações Pendentes", value: 3, icon: TrendingUp, badge: true, badgeColor: "bg-red-500/20 text-red-400 border-red-500/30", badgeText: "3 pendentes" },
  { label: "Próxima Faturação", value: 129, icon: CreditCard, isText: true, displayText: "28 Abr — €129", badge: true, badgeColor: "bg-primary/20 text-primary border-primary/30", badgeText: "Em 17 dias" },
];

const weeklyAppointments = [
  { name: "Sem 1", value: 16 }, { name: "Sem 2", value: 22 }, { name: "Sem 3", value: 19 },
  { name: "Sem 4", value: 25 }, { name: "Sem 5", value: 18 }, { name: "Sem 6", value: 21 },
  { name: "Sem 7", value: 14 }, { name: "Sem 8", value: 23 },
];

const weeklyAttendance = [
  { name: "Sem 1", value: 82 }, { name: "Sem 2", value: 86 }, { name: "Sem 3", value: 84 },
  { name: "Sem 4", value: 91 }, { name: "Sem 5", value: 88 }, { name: "Sem 6", value: 89 },
  { name: "Sem 7", value: 87 }, { name: "Sem 8", value: 92 },
];

interface Escalacao {
  id: number;
  paciente: string;
  hora: string;
  status: "pendente" | "resolvido";
}

const initialEscalacoes: Escalacao[] = [
  { id: 1, paciente: "Maria Santos", hora: "Há 10 min", status: "pendente" },
  { id: 2, paciente: "João Costa", hora: "Há 1h", status: "pendente" },
  { id: 3, paciente: "Ana Silva", hora: "Há 3h", status: "resolvido" },
  { id: 4, paciente: "Pedro Reis", hora: "Ontem", status: "pendente" },
];

const recentActivity = [
  { icon: Calendar, text: "Agendamento confirmado — Sofia Almeida, amanhã 14h", time: "Há 5 min" },
  { icon: Bell, text: "Lembrete enviado — Pedro Reis, consulta às 10:30", time: "Há 12 min" },
  { icon: Bot, text: "Mensagem respondida automaticamente — Ana Silva", time: "Há 20 min" },
  { icon: Heart, text: "Follow-up D+1 enviado — Carla Mendes", time: "Há 45 min" },
  { icon: Calendar, text: "Novo agendamento — João Costa, Fisioterapia", time: "Há 1h" },
  { icon: MessageSquare, text: "Escalação resolvida — Ricardo Lopes", time: "Há 2h" },
];

const chartTooltipStyle = { background: "hsl(220,30%,8%)", border: "1px solid hsl(220,20%,18%)", borderRadius: 8 };

export default function DashboardOverview() {
  const [escalacoes, setEscalacoes] = useState(initialEscalacoes);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  const markResolved = (id: number) => {
    setEscalacoes(prev => prev.map(e => e.id === id ? { ...e, status: "resolvido" } : e));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 rounded bg-muted animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Visão Geral</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <kpi.icon size={20} className="text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{kpi.label}</span>
            </div>
            <p className="font-display text-2xl font-bold mb-1">
              {kpi.isText ? kpi.displayText : <NumberTicker value={kpi.value} />}
            </p>
            {kpi.trend && <p className={`text-xs ${kpi.trendColor}`}>{kpi.trend}</p>}
            {kpi.badge && (
              <Badge className={`text-[10px] mt-1 ${kpi.badgeColor}`}>
                {kpi.badgeText}
              </Badge>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <h3 className="font-display font-semibold mb-4">Agendamentos por Semana</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAppointments}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" />
                <XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={12} />
                <YAxis stroke="hsl(215,15%,60%)" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="value" fill="hsl(216,100%,56%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <h3 className="font-display font-semibold mb-4">Taxa de Comparência (%)</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" />
                <XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={12} />
                <YAxis stroke="hsl(215,15%,60%)" fontSize={12} domain={[70, 100]} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="value" stroke="hsl(216,100%,56%)" strokeWidth={2} dot={{ fill: "hsl(216,100%,56%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <h3 className="font-display font-semibold mb-4">Últimas Escalações</h3>
          <div className="space-y-3">
            {escalacoes.map(e => (
              <div key={e.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{e.paciente}</p>
                  <p className="text-xs text-muted-foreground">{e.hora}</p>
                </div>
                <Badge className={`text-[10px] ${e.status === "resolvido" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}>
                  {e.status === "resolvido" ? "Resolvido" : "Pendente"}
                </Badge>
                {e.status === "pendente" && (
                  <Button variant="outline" size="sm" className="text-xs active:scale-95 transition-transform duration-100" onClick={() => markResolved(e.id)}>
                    Marcar Resolvido
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <h3 className="font-display font-semibold mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {recentActivity.map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                <n.icon size={16} className="text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
