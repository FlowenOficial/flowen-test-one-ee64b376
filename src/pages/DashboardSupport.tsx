import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, CheckCircle2 } from "lucide-react";

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

export default function DashboardSupport() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle("");
    setDesc("");
  };

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Suporte</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="gradient-border rounded-xl p-6 bg-card">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Plus size={18} className="text-primary" /> Novo Ticket
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Assunto do problema" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Descreva o problema em detalhe..." rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Button variant="hero" type="submit" className="w-full">Submeter Ticket</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            A IA tentará resolver automaticamente. Se não conseguir, será agendada uma reunião.
          </p>
        </div>
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
  );
}
