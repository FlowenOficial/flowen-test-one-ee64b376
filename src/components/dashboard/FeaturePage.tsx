import { useParams } from "react-router-dom";
import { FEATURES, isFeatureUnlocked, usePlan } from "@/contexts/PlanContext";
import LockedFeaturePage from "./LockedFeaturePage";
import FadeIn from "@/components/FadeIn";
import { Bot } from "lucide-react";

export default function FeaturePage() {
  const { featureId } = useParams();
  const { currentPlan } = usePlan();
  const feature = FEATURES.find((f) => f.id === featureId);

  if (!feature) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Funcionalidade não encontrada.
      </div>
    );
  }

  const unlocked = isFeatureUnlocked(feature.tier, currentPlan);

  if (!unlocked) {
    return <LockedFeaturePage feature={feature} />;
  }

  return (
    <FadeIn>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">{feature.label}</h2>
          <p className="text-muted-foreground mt-1">{feature.description}</p>
        </div>

        {/* Mock active feature UI */}
        <div className="gradient-border rounded-xl p-8 bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold">Agente Ativo</p>
              <p className="text-xs text-primary">● A funcionar — última ação há 3 min</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Ações Hoje", value: "24" },
              { label: "Esta Semana", value: "142" },
              { label: "Taxa de Sucesso", value: "97%" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted text-center">
                <p className="font-display text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Atividade Recente</h4>
            {[
              "Ação executada com sucesso — Cliente #312",
              "Notificação enviada — Agendamento confirmado",
              "Verificação automática concluída",
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm">{log}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
