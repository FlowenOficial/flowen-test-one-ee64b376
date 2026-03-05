import FadeIn from "@/components/FadeIn";
import { Target, Eye, Lightbulb, Handshake } from "lucide-react";

const values = [
  { icon: Target, title: "Precisão", desc: "Cada sistema é construído com rigor e atenção ao detalhe." },
  { icon: Eye, title: "Transparência", desc: "Relatórios claros e comunicação direta em todas as fases." },
  { icon: Lightbulb, title: "Inovação", desc: "Soluções que acompanham as melhores práticas tecnológicas." },
  { icon: Handshake, title: "Parceria", desc: "Não somos fornecedores. Somos parceiros de crescimento." },
];

const Sobre = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container">
      <FadeIn>
        <div className="max-w-2xl mb-20">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Sobre Nós</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Criamos sistemas que devolvem controlo, margem e escalabilidade.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A Flowen nasceu da convicção de que negócios locais merecem a mesma eficiência operacional 
            das grandes empresas tecnológicas. Fundada por Caetano e Renato, a nossa missão é clara: 
            eliminar processos manuais e construir infraestruturas que funcionam autonomamente.
          </p>
        </div>
      </FadeIn>

      {/* Founders */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            { name: "Caetano", role: "Co-Fundador", desc: "Estratégia e arquitetura de sistemas operacionais." },
            { name: "Renato", role: "Co-Fundador", desc: "Desenvolvimento técnico e integração de automações." },
          ].map((founder, i) => (
            <div key={i} className="gradient-border rounded-xl p-8 bg-card">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-display text-2xl font-bold text-primary">{founder.name[0]}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-1">{founder.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{founder.role}</p>
              <p className="text-muted-foreground text-sm">{founder.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Values */}
      <FadeIn delay={0.2}>
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Os Nossos Valores</p>
        <h2 className="font-display text-3xl font-bold mb-12">Como trabalhamos.</h2>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </div>
);

export default Sobre;
