import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Bot, Calendar, Bell, FileText,
  UserCheck, Heart, Crown, Phone,
  Shield, CheckCircle2, ArrowRight
} from "lucide-react";

const packages = [
  {
    name: "Prime",
    subtitle: "Organização Inicial",
    features: [
      { icon: Bot, text: "Agente de Atendimento Inteligente (24/7)" },
      { icon: Calendar, text: "Agente de Agendamento Automático" },
      { icon: Bell, text: "Agente Anti-No-Show (Lembretes)" },
      { icon: FileText, text: "Agente de Relatórios Mensais" },
    ],
    result: "Reduza no-shows e automatize o atendimento básico.",
    highlight: false,
  },
  {
    name: "Scale",
    subtitle: "Crescimento Estruturado",
    includes: "Inclui tudo do Prime +",
    features: [
      { icon: UserCheck, text: "Agente de Gestão de Prioridades e Urgências" },
      { icon: Heart, text: "Agente de Follow-Up e Relacionamento" },
    ],
    result: "Operações escaláveis e melhor retenção de clientes.",
    highlight: true,
  },
  {
    name: "Executive",
    subtitle: "Controlo Total",
    includes: "Inclui tudo do Scale +",
    features: [
      { icon: Crown, text: "Secretária Virtual V3 completa" },
      { icon: Phone, text: "Chamadas WhatsApp + Fixo integradas" },
      { icon: Shield, text: "Faturação MBway com verificação antes do agendamento" },
      { icon: Calendar, text: "Google Calendar com sistema anti-conflitos" },
      { icon: Bell, text: "Lembretes automáticos e follow-ups" },
      { icon: UserCheck, text: "Escalação para humano quando necessário" },
      { icon: FileText, text: "Relatórios financeiros automatizados" },
    ],
    result: "Operação de negócio quase autónoma.",
    highlight: false,
  },
];

const Pacotes = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container">
      <FadeIn>
        <div className="max-w-2xl mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Pacotes</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Escolha o nível de automação certo para o seu negócio.
          </h1>
          <p className="text-muted-foreground text-lg">
            Cada pacote é desenhado para uma fase diferente de maturidade operacional.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className={`rounded-xl p-8 h-full flex flex-col ${
              pkg.highlight
                ? "bg-primary/10 border-2 border-primary/50 glow-blue"
                : "gradient-border bg-card"
            }`}>
              {pkg.highlight && (
                <span className="text-xs font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full self-start mb-4">
                  Mais Popular
                </span>
              )}
              <h2 className="font-display text-3xl font-bold mb-1">{pkg.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">{pkg.subtitle}</p>
              {pkg.includes && (
                <p className="text-xs text-primary font-medium mb-4">{pkg.includes}</p>
              )}
              <div className="flex-1 space-y-3 mb-6">
                {pkg.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <f.icon size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-secondary-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 p-4 rounded-lg bg-muted mb-6">
                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{pkg.result}</span>
              </div>
              <Link to="/contacto">
                <Button variant={pkg.highlight ? "hero" : "heroOutline"} className="w-full" size="lg">
                  Falar Connosco <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </div>
);

export default Pacotes;
