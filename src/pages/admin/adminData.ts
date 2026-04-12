export interface AdminClient {
  id: number;
  clinica: string;
  email: string;
  telefone: string;
  plano: "Prime" | "Scale" | "Executive";
  estado: "Ativo" | "Suspenso";
  proximaFaturacao: string;
  escalacoes: number;
  dataAdesao: string;
}

export const mockClients: AdminClient[] = [
  { id: 1, clinica: "Clínica São João", email: "joao@clinicasaojoao.pt", telefone: "912 345 678", plano: "Scale", estado: "Ativo", proximaFaturacao: "28 Abr", escalacoes: 3, dataAdesao: "15 Jan 2025" },
  { id: 2, clinica: "Centro Médico Lisboa", email: "admin@centromedlisboa.pt", telefone: "923 456 789", plano: "Executive", estado: "Ativo", proximaFaturacao: "30 Abr", escalacoes: 7, dataAdesao: "02 Nov 2024" },
  { id: 3, clinica: "Fisioterapia Norte", email: "norte@fisioterapia.pt", telefone: "934 567 890", plano: "Prime", estado: "Ativo", proximaFaturacao: "25 Abr", escalacoes: 1, dataAdesao: "20 Mar 2025" },
  { id: 4, clinica: "Clínica Dental Porto", email: "porto@dentalprime.pt", telefone: "915 678 901", plano: "Scale", estado: "Ativo", proximaFaturacao: "28 Abr", escalacoes: 2, dataAdesao: "10 Fev 2025" },
  { id: 5, clinica: "Nutri Saúde", email: "info@nutrisaude.pt", telefone: "926 789 012", plano: "Prime", estado: "Suspenso", proximaFaturacao: "—", escalacoes: 0, dataAdesao: "05 Dez 2024" },
  { id: 6, clinica: "Psicologia Online", email: "geral@psicologiaonline.pt", telefone: "937 890 123", plano: "Scale", estado: "Ativo", proximaFaturacao: "29 Abr", escalacoes: 4, dataAdesao: "18 Jan 2025" },
  { id: 7, clinica: "Centro de Bem-Estar", email: "bemestar@clinica.pt", telefone: "918 901 234", plano: "Executive", estado: "Ativo", proximaFaturacao: "01 Mai", escalacoes: 5, dataAdesao: "01 Out 2024" },
  { id: 8, clinica: "Clínica Familiar Algarve", email: "algarve@clinicafamiliar.pt", telefone: "929 012 345", plano: "Prime", estado: "Ativo", proximaFaturacao: "26 Abr", escalacoes: 0, dataAdesao: "28 Mar 2025" },
];

