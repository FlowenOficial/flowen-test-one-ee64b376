import { createContext, useContext, useState, ReactNode } from "react";

export type PlanTier = "prime" | "scale" | "executive";

export interface Feature {
  id: string;
  label: string;
  description: string;
  benefit: string;
  tier: PlanTier;
  icon: string;
}

export const PLAN_LABELS: Record<PlanTier, string> = {
  prime: "Prime",
  scale: "Scale",
  executive: "Executive",
};

export const PLAN_ORDER: PlanTier[] = ["prime", "scale", "executive"];

export const FEATURES: Feature[] = [
  { id: "atendimento", label: "Agente de Atendimento Inteligente", description: "Atendimento automático 24/7 com IA que responde a clientes.", benefit: "Nunca mais perca um cliente por falta de resposta.", tier: "prime", icon: "bot" },
  { id: "agendamento", label: "Agente de Agendamento Automático", description: "Agendamento inteligente sem intervenção humana.", benefit: "Reduza 90% do trabalho administrativo de marcações.", tier: "prime", icon: "calendar-check" },
  { id: "lembretes", label: "Agente de Lembretes Anti-Faltas", description: "Lembretes automáticos para reduzir no-shows.", benefit: "Aumente a taxa de comparência em até 89%.", tier: "prime", icon: "bell-ring" },
  { id: "relatorios", label: "Relatórios Mensais", description: "Relatórios automáticos com métricas chave do seu negócio.", benefit: "Decisões baseadas em dados, todos os meses.", tier: "prime", icon: "bar-chart-3" },
  { id: "prioridade", label: "Agente de Gestão de Prioridade e Urgências", description: "Triagem automática de urgências e prioridades.", benefit: "Casos urgentes nunca mais ficam esquecidos.", tier: "scale", icon: "alert-triangle" },
  { id: "followup", label: "Agente de Relacionamento e Follow-Up", description: "Follow-up automático para retenção de clientes.", benefit: "Aumente a retenção e o valor de cada cliente.", tier: "scale", icon: "heart-handshake" },
  { id: "sec-chamadas", label: "Secretaria V3: Chamadas", description: "Chamadas WhatsApp e fixo geridas pela IA.", benefit: "Atendimento telefónico sem contratar recepcionista.", tier: "executive", icon: "phone" },
  { id: "sec-pagamentos", label: "Secretaria V3: Verificação de Pagamentos", description: "Verificação automática de pagamentos antes do agendamento.", benefit: "Zero falhas de cobrança, zero inadimplência.", tier: "executive", icon: "credit-card" },
  { id: "sec-calendar", label: "Secretaria V3: Google Calendar Anti-Conflitos", description: "Agendamento inteligente sem conflitos de horário.", benefit: "Calendário perfeito, sem sobreposições.", tier: "executive", icon: "calendar-clock" },
  { id: "sec-lembretes", label: "Secretaria V3: Lembretes e Follow-Up", description: "Lembretes e follow-up automático avançado.", benefit: "Nenhum cliente esquecido, nenhuma oportunidade perdida.", tier: "executive", icon: "repeat" },
  { id: "sec-escalamento", label: "Secretaria V3: Escalamento para Humano", description: "Escalamento inteligente quando a IA não consegue resolver.", benefit: "A IA sabe quando passar o caso a um humano.", tier: "executive", icon: "user-check" },
  { id: "sec-financeiro", label: "Secretaria V3: Relatórios Financeiros", description: "Relatórios financeiros automáticos e detalhados.", benefit: "Controlo total das finanças do seu negócio.", tier: "executive", icon: "trending-up" },
];

export function isFeatureUnlocked(featureTier: PlanTier, currentPlan: PlanTier): boolean {
  const tierIndex = PLAN_ORDER.indexOf(featureTier);
  const planIndex = PLAN_ORDER.indexOf(currentPlan);
  return tierIndex <= planIndex;
}

export function getRequiredPlan(featureTier: PlanTier): PlanTier {
  return featureTier;
}

interface PlanContextType {
  currentPlan: PlanTier;
  setPlan: (plan: PlanTier) => void;
}

const PlanContext = createContext<PlanContextType>({ currentPlan: "prime", setPlan: () => {} });

export function PlanProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<PlanTier>(() => {
    const saved = localStorage.getItem("flowen_current_plan");
    return (saved as PlanTier) || "prime";
  });

  const updatePlan = (plan: PlanTier) => {
    setCurrentPlan(plan);
    localStorage.setItem("flowen_current_plan", plan);
  };

  return (
    <PlanContext.Provider value={{ currentPlan, setPlan: updatePlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
