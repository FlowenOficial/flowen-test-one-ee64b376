import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowRight } from "lucide-react";
import { Feature, PLAN_LABELS } from "@/contexts/PlanContext";

interface UpgradeModalProps {
  feature: Feature | null;
  open: boolean;
  onClose: () => void;
}

const tierBadgeClass: Record<string, string> = {
  scale: "bg-primary/20 text-primary border-primary/30",
  executive: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function UpgradeModal({ feature, open, onClose }: UpgradeModalProps) {
  if (!feature) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Lock size={20} className="text-muted-foreground" />
            </div>
            <Badge className={tierBadgeClass[feature.tier] || ""}>
              Plano {PLAN_LABELS[feature.tier]}
            </Badge>
          </div>
          <DialogTitle className="font-display">{feature.label}</DialogTitle>
          <DialogDescription>{feature.description}</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-muted p-4 my-2">
          <p className="text-sm font-medium text-foreground">✦ {feature.benefit}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          Esta funcionalidade está disponível no plano <strong>{PLAN_LABELS[feature.tier]}</strong> ou superior.
        </p>

        <div className="flex flex-col gap-2 mt-2">
          <Link to="/contacto" onClick={onClose}>
            <Button variant="hero" className="w-full">
              Fazer Upgrade <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/pacotes" onClick={onClose}>
            <Button variant="ghost" className="w-full text-muted-foreground">
              Ver todos os pacotes
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
