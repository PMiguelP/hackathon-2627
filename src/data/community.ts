import type { ImageSourcePropType } from 'react-native';

import { IMAGES } from '@/data/images';

/** Dados de exemplo da Comunidade e do Mapa (mock). */

export type GroupChatMessage = {
  id: string;
  author: string;
  text: string;
  time: string;
  isMe?: boolean;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  members: number;
  emoji: string;
  image: ImageSourcePropType;
  lastMessage: {
    author: string;
    text: string;
    time: string;
  };
  unreadCount?: number;
  tags: string[];
  chatMessages: GroupChatMessage[];
};

export const GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Estudantes IPVC',
    description: 'Comunidade académica de todos os pólos do IPVC em Viana. Apoio a aulas, alojamento e convívios.',
    members: 412,
    emoji: '🎓',
    image: IMAGES.comunidade,
    lastMessage: {
      author: 'Inês Costa',
      text: 'Convívio na quinta às 18h na Praça da República! ☕',
      time: '14:20',
    },
    unreadCount: 2,
    tags: ['IPVC', 'Estudos', 'Alojamento', 'Convívio'],
    chatMessages: [
      { id: 'm1', author: 'Lucas Moreira', text: 'Boas malta! Alguém vai para a biblioteca do IPVC estudar hoje à tarde?', time: '13:45' },
      { id: 'm2', author: 'Mateus Fontes', text: 'Eu vou por volta das 15h. Tenho trabalho para entregar.', time: '13:58' },
      { id: 'm3', author: 'Inês Costa', text: 'Malta, não se esqueçam do café de boas-vindas na quinta às 18h na Praça da República! ☕', time: '14:20' },
    ],
  },
  {
    id: 'g2',
    name: 'Recém-chegados a Viana',
    description: 'Ponto de encontro para quem chegou recentemente a Viana do Castelo. Dicas de integração, serviços e amizade.',
    members: 238,
    emoji: '🧳',
    image: IMAGES.praca,
    lastMessage: {
      author: 'Amir Haddad',
      text: 'Amanhã vou à Loja do Cidadão tratar do NIF, alguém precisa de companhia?',
      time: '12:15',
    },
    unreadCount: 1,
    tags: ['Integração', 'Acolhimento', 'Dicas', 'Viana'],
    chatMessages: [
      { id: 'm1', author: 'Carla Pires', text: 'Olá a todos! Para quem chegou esta semana, recomendo fazerem o cartão de residente para descontos nos transportes.', time: '11:30' },
      { id: 'm2', author: 'Amir Haddad', text: 'Amanhã vou à Loja do Cidadão tratar do NIF, alguém precisa de companhia?', time: '12:15' },
    ],
  },
  {
    id: 'g3',
    name: 'Surf no Cabedelo',
    description: 'Surfistas e amantes do mar no Cabedelo. Partilha diária de condições, vento e boleias.',
    members: 175,
    emoji: '🏄',
    image: IMAGES.cabedelo,
    lastMessage: {
      author: 'Tomás Alvim',
      text: 'Cabedelo com 1.2m sem vento! Entro às 16h.',
      time: '14:05',
    },
    tags: ['Surf', 'Cabedelo', 'Mar', 'Ondas'],
    chatMessages: [
      { id: 'm1', author: 'Inês Costa', text: 'Como está o mar hoje no Cabedelo?', time: '13:50' },
      { id: 'm2', author: 'Tomás Alvim', text: 'Cabedelo com 1.2m sem vento! Entro às 16h.', time: '14:05' },
    ],
  },
  {
    id: 'g4',
    name: 'Tradições & Folclore de Viana',
    description: 'Preservação dos cantares, trajes à vianesa, concertinas, lenços de namorados e ensaios da Romaria.',
    members: 96,
    emoji: '💃',
    image: IMAGES.traje,
    lastMessage: {
      author: 'João Pereira',
      text: 'Ensaio de concertinas no sábado às 17h em Santa Marta!',
      time: 'Ontem',
    },
    tags: ['Traje', 'Folclore', 'Romaria', 'Música'],
    chatMessages: [
      { id: 'm1', author: 'D. Rosa', text: 'Viva malta nova! Quem quiser aprender o ponto de cruz dos lenços tradicionais avise.', time: 'Ontem 16:00' },
      { id: 'm2', author: 'João Pereira', text: 'Ensaio de concertinas no sábado às 17h em Santa Marta!', time: 'Ontem 18:30' },
    ],
  },
  {
    id: 'g5',
    name: 'Voluntários de Viana',
    description: 'Projetos solidários, limpeza de praias, apoio comunitário e preparação dos tapetes de flores.',
    members: 143,
    emoji: '🤝',
    image: IMAGES.tapetes,
    lastMessage: {
      author: 'Sofia Martins',
      text: 'Precisamos de voluntários para sábado de manhã.',
      time: '09:40',
    },
    tags: ['Solidariedade', 'Tapetes Florais', 'Ambiente'],
    chatMessages: [
      { id: 'm1', author: 'Sofia Martins', text: 'Precisamos de 5 voluntários para apoio no sábado de manhã. Quem puder avise aqui!', time: '09:40' },
    ],
  },
];

