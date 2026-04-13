import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-[aurora1_8s_ease-in-out_infinite]" />
    <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/8 blur-[100px] animate-[aurora2_10s_ease-in-out_infinite]" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
  </div>
);

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <AuroraBackground />
      <div className="text-center relative z-10">
        <h1 className="text-[120px] sm:text-[180px] font-display font-bold leading-none gradient-text-animated animate-pulse">
          404
        </h1>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          A página que procuras não existe ou foi movida. Não te preocupes, acontece aos melhores sistemas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/"><Button variant="hero" size="lg">Voltar ao Início</Button></Link>
          <Link to="/pacotes"><Button variant="heroOutline" size="lg">Ver Pacotes</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
