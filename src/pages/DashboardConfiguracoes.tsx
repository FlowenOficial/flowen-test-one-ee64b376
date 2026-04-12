import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export default function DashboardConfiguracoes() {
  // Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  const hasMin8 = newPw.length >= 8;
  const hasUpper = /[A-Z]/.test(newPw);
  const hasNumber = /[0-9]/.test(newPw);
  const pwMatch = newPw === confirmPw && confirmPw.length > 0;

  const handlePwSubmit = () => {
    if (hasMin8 && hasUpper && hasNumber && pwMatch) {
      setPwSuccess(true);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwSuccess(false), 3000);
    }
  };

  // Notifications
  const [notifs, setNotifs] = useState({
    escalacoes: true, agendamentos: true, pagamentos: true, relatorios: true, push: false,
  });

  // Timezone
  const [idioma, setIdioma] = useState("pt-PT");
  const [tz, setTz] = useState("Europe/Lisbon");
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat(idioma === "pt-PT" ? "pt-PT" : idioma === "pt-BR" ? "pt-BR" : "en-GB", {
        timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit",
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });
      setTime(fmt.format(now));
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [tz, idioma]);

  const Req = ({ ok, text }: { ok: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-xs">
      {ok ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-muted-foreground" />}
      <span className={ok ? "text-emerald-400" : "text-muted-foreground"}>{text}</span>
    </div>
  );

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Configurações</h2>
      <div className="space-y-6 max-w-2xl">
        {/* Password */}
        <div className="gradient-border rounded-xl p-6 bg-card space-y-4">
          <h3 className="font-display font-semibold">Alterar Palavra-passe</h3>
          <div className="space-y-3">
            <div><Label>Palavra-passe atual</Label><Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} /></div>
            <div><Label>Nova palavra-passe</Label><Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} /></div>
            <div className="space-y-1">
              <Req ok={hasMin8} text="Mínimo 8 caracteres" />
              <Req ok={hasUpper} text="Pelo menos uma letra maiúscula" />
              <Req ok={hasNumber} text="Pelo menos um número" />
            </div>
            <div><Label>Confirmar nova palavra-passe</Label><Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} /></div>
            {confirmPw && !pwMatch && <p className="text-xs text-destructive">As palavras-passe não coincidem</p>}
            {pwSuccess && <p className="text-xs text-emerald-400">Palavra-passe alterada com sucesso</p>}
            <Button variant="hero" size="sm" onClick={handlePwSubmit} disabled={!(hasMin8 && hasUpper && hasNumber && pwMatch)}>
              Alterar Palavra-passe
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="gradient-border rounded-xl p-6 bg-card space-y-4">
          <h3 className="font-display font-semibold">Preferências de Notificações</h3>
          {[
            { key: "escalacoes", label: "Escalações" },
            { key: "agendamentos", label: "Agendamentos" },
            { key: "pagamentos", label: "Lembretes de Pagamento" },
            { key: "relatorios", label: "Relatórios Mensais" },
            { key: "push", label: "Notificações Push" },
          ].map(n => (
            <div key={n.key} className="flex items-center justify-between">
              <Label>{n.label}</Label>
              <Switch checked={notifs[n.key as keyof typeof notifs]} onCheckedChange={v => setNotifs(p => ({ ...p, [n.key]: v }))} />
            </div>
          ))}
          <Button variant="hero" size="sm" onClick={() => toast.success("Preferências guardadas com sucesso")}>
            Guardar preferências
          </Button>
        </div>

        {/* Timezone */}
        <div className="gradient-border rounded-xl p-6 bg-card space-y-4">
          <h3 className="font-display font-semibold">Idioma e Fuso Horário</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Idioma</Label>
              <Select value={idioma} onValueChange={setIdioma}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-PT">Português (Portugal)</SelectItem>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fuso Horário</Label>
              <Select value={tz} onValueChange={setTz}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Lisbon">Europe/Lisbon</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                  <SelectItem value="America/Sao_Paulo">America/Sao_Paulo</SelectItem>
                  <SelectItem value="America/New_York">America/New_York</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted text-sm">
            <span className="text-muted-foreground">Hora actual: </span>
            <span className="font-medium">{time}</span>
          </div>
          <Button variant="hero" size="sm" onClick={() => toast.success("Preferências guardadas com sucesso")}>
            Guardar preferências
          </Button>
        </div>
      </div>
    </FadeIn>
  );
}
