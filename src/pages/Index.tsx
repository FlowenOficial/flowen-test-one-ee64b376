import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import {
  AlertTriangle, CalendarOff, Users, TrendingDown,
  Zap, BarChart3, Scale, Shield,
  Bot, Calendar, Bell, FileText,
  UserCheck, Heart, Crown, Phone,
  ArrowRight, CheckCircle2
} from "lucide-react";

const painPoints = [
  { icon: AlertTriangle, title: "Desorganização Operacional", desc: "Processos manuais, informação dispersa e equipas sobrecarregadas." },
  { icon: CalendarOff, title: "Cancelamentos e No-Shows", desc: "Perdas recorrentes por falta de sistemas de confirmação automatizados." },
  { icon: Users, title: "Sobrecarga Humana", desc: "Colaboradores a fazer tarefas que sistemas deveriam executar." },
  { icon: TrendingDown, title: "Sem Sistemas Escaláveis", desc: "Crescer significa contratar mais. E mais. E mais." },
];

const differentials = [
  { icon: Zap, title: "Método Proprietário", desc: "Framework testado e refinado em dezenas de negócios." },
  { icon: BarChart3, title: "Resultados Mensuráveis", desc: "Métricas claras de impacto desde o primeiro mês." },
  { icon: Scale, title: "Escalabilidade Real", desc: "Cresça sem aumentar proporcionalmente a equipa." },
  { icon: Shield, title: "Consultoria Verdadeira", desc: "Não vendemos software. Construímos sistemas sob medida." },
];

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
      { icon: UserCheck, text: "Agente de Gestão de Prioridades" },
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
      { icon: Phone, text: "Chamadas WhatsApp + Fixo" },
      { icon: Shield, text: "Faturação MBway + Verificação" },
      { icon: Calendar, text: "Google Calendar anti-conflitos" },
    ],
    result: "Operação de negócio quase autónoma.",
    highlight: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow pointer-events-none" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
        
        <div className="container relative z-10 pt-24">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8">
                <Zap size={14} />
                Automação Operacional para Negócios
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                Processos repetitivos{" "}
                <span className="gradient-text">não são para humanos.</span>
                <br />
                Sistemas sim.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                Ajudamos clínicas e negócios locais a escalar sem contratar mais pessoal. 
                Automação inteligente, sistemas sob medida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/pacotes">
                  <Button variant="hero" size="lg" className="text-base px-8 py-6">
                    Ver Pacotes <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/contacto">
                  <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
                    Falar Connosco
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <FadeIn>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">O Problema</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              O seu negócio está preso a processos manuais?
            </h2>
            <p className="text-muted-foreground max-w-lg mb-16">
              A maioria dos negócios locais enfrenta os mesmos bloqueios operacionais.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="gradient-border rounded-xl p-6 bg-card h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">A Solução</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                Sistemas que trabalham enquanto a sua equipa descansa.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                A Flowen constrói sistemas de automação operacional completos — agentes inteligentes que 
                atendem, agendam, cobram, relembram e reportam. Tudo sem intervenção humana.
              </p>
              <Link to="/pacotes">
                <Button variant="hero" size="lg">
                  Explorar Soluções <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <FadeIn>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Pacotes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-16">
              Escolha o nível de automação certo.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h3 className="font-display text-2xl font-bold mb-1">{pkg.name}</h3>
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
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-muted mb-6">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">{pkg.result}</span>
                  </div>
                  <Link to="/contacto">
                    <Button variant={pkg.highlight ? "hero" : "heroOutline"} className="w-full">
                      Falar Connosco
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <FadeIn>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Porquê a Flowen</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-16">
              O que nos distingue.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                Pronto para automatizar o seu negócio?
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Agende uma consulta gratuita e descubra como a Flowen pode transformar as suas operações.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacto">
                  <Button variant="hero" size="lg" className="text-base px-10 py-6">
                    Falar Connosco <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/pacotes">
                  <Button variant="heroOutline" size="lg" className="text-base px-10 py-6">
                    Ver Pacotes
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Index;
