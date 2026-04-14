import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/NumberTicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import EmptyState from "@/components/EmptyState";

const kpis = [
  { label: "Total Este Mês", value: 34, icon: AlertCircle },
  { label: "Emergências", value: 3, icon: AlertTriangle, badge: "bg-red-500/20 text-red-400 border-red-500/30", badgeText: "Crítico" },
  { label: "Urgentes", value: 8, icon: AlertTriangle, badge: "bg-amber-500/20 text-amber-400 border-amber-500/30", badgeText: "Atenção" },
];

const chartData = [
  { name: "C. São João", emergencia: 0, urgente: 1, rotina: 2 },
  { name: "C. M. Lisboa", emergencia: 2, urgente: 3, rotina: 7 },
  { name: "Fisio Norte", emergencia: 0, urgente: 0, rotina: 1 },
  { name: "Dental Porto", emergencia: 0, urgente: 1, rotina: 1 },
  { name: "Nutri Saúde", emergencia: 0, urgente: 0, rotina: 0 },
  { name: "Psico Online", emergencia: 1, urgente: 1, rotina: 2 },
  { name: "Bem-Estar", emergencia: 0, urgente: 2, rotina: 3 },
  { name: "C. Algarve", emergencia: 0, urgente: 0, rotina: 0 },
];

const triagens = [
  { id: 1, clinica: "Centro Médico Lisboa", paciente: "Maria Santos", sintomas: "Dor torácica intensa", nivel: "emergencia" as const, pontuacao: 87, especialista: "Cardiologista", data: "12 Abr, 14:32" },
  { id: 2, clinica: "Centro Médico Lisboa", paciente: "João Costa", sintomas: "Febre alta persistente", nivel: "urgente" as const, pontuacao: 65, especialista: "Clínico Geral", data: "12 Abr, 13:15" },
  { id: 3, clinica: "Psicologia Online", paciente: "Ana Silva", sintomas: "Tonturas recorrentes", nivel: "urgente" as const, pontuacao: 58, especialista: "Neurologista", data: "11 Abr, 11:40" },
  { id: 4, clinica: "Clínica São João", paciente: "Pedro Reis", sintomas: "Dor nas costas crónica", nivel: "rotina" as const, pontuacao: 30, especialista: "Fisioterapeuta", data: "11 Abr, 09:22" },
  { id: 5, clinica: "Centro de Bem-Estar", paciente: "Carla Mendes", sintomas: "Insónia persistente", nivel: "rotina" as const, pontuacao: 25, especialista: "Psicólogo", data: "10 Abr, 16:05" },
  { id: 6, clinica: "Centro Médico Lisboa", paciente: "Sofia Almeida", sintomas: "Tosse persistente", nivel: "urgente" as const, pontuacao: 52, especialista: "Pneumologista", data: "10 Abr, 14:30" },
  { id: 7, clinica: "Clínica Dental Porto", paciente: "Ricardo Lopes", sintomas: "Dor de dente aguda", nivel: "urgente" as const, pontuacao: 60, especialista: "Dentista", data: "10 Abr, 10:15" },
  { id: 8, clinica: "Centro de Bem-Estar", paciente: "Marta Ferreira", sintomas: "Dor abdominal recorrente", nivel: "rotina" as const, pontuacao: 28, especialista: "Gastroenterologista", data: "09 Abr, 09:00" },
  { id: 9, clinica: "Psicologia Online", paciente: "Luís Nunes", sintomas: "Ataques de pânico", nivel: "urgente" as const, pontuacao: 68, especialista: "Psiquiatra", data: "09 Abr, 15:30" },
  { id: 10, clinica: "Centro Médico Lisboa", paciente: "Teresa Rocha", sintomas: "Palpitações cardíacas", nivel: "emergencia" as const, pontuacao: 82, especialista: "Cardiologista", data: "08 Abr, 16:50" },
  { id: 11, clinica: "Centro de Bem-Estar", paciente: "Bruno Dias", sintomas: "Dor muscular intensa", nivel: "urgente" as const, pontuacao: 45, especialista: "Fisioterapeuta", data: "08 Abr, 14:20" },
  { id: 12, clinica: "Clínica São João", paciente: "Inês Martins", sintomas: "Enxaquecas frequentes", nivel: "urgente" as const, pontuacao: 55, especialista: "Neurologista", data: "07 Abr, 11:00" },
  { id: 13, clinica: "Fisioterapia Norte", paciente: "Tiago Oliveira", sintomas: "Lesão no joelho", nivel: "rotina" as const, pontuacao: 32, especialista: "Ortopedista", data: "07 Abr, 09:30" },
  { id: 14, clinica: "Centro de Bem-Estar", paciente: "Filipa Sousa", sintomas: "Stress crónico", nivel: "urgente" as const, pontuacao: 48, especialista: "Psicólogo", data: "06 Abr, 10:15" },
  { id: 15, clinica: "Centro Médico Lisboa", paciente: "André Pereira", sintomas: "Falta de ar súbita", nivel: "emergencia" as const, pontuacao: 90, especialista: "Pneumologista", data: "06 Abr, 08:45" },
];

const nivelBadge = (n: string) =>
  n === "emergencia" ? "bg-red-500/20 text-red-400 border-red-500/30"
    : n === "urgente" ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

const nivelLabel = (n: string) =>
  n === "emergencia" ? "Emergência" : n === "urgente" ? "Urgente" : "Rotina";

const chartStyle = { background: "hsl(220,30%,8%)", border: "1px solid hsl(220,20%,18%)", borderRadius: 8 };

export default function AdminTriagens() {
  const [tab, setTab] = useState("todas");
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

      <div className="gradient-border rounded-xl p-6 bg-card mb-8">
        <h3 className="font-display font-semibold mb-4">Triagens por Nível de Urgência — Por Clínica</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" />
              <XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={11} />
              <YAxis stroke="hsl(215,15%,60%)" fontSize={12} />
              <Tooltip contentStyle={chartStyle} />
              <Legend />
              <Bar dataKey="emergencia" name="Emergência" fill="hsl(0,70%,50%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="urgente" name="Urgente" fill="hsl(38,92%,50%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="rotina" name="Rotina" fill="hsl(216,100%,56%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
                  <th className="p-4 font-medium">Clínica</th>
                  <th className="p-4 font-medium">Paciente</th>
                  <th className="p-4 font-medium hidden md:table-cell">Sintomas</th>
                  <th className="p-4 font-medium">Nível</th>
                  <th className="p-4 font-medium hidden md:table-cell">Pontuação</th>
                  <th className="p-4 font-medium hidden md:table-cell">Especialista</th>
                  <th className="p-4 font-medium hidden md:table-cell">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="border-b border-border/50">
                    <td className="p-4 font-medium">{t.clinica}</td>
                    <td className="p-4">{t.paciente}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{t.sintomas}</td>
                    <td className="p-4"><Badge className={`text-[10px] ${nivelBadge(t.nivel)}`}>{nivelLabel(t.nivel)}</Badge></td>
                    <td className="p-4 hidden md:table-cell">{t.pontuacao}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{t.especialista}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{t.data}</td>
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
