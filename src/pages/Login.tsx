import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder auth — will be replaced with real auth
    if (email && password) {
      localStorage.setItem("flowen_auth", "true");
      navigate("/dashboard");
    } else {
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="w-full max-w-md px-4">
        <FadeIn>
          <div className="gradient-border rounded-xl p-8 bg-card">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold gradient-text mb-2">Área de Cliente</h1>
              <p className="text-sm text-muted-foreground">Aceda ao seu painel de controlo Flowen.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="email@exemplo.pt" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Palavra-passe</Label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
              </div>
              <Button variant="hero" size="lg" type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Login;
