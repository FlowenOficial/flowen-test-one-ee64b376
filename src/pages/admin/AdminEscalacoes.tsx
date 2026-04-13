import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NumberTicker } from "@/components/NumberTicker";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { mockEscalacoes as initialData } from "./adminData";
import EmptyState from "@/components/EmptyState";
import { mockEscalacoes as initialData } from "./adminData";

const kpis = [
  { label: "Total Este Mês", value: 34, icon: AlertTriangle },
  { label: "Pendentes", value: 8, icon: Clock, badge: "bg-red-500/20 text-red-400 border-red-500/30", badgeText: "Atenção" },
  { label: "Resolvidas", value: 26, icon: CheckCircle2 },
];

export default function AdminEscalacoes() {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("todos");

  const markResolved = (id: number) => {
    setData(prev => prev.map(e => e.id === id ? { ...e, status: "resolvido" as const } : e));
  };

  const filtered = tab === "todos" ? data : data.filter(e => e.status === (tab === "pendentes" ? "pendente" : "resolvido"));

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Escalações</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {kpis.map((k, i) => (
          <div key={i} className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><k.icon size={20} className="text-primary" /></div>
              <span className="text-sm text-muted-foreground">{k.label}</span>
            </div>
            <p className="font-display text-2xl font-bold"><NumberTicker value={k.value} /></p>
            {k.badge && <Badge className={`text-[10px] mt-1 ${k.badge}`}>{k.badgeText}</Badge>}
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="resolvidas">Resolvidas</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <EmptyState icon={CheckCircle2} title="Nenhuma escalação encontrada" description="Não existem escalações para este filtro." />
          ) : (
          <div className="gradient-border rounded-xl bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="p-4 font-medium">Clínica</th>
                  <th className="p-4 font-medium">Paciente</th>
                  <th className="p-4 font-medium hidden md:table-cell">Motivo</th>
                  <th className="p-4 font-medium hidden md:table-cell">Data/Hora</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} className="border-b border-border/50">
                    <td className="p-4 font-medium">{e.clinica}</td>
                    <td className="p-4">{e.paciente}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{e.motivo}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{e.data}</td>
                    <td className="p-4">
                      <Badge className={`text-[10px] ${e.status === "resolvido" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}>
                        {e.status === "resolvido" ? "Resolvido" : "Pendente"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {e.status === "pendente" && (
                        <Button variant="outline" size="sm" onClick={() => markResolved(e.id)}>Marcar Resolvido</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </TabsContent>
      </Tabs>
    </FadeIn>
  );
}
