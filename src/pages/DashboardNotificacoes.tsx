import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CreditCard, Bell, Settings } from "lucide-react";
import EmptyState from "@/components/EmptyState";

interface Notification {
  id: string | number;
  type: "escalacao" | "pagamento" | "sistema" | "plano_actualizado";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "escalacao", title: "Nova escalação", message: "Maria Santos enviou mensagem urgente sobre receita médica", time: "Há 10 min", read: false },
  { id: 2, type: "pagamento", title: "Pagamento confirmado", message: "Pagamento de €45 confirmado via MBway — Ana Silva", time: "Há 25 min", read: false },
  { id: 3, type: "sistema", title: "Atualização do sistema", message: "Nova versão do agente de agendamento disponível", time: "Há 1h", read: false },
  { id: 4, type: "escalacao", title: "Escalação resolvida", message: "João Costa — reclamação sobre faturação foi resolvida", time: "Há 2h", read: true },
  { id: 5, type: "pagamento", title: "Faturação em 3 dias", message: "Próxima faturação de €129 em 28 Abr", time: "Há 3h", read: true },
  { id: 6, type: "sistema", title: "Manutenção agendada", message: "Manutenção preventiva agendada para 15 Abr às 03:00", time: "Há 5h", read: true },
  { id: 7, type: "escalacao", title: "Nova escalação", message: "Carla Mendes — pedido de cancelamento urgente", time: "Ontem", read: true },
  { id: 8, type: "pagamento", title: "Pagamento falhado", message: "Tentativa de pagamento falhou — Pedro Reis", time: "Ontem", read: false },
  { id: 9, type: "sistema", title: "Relatório disponível", message: "Relatório mensal de Março já está disponível", time: "Há 2 dias", read: true },
  { id: 10, type: "escalacao", title: "Escalação resolvida", message: "Sofia Almeida — pedido de relatório resolvido automaticamente", time: "Há 3 dias", read: true },
];

const iconMap = {
  escalacao: AlertTriangle,
  pagamento: CreditCard,
  sistema: Settings,
  plano_actualizado: Bell,
};

export default function DashboardNotificacoes() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [tab, setTab] = useState("todas");

  // Load localStorage notifications for this client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cliente_notificacoes_1");
      if (stored) {
        const parsed = JSON.parse(stored) as Array<{
          id: string; tipo: string; titulo: string; mensagem: string; lida: boolean; data: string;
        }>;
        const extra: Notification[] = parsed.map(n => ({
          id: n.id,
          type: (n.tipo === "plano_actualizado" ? "plano_actualizado" : "sistema") as Notification["type"],
          title: n.titulo,
          message: n.mensagem,
          time: n.data,
          read: n.lida,
        }));
        setNotifications(prev => [...extra, ...prev]);
      }
    } catch { /* ignore */ }
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = tab === "todas" ? notifications : notifications.filter(n => {
    if (tab === "escalacoes") return n.type === "escalacao";
    if (tab === "pagamentos") return n.type === "pagamento";
    return n.type === "sistema" || n.type === "plano_actualizado";
  });

  return (
    <FadeIn>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">Notificações</h2>
        <Button variant="outline" size="sm" onClick={markAllRead}>
          <Bell size={14} /> Marcar todas como lidas
        </Button>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="escalacoes">Escalações</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <EmptyState icon={Bell} title="Nenhuma notificação" description="Estás a par de tudo. Novas notificações aparecerão aqui." />
          ) : (
          <div className="space-y-2">
            {filtered.map(n => {
              const Icon = iconMap[n.type];
              return (
                <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${n.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${n.type === "escalacao" ? "bg-amber-500/10" : n.type === "pagamento" ? "bg-emerald-500/10" : "bg-primary/10"}`}>
                    <Icon size={16} className={n.type === "escalacao" ? "text-amber-400" : n.type === "pagamento" ? "text-emerald-400" : "text-primary"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                </div>
              );
            })}
          </div>
          )}
        </TabsContent>
      </Tabs>
    </FadeIn>
  );
}
