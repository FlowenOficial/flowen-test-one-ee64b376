import { usePlan, PLAN_LABELS, PlanTier } from "@/contexts/PlanContext";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const planBadgeClass: Record<PlanTier, string> = {
  prime: "bg-secondary text-secondary-foreground",
  scale: "bg-primary/20 text-primary border-primary/30",
  executive: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function PlanIndicator() {
  const { currentPlan, setPlan } = usePlan();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-muted-foreground">Plano atual:</span>
      <Badge className={planBadgeClass[currentPlan]}>
        {PLAN_LABELS[currentPlan]}
      </Badge>

      {currentPlan !== "executive" && (
        <Link to="/pacotes" className="text-xs text-primary hover:underline flex items-center gap-1">
          Upgrade para {PLAN_LABELS[currentPlan === "prime" ? "scale" : "executive"]}
          <ArrowRight size={12} />
        </Link>
      )}

      {/* Dev mode switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="ml-auto text-xs text-muted-foreground h-7 px-2">
            DEV <ChevronDown size={12} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {(["prime", "scale", "executive"] as PlanTier[]).map((tier) => (
            <DropdownMenuItem
              key={tier}
              onClick={() => setPlan(tier)}
              className={currentPlan === tier ? "bg-accent" : ""}
            >
              {PLAN_LABELS[tier]} {currentPlan === tier && "✓"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
