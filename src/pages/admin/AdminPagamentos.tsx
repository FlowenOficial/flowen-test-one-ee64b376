import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NumberTicker } from "@/components/NumberTicker";
import { TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import { mockPagamentos } from "./adminData";

const kpis = [
  { label: "Receita Este Mês", value: 2748, prefix: "€", icon: TrendingUp },
  { label: "Pagamentos Bem-sucedidos", value: 22, icon: CheckCircle2 },
  { label: "Pagamentos Falhados", value: 2, icon: XCircle, badge: "bg-red-500/20 text-red-400 border-red-500/30", badgeText: "Atenção" },
];

export default function AdminPagamentos() {
  const [tab, setTab] = useState("todos");
  const filtered = tab === "todos" ? mockPagamentos : mockPagamentos.filter(p => {
    if (tab === "pagos") return p.estado === "Pago";
    if (tab === "falhados") return p.estado === "Falhado";
    return p.estado === "Pendente";
  });
  const total = filtered.reduce((acc, p) => acc + parseInt(p.valor.replace(/[^0-9]/g, "")), 0);

  const estadoBadge = (e: string) => {
    if (e === "Pago") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (e === "Falhado") return "bg-red-500/20 text-red-400 border-red-500/30";
    return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  };

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Pagamentos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {kpis.map((k, i) => (
          <div key={i} className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><k.icon size={20} className="text-primary" /></div>
              <span className="text-sm text-muted-foreground">{k.label}</span>
            </div>
            <p className="font-display text-2xl font-bold"><NumberTicker value={k.value} prefix={k.prefix} /></p>
            {k.badge && <Badge className={`text-[10px] mt-1 ${k.badge}`}>{k.badgeText}</Badge>}
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
          <TabsTrigger value="falhados">Falhados</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          <div className="gradient-border rounded-xl bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="p-4 font-medium">Clínica</th>
                  <th className="p-4 font-medium">Plano</th>
                  <th className="p-4 font-medium">Valor</th>
                  <th className="p-4 font-medium hidden md:table-cell">Data</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4 font-medium hidden md:table-cell">Método</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className={`border-b border-border/50 ${p.estado === "Falhado" ? "bg-red-500/5" : ""}`}>
                    <td className="p-4 font-medium">{p.clinica}</td>
                    <td className="p-4"><Badge className="text-[10px] bg-muted text-muted-foreground">{p.plano}</Badge></td>
                    <td className="p-4">{p.valor}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{p.data}</td>
                    <td className="p-4"><Badge className={`text-[10px] ${estadoBadge(p.estado)}`}>{p.estado}</Badge></td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{p.metodo}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border">
                  <td className="p-4 font-semibold" colSpan={2}>Total</td>
                  <td className="p-4 font-semibold" colSpan={4}>€{total.toLocaleString("pt-PT")}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </FadeIn>
  );
}
