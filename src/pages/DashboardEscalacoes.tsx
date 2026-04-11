import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Escalacao {
  id: number;
  paciente: string;
  telefone: string;
  mensagem: string;
  data: string;
  status: "pendente" | "resolvido";
}

const initialData: Escalacao[] = [
  { id: 1, paciente: "Maria Santos", telefone: "912 345 678", mensagem: "Pedido de receita médica urgente", data: "11 Abr, 14:32", status: "pendente" },
  { id: 2, paciente: "João Costa", telefone: "923 456 789", mensagem: "Reclamação sobre faturação incorreta", data: "11 Abr, 13:15", status: "pendente" },
  { id: 3, paciente: "Ana Silva", telefone: "934 567 890", mensagem: "Alteração de horário não processada", data: "11 Abr, 11:40", status: "resolvido" },
  { id: 4, paciente: "Pedro Reis", telefone: "915 678 901", mensagem: "Dúvida sobre tratamento em curso", data: "10 Abr, 16:22", status: "resolvido" },
  { id: 5, paciente: "Carla Mendes", telefone: "926 789 012", mensagem: "Cancelamento urgente de consulta", data: "10 Abr, 14:05", status: "pendente" },
  { id: 6, paciente: "Sofia Almeida", telefone: "937 890 123", mensagem: "Pedido de relatório médico", data: "10 Abr, 10:30", status: "resolvido" },
  { id: 7, paciente: "Ricardo Lopes", telefone: "918 901 234", mensagem: "Problema com confirmação automática", data: "09 Abr, 15:45", status: "resolvido" },
  { id: 8, paciente: "Marta Ferreira", telefone: "929 012 345", mensagem: "Reembolso não recebido", data: "09 Abr, 11:10", status: "resolvido" },
];

export default function DashboardEscalacoes() {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("todas");

  const markResolved = (id: number) => {
    setData(prev => prev.map(e => e.id === id ? { ...e, status: "resolvido" } : e));
  };

  const filtered = tab === "todas" ? data : data.filter(e => e.status === (tab === "pendentes" ? "pendente" : "resolvido"));

  return (
    <FadeIn>
      <h2 className="font-display text-2xl font-bold mb-6">Escalações</h2>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="resolvidas">Resolvidas</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          <div className="gradient-border rounded-xl bg-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="p-4 font-medium">Paciente</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Telefone</th>
                  <th className="p-4 font-medium">Mensagem</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Data</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} className="border-b border-border/50">
                    <td className="p-4 font-medium">{e.paciente}</td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{e.telefone}</td>
                    <td className="p-4">{e.mensagem}</td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{e.data}</td>
                    <td className="p-4">
                      <Badge className={`text-[10px] ${e.status === "resolvido" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`}>
                        {e.status === "resolvido" ? "Resolvido" : "Pendente"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {e.status === "pendente" && (
                        <Button variant="outline" size="sm" onClick={() => markResolved(e.id)}>
                          Marcar Resolvido
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </FadeIn>
  );
}
