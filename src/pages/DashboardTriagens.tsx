import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/NumberTicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Stethoscope, CheckCircle2 } from "lucide-react";
import { usePlan, isFeatureUnlocked, FEATURES } from "@/contexts/PlanContext";
import LockedFeaturePage from "@/components/dashboard/LockedFeaturePage";
import EmptyState from "@/components/EmptyState";

const dummyFeature = FEATURES.find(f => f.id === "prioridade")!;

const kpis = [
  { label: "Triagens Este Mês", value: 7, icon: Stethoscope },
  { label: "Urgentes", value: 2, icon: AlertTriangle, badge: "bg-amber-500/20 text-amber-400 border-amber-500/30", badgeText: "Atenção" },
  { label: "Emergências", value: 0, icon: CheckCircle2, badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", badgeText: "Tudo ok" },
];

const triagens = [
  { id: 1, paciente: "Maria Santos", sintomas: "Dor torácica intensa", nivel: "emergencia" as const, pontuacao: 87, especialista: "Cardiologista", data: "11 Abr, 14:32" },
  { id: 2, paciente: "João Costa", sintomas: "Febre alta persistente", nivel: "urgente" as const, pontuacao: 65, especialista: "Clínico Geral", data: "11 Abr, 13:15" },
  { id: 3, paciente: "Ana Silva", sintomas: "Tonturas recorrentes", nivel: "urgente" as const, pontuacao: 58, especialista: "Neurologista", data: "10 Abr, 11:40" },
  { id: 4, paciente: "Pedro Reis", sintomas: "Dor nas costas", nivel: "rotina" as const, pontuacao: 30, especialista: "Fisioterapeuta", data: "10 Abr, 09:22" },
  { id: 5, paciente: "Carla Mendes", sintomas: "Dificuldade em dormir", nivel: "rotina" as const, pontuacao: 25, especialista: "Psicólogo", data: "09 Abr, 16:05" },
  { id: 6, paciente: "Sofia Almeida", sintomas: "Tosse persistente", nivel: "rotina" as const, pontuacao: 35, especialista: "Clínico Geral", data: "08 Abr, 14:30" },
  { id: 7, paciente: "Ricardo Lopes", sintomas: "Ansiedade intensa", nivel: "urgente" as const, pontuacao: 62, especialista: "Psiquiatra", data: "07 Abr, 10:15" },
  { id: 8, paciente: "Marta Ferreira", sintomas: "Dor abdominal", nivel: "rotina" as const, pontuacao: 28, especialista: "Gastroenterologista", data: "06 Abr, 09:00" },
];

const nivelBadge = (n: string) =>
  n === "emergencia" ? "bg-red-500/20 text-red-400 border-red-500/30"
    : n === "urgente" ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

const nivelLabel = (n: string) =>
  n === "emergencia" ? "Emergência" : n === "urgente" ? "Urgente" : "Rotina";

export default function DashboardTriagens() {
  const { currentPlan } = usePlan();
  const [tab, setTab] = useState("todas");

  if (!isFeatureUnlocked("scale", currentPlan)) {
    return <LockedFeaturePage feature={{ ...dummyFeature, label: "Triagens", description: "Histórico de triagens automáticas da sua clínica.", benefit: "Casos urgentes nunca mais ficam esquecidos." }} />;
  }

  const filtered = tab === "todas" ? triagens : triagens.filter(t => t.nivel === tab);

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Triagens</h2>

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
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="emergencia">Emergência</TabsTrigger>
          <TabsTrigger value="urgente">Urgente</TabsTrigger>
          <TabsTrigger value="rotina">Rotina</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <EmptyState icon={CheckCircle2} title="Nenhuma triagem encontrada" description="Não existem triagens para este filtro." />
          ) : (
          <div className="gradient-border rounded-xl bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="p-4 font-medium">Paciente</th>
                  <th className="p-4 font-medium hidden md:table-cell">Sintomas</th>
                  <th className="p-4 font-medium">Nível</th>
                  <th className="p-4 font-medium hidden md:table-cell">Pontuação</th>
                  <th className="p-4 font-medium hidden md:table-cell">Especialista</th>
                  <th className="p-4 font-medium">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="border-b border-border/50">
                    <td className="p-4 font-medium">{t.paciente}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{t.sintomas}</td>
                    <td className="p-4"><Badge className={`text-[10px] ${nivelBadge(t.nivel)}`}>{nivelLabel(t.nivel)}</Badge></td>
                    <td className="p-4 hidden md:table-cell">{t.pontuacao}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{t.especialista}</td>
                    <td className="p-4 text-muted-foreground">{t.data}</td>
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
