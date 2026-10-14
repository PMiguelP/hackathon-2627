export type ServiceCategory =
  | 'todos'
  | 'emergencia'
  | 'cidadao'
  | 'restauracao'
  | 'saude_util';

export type VianaService = {
  id: string;
  name: string;
  category: Exclude<ServiceCategory, 'todos'>;
  categoryLabel: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  schedule: string;
  badge?: string;
  badgeType?: 'danger' | 'success' | 'gold' | 'info';
  description: string;
  details?: string[];
  iconName:
    | 'shield'
    | 'fire'
    | 'hospital'
    | 'building'
    | 'food'
    | 'train'
    | 'capsule'
    | 'phone';
};

export const SERVICE_CATEGORIES: { id: ServiceCategory; label: string; icon: string }[] = [
  { id: 'todos', label: 'Tudo', icon: 'all' },
  { id: 'emergencia', label: 'Emergência & GNR', icon: 'shield' },
  { id: 'cidadao', label: 'Loja Cidadão & Apoio', icon: 'building' },
  { id: 'restauracao', label: 'Restauração Típica', icon: 'food' },
  { id: 'saude_util', label: 'Saúde & Transportes', icon: 'hospital' },
];

export const VIANA_SERVICES: VianaService[] = [
  // --- EMERGÊNCIA & SEGURANÇA ---
  {
    id: 's-bombeiros-vol',
    name: 'Bombeiros Voluntários de Viana',
    category: 'emergencia',
    categoryLabel: 'Bombeiros & Socorro',
    phone: '258822022',
    phoneDisplay: '258 822 022',
    address: 'Rua de Monserrate, Viana do Castelo',
    schedule: 'Serviço Permanente 24h / 7 dias',
    badge: '24 HORAS',
    badgeType: 'danger',
    description: 'Socorro urgente a feridos, combate a incêndios e apoio em acidentes no concelho.',
    details: [
      'Ambulâncias de emergência e transporte de doentes',
      'Desencarceramento e acidentes rodoviários',
      'Combate a incêndios urbanos e rurais',
      'Apoio em cheias e inundações no Rio Lima',
    ],
    iconName: 'fire',
  },
  {
    id: 's-bombeiros-sap',
    name: 'Bombeiros Sapadores Municipais',
    category: 'emergencia',
    categoryLabel: 'Proteção Civil Municipal',
    phone: '258840400',
    phoneDisplay: '258 840 400',
    address: 'Meadela, Viana do Castelo',
    schedule: 'Serviço Permanente 24h',
    badge: '24 HORAS',
    badgeType: 'danger',
    description: 'Corpo profissional de sapadores municipais de Viana do Castelo.',
    details: [
      'Prevenção e segurança em edifícios e recintos públicos',
      'Resgate aquático no mar e estuário do Lima',
      'Intervenção técnica e proteção civil',
    ],
    iconName: 'fire',
  },
  {
    id: 's-gnr',
    name: 'GNR — Guarda Nacional Republicana',
    category: 'emergencia',
    categoryLabel: 'Segurança & Trânsito',
    phone: '258800200',
    phoneDisplay: '258 800 200',
    address: 'Lugar de Santoinho, Darque, Viana do Castelo',
    schedule: 'Atendimento Permanente 24h',
    badge: '24 HORAS',
    badgeType: 'danger',
    description: 'Destacamento Territorial de Viana. Policiamento rural, estradas nacionais e controlo costeiro.',
    details: [
      'Posto Territorial e Núcleo de Trânsito',
      'Policiamento de proteção da natureza e ambiente (SEPNA)',
      'Apoio a vítimas de violência doméstica (NIAVE)',
      'Emergência nacional: 112',
    ],
    iconName: 'shield',
  },
  {
    id: 's-psp',
    name: 'PSP — Polícia de Segurança Pública',
    category: 'emergencia',
    categoryLabel: 'Policiamento Urbano',
    phone: '258809440',
    phoneDisplay: '258 809 440',
    address: 'Rua de Santa Clara, 4900-322 Viana do Castelo',
    schedule: 'Atendimento Permanente 24h',
    badge: '24 HORAS',
    badgeType: 'danger',
    description: 'Comando Distrital de Viana. Policiamento do centro da cidade, trânsito urbano e perdidos e achados.',
    details: [
      'Atendimento e queixas na esquadra do centro histórico',
      'Licenciamento de armas e segurança privada',
      'Programa Escola Segura e apoio ao comércio local',
    ],
    iconName: 'shield',
  },
  {
    id: 's-hospital',
    name: 'Hospital de Santa Luzia (ULS Alto Minho)',
    category: 'emergencia',
    categoryLabel: 'Hospital Distrital',
    phone: '258802100',
    phoneDisplay: '258 802 100',
    address: 'Estrada de Santa Luzia, Viana do Castelo',
    schedule: 'Urgência Geral e Pediátrica 24h',
    badge: 'URGÊNCIA 24H',
    badgeType: 'danger',
    description: 'Hospital público central do distrito de Viana do Castelo com urgências e todas as especialidades.',
    details: [
      'Serviço de Atendimento Permanente (SAP)',
      'Urgência Geral, Pediátrica e Obstétrica',
      'Consultas externas e internamento',
      'Linha SNS 24: 808 24 24 24',
    ],
    iconName: 'hospital',
  },

  // --- LOJA DO CIDADÃO & SERVIÇOS PÚBLICOS ---
  {
    id: 's-loja-cidadao',
    name: 'Loja do Cidadão de Viana do Castelo',
    category: 'cidadao',
    categoryLabel: 'Cidadania & Documentos',
    phone: '300003990',
    phoneDisplay: '300 003 990 / 258 000 000',
    address: 'Passeio das Mordomas da Romaria, Antiga Alfândega',
    schedule: 'Segunda a Sexta: 08:30 – 19:30 | Sábado: 09:30 – 15:00',
    badge: 'SERVIÇO INTEGRADO',
    badgeType: 'gold',
    description: 'Balcão único central para renovação de documentos, Finanças, Segurança Social e NIF.',
    details: [
      'IRN: Cartão de Cidadão, Passaporte e Registo Civil',
      'Finanças (AT): Obtenção de NIF, início de atividade e certidões',
      'Segurança Social: NISS, abonos e prestações sociais',
      'Espaço Cidadão: Chave Móvel Digital, carta de condução e ADSE',
    ],
    iconName: 'building',
  },
  {
    id: 's-camara-municipal',
    name: 'Câmara Municipal de Viana do Castelo',
    category: 'cidadao',
    categoryLabel: 'Administração Municipal',
    phone: '258809300',
    phoneDisplay: '258 809 300',
    address: 'Passeio das Mordomas da Romaria, 4904-877 Viana',
    schedule: 'Segunda a Sexta: 09:00 – 16:30',
    badge: 'MUNICÍPIO',
    badgeType: 'info',
    description: 'Atendimento geral ao munícipe, urbanismo, ação social, juventude, taxas e habitação.',
    details: [
      'Gabinete de Apoio ao Emigrante e Recém-Chegado',
      'Educação, Bolsas Municipais e Cartão Viana Jovem',
      'Licenciamento e Certidões de Habitação',
      'Ambiente, recolha de monos e água municipal',
    ],
    iconName: 'building',
  },
  {
    id: 's-sas-ipvc',
    name: 'SAS-IPVC (Ação Social Universitária)',
    category: 'cidadao',
    categoryLabel: 'Apoio ao Estudante',
    phone: '258825472',
    phoneDisplay: '258 825 472',
    address: 'Largo Florêncio Barbosa, Centro Histórico',
    schedule: 'Segunda a Sexta: 09:00 – 17:00',
    badge: 'ESTUDANTES IPVC',
    badgeType: 'info',
    description: 'Apoio aos estudantes do Politécnico: cantinas, residências, bolsas e saúde universitária.',
    details: [
      'Gestão das residências de estudantes em Viana',
      'Cantinas e senhas de refeição subsidiadas',
      'Gabinete de apoio psicológico e bem-estar',
      'Bolsas de estudo DGES',
    ],
    iconName: 'building',
  },

  // --- RESTAURAÇÃO TÍPICA DE VIANA ---
  {
    id: 's-natario',
    name: 'Pastelaria Manuel Natário',
    category: 'restauracao',
    categoryLabel: 'Pastelaria Histórica',
    phone: '258822173',
    phoneDisplay: '258 822 173',
    address: 'Rua Manuel Espregueira, 37, Viana do Castelo',
    schedule: 'Quarta a Segunda: 08:00 – 20:00 (Terça encerrado)',
    badge: 'ÍCONE DE VIANA',
    badgeType: 'gold',
    description: 'A mítica pastelaria das autênticas Bolas de Berlim de Viana, servidas quentes com canela.',
    details: [
      'Bolas de Berlim com creme especial cozinhado na hora',
      'Sidónios e Meias-Luas tradicionais de Viana',
      'Torta de Viana e doçaria conventual do Minho',
      'Fornos a sair pelas 11h e 16h',
    ],
    iconName: 'food',
  },
  {
    id: 's-tasquinha-linda',
    name: 'Tasquinha da Linda',
    category: 'restauracao',
    categoryLabel: 'Peixe & Marisco da Costa',
    phone: '258847900',
    phoneDisplay: '258 847 900',
    address: 'Doca das Marés, Ribeira de Viana do Castelo',
    schedule: 'Terça a Domingo: 12:30 – 15:30 / 19:30 – 22:30',
    badge: 'DOCA DE VIANA',
    badgeType: 'gold',
    description: 'Referência gastronómica de peixe fresco e marisco pescado na nossa costa e preparado ao natural.',
    details: [
      'Robalo e pregado selvagem na brasa',
      'Perceves da costa vianense e santola recheada',
      'Vinho Verde de produtores do Vale do Lima',
      'Esplanada virada para a doca das marés',
    ],
    iconName: 'food',
  },
  {
    id: 's-camelo',
    name: 'Restaurante Camelo',
    category: 'restauracao',
    categoryLabel: 'Gastronomia Minhota',
    phone: '258839070',
    phoneDisplay: '258 839 070',
    address: 'Estrada de Santa Marta, Santa Marta de Portuzelo',
    schedule: 'Terça a Domingo: 12:00 – 15:30 / 19:30 – 22:30',
    badge: 'TRADIÇÃO',
    badgeType: 'gold',
    description: 'Cozinha tradicional minhota de excelência: bacalhau dourado, rojões e cabrito no forno.',
    details: [
      'Famoso Bacalhau à Camelo',
      'Papas de Sarrabulho e Rojões à Moda do Minho',
      'Ambiente rústico com trajes e filigranas de Viana',
      'Sobremesas conventuais caseiras',
    ],
    iconName: 'food',
  },
  {
    id: 's-pescador',
    name: 'Restaurante O Pescador',
    category: 'restauracao',
    categoryLabel: 'Cozinha de Pescadores',
    phone: '258826039',
    phoneDisplay: '258 826 039',
    address: 'Largo da Ribeira, 4900-362 Viana do Castelo',
    schedule: 'Segunda a Sábado: 12:00 – 15:00 / 19:00 – 22:30',
    badge: 'POPULAR',
    badgeType: 'gold',
    description: 'Ambiente genuíno no coração da Ribeira. Arroz de tamboril e sardinha fresca da faina.',
    details: [
      'Arroz de marisco e caldeirada de peixe',
      'Pratos do dia económicos com sabor tradicional',
      'Localização típica no bairro dos pescadores',
    ],
    iconName: 'food',
  },

  // --- SAÚDE & TRANSPORTES ÚTEIS ---
  {
    id: 's-farmacia-central',
    name: 'Farmácia Central (Serviço de Turno)',
    category: 'saude_util',
    categoryLabel: 'Farmácia & Medicamentos',
    phone: '258822284',
    phoneDisplay: '258 822 284',
    address: 'Praça da República, 14, Centro Histórico',
    schedule: 'Seg-Sáb: 08:30 – 20:00 (Turnos noturnos rotativos)',
    badge: 'CENTRO HISTÓRICO',
    badgeType: 'success',
    description: 'Farmácia de referência no centro histórico de Viana. Apoio em medicamentos urgentes.',
    details: [
      'Dispensação de receituário do SNS',
      'Medição de tensão arterial e glicémia',
      'Consulta da farmácia de serviço noturna no concelho',
    ],
    iconName: 'capsule',
  },
  {
    id: 's-estacao-comboios',
    name: 'Estação Ferroviária & Terminal CP',
    category: 'saude_util',
    categoryLabel: 'Comboios & Transportes',
    phone: '218360600',
    phoneDisplay: '218 360 600 (Linha CP)',
    address: 'Avenida dos Combatentes da Grande Guerra, Viana',
    schedule: 'Bilheteiras: 06:00 – 21:30 | Circulação diária',
    badge: 'LINHA DO MINHO',
    badgeType: 'info',
    description: 'Ligações ferroviárias da Linha do Minho: Porto, Braga, Valença e Vigo (Espanha).',
    details: [
      'Comboios Intercidades e Regionais para o Porto',
      'Comboio Celta direto para Vigo (Galiza)',
      'Ligação ao Terminal Rodoviário contíguo',
      'Paragem de táxis e autocarros urbanos à porta',
    ],
    iconName: 'train',
  },
  {
    id: 's-terminal-rodoviario',
    name: 'Terminal Rodoviário de Viana',
    category: 'saude_util',
    categoryLabel: 'Autocarros Regionais e Expresso',
    phone: '258800330',
    phoneDisplay: '258 800 330',
    address: 'Campo do Castelo / Junto ao Viana Shopping',
    schedule: 'Segunda a Domingo: 06:30 – 20:30',
    badge: 'REDE EXPRESSOS',
    badgeType: 'info',
    description: 'Autocarros urbanos para praias (Cabedelo, Afife), freguesias e rede nacional de expressos.',
    details: [
      'Linhas urbanas TUV (Transportes Urbanos de Viana)',
      'Carreiras diretas para o Cabedelo e praias de surf',
      'Rede Expressos e FlixBus para Lisboa, Porto e Coimbra',
    ],
    iconName: 'train',
  },
];
