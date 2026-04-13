import { ReactNode, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";

const cStyle = { background: "hsl(220,30%,8%)", border: "1px solid hsl(220,20%,18%)", borderRadius: 8 };

/* ─── Trend Chart ─── */
const TrendChart = ({ data, label }: { data: { day: string; value: number }[]; label: string }) => (
  <div className="mt-6">
    <h4 className="text-sm font-medium text-muted-foreground mb-3">{label}</h4>
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs><linearGradient id="trendG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(216,100%,56%)" stopOpacity={0.3}/><stop offset="100%" stopColor="hsl(216,100%,56%)" stopOpacity={0}/></linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" />
          <XAxis dataKey="day" stroke="hsl(215,15%,60%)" fontSize={10} interval={4} />
          <YAxis stroke="hsl(215,15%,60%)" fontSize={10} />
          <Tooltip contentStyle={cStyle} />
          <Area type="monotone" dataKey="value" stroke="hsl(216,100%,56%)" strokeWidth={2} fill="url(#trendG)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const td = (vals: number[]) => vals.map((v, i) => ({ day: `${i + 1}`, value: v }));
const t_atend = td([42,38,45,50,47,52,48,44,39,55,51,46,43,49,53,47,41,56,50,44,48,52,45,39,54,47,51,43,48,47]);
const t_agend = td([5,7,4,8,6,9,3,7,5,10,8,4,6,11,7,5,9,6,8,4,12,7,5,9,6,3,8,10,7,8]);
const t_lemb = td([10,14,12,16,11,18,13,15,9,17,14,12,19,11,16,13,20,15,12,18,10,14,16,11,19,13,17,12,15,12]);
const t_prior = td([1,3,0,2,4,1,3,2,0,5,1,2,3,0,4,1,2,3,1,0,5,2,3,1,4,0,2,3,1,3]);
const t_follow = td([4,6,3,7,5,8,2,6,4,9,5,3,7,4,8,3,6,5,9,2,7,4,6,3,10,5,8,4,6,6]);
const t_cham = td([2,4,1,5,3,6,2,4,1,7,3,2,5,1,6,3,4,2,8,1,5,3,4,2,7,1,5,3,4,5]);

/* ─── helpers ─── */
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; cls: string }> = {
    respondido: { label: "Respondido", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    escalado: { label: "Escalado", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    confirmado: { label: "Confirmado", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    pendente: { label: "Pendente", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    resolvido: { label: "Resolvido", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    pago: { label: "Pago", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    transferido: { label: "Transferido", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    enviado: { label: "Enviado", cls: "bg-primary/20 text-primary border-primary/30" },
  };
  const m = map[status] || { label: status, cls: "bg-muted text-muted-foreground" };
  return <Badge className={`text-[10px] ${m.cls}`}>{m.label}</Badge>;
};

const KPIRow = ({ items }: { items: { label: string; value: string }[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    {items.map((s, i) => (
      <div key={i} className="p-4 rounded-lg bg-muted text-center">
        <p className="font-display text-2xl font-bold">{s.value}</p>
        <p className="text-xs text-muted-foreground">{s.label}</p>
      </div>
    ))}
  </div>
);

const ActivityList = ({ items }: { items: { text: string; time: string; status?: string }[] }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-muted-foreground">Atividade Recente</h4>
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
        <p className="text-sm flex-1">{item.text}</p>
        <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
        {item.status && <StatusBadge status={item.status} />}
      </div>
    ))}
  </div>
);

const StatusCard = ({ text, sub }: { text: string; sub: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center relative">
      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
      <span className="absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
    </div>
    <div>
      <p className="font-display font-semibold">{text}</p>
      <p className="text-xs text-primary">● {sub}</p>
    </div>
  </div>
);

interface FeatureContentDef {
  statusTitle: string;
  statusSub: string;
  kpis: { label: string; value: string }[];
  render: () => ReactNode;
}

const atendimento: FeatureContentDef = {
  statusTitle: "Agente Ativo", statusSub: "A funcionar — última ação há 2 min",
  kpis: [{ label: "Mensagens Respondidas Hoje", value: "47" }, { label: "Esta Semana", value: "312" }, { label: "Taxa de Resposta", value: "99%" }],
  render: () => (
    <>
      <ActivityList items={[
        { text: "Mensagem respondida automaticamente — Ana Silva", time: "Há 3 min", status: "respondido" },
        { text: "Mensagem escalada para humano — João Costa", time: "Há 15 min", status: "escalado" },
        { text: "Mensagem respondida automaticamente — Maria Santos", time: "Há 22 min", status: "respondido" },
        { text: "Mensagem respondida automaticamente — Pedro Ferreira", time: "Há 45 min", status: "respondido" },
        { text: "Mensagem respondida automaticamente — Carla Mendes", time: "Há 1h", status: "respondido" },
      ]} />
      <div className="mt-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Últimas Conversas</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-muted-foreground text-left">
              <th className="pb-2 font-medium">Paciente</th><th className="pb-2 font-medium">Hora</th><th className="pb-2 font-medium">Duração</th><th className="pb-2 font-medium">Estado</th>
            </tr></thead>
            <tbody>
              {[{ p: "Ana Silva", h: "14:32", d: "2 min", s: "respondido" }, { p: "João Costa", h: "14:18", d: "5 min", s: "escalado" }, { p: "Maria Santos", h: "14:10", d: "1 min", s: "respondido" }, { p: "Pedro Ferreira", h: "13:47", d: "3 min", s: "respondido" }, { p: "Carla Mendes", h: "13:22", d: "2 min", s: "respondido" }].map((r, i) => (
                <tr key={i} className="border-b border-border/50"><td className="py-2">{r.p}</td><td className="py-2">{r.h}</td><td className="py-2">{r.d}</td><td className="py-2"><StatusBadge status={r.s} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TrendChart data={t_atend} label="Mensagens Respondidas — Últimos 30 Dias" />
    </>
  ),
};

const agendamento: FeatureContentDef = {
  statusTitle: "Agente Ativo", statusSub: "A funcionar — último agendamento há 8 min",
  kpis: [{ label: "Agendamentos Hoje", value: "8" }, { label: "Esta Semana", value: "34" }, { label: "Taxa de Confirmação", value: "94%" }],
  render: () => {
    const days = ["Seg", "Ter", "Qua", "Qui", "Sex"]; const slots = [3, 5, 2, 4, 6];
    return (
      <>
        <ActivityList items={[
          { text: "Agendamento criado — Ana Silva, Consulta Geral, 15:00", time: "Há 8 min", status: "confirmado" },
          { text: "Agendamento criado — Pedro Reis, Fisioterapia, 10:30", time: "Há 25 min", status: "confirmado" },
          { text: "Agendamento criado — Marta Lopes, Nutrição, 14:00", time: "Há 1h", status: "pendente" },
          { text: "Agendamento criado — João Costa, Psicologia, 16:30", time: "Há 2h", status: "confirmado" },
          { text: "Agendamento criado — Sofia Almeida, Consulta Geral, 09:00", time: "Há 3h", status: "confirmado" },
        ]} />
        <div className="mt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Calendário Semanal</h4>
          <div className="grid grid-cols-5 gap-2">
            {days.map((d, i) => (
              <div key={d} className="text-center">
                <p className="text-xs text-muted-foreground mb-2">{d}</p>
                <div className="bg-muted rounded-lg p-3 space-y-1">
                  {Array.from({ length: slots[i] }).map((_, j) => (<div key={j} className="w-2 h-2 rounded-full bg-primary mx-auto" />))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{slots[i]}</p>
              </div>
            ))}
          </div>
        </div>
        <TrendChart data={t_agend} label="Agendamentos — Últimos 30 Dias" />
      </>
    );
  },
};

const LembretesRender = () => {
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => { const t = setTimeout(() => setProgressValue(88), 100); return () => clearTimeout(t); }, []);
  return (
    <>
      <ActivityList items={[
        { text: "Lembrete enviado via WhatsApp — Ana Silva, consulta às 15:00", time: "Há 12 min", status: "enviado" },
        { text: "Lembrete enviado via WhatsApp — Pedro Reis, consulta às 10:30", time: "Há 30 min", status: "enviado" },
        { text: "Lembrete enviado via WhatsApp — Marta Lopes, consulta às 14:00", time: "Há 1h", status: "enviado" },
        { text: "Lembrete enviado via WhatsApp — João Costa, consulta às 16:30", time: "Há 2h", status: "enviado" },
        { text: "Lembrete enviado via WhatsApp — Sofia Almeida, consulta às 09:00", time: "Há 3h", status: "enviado" },
      ]} />
      <div className="mt-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">No-Shows Evitados Este Mês</h4>
        <div className="p-4 rounded-lg bg-muted">
          <div className="flex justify-between text-sm mb-2"><span>23 de 26 consultas compareceram</span><span className="text-primary font-semibold">88%</span></div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${progressValue}%` }} /></div>
        </div>
      </div>
      <TrendChart data={t_lemb} label="Lembretes Enviados — Últimos 30 Dias" />
    </>
  );
};

const lembretes: FeatureContentDef = {
  statusTitle: "Agente Ativo", statusSub: "A funcionar — último lembrete há 12 min",
  kpis: [{ label: "Lembretes Enviados Hoje", value: "12" }, { label: "Esta Semana", value: "67" }, { label: "Taxa de Comparência", value: "89%" }],
  render: () => <LembretesRender />,
};

const relatorios: FeatureContentDef = {
  statusTitle: "Relatório de Março disponível", statusSub: "Gerado automaticamente em 01/04/2026",
  kpis: [{ label: "Consultas no Mês", value: "142" }, { label: "Taxa Média de Comparência", value: "87%" }, { label: "Receita Estimada", value: "€4.260" }],
  render: () => {
    const weekData = [{ name: "Sem 1", consultas: 32 }, { name: "Sem 2", consultas: 38 }, { name: "Sem 3", consultas: 35 }, { name: "Sem 4", consultas: 37 }];
    return (
      <>
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground">Relatórios Disponíveis</h4>
          {["Março 2026", "Fevereiro 2026", "Janeiro 2026"].map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"><span className="text-sm">{m}</span><Button variant="outline" size="sm" disabled>Ver Relatório</Button></div>
          ))}
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Consultas por Semana — Março</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" /><XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={12} /><YAxis stroke="hsl(215,15%,60%)" fontSize={12} /><Tooltip contentStyle={cStyle} /><Bar dataKey="consultas" fill="hsl(216,100%,56%)" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
  },
};

const PrioridadeRender = () => {
  const [tab, setTab] = useState("todos");
  const alerts = [
    { p: "Maria Santos", desc: "Dor torácica intensa", time: "Há 10 min", status: "pendente" },
    { p: "João Costa", desc: "Febre alta persistente", time: "Há 25 min", status: "resolvido" },
    { p: "Ana Silva", desc: "Reação alérgica grave", time: "Há 1h", status: "resolvido" },
    { p: "Pedro Reis", desc: "Queda com suspeita de fratura", time: "Há 2h", status: "pendente" },
    { p: "Carla Mendes", desc: "Tonturas recorrentes", time: "Há 3h", status: "resolvido" },
  ];
  const filtered = tab === "todos" ? alerts : alerts.filter(a => a.status === (tab === "pendentes" ? "pendente" : "resolvido"));
  return (
    <>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList><TabsTrigger value="todos">Todos</TabsTrigger><TabsTrigger value="pendentes">Pendentes</TabsTrigger><TabsTrigger value="resolvidos">Resolvidos</TabsTrigger></TabsList>
        <TabsContent value={tab}>
          <div className="space-y-3 mt-4">
            {filtered.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium">{a.p}</p><p className="text-xs text-muted-foreground">{a.desc}</p></div>
                <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <TrendChart data={t_prior} label="Urgências Detectadas — Últimos 30 Dias" />
    </>
  );
};

const prioridade: FeatureContentDef = {
  statusTitle: "Agente Ativo", statusSub: "Triagem em tempo real",
  kpis: [{ label: "Urgências Detectadas Hoje", value: "3" }, { label: "Esta Semana", value: "11" }, { label: "Tempo Médio de Resposta", value: "2 min" }],
  render: () => <PrioridadeRender />,
};

const followup: FeatureContentDef = {
  statusTitle: "Agente Ativo", statusSub: "Follow-ups automáticos",
  kpis: [{ label: "Follow-ups Enviados Hoje", value: "6" }, { label: "Esta Semana", value: "28" }, { label: "Taxa de Retenção", value: "91%" }],
  render: () => {
    const timeline = [{ label: "D+1 Pós-Consulta", done: true }, { label: "D+30 Reengagement", done: true }, { label: "D+90 Reengagement", done: false }];
    return (
      <>
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Sequência de Follow-Up</h4>
          <div className="flex items-center gap-2">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${t.done ? "bg-emerald-500/20 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{t.done ? "✓" : "—"}</div>
                <span className="text-xs">{t.label}</span>
                {i < timeline.length - 1 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
        <ActivityList items={[
          { text: "Follow-up pós-consulta enviado — Ana Silva", time: "Há 1h", status: "enviado" },
          { text: "Reengagement D+30 — Pedro Reis", time: "Há 3h", status: "enviado" },
          { text: "Follow-up pós-consulta enviado — Maria Santos", time: "Há 5h", status: "enviado" },
          { text: "Reengagement D+90 — João Costa", time: "Ontem", status: "enviado" },
          { text: "Follow-up pós-consulta enviado — Carla Mendes", time: "Ontem", status: "enviado" },
        ]} />
        <TrendChart data={t_follow} label="Follow-ups Enviados — Últimos 30 Dias" />
      </>
    );
  },
};

const secChamadas: FeatureContentDef = {
  statusTitle: "Secretária V3", statusSub: "Chamadas ativas",
  kpis: [{ label: "Chamadas Hoje", value: "5" }, { label: "Esta Semana", value: "19" }, { label: "Resolvidas pela IA", value: "84%" }],
  render: () => (
    <>
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Chamadas Recentes</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-muted-foreground text-left"><th className="pb-2 font-medium">Hora</th><th className="pb-2 font-medium">Duração</th><th className="pb-2 font-medium">Resultado</th></tr></thead>
            <tbody>
              {[{ h: "14:45", d: "3:20", r: "resolvido" }, { h: "13:12", d: "1:45", r: "resolvido" }, { h: "11:30", d: "5:10", r: "transferido" }, { h: "10:05", d: "2:30", r: "resolvido" }, { h: "09:22", d: "4:15", r: "resolvido" }].map((r, i) => (
                <tr key={i} className="border-b border-border/50"><td className="py-2">{r.h}</td><td className="py-2">{r.d}</td><td className="py-2"><StatusBadge status={r.r} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TrendChart data={t_cham} label="Chamadas — Últimos 30 Dias" />
    </>
  ),
};

const secPagamentos: FeatureContentDef = {
  statusTitle: "Verificação de pagamentos ativa", statusSub: "Última verificação há 5 min",
  kpis: [{ label: "Verificações Hoje", value: "8" }, { label: "Esta Semana", value: "34" }, { label: "Taxa de Sucesso", value: "96%" }],
  render: () => (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Verificações Recentes</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-muted-foreground text-left"><th className="pb-2 font-medium">Paciente</th><th className="pb-2 font-medium">Valor</th><th className="pb-2 font-medium">Método</th><th className="pb-2 font-medium">Estado</th></tr></thead>
          <tbody>
            {[{ p: "Ana Silva", v: "€45", m: "MBway", s: "confirmado" }, { p: "João Costa", v: "€60", m: "MBway", s: "confirmado" }, { p: "Maria Santos", v: "€45", m: "MBway", s: "pendente" }, { p: "Pedro Reis", v: "€75", m: "MBway", s: "confirmado" }, { p: "Carla Mendes", v: "€45", m: "MBway", s: "confirmado" }].map((r, i) => (
              <tr key={i} className="border-b border-border/50"><td className="py-2">{r.p}</td><td className="py-2">{r.v}</td><td className="py-2">{r.m}</td><td className="py-2"><StatusBadge status={r.s} /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

const secCalendar: FeatureContentDef = {
  statusTitle: "Calendário sincronizado", statusSub: "Sem conflitos",
  kpis: [{ label: "Conflitos Evitados Esta Semana", value: "7" }, { label: "Consultas Agendadas Esta Semana", value: "34" }, { label: "Ocupação", value: "78%" }],
  render: () => {
    const hours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
    const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
    const filled: Record<string, string[]> = { Seg: ["09:00", "11:00", "15:00"], Ter: ["10:00", "14:00", "16:00"], Qua: ["09:00", "10:00", "11:00", "15:00"], Qui: ["14:00", "16:00", "17:00"], Sex: ["09:00", "11:00"] };
    return (
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Vista Semanal</h4>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-1 min-w-[400px]">
            <div />
            {days.map(d => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>)}
            {hours.map(h => (
              <div key={h} className="contents">
                <div className="text-xs text-muted-foreground py-1 text-right pr-2">{h}</div>
                {days.map(d => (<div key={`${d}-${h}`} className={`rounded h-6 ${filled[d]?.includes(h) ? "bg-primary/30" : "bg-muted/30"}`} />))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

const secLembretes: FeatureContentDef = {
  statusTitle: "Lembretes e follow-ups avançados ativos", statusSub: "Última sequência há 15 min",
  kpis: [{ label: "Enviados Hoje", value: "18" }, { label: "Esta Semana", value: "94" }, { label: "Taxa de Abertura", value: "87%" }],
  render: () => {
    const seq = [{ label: "D-2", done: true }, { label: "D-1", done: true }, { label: "D+1", done: true }, { label: "D+30", done: false }, { label: "D+90", done: false }];
    return (
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Sequência Automática</h4>
        <div className="flex items-center gap-1 flex-wrap mb-6">
          {seq.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${s.done ? "bg-emerald-500/20 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{s.label}</div>
              {i < seq.length - 1 && <div className="w-4 h-px bg-border" />}
            </div>
          ))}
        </div>
        <ActivityList items={[
          { text: "Lembrete D-2 enviado — Ana Silva", time: "Há 15 min", status: "enviado" },
          { text: "Lembrete D-1 enviado — João Costa", time: "Há 1h", status: "enviado" },
          { text: "Follow-up D+1 enviado — Maria Santos", time: "Há 3h", status: "enviado" },
          { text: "Follow-up D+30 agendado — Pedro Reis", time: "Amanhã", status: "pendente" },
        ]} />
      </div>
    );
  },
};

const SecEscalamentoRender = () => {
  const [tab, setTab] = useState("todos");
  const items = [
    { p: "Maria Santos", motivo: "Pedido de receita médica", time: "Há 20 min", status: "pendente" },
    { p: "João Costa", motivo: "Reclamação sobre faturação", time: "Há 1h", status: "resolvido" },
    { p: "Ana Silva", motivo: "Pedido de alteração de horário", time: "Há 2h", status: "resolvido" },
    { p: "Pedro Reis", motivo: "Dúvida sobre tratamento", time: "Há 3h", status: "resolvido" },
    { p: "Carla Mendes", motivo: "Cancelamento urgente", time: "Ontem", status: "pendente" },
  ];
  const filtered = tab === "todos" ? items : items.filter(a => a.status === (tab === "pendentes" ? "pendente" : "resolvido"));
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList><TabsTrigger value="todos">Todas</TabsTrigger><TabsTrigger value="pendentes">Pendentes</TabsTrigger><TabsTrigger value="resolvidos">Resolvidas</TabsTrigger></TabsList>
      <TabsContent value={tab}>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-muted-foreground text-left"><th className="pb-2 font-medium">Paciente</th><th className="pb-2 font-medium">Motivo</th><th className="pb-2 font-medium">Hora</th><th className="pb-2 font-medium">Estado</th><th className="pb-2" /></tr></thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b border-border/50"><td className="py-2">{r.p}</td><td className="py-2">{r.motivo}</td><td className="py-2">{r.time}</td><td className="py-2"><StatusBadge status={r.status} /></td><td className="py-2"><Button variant="ghost" size="sm" disabled>Ver</Button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

const secEscalamento: FeatureContentDef = {
  statusTitle: "Escalamento inteligente ativo", statusSub: "Última escalação há 20 min",
  kpis: [{ label: "Escalações Este Mês", value: "12" }, { label: "Resolvidas", value: "10" }, { label: "Tempo Médio de Resolução", value: "8 min" }],
  render: () => <SecEscalamentoRender />,
};

const secFinanceiro: FeatureContentDef = {
  statusTitle: "Relatórios financeiros automáticos", statusSub: "Atualizado há 1h",
  kpis: [{ label: "Receita Este Mês", value: "€5.840" }, { label: "vs Mês Anterior", value: "+12%" }, { label: "Consultas Faturadas", value: "67" }],
  render: () => {
    const monthData = [{ name: "Out", receita: 4200 }, { name: "Nov", receita: 4600 }, { name: "Dez", receita: 4100 }, { name: "Jan", receita: 4800 }, { name: "Fev", receita: 5200 }, { name: "Mar", receita: 5840 }];
    const tableData = [{ mes: "Março", consultas: 67, receita: "€5.840", crescimento: "+12%" }, { mes: "Fevereiro", consultas: 58, receita: "€5.200", crescimento: "+13%" }, { mes: "Janeiro", consultas: 52, receita: "€4.800", crescimento: "+17%" }, { mes: "Dezembro", consultas: 48, receita: "€4.100", crescimento: "-11%" }];
    return (
      <>
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Receita — Últimos 6 Meses</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" /><XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={12} /><YAxis stroke="hsl(215,15%,60%)" fontSize={12} /><Tooltip contentStyle={cStyle} /><Line type="monotone" dataKey="receita" stroke="hsl(216,100%,56%)" strokeWidth={2} dot={{ fill: "hsl(216,100%,56%)" }} /></LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-muted-foreground text-left"><th className="pb-2 font-medium">Mês</th><th className="pb-2 font-medium">Consultas</th><th className="pb-2 font-medium">Receita</th><th className="pb-2 font-medium">Crescimento</th></tr></thead>
            <tbody>
              {tableData.map((r, i) => (
                <tr key={i} className="border-b border-border/50"><td className="py-2">{r.mes}</td><td className="py-2">{r.consultas}</td><td className="py-2">{r.receita}</td><td className={`py-2 ${r.crescimento.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{r.crescimento}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  },
};

export const featureContentMap: Record<string, FeatureContentDef> = {
  atendimento, agendamento, lembretes, relatorios, prioridade, followup,
  "sec-chamadas": secChamadas, "sec-pagamentos": secPagamentos,
  "sec-calendar": secCalendar, "sec-lembretes": secLembretes,
  "sec-escalamento": secEscalamento, "sec-financeiro": secFinanceiro,
};

export { StatusCard, KPIRow };
