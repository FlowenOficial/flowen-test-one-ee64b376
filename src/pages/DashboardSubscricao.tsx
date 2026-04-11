import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePlan, PLAN_LABELS } from "@/contexts/PlanContext";
import { CreditCard } from "lucide-react";

const payments = [
  { mes: "Março 2026", valor: "€129", estado: "Pago", fatura: "#F-2026-03" },
  { mes: "Fevereiro 2026", valor: "€129", estado: "Pago", fatura: "#F-2026-02" },
  { mes: "Janeiro 2026", valor: "€129", estado: "Pago", fatura: "#F-2026-01" },
  { mes: "Dezembro 2025", valor: "€129", estado: "Pago", fatura: "#F-2025-12" },
];

export default function DashboardSubscricao() {
  const { currentPlan } = usePlan();

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Subscrição</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="gradient-border rounded-xl p-6 bg-card space-y-4">
          <h3 className="font-display font-semibold">Plano Atual</h3>
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30">{PLAN_LABELS[currentPlan]}</Badge>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Ativo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Próxima faturação: <span className="text-foreground font-medium">28 Abr 2025 — €129</span></p>
          {currentPlan === "prime" && (
            <Button variant="hero" size="sm" disabled>Upgrade para Scale</Button>
          )}
          {currentPlan === "scale" && (
            <Button variant="hero" size="sm" disabled>Upgrade para Executive</Button>
          )}
        </div>
        <div className="gradient-border rounded-xl p-6 bg-card space-y-4">
          <h3 className="font-display font-semibold">Método de Pagamento</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <CreditCard size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Visa · Expira 12/27</p>
            </div>
          </div>
          <Button variant="outline" size="sm" disabled>Gerir Pagamento</Button>
        </div>
      </div>

      <div className="gradient-border rounded-xl bg-card overflow-x-auto">
        <h3 className="font-display font-semibold p-6 pb-0">Histórico de Pagamentos</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-left">
              <th className="p-4 font-medium">Mês</th>
              <th className="p-4 font-medium">Valor</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium">Fatura</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="p-4">{p.mes}</td>
                <td className="p-4">{p.valor}</td>
                <td className="p-4">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">{p.estado}</Badge>
                </td>
                <td className="p-4">
                  <Button variant="link" size="sm" className="p-0 h-auto" disabled>Ver fatura</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FadeIn>
  );
}
