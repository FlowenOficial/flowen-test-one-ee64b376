import { useState, useMemo } from "react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import EmptyState from "@/components/EmptyState";

interface Appointment {
  date: string;
  hour: string;
  patient: string;
  type: string;
  status: "confirmado" | "pendente" | "cancelado" | "falta" | "realizado";
}

const names = ["Ana Silva", "João Costa", "Maria Santos", "Pedro Reis", "Carla Mendes", "Sofia Almeida", "Ricardo Lopes", "Marta Ferreira", "Tiago Oliveira", "Inês Pinto", "Bruno Sousa", "Catarina Neves", "Diogo Ramos", "Helena Martins", "Filipe Correia"];
const types = ["Consulta Geral", "Fisioterapia", "Nutrição", "Psicologia"];
const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

function generateAppointments(year: number, month: number): Appointment[] {
  const result: Appointment[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const seed = year * 100 + month;
  let s = seed;
  const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s; };

  const count = 10 + (rand() % 6);
  for (let i = 0; i < count; i++) {
    const day = 1 + (rand() % daysInMonth);
    const dow = new Date(year, month, day).getDay();
    if (dow === 0 || dow === 6) continue;
    const dd = String(day).padStart(2, "0");
    const mm = String(month + 1).padStart(2, "0");
    const statuses: Appointment["status"][] = ["confirmado", "confirmado", "realizado", "pendente", "cancelado", "falta", "realizado"];
    result.push({
      date: `${year}-${mm}-${dd}`,
      hour: hours[rand() % hours.length],
      patient: names[rand() % names.length],
      type: types[rand() % types.length],
      status: statuses[rand() % statuses.length],
    });
  }
  return result.sort((a, b) => a.date.localeCompare(b.date) || a.hour.localeCompare(b.hour));
}

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const statusDotColor: Record<string, string> = {
  confirmado: "bg-primary",
  pendente: "bg-amber-400",
  cancelado: "bg-muted-foreground",
  falta: "bg-red-400",
  realizado: "bg-emerald-400",
};

const statusBadgeClass: Record<string, string> = {
  confirmado: "bg-primary/20 text-primary border-primary/30",
  pendente: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  cancelado: "bg-muted text-muted-foreground",
  falta: "bg-red-500/20 text-red-400 border-red-500/30",
  realizado: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const statusLabel: Record<string, string> = {
  confirmado: "Confirmado",
  pendente: "Pendente",
  cancelado: "Cancelado",
  falta: "Falta",
  realizado: "Realizado",
};

export default function DashboardCalendario() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [view, setView] = useState<"mensal" | "semanal">("mensal");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const appointments = useMemo(() => generateAppointments(year, month), [year, month]);

  const apptsByDate = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    appointments.forEach(a => { (map[a.date] ||= []).push(a); });
    return map;
  }, [appointments]);

  const totalConsultas = appointments.length;
  const pendentes = appointments.filter(a => a.status === "pendente").length;
  const canceladas = appointments.filter(a => a.status === "cancelado").length;
  const faltas = appointments.filter(a => a.status === "falta").length;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedAppts = selectedDay ? apptsByDate[selectedDay] || [] : [];

  const weekHours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
  const today = new Date(year, month, 11);
  const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);

  return (
    <FadeIn>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="font-display text-2xl font-bold">Calendário</h2>
        <Tabs value={view} onValueChange={(v) => setView(v as "mensal" | "semanal")}>
          <TabsList><TabsTrigger value="mensal">Mensal</TabsTrigger><TabsTrigger value="semanal">Semanal</TabsTrigger></TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <span className="text-muted-foreground">Este mês: <strong className="text-foreground">{totalConsultas} consultas</strong></span>
        <span className="text-muted-foreground">| <strong className="text-amber-400">{pendentes} pendentes</strong> de confirmação</span>
        <span className="text-muted-foreground">| <strong className="text-red-400">{canceladas} canceladas</strong></span>
        <span className="text-muted-foreground">| <strong className="text-red-400">{faltas} faltas</strong> registadas</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft size={18} /></Button>
        <span className="font-display font-semibold text-lg">{monthNames[month]} {year}</span>
        <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight size={18} /></Button>
      </div>

      {view === "mensal" ? (
        <div className="gradient-border rounded-xl p-4 bg-card">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} className="h-12" />;
              const dd = String(day).padStart(2, "0");
              const mm = String(month + 1).padStart(2, "0");
              const dateStr = `${year}-${mm}-${dd}`;
              const dayAppts = apptsByDate[dateStr];
              return (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setSelectedDay(dateStr)}
                      className="h-12 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors relative flex flex-col items-center justify-center"
                    >
                      <span className="text-sm">{day}</span>
                      {dayAppts && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dayAppts.slice(0, 4).map((a, j) => (
                            <span key={j} className={`w-1.5 h-1.5 rounded-full ${statusDotColor[a.status]}`} />
                          ))}
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  {dayAppts && (
                    <TooltipContent>
                      <div className="space-y-1">
                        {dayAppts.map((a, j) => (
                          <p key={j} className="text-xs">{a.hour} — {a.patient}</p>
                        ))}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="gradient-border rounded-xl p-4 bg-card overflow-x-auto">
          <div className="grid grid-cols-6 gap-1 min-w-[500px]">
            <div />
            {Array.from({ length: 5 }).map((_, i) => {
              const d = new Date(weekStart);
              d.setDate(weekStart.getDate() + i);
              return <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">{["Seg", "Ter", "Qua", "Qui", "Sex"][i]} {d.getDate()}</div>;
            })}
            {weekHours.map(h => (
              <>
                <div key={`lbl-${h}`} className="text-xs text-muted-foreground text-right pr-2 py-1">{h}</div>
                {Array.from({ length: 5 }).map((_, di) => {
                  const d = new Date(weekStart);
                  d.setDate(weekStart.getDate() + di);
                  const dd = String(d.getDate()).padStart(2, "0");
                  const mm2 = String(d.getMonth() + 1).padStart(2, "0");
                  const dateStr = `${d.getFullYear()}-${mm2}-${dd}`;
                  const match = (apptsByDate[dateStr] || []).find(a => a.hour.startsWith(h.split(":")[0]));
                  return (
                    <div key={`${di}-${h}`} className={`rounded h-8 text-xs flex items-center justify-center ${match ? "bg-primary/20 text-primary" : "bg-muted/20"}`}>
                      {match && <span className="truncate px-1">{match.patient.split(" ")[0]}</span>}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      )}

      <Sheet open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <SheetContent className="bg-card border-border">
          <SheetHeader>
            <SheetTitle className="font-display">{selectedDay ? `${parseInt(selectedDay.split("-")[2])} ${monthNames[month]}` : ""}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-3">
            {selectedAppts.length === 0 ? (
              <EmptyState icon={CalendarIcon} title="Sem consultas neste dia" description="Nenhuma consulta agendada para este dia." />
            ) : (
              selectedAppts.map((a, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{a.hour}</span>
                    <Badge className={`text-[10px] ${statusBadgeClass[a.status]}`}>
                      {statusLabel[a.status]}
                    </Badge>
                  </div>
                  <p className="text-sm">{a.patient}</p>
                  <p className="text-xs text-muted-foreground">{a.type}</p>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </FadeIn>
  );
}
