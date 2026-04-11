import { useParams } from "react-router-dom";
import { FEATURES, isFeatureUnlocked, usePlan } from "@/contexts/PlanContext";
import LockedFeaturePage from "./LockedFeaturePage";
import FadeIn from "@/components/FadeIn";
import { featureContentMap, StatusCard, KPIRow } from "./featureContent";

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

  const content = featureContentMap[feature.id];

  return (
    <FadeIn>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold">{feature.label}</h2>
          <p className="text-muted-foreground mt-1">{feature.description}</p>
        </div>

        <div className="gradient-border rounded-xl p-8 bg-card">
          {content ? (
            <>
              <StatusCard text={content.statusTitle} sub={content.statusSub} />
              <KPIRow items={content.kpis} />
              {content.render()}
            </>
          ) : (
            <p className="text-muted-foreground text-center py-8">Conteúdo em desenvolvimento.</p>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
