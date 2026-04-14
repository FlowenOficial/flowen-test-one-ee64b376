import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NumberTicker } from "@/components/NumberTicker";
import { UserX, Calendar } from "lucide-react";
import { usePlan, isFeatureUnlocked } from "@/contexts/PlanContext";
import LockedFeaturePage from "@/components/dashboard/LockedFeaturePage";
import { FEATURES } from "@/contexts/PlanContext";

const pacientes30 = [
  { nome: "Ana Costa", telefone: "912 111 222", ultima: "10 Mar 2026", dias: 32, followups: 1 },
  { nome: "Rui Neves", telefone: "923 222 333", ultima: "05 Mar 2026", dias: 37, followups: 1 },
  { nome: "Filipa Serra", telefone: "934 333 444", ultima: "28 Fev 2026", dias: 42, followups: 2 },
  { nome: "Carlos Mota", telefone: "915 444 555", ultima: "20 Fev 2026", dias: 50, followups: 2 },
  { nome: "Beatriz Lima", telefone: "926 555 666", ultima: "15 Fev 2026", dias: 55, followups: 2 },
  { nome: "André Fonseca", telefone: "937 666 777", ultima: "10 Fev 2026", dias: 60, followups: 3 },
  { nome: "Joana Carvalho", telefone: "918 777 888", ultima: "01 Fev 2026", dias: 69, followups: 3 },
  { nome: "Miguel Sousa", telefone: "929 888 999", ultima: "25 Jan 2026", dias: 75, followups: 3 },
];

const pacientes90 = [
  { nome: "Teresa Antunes", telefone: "911 000 111", ultima: "10 Jan 2026", dias: 91, followups: 4 },
  { nome: "Gonçalo Pires", telefone: "922 111 222", ultima: "01 Jan 2026", dias: 100, followups: 4 },
  { nome: "Margarida Cruz", telefone: "933 222 333", ultima: "20 Dez 2025", dias: 112, followups: 5 },
];

const dummyFeature = FEATURES.find(f => f.id === "followup")!;

export default function DashboardRisco() {
  const { currentPlan } = usePlan();
  const [tab, setTab] = useState("30");

  if (!isFeatureUnlocked("scale", currentPlan)) {
    return <LockedFeaturePage feature={{ ...dummyFeature, label: "Pacientes em Risco", description: "Identifica pacientes inativos que precisam de atenção.", benefit: "Reduz a perda de pacientes com intervenção proativa." }} />;
  }

  const data = tab === "30" ? pacientes30 : pacientes90;

  return (
    <FadeIn>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-2xl font-bold">Pacientes em Risco</h2>
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">Requer atenção</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="gradient-border rounded-xl p-6 bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><UserX size={20} className="text-amber-400" /></div>
            <span className="text-sm text-muted-foreground">Inativos há 30+ dias</span>
          </div>
          <p className="font-display text-2xl font-bold"><NumberTicker value={8} /></p>
          <Badge className="text-[10px] mt-1 bg-amber-500/20 text-amber-400 border-amber-500/30">Atenção</Badge>
        </div>
        <div className="gradient-border rounded-xl p-6 bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center"><UserX size={20} className="text-red-400" /></div>
            <span className="text-sm text-muted-foreground">Inativos há 90+ dias</span>
          </div>
          <p className="font-display text-2xl font-bold"><NumberTicker value={3} /></p>
          <Badge className="text-[10px] mt-1 bg-red-500/20 text-red-400 border-red-500/30">Crítico</Badge>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="30">30+ dias</TabsTrigger>
          <TabsTrigger value="90">90+ dias</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          <div className="gradient-border rounded-xl bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="p-4 font-medium">Paciente</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Telefone</th>
                  <th className="p-4 font-medium">Última Consulta</th>
                  <th className="p-4 font-medium">Dias Inativo</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Follow-ups</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {data.map((p, i) => (
                  <tr key={i} className={`border-b border-border/50 ${tab === "90" ? "bg-red-500/5" : ""}`}>
                    <td className="p-4 font-medium">{p.nome}</td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{p.telefone}</td>
                    <td className="p-4 text-muted-foreground">{p.ultima}</td>
                    <td className="p-4">
                      <Badge className={`text-[10px] ${p.dias >= 90 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}>
                        {p.dias} dias
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{p.followups} enviado{p.followups !== 1 ? "s" : ""}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Calendar size={14} className="mr-1" /> Agendar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </FadeIn>
  );
}
