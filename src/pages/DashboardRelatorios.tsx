import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/NumberTicker";
import { FileText, Download, BarChart3 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartStyle = { background: "hsl(220,30%,8%)", border: "1px solid hsl(220,20%,18%)", borderRadius: 8 };

const reports = [
  { mes: "Março 2026", consultas: 142, comparencia: "89%", noShows: 23, receita: "€4.260", estado: "disponivel", weeks: [{ name: "Sem 1", c: 32 }, { name: "Sem 2", c: 38 }, { name: "Sem 3", c: 35 }, { name: "Sem 4", c: 37 }] },
  { mes: "Fevereiro 2026", consultas: 128, comparencia: "87%", noShows: 19, receita: "€3.840", estado: "disponivel", weeks: [{ name: "Sem 1", c: 28 }, { name: "Sem 2", c: 34 }, { name: "Sem 3", c: 30 }, { name: "Sem 4", c: 36 }] },
  { mes: "Janeiro 2026", consultas: 135, comparencia: "85%", noShows: 21, receita: "€4.050", estado: "disponivel", weeks: [{ name: "Sem 1", c: 30 }, { name: "Sem 2", c: 36 }, { name: "Sem 3", c: 33 }, { name: "Sem 4", c: 36 }] },
  { mes: "Dezembro 2025", consultas: 98, comparencia: "82%", noShows: 14, receita: "€2.940", estado: "disponivel", weeks: [{ name: "Sem 1", c: 22 }, { name: "Sem 2", c: 26 }, { name: "Sem 3", c: 24 }, { name: "Sem 4", c: 26 }] },
  { mes: "Novembro 2025", consultas: 110, comparencia: "84%", noShows: 17, receita: "€3.300", estado: "disponivel", weeks: [{ name: "Sem 1", c: 25 }, { name: "Sem 2", c: 30 }, { name: "Sem 3", c: 27 }, { name: "Sem 4", c: 28 }] },
  { mes: "Outubro 2025", consultas: 89, comparencia: "79%", noShows: 11, receita: "€2.670", estado: "agerar", weeks: [] },
];

const kpis = [
  { label: "Consultas Realizadas", value: 142 },
  { label: "Taxa de Comparência", value: 89, suffix: "%" },
  { label: "No-Shows Evitados", value: 23 },
  { label: "Receita Estimada", value: 4260, prefix: "€" },
];

const currentWeeks = [{ name: "Sem 1", c: 32 }, { name: "Sem 2", c: 38 }, { name: "Sem 3", c: 35 }, { name: "Sem 4", c: 37 }];

export default function DashboardRelatorios() {
  const [year, setYear] = useState("2026");
  const [detail, setDetail] = useState<typeof reports[0] | null>(null);

  return (
    <FadeIn>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl font-bold">Relatórios Mensais</h2>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">Relatório de Março disponível</Badge>
        </div>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => (
          <div key={i} className="gradient-border rounded-xl p-6 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{k.label}</span>
            </div>
            <p className="font-display text-2xl font-bold"><NumberTicker value={k.value} prefix={k.prefix} suffix={k.suffix} /></p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="gradient-border rounded-xl p-6 bg-card mb-8">
        <h3 className="font-display font-semibold mb-4">Consultas por Semana — Março 2026</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentWeeks}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" />
              <XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={12} />
              <YAxis stroke="hsl(215,15%,60%)" fontSize={12} />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="c" fill="hsl(216,100%,56%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports table */}
      <div className="gradient-border rounded-xl bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-left">
              <th className="p-4 font-medium">Mês</th>
              <th className="p-4 font-medium">Consultas</th>
              <th className="p-4 font-medium hidden sm:table-cell">Comparência</th>
              <th className="p-4 font-medium hidden sm:table-cell">No-Shows Evitados</th>
              <th className="p-4 font-medium hidden md:table-cell">Receita Est.</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="p-4 font-medium">{r.mes}</td>
                <td className="p-4">{r.consultas}</td>
                <td className="p-4 hidden sm:table-cell">{r.comparencia}</td>
                <td className="p-4 hidden sm:table-cell">{r.noShows}</td>
                <td className="p-4 hidden md:table-cell">{r.receita}</td>
                <td className="p-4">
                  <Badge className={`text-[10px] ${r.estado === "disponivel" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}>
                    {r.estado === "disponivel" ? "Disponível" : "A gerar..."}
                  </Badge>
                </td>
                <td className="p-4">
                  <Button variant="outline" size="sm" disabled={r.estado !== "disponivel"} onClick={() => setDetail(r)}>Ver</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!detail} onOpenChange={() => setDetail(null)}>
        <SheetContent className="bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-display">{detail?.mes}</SheetTitle>
          </SheetHeader>
          {detail && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="font-display text-xl font-bold">{detail.consultas}</p>
                  <p className="text-xs text-muted-foreground">Consultas</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="font-display text-xl font-bold">{detail.comparencia}</p>
                  <p className="text-xs text-muted-foreground">Comparência</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="font-display text-xl font-bold">{detail.noShows}</p>
                  <p className="text-xs text-muted-foreground">No-Shows Evitados</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="font-display text-xl font-bold">{detail.receita}</p>
                  <p className="text-xs text-muted-foreground">Receita Est.</p>
                </div>
              </div>
              {detail.weeks.length > 0 && (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={detail.weeks}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,18%)" />
                      <XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={11} />
                      <YAxis stroke="hsl(215,15%,60%)" fontSize={11} />
                      <Bar dataKey="c" fill="hsl(216,100%,56%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              <Button variant="outline" className="w-full" disabled>
                <Download size={16} /> Descarregar PDF
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </FadeIn>
  );
}
