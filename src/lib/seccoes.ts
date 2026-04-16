export interface Seccao {
  id: string;
  label: string;
  tipo: 'sidebar_principal' | 'sidebar_conta' | 'sidebar_feature';
  descricao: string;
}

export const TODAS_SECCOES: Seccao[] = [
  { id: 'visao_geral', label: 'Visão Geral', tipo: 'sidebar_principal', descricao: 'Dashboard principal com KPIs e gráficos' },
  { id: 'calendario', label: 'Calendário', tipo: 'sidebar_principal', descricao: 'Calendário de agendamentos' },
  { id: 'suporte', label: 'Suporte', tipo: 'sidebar_principal', descricao: 'Página de suporte' },
  { id: 'relatorios', label: 'Relatórios', tipo: 'sidebar_principal', descricao: 'Relatórios mensais automáticos' },
  { id: 'escalacoes', label: 'Escalações', tipo: 'sidebar_conta', descricao: 'Lista de escalações da Fernanda' },
  { id: 'subscricao', label: 'Subscrição', tipo: 'sidebar_conta', descricao: 'Plano e histórico de pagamentos' },
  { id: 'notificacoes', label: 'Notificações', tipo: 'sidebar_conta', descricao: 'Centro de notificações' },
  { id: 'risco', label: 'Pacientes em Risco', tipo: 'sidebar_conta', descricao: 'Pacientes inativos' },
  { id: 'triagens', label: 'Triagens', tipo: 'sidebar_conta', descricao: 'Histórico de triagens' },
  { id: 'configuracoes', label: 'Configurações', tipo: 'sidebar_conta', descricao: 'Configurações da conta' },
  { id: 'atendimento', label: 'Agente de Atendimento', tipo: 'sidebar_feature', descricao: 'Agente de atendimento 24/7' },
  { id: 'agendamento', label: 'Agente de Agendamento', tipo: 'sidebar_feature', descricao: 'Agendamento automático' },
  { id: 'lembretes', label: 'Agente de Lembretes', tipo: 'sidebar_feature', descricao: 'Lembretes anti-faltas' },
  { id: 'relatorios_feature', label: 'Relatórios Mensais', tipo: 'sidebar_feature', descricao: 'Relatórios automáticos' },
  { id: 'prioridade', label: 'Gestão de Prioridade', tipo: 'sidebar_feature', descricao: 'Triagem de urgências' },
  { id: 'followup', label: 'Follow-Up e Relacionamento', tipo: 'sidebar_feature', descricao: 'Follow-ups automáticos' },
];

export interface ConfigSeccao {
  activa: boolean;
  modo: 'ocultar' | 'em_breve';
}

export type ConfigSeccoes = Record<string, ConfigSeccao>;

export function getConfigSeccoes(clienteId: number): ConfigSeccoes {
  const saved = localStorage.getItem(`flowen_seccoes_${clienteId}`);
  if (saved) return JSON.parse(saved);
  const config: ConfigSeccoes = {};
  TODAS_SECCOES.forEach(s => { config[s.id] = { activa: true, modo: 'em_breve' }; });
  return config;
}

export function saveConfigSeccoes(clienteId: number, config: ConfigSeccoes) {
  localStorage.setItem(`flowen_seccoes_${clienteId}`, JSON.stringify(config));
}
