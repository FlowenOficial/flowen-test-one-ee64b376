import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/NumberTicker";
import { Activity, Bot, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { mockClients } from "./adminData";

const kpis = [
  { label: "Agentes Ativos", value: 7, icon: Bot },
  { label: "Workflows com Erro", value: 0, icon: Activity, badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", badgeText: "Sem erros" },
  { label: "Follow-ups Hoje", value: 23, icon: Activity },
  { label: "Triagens Este Mês", value: 34, icon: AlertTriangle },
];

const monitorData = mockClients.map(c => ({
  clinica: c.clinica,
  agenteIA: c.estado === "Ativo",
  followups: c.plano !== "Prime" && c.estado === "Ativo",
  lembretes: c.estado === "Ativo",
  relatorio: c.id === 3 || c.id === 8 ? "Pendente" : c.estado === "Suspenso" ? "—" : "Gerado",
  triagens: c.estado === "Suspenso" ? 0 : [3, 12, 1, 2, 0, 4, 5, 0][c.id - 1] || 0,
}));

const alerts = [
  { icon: AlertTriangle, color: "text-amber-400", msg: "Nutri Saúde — Agente inativo (conta suspensa)", time: "Há 2 dias" },
  { icon: Info, color: "text-primary", msg: "Centro Médico Lisboa — Relatório de Março gerado com sucesso", time: "Há 3 horas" },
  { icon: CheckCircle2, color: "text-emerald-400", msg: "Todos os lembretes de amanhã foram enviados — 8 clínicas", time: "Há 30 min" },
];

export default function AdminMonitor() {
  return (
    <FadeIn>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-2xl font-bold">Monitor de Sistemas</h2>
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5 inline-block" />
          Em tempo real
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      <div className="gradient-border rounded-xl bg-card overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-left">
              <th className="p-4 font-medium">Clínica</th>
              <th className="p-4 font-medium">Agente IA</th>
              <th className="p-4 font-medium">Follow-ups</th>
              <th className="p-4 font-medium">Lembretes</th>
              <th className="p-4 font-medium">Relatório</th>
              <th className="p-4 font-medium">Triagens</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {monitorData.map((m, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="p-4 font-medium">{m.clinica}</td>
                <td className="p-4">
                  <Badge className={`text-[10px] ${m.agenteIA ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
                    {m.agenteIA ? "Ativo" : "Inativo"}
                  </Badge>
                </td>
                <td className="p-4">
                  {m.followups ? (
                    <Badge className="text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Ativo</Badge>
                  ) : (
                    <Badge className="text-[10px] bg-amber-500/20 text-amber-400 border-amber-500/30">Prime</Badge>
                  )}
                </td>
                <td className="p-4">
                  <Badge className={`text-[10px] ${m.lembretes ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-muted text-muted-foreground"}`}>
                    {m.lembretes ? "Ativo" : "—"}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge className={`text-[10px] ${m.relatorio === "Gerado" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : m.relatorio === "Pendente" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-muted text-muted-foreground"}`}>
                    {m.relatorio}
                  </Badge>
                </td>
                <td className="p-4">{m.triagens}</td>
                <td className="p-4"><Button variant="outline" size="sm" className="text-xs">Ver logs</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gradient-border rounded-xl p-6 bg-card">
        <h3 className="font-display font-semibold mb-4">Alertas do Sistema</h3>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <a.icon size={16} className={`${a.color} mt-0.5 shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{a.msg}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
