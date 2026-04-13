import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User, AlertTriangle, Bell, Search } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const patients = ["Ana Silva", "João Costa", "Maria Santos", "Pedro Reis", "Carla Mendes", "Sofia Almeida", "Ricardo Lopes", "Marta Ferreira"];
const escalacoes = ["Escalação — Maria Santos — Há 10 min", "Escalação — João Costa — Há 1h"];
const notifs = ["Agendamento confirmado — Ana Silva", "Faturação em 3 dias"];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function GlobalSearch({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const q = query.toLowerCase().trim();
  const hasQuery = q.length >= 2;
  const matchedPatients = hasQuery ? patients.filter(p => p.toLowerCase().includes(q)) : [];
  const matchedEscalacoes = hasQuery ? escalacoes.filter(e => e.toLowerCase().includes(q)) : [];
  const matchedNotifs = hasQuery ? notifs.filter(n => n.toLowerCase().includes(q)) : [];
  const totalResults = matchedPatients.length + matchedEscalacoes.length + matchedNotifs.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Pesquisar pacientes, escalações, notificações..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Ctrl+K para abrir</p>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {hasQuery && totalResults === 0 && (
            <EmptyState icon={Search} title={`Sem resultados para '${query}'`} description="Tenta pesquisar por outro termo." />
          )}
          {matchedPatients.length > 0 && (
            <Section icon={User} label="Pacientes" items={matchedPatients} onClose={() => onOpenChange(false)} />
          )}
          {matchedEscalacoes.length > 0 && (
            <Section icon={AlertTriangle} label="Escalações" items={matchedEscalacoes} onClose={() => onOpenChange(false)} />
          )}
          {matchedNotifs.length > 0 && (
            <Section icon={Bell} label="Notificações" items={matchedNotifs} onClose={() => onOpenChange(false)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ icon: Icon, label, items, onClose }: { icon: React.ElementType; label: string; items: string[]; onClose: () => void }) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground">
        <Icon size={12} /> {label}
      </div>
      {items.map((item, i) => (
        <button key={i} onClick={onClose} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
          {item}
        </button>
      ))}
    </div>
  );
}
