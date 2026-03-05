import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", telefone: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensagem enviada!", description: "Entraremos em contacto brevemente." });
    setForm({ nome: "", empresa: "", email: "", telefone: "", mensagem: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-2xl">
        <FadeIn>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Contacto</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Fale connosco.</h1>
          <p className="text-muted-foreground text-lg mb-12">
            Preencha o formulário ou contacte-nos diretamente pelo WhatsApp.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="O seu nome" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input id="empresa" placeholder="Nome da empresa" value={form.empresa} onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemplo.pt" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="+351 ..." value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" placeholder="Descreva o que pretende automatizar..." rows={5} value={form.mensagem} onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))} required />
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full">
              Enviar Mensagem <Send size={18} />
            </Button>
          </form>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <p className="text-muted-foreground text-sm mb-4">Ou contacte-nos diretamente</p>
            <a href="https://wa.me/351000000000" target="_blank" rel="noopener noreferrer">
              <Button variant="heroOutline" size="lg">
                <MessageCircle size={18} /> WhatsApp
              </Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Contacto;
