import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mx-auto max-w-5xl text-center mb-12">
          <h2 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3 mb-12">
          <span className={cn("text-sm", isMonthly ? "text-foreground font-semibold" : "text-muted-foreground")}>
            Monthly
          </span>
          <div ref={switchRef as any}>
            <Switch
              checked={!isMonthly}
              onCheckedChange={handleToggle}
            />
          </div>
          <span className={cn("text-sm", !isMonthly ? "text-foreground font-semibold" : "text-muted-foreground")}>
            Annual billing (Save 20%)
          </span>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
              className={cn(
                "relative rounded-2xl border p-8 flex flex-col",
                plan.isPopular
                  ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Popular
                  </span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground tracking-wider">
                  {plan.name}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-foreground">
                    <NumberFlow
                      value={Number(isMonthly ? plan.price : plan.yearlyPrice)}
                      format={{ style: "currency", currency: "USD", minimumFractionDigits: 0 }}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="font-variant-numeric: tabular-nums"
                    />
                  </span>
                  {plan.period !== "Next 3 months" && (
                    <span className="text-sm text-muted-foreground">
                      / {plan.period}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {isMonthly ? "billed monthly" : "billed annually"}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-8 border-border" />

                <Link
                  to={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: plan.isPopular ? "default" : "outline",
                    }),
                    "w-full"
                  )}
                >
                  {plan.buttonText}
                </Link>
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