export const mockEscalacoes = [
  { id: 1, clinica: "Centro Médico Lisboa", paciente: "Maria Santos", motivo: "Pedido de receita médica urgente", data: "12 Abr, 14:32", status: "pendente" as const },
  { id: 2, clinica: "Clínica São João", paciente: "João Costa", motivo: "Reclamação sobre faturação incorreta", data: "12 Abr, 13:15", status: "pendente" as const },
  { id: 3, clinica: "Centro Médico Lisboa", paciente: "Ana Silva", motivo: "Alteração de horário não processada", data: "12 Abr, 11:40", status: "resolvido" as const },
  { id: 4, clinica: "Psicologia Online", paciente: "Pedro Reis", motivo: "Dúvida sobre tratamento em curso", data: "11 Abr, 16:22", status: "resolvido" as const },
  { id: 5, clinica: "Centro de Bem-Estar", paciente: "Carla Mendes", motivo: "Cancelamento urgente de consulta", data: "11 Abr, 14:05", status: "pendente" as const },
  { id: 6, clinica: "Clínica Dental Porto", paciente: "Sofia Almeida", motivo: "Pedido de relatório médico", data: "11 Abr, 10:30", status: "resolvido" as const },
  { id: 7, clinica: "Clínica São João", paciente: "Ricardo Lopes", motivo: "Problema com confirmação automática", data: "10 Abr, 15:45", status: "resolvido" as const },
  { id: 8, clinica: "Centro Médico Lisboa", paciente: "Marta Ferreira", motivo: "Reembolso não recebido", data: "10 Abr, 11:10", status: "resolvido" as const },
  { id: 9, clinica: "Psicologia Online", paciente: "Luís Nunes", motivo: "Erro no agendamento automático", data: "10 Abr, 09:30", status: "pendente" as const },
  { id: 10, clinica: "Centro de Bem-Estar", paciente: "Teresa Rocha", motivo: "Pedido de segunda opinião", data: "09 Abr, 16:50", status: "resolvido" as const },
  { id: 11, clinica: "Fisioterapia Norte", paciente: "Bruno Dias", motivo: "Atraso no follow-up", data: "09 Abr, 14:20", status: "resolvido" as const },
  { id: 12, clinica: "Centro Médico Lisboa", paciente: "Inês Martins", motivo: "Conflito de horário", data: "09 Abr, 11:00", status: "pendente" as const },
  { id: 13, clinica: "Clínica Dental Porto", paciente: "Tiago Oliveira", motivo: "Pagamento não confirmado", data: "08 Abr, 15:30", status: "resolvido" as const },
  { id: 14, clinica: "Centro de Bem-Estar", paciente: "Filipa Sousa", motivo: "Dúvida sobre faturação", data: "08 Abr, 10:15", status: "pendente" as const },
  { id: 15, clinica: "Psicologia Online", paciente: "André Pereira", motivo: "Pedido de cancelamento", data: "07 Abr, 14:00", status: "resolvido" as const },
];

export const mockPagamentos = [
  { id: 1, clinica: "Clínica São João", plano: "Scale", valor: "€199", data: "01 Abr 2026", estado: "Pago" as const, metodo: "Transferência" },
  { id: 2, clinica: "Centro Médico Lisboa", plano: "Executive", valor: "€349", data: "01 Abr 2026", estado: "Pago" as const, metodo: "MBway" },
  { id: 3, clinica: "Fisioterapia Norte", plano: "Prime", valor: "€129", data: "01 Abr 2026", estado: "Pago" as const, metodo: "Cartão" },
  { id: 4, clinica: "Clínica Dental Porto", plano: "Scale", valor: "€199", data: "01 Abr 2026", estado: "Pago" as const, metodo: "Transferência" },
  { id: 5, clinica: "Nutri Saúde", plano: "Prime", valor: "€129", data: "01 Abr 2026", estado: "Falhado" as const, metodo: "Cartão" },
  { id: 6, clinica: "Psicologia Online", plano: "Scale", valor: "€199", data: "01 Abr 2026", estado: "Pago" as const, metodo: "MBway" },
  { id: 7, clinica: "Centro de Bem-Estar", plano: "Executive", valor: "€349", data: "01 Abr 2026", estado: "Pago" as const, metodo: "Transferência" },
  { id: 8, clinica: "Clínica Familiar Algarve", plano: "Prime", valor: "€129", data: "01 Abr 2026", estado: "Pago" as const, metodo: "Cartão" },
  { id: 9, clinica: "Clínica São João", plano: "Scale", valor: "€199", data: "01 Mar 2026", estado: "Pago" as const, metodo: "Transferência" },
  { id: 10, clinica: "Centro Médico Lisboa", plano: "Executive", valor: "€349", data: "01 Mar 2026", estado: "Pago" as const, metodo: "MBway" },
  { id: 11, clinica: "Nutri Saúde", plano: "Prime", valor: "€129", data: "01 Mar 2026", estado: "Falhado" as const, metodo: "Cartão" },
  { id: 12, clinica: "Psicologia Online", plano: "Scale", valor: "€199", data: "01 Mar 2026", estado: "Pendente" as const, metodo: "MBway" },
];
