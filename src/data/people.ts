import type { ImageSourcePropType } from 'react-native';

import { IMAGES } from '@/data/images';

export type FeedPerson = {
  id: string;
  name: string;
  role: string;
  place: string;
  tags: string[];
  bio: string;
  image: ImageSourcePropType;
  /** Altura do cartão na grelha escalonada (masonry) */
  cardHeight: number;
};

export const FEED_PEOPLE: FeedPerson[] = [
  {
    id: 'fp1',
    name: 'Lucas Moreira',
    role: 'Fotógrafo & Explorador',
    place: 'Darque, Viana',
    tags: ['Fotografia', 'Caminhadas', 'Pôr do Sol', 'Santa Luzia'],
    bio: 'Apaixonado pela luz dourada do Minho e por captar os recantos escondidos de Viana. Sempre pronto para uma caminhada ou café na Praça da República.',
    image: IMAGES.pessoaLucas,
    cardHeight: 220,
  },
  {
    id: 'fp2',
    name: 'Inês Costa',
    role: 'Estudante IPVC',
    place: 'Centro Histórico',
    tags: ['Design', 'Surf', 'IPVC', 'Cabedelo'],
    bio: 'A estudar Design no IPVC. Quando não estou em aulas ou projetos, estou no mar do Cabedelo a apanhar ondas ou a desenhar pelas ruelas.',
    image: IMAGES.pessoaInes,
    cardHeight: 165,
  },
  {
    id: 'fp3',
    name: 'Amir Haddad',
    role: 'Músico & Cozinheiro',
    place: 'Ribeira',
    tags: ['Música', 'Gastronomia', 'Violão', 'Petiscos'],
    bio: 'Cheguei a Viana há dois anos e apaixonei-me pelo rio e pelas gentes. Adoro juntar amigos para cozinhar e partilhar música ao vivo.',
    image: IMAGES.pessoaAmir,
    cardHeight: 175,
  },
  {
    id: 'fp4',
    name: 'Sofia Martins',
    role: 'Arquiteta & Voluntária',
    place: 'Meadela',
    tags: ['Património', 'Voluntariado', 'Tradição', 'Leitura'],
    bio: 'Fascinada pela arquitetura manuelina e pela preservação histórica de Viana. Participo em ações comunitárias de acolhimento e valorização local.',
    image: IMAGES.pessoaSofia,
    cardHeight: 235,
  },
  {
    id: 'fp5',
    name: 'João Pereira',
    role: 'Artesão Minhoto',
    place: 'Santa Marta de Portuzelo',
    tags: ['Folclore', 'Madeira', 'Romaria d’Agonia', 'Lenços'],
    bio: 'Orgulhoso das raízes minhotas. Trabalho na preservação do artesanato tradicional e gosto de ensinar aos mais novos os segredos da madeira e do traje.',
    image: IMAGES.pessoaJoao,
    cardHeight: 210,
  },
  {
    id: 'fp6',
    name: 'Marta Lima',
    role: 'Empreendedora',
    place: 'Monserrate',
    tags: ['Café de Especialidade', 'Natureza', 'Sustentabilidade', 'Ioga'],
    bio: 'A dinamizar projetos locais de sustentabilidade e comida saudável no Alto Minho. Sempre disponível para novas ideias e parcerias.',
    image: IMAGES.pessoaMarta,
    cardHeight: 170,
  },
];
