import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard } from "lucide-react";
import { mockClients } from "./adminData";

const mockPayments = [
  { mes: "Março 2026", valor: "€199", estado: "Pago" },
  { mes: "Fevereiro 2026", valor: "€199", estado: "Pago" },
  { mes: "Janeiro 2026", valor: "€199", estado: "Pago" },
  { mes: "Dezembro 2025", valor: "€199", estado: "Pago" },
];

const mockEscalacoes = [
  { paciente: "Maria Santos", motivo: "Receita urgente", data: "12 Abr, 14:32", status: "pendente" },
  { paciente: "João Costa", motivo: "Faturação incorreta", data: "11 Abr, 13:15", status: "resolvido" },
  { paciente: "Ana Silva", motivo: "Alteração de horário", data: "10 Abr, 11:40", status: "resolvido" },
  { paciente: "Pedro Reis", motivo: "Dúvida tratamento", data: "09 Abr, 16:22", status: "resolvido" },
];

export default function AdminClienteDetalhe() {
  const { id } = useParams();
  const client = mockClients.find(c => c.id === Number(id));
  const [estado, setEstado] = useState(client?.estado || "Ativo");

  if (!client) return <div className="p-8 text-center text-muted-foreground">Cliente não encontrado.</div>;

  const planBadge = client.plano === "Executive" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : client.plano === "Scale" ? "bg-primary/20 text-primary border-primary/30" : "bg-muted text-muted-foreground";

  return (
    <FadeIn>
      <Link to="/admin/clientes">
        <Button variant="ghost" size="sm" className="mb-4"><ArrowLeft size={16} /> Voltar</Button>
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-2xl font-bold">{client.clinica}</h2>
        <Badge className={`text-[10px] ${planBadge}`}>{client.plano}</Badge>
        <Badge className={`text-[10px] ${estado === "Ativo" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>{estado}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="gradient-border rounded-xl p-6 bg-card space-y-3">
            <h3 className="font-display font-semibold">Informações</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-muted-foreground">Email:</span> {client.email}</p>
              <p><span className="text-muted-foreground">Telefone:</span> {client.telefone}</p>
              <p><span className="text-muted-foreground">Data de Adesão:</span> {client.dataAdesao}</p>
              <p><span className="text-muted-foreground">Plano:</span> {client.plano}</p>
            </div>
          </div>
          <div className="gradient-border rounded-xl p-6 bg-card space-y-3">
            <h3 className="font-display font-semibold">Subscrição</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-muted-foreground">Estado:</span> <Badge className={`text-[10px] ${estado === "Ativo" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>{estado}</Badge></p>
              <p><span className="text-muted-foreground">Próxima Faturação:</span> {client.proximaFaturacao}</p>
              <p><span className="text-muted-foreground">Valor:</span> €{client.plano === "Executive" ? "349" : client.plano === "Scale" ? "199" : "129"}</p>
              <div className="flex items-center gap-2 mt-2">
                <CreditCard size={16} className="text-muted-foreground" />
                <span>•••• •••• •••• 4242</span>
              </div>
            </div>
            <Button variant={estado === "Ativo" ? "destructive" : "hero"} size="sm" onClick={() => setEstado(e => e === "Ativo" ? "Suspenso" : "Ativo")}>
              {estado === "Ativo" ? "Suspender" : "Reativar"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gradient-border rounded-xl p-6 bg-card">
            <h3 className="font-display font-semibold mb-4">Escalações Recentes</h3>
            <div className="space-y-3">
              {mockEscalacoes.map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{e.paciente}</p>
                    <p className="text-xs text-muted-foreground">{e.motivo} · {e.data}</p>
                  </div>
                  <Badge className={`text-[10px] ${e.status === "resolvido" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}>
                    {e.status === "resolvido" ? "Resolvido" : "Pendente"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="gradient-border rounded-xl p-6 bg-card">
            <h3 className="font-display font-semibold mb-4">Histórico de Pagamentos</h3>
            <div className="space-y-3">
              {mockPayments.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="text-sm">{p.mes}</span>
                  <span className="text-sm font-medium">{p.valor}</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">{p.estado}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
