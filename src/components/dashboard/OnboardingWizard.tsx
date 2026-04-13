import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlan, FEATURES, isFeatureUnlocked, PLAN_LABELS } from "@/contexts/PlanContext";
import { Bot, Calendar, Bell, MessageSquare, CheckCircle2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingWizard() {
  const done = localStorage.getItem("onboarding_done") === "true";
  const [open, setOpen] = useState(!done);
  const [step, setStep] = useState(0);
  const { currentPlan } = usePlan();

  const close = () => {
    localStorage.setItem("onboarding_done", "true");
    setOpen(false);
  };

  const steps = [
    // Step 1: Welcome
    () => (
      <div className="text-center py-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Bot size={40} className="text-primary animate-pulse" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-3">Bem-vindo à Flowen! 👋</h2>
        <p className="text-muted-foreground mb-8">
          O teu sistema de automação está pronto. Vamos mostrar-te como tirar o máximo partido da plataforma em 2 minutos.
        </p>
        <Button variant="hero" size="lg" onClick={() => setStep(1)}>Começar</Button>
      </div>
    ),
    // Step 2: Plan
    () => (
      <div className="py-4">
        <div className="text-center mb-6">
          <h2 className="font-display text-xl font-bold mb-2">O teu plano</h2>
          <Badge className="bg-primary/20 text-primary border-primary/30">{PLAN_LABELS[currentPlan]}</Badge>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
          {FEATURES.map(f => {
            const unlocked = isFeatureUnlocked(f.tier, currentPlan);
            return (
              <div key={f.id} className={`flex items-center gap-3 p-3 rounded-lg ${unlocked ? "bg-muted" : "bg-muted/30 opacity-50"}`}>
                {unlocked ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> : <Lock size={16} className="text-muted-foreground shrink-0" />}
                <span className="text-sm flex-1">{f.label}</span>
                {!unlocked && <span className="text-xs text-muted-foreground">Disponível no {PLAN_LABELS[f.tier]}</span>}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button variant="hero" onClick={() => setStep(2)}>Continuar</Button>
        </div>
      </div>
    ),
    // Step 3: Getting started
    () => (
      <div className="py-4">
        <h2 className="font-display text-xl font-bold text-center mb-6">Como começar</h2>
        <div className="space-y-4 mb-8">
          {[
            { icon: MessageSquare, title: "Fernanda já está ativa", desc: "A tua assistente virtual já está a responder a mensagens no WhatsApp automaticamente." },
            { icon: Calendar, title: "Agendamentos automáticos", desc: "Os pacientes podem agendar consultas directamente pelo WhatsApp sem intervenção humana." },
            { icon: Bell, title: "Ativa as notificações", desc: "Recebe alertas em tempo real quando a Fernanda precisar de ajuda humana." },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="font-display text-sm font-bold text-primary">{i + 1}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <s.icon size={14} className="text-primary" />
                  <p className="text-sm font-semibold">{s.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="hero" size="lg" onClick={close}>Ir para o Dashboard</Button>
        </div>
      </div>
    ),
  ];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md [&>button]:hidden" onPointerDownOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-2">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {steps[step]()}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
