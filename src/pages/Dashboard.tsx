import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Activity, Bell, Database, LifeBuoy,
  Bot, CalendarCheck, AlertTriangle, TrendingUp,
  Plus, Clock, CheckCircle2, Calendar,
  MessageSquare, LogOut
} from "lucide-react";

const mockKPIs = [
  { label: "Automações Ativas", value: "12", icon: Bot, trend: "+3 este mês" },
  { label: "Consultas Agendadas", value: "148", icon: CalendarCheck, trend: "+22% vs mês anterior" },
  { label: "No-Shows Evitados", value: "34", icon: AlertTriangle, trend: "89% taxa de comparência" },
  { label: "Eficiência Operacional", value: "94%", icon: TrendingUp, trend: "+8pp vs mês anterior" },
];

const mockNotifications = [
  { id: 1, text: "Novo agendamento confirmado automaticamente — Maria Santos", time: "Há 5 min", read: false },
  { id: 2, text: "Relatório mensal de Fevereiro disponível", time: "Há 2h", read: false },
  { id: 3, text: "Lembrete anti-no-show enviado — João Pereira", time: "Há 4h", read: true },
  { id: 4, text: "Follow-up automático executado — 8 clientes contactados", time: "Ontem", read: true },
];

const mockTickets = [
  { id: "T-001", title: "Agente de agendamento não reconhece feriados", status: "open" as const, date: "2026-03-04" },
  { id: "T-002", title: "Relatório mensal com valores incorretos", status: "in_progress" as const, date: "2026-03-02" },
  { id: "T-003", title: "Integração WhatsApp intermitente", status: "resolved" as const, date: "2026-02-28" },
  { id: "T-004", title: "Configuração de horário de atendimento", status: "meeting" as const, date: "2026-02-25" },
];

const statusConfig = {
  open: { label: "Aberto", variant: "destructive" as const },
  in_progress: { label: "Em Progresso", variant: "default" as const },
  resolved: { label: "Resolvido", variant: "secondary" as const },
  meeting: { label: "Reunião Agendada", variant: "outline" as const },
};

type Tab = "overview" | "notifications" | "database" | "support";

const tabs = [
  { id: "overview" as Tab, label: "Visão Geral", icon: Activity },
  { id: "notifications" as Tab, label: "Notificações", icon: Bell },
  { id: "database" as Tab, label: "Base de Dados", icon: Database },
  { id: "support" as Tab, label: "Suporte", icon: LifeBuoy },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDesc, setNewTicketDesc] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("flowen_auth");
    navigate("/");
  };

  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setNewTicketTitle("");
    setNewTicketDesc("");
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Painel de Controlo</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo à sua área de cliente Flowen.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={16} /> Sair
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-secondary mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <FadeIn>
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
                {mockNotifications.slice(0, 3).map((n) => (
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
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <FadeIn>
            <div className="space-y-3">
              {mockNotifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl ${n.read ? "bg-card" : "bg-primary/5 border border-primary/20"}`}>
                  <Bell size={16} className={`mt-0.5 shrink-0 ${n.read ? "text-muted-foreground" : "text-primary"}`} />
                  <div className="flex-1">
                    <p className="text-sm">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Database */}
        {activeTab === "database" && (
          <FadeIn>
            <div className="gradient-border rounded-xl p-6 bg-card">
              <h3 className="font-display font-semibold mb-4">Base de Dados Pessoal</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Os seus dados, relatórios e métricas históricas. A integração com o backend 
                será ativada com o Lovable Cloud.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Relatórios", count: "24", icon: Database },
                  { label: "Clientes Registados", count: "312", icon: Activity },
                  { label: "Histórico de Ações", count: "1.847", icon: Clock },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted text-center">
                    <item.icon size={24} className="text-primary mx-auto mb-2" />
                    <p className="font-display text-2xl font-bold">{item.count}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Support */}
        {activeTab === "support" && (
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* New Ticket */}
              <div className="gradient-border rounded-xl p-6 bg-card">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Plus size={18} className="text-primary" /> Novo Ticket
                </h3>
                <form onSubmit={handleNewTicket} className="space-y-4">
                  <Input placeholder="Assunto do problema" value={newTicketTitle} onChange={e => setNewTicketTitle(e.target.value)} />
                  <Textarea placeholder="Descreva o problema em detalhe..." rows={4} value={newTicketDesc} onChange={e => setNewTicketDesc(e.target.value)} />
                  <Button variant="hero" type="submit" className="w-full">Submeter Ticket</Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3">
                  A IA tentará resolver automaticamente. Se não conseguir, será agendada uma reunião.
                </p>
              </div>

              {/* Ticket List */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="font-display font-semibold mb-2">Os Seus Tickets</h3>
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-mono">{ticket.id}</span>
                        <Badge variant={statusConfig[ticket.status].variant}>
                          {statusConfig[ticket.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{ticket.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Calendar size={12} className="inline mr-1" />{ticket.date}
                      </p>
                    </div>
                    {ticket.status === "meeting" && (
                      <CheckCircle2 size={20} className="text-primary shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
