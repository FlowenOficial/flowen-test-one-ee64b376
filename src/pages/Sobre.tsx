import FadeIn from "@/components/FadeIn";
import { NumberTicker } from "@/components/NumberTicker";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Missão", desc: "Automatizar operações de negócios locais para que as equipas se possam focar no que realmente importa — as pessoas." },
  { icon: Eye, title: "Visão", desc: "Um mundo onde nenhum negócio local perde clientes por falta de sistemas. Onde a tecnologia trabalha 24/7 para que os humanos não tenham de o fazer." },
  { icon: Heart, title: "Valores", desc: "Transparência total, resultados mensuráveis e uma relação de parceria genuína com cada cliente." },
];

const stats = [
  { value: 12, suffix: "+", label: "Clínicas automatizadas", animate: true },
  { value: 89, suffix: "%", label: "Taxa média de comparência", animate: true },
  { text: "24/7", label: "Disponibilidade do sistema" },
  { text: "€0", label: "Custo por mensagem respondida" },
];

const team = [
  { initial: "C", name: "Caetano", role: "Co-fundador & Automação", desc: "Especialista em sistemas de automação operacional com foco em resultados mensuráveis." },
  { initial: "F", name: "Flowen Team", role: "Suporte & Implementação", desc: "Equipa dedicada à implementação e suporte contínuo de todos os clientes." },
];

const Sobre = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container">
      {/* Hero */}
      <FadeIn>
        <div className="max-w-3xl mb-20">
          <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-primary/10">A Nossa História</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Construímos sistemas que trabalham por si.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A Flowen nasceu da frustração com processos manuais repetitivos que consomem tempo e energia das equipas. Acreditamos que a tecnologia deve libertar as pessoas, não sobrecarregá-las.
          </p>
        </div>
      </FadeIn>

      {/* Missão e Valores */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map((v, i) => (
            <div key={i} className="gradient-border rounded-xl p-8 bg-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <v.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Números */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-card gradient-border">
              <p className="font-display text-3xl sm:text-4xl font-bold mb-2 gradient-text">
                {s.animate ? <NumberTicker value={s.value!} suffix={s.suffix} /> : s.text}
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Equipa */}
      <FadeIn delay={0.3}>
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">A Equipa</p>
        <h2 className="font-display text-3xl font-bold mb-8">Quem está por trás da Flowen.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {team.map((t, i) => (
            <div key={i} className="gradient-border rounded-xl p-8 bg-card">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-display text-2xl font-bold text-primary">{t.initial}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-1">{t.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{t.role}</p>
              <p className="text-muted-foreground text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.4}>
        <div className="text-center py-16 px-8 rounded-2xl gradient-border bg-card">
          <h2 className="font-display text-3xl font-bold mb-4">Prontos para automatizar o vosso negócio?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Descubra como a Flowen pode transformar as operações da sua clínica ou negócio local.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacto"><Button variant="hero" size="lg">Falar Connosco</Button></Link>
            <Link to="/pacotes"><Button variant="heroOutline" size="lg">Ver Pacotes</Button></Link>
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
);

export default Sobre;
