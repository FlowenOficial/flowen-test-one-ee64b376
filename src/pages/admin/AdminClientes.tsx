import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { mockClients, AdminClient } from "./adminData";
import { Link } from "react-router-dom";
import EmptyState from "@/components/EmptyState";

export default function AdminClientes() {
  const [clients, setClients] = useState<AdminClient[]>(mockClients);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("todos");

  const toggleEstado = (id: number) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, estado: c.estado === "Ativo" ? "Suspenso" : "Ativo" } : c));
  };

  const filtered = clients
    .filter(c => c.clinica.toLowerCase().includes(search.toLowerCase()))
    .filter(c => tab === "todos" || c.plano.toLowerCase() === tab);

  const planBadge = (p: string) => p === "Executive" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : p === "Scale" ? "bg-primary/20 text-primary border-primary/30" : "bg-muted text-muted-foreground";

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Clientes</h2>
      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Pesquisar clínica..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="prime">Prime</TabsTrigger>
          <TabsTrigger value="scale">Scale</TabsTrigger>
          <TabsTrigger value="executive">Executive</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <EmptyState icon={Search} title="Nenhum cliente encontrado" description="Tenta pesquisar por outro nome ou email." />
          ) : (
          <div className="gradient-border rounded-xl bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="p-4 font-medium">Clínica</th>
                  <th className="p-4 font-medium hidden md:table-cell">Email</th>
                  <th className="p-4 font-medium">Plano</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4 font-medium hidden md:table-cell">Faturação</th>
                  <th className="p-4 font-medium hidden md:table-cell">Escalações</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-border/50">
                    <td className="p-4 font-medium">{c.clinica}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{c.email}</td>
                    <td className="p-4"><Badge className={`text-[10px] ${planBadge(c.plano)}`}>{c.plano}</Badge></td>
                    <td className="p-4"><Badge className={`text-[10px] ${c.estado === "Ativo" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>{c.estado}</Badge></td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{c.proximaFaturacao}</td>
                    <td className="p-4 hidden md:table-cell">{c.escalacoes}</td>
                    <td className="p-4 space-x-2">
                      <Link to={`/admin/clientes/${c.id}`}><Button variant="outline" size="sm">Ver</Button></Link>
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => toggleEstado(c.id)}>
                        {c.estado === "Ativo" ? "Suspender" : "Reativar"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </TabsContent>
      </Tabs>
    </FadeIn>
  );
}