export type Person = {
  id: string;
  name: string;
  role: string;
  since: string;
  tags: string[];
};

export const PEOPLE: Person[] = [
  { id: 'u1', name: 'Inês Costa', role: 'Estudante', since: 'há 1 ano', tags: ['Fotografia', 'Surf'] },
  { id: 'u2', name: 'Amir Haddad', role: 'Recém-chegado', since: 'há 4 meses', tags: ['Música', 'Gastronomia'] },
  { id: 'u3', name: 'João Pereira', role: 'Vianense', since: 'desde sempre', tags: ['Folclore', 'Caminhadas'] },
  { id: 'u4', name: 'Sofia Martins', role: 'Trabalhadora', since: 'há 3 anos', tags: ['Leitura', 'Voluntariado'] },
];

export type Meetup = { id: string; title: string; day: string; month: string; place: string; going: number };

export const MEETUPS: Meetup[] = [
  { id: 'm1', title: 'Caminhada a Santa Luzia', day: '19', month: 'OUT', place: 'Escadório', going: 24 },
  { id: 'm2', title: 'Jantar de partilha', day: '24', month: 'OUT', place: 'Centro Histórico', going: 18 },
  { id: 'm3', title: 'Aula de cavaquinho', day: '02', month: 'NOV', place: 'Casa da Cultura', going: 11 },
];

export type MapPlaceKind = 'locais' | 'eventos' | 'servicos';

export type MapPlace = {
  id: string;
  name: string;
  kind: MapPlaceKind;
  description: string;
  distance: string;
  /** Posição no mapa ilustrado (0–1) */
  x: number;
  y: number;
  image?: ImageSourcePropType;
};

export const MAP_PLACES: MapPlace[] = [
  { id: 'l1', name: 'Santuário de Santa Luzia', kind: 'locais', description: 'Miradouro e basílica', distance: '2,1 km', x: 0.62, y: 0.22, image: IMAGES.santaLuzia },
  { id: 'l2', name: 'Praça da República', kind: 'locais', description: 'Centro histórico', distance: '350 m', x: 0.55, y: 0.5, image: IMAGES.praca },
  { id: 'l3', name: 'Ponte Eiffel', kind: 'locais', description: 'Sobre o rio Lima', distance: '900 m', x: 0.72, y: 0.62, image: IMAGES.ponteEiffel },
  { id: 'l4', name: 'Praia do Cabedelo', kind: 'locais', description: 'Surf e dunas', distance: '3,4 km', x: 0.35, y: 0.82, image: IMAGES.cabedelo },
  { id: 'e1', name: "Romaria d'Agonia", kind: 'eventos', description: '18–21 Agosto', distance: '400 m', x: 0.46, y: 0.44, image: IMAGES.traje },
  { id: 'e2', name: 'Tapetes floridos', kind: 'eventos', description: 'Ribeira', distance: '600 m', x: 0.4, y: 0.58, image: IMAGES.tapetes },
  { id: 's1', name: 'Loja do Cidadão', kind: 'servicos', description: 'NIF, utente, documentos', distance: '1,2 km', x: 0.68, y: 0.4 },
  { id: 's2', name: 'Centro de Saúde', kind: 'servicos', description: 'Seg–Sex, 8h–20h', distance: '1,5 km', x: 0.8, y: 0.3 },
];
