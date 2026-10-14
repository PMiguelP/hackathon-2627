import type { ImageSourcePropType } from 'react-native';

import type { FeedCategoryId } from '@/config/feed';
import { IMAGES } from '@/data/images';

/** Dados de exemplo (mock) — sem backend. */
export type Post = {
  id: string;
  category: Exclude<FeedCategoryId, 'tudo'>;
  author: { name: string; place: string; time: string };
  title: string;
  text: string;
  image?: ImageSourcePropType;
  likes: number;
  comments: number;
  /** Para eventos */
  date?: string;
  /** Para serviços / locais */
  tag?: string;
};

export const POSTS: Post[] = [
  {
    id: 'p1',
    category: 'eventos',
    author: { name: 'Ana Silva', place: 'Viana do Castelo', time: '2h' },
    title: "Romaria d'Agonia",
    text: 'Que dia incrível! A nossa tradição é mesmo única. 💙❤️',
    image: IMAGES.traje,
    likes: 243,
    comments: 12,
    date: '20 AGO',
  },
  {
    id: 'p2',
    category: 'locais',
    author: { name: 'Rui Fernandes', place: 'Praia do Cabedelo', time: '4h' },
    title: 'Praia do Cabedelo',
    text: 'Fim de tarde perfeito. Quem alinha num surf amanhã de manhã? 🌊',
    image: IMAGES.cabedelo,
    likes: 189,
    comments: 8,
    tag: 'Praia',
  },
  {
    id: 'p3',
    category: 'grupos',
    author: { name: 'Estudantes IPVC', place: 'Centro Histórico', time: '5h' },
    title: 'Café de boas-vindas',
    text: 'Chegaste este ano? Junta-te a nós na Praça da República, quinta às 18h. ☕',
    image: IMAGES.comunidade,
    likes: 96,
    comments: 21,
  },
  {
    id: 'p4',
    category: 'servicos',
    author: { name: 'Loja do Cidadão', place: 'Viana do Castelo', time: '1d' },
    title: 'Guia: pedir o NIF e o número de utente',
    text: 'Passo a passo, documentos necessários e horários de atendimento.',
    likes: 57,
    comments: 4,
    tag: 'Burocracia',
  },
  {
    id: 'p5',
    category: 'pessoas',
    author: { name: 'Lucas Moreira', place: 'Darque', time: '1d' },
    title: 'Olá Viana! 👋',
    text: 'Mudei-me do Brasil há 3 meses, adoro fotografia e caminhadas. Alguém para explorar o Monte de Santa Luzia?',
    image: IMAGES.santaLuzia,
    likes: 132,
    comments: 27,
  },
  {
    id: 'p6',
    category: 'eventos',
    author: { name: 'Câmara Municipal', place: 'Rua da Bandeira', time: '2d' },
    title: 'Tapetes floridos',
    text: 'Voluntários precisam-se para a noite dos tapetes. Inscrições abertas!',
    image: IMAGES.tapetes,
    likes: 310,
    comments: 45,
    date: '18 AGO',
  },
  {
    id: 'p7',
    category: 'locais',
    author: { name: 'Marta Lima', place: 'Ponte Eiffel', time: '3d' },
    title: 'Pôr do sol na Ponte Eiffel',
    text: 'O meu sítio preferido para ver as luzes da cidade a acender. ✨',
    image: IMAGES.ponteEiffel,
    likes: 204,
    comments: 9,
    tag: 'Miradouro',
  },
];
