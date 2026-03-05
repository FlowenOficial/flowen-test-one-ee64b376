import { Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Feature, PLAN_LABELS } from "@/contexts/PlanContext";

interface LockedFeaturePageProps {
  feature: Feature;
}

const tierBadgeClass: Record<string, string> = {
  scale: "bg-primary/20 text-primary border-primary/30",
  executive: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function LockedFeaturePage({ feature }: LockedFeaturePageProps) {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center">
      {/* Blurred fake UI background */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="blur-md opacity-30 pointer-events-none p-8 space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
          </div>
          <div className="h-40 bg-muted rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="relative z-10 text-center max-w-sm mx-auto p-8 rounded-xl bg-card/90 backdrop-blur-sm border border-border">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Lock size={28} className="text-muted-foreground" />
        </div>
        <Badge className={`mb-4 ${tierBadgeClass[feature.tier] || ""}`}>
          Plano {PLAN_LABELS[feature.tier]}
        </Badge>
        <h2 className="font-display text-xl font-bold mb-2">{feature.label}</h2>
        <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
        <p className="text-sm font-medium text-primary mb-6">✦ {feature.benefit}</p>
        <Link to="/contacto">
          <Button variant="hero" className="w-full mb-2">
            Fazer Upgrade <ArrowRight size={16} />
          </Button>
        </Link>
        <Link to="/pacotes">
          <Button variant="ghost" className="w-full text-muted-foreground">
            Ver todos os pacotes
          </Button>
        </Link>
      </div>
    </div>
  );
}
