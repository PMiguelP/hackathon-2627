import type { ImageSourcePropType } from 'react-native';

import { IMAGES } from '@/data/images';

/**
 * Slides da introdução (6) — personalizável.
 */
export type IntroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
};

export const INTRO_SLIDES: IntroSlide[] = [
  {
    id: 'bemvindo',
    eyebrow: 'Bem-vindo ao Raízes',
    title: 'Mais do que uma app,\né um ponto de encontro.',
    text: 'Um lugar para quem nasceu em Viana e para quem a escolheu como casa.',
    image: IMAGES.traje,
  },
  {
    id: 'descobrir',
    eyebrow: 'Descobre',
    title: 'Viana como\num local a conhece',
    text: 'Recantos, miradouros, praias e histórias, partilhados por quem cá vive.',
    image: IMAGES.santaLuzia,
  },
  {
    id: 'eventos',
    eyebrow: 'Eventos & tradições',
    title: 'Não percas\nnenhuma festa',
    text: 'Romarias, feiras, concertos e encontros. Tudo num só sítio, sempre atualizado.',
    image: IMAGES.tapetes,
  },
  {
    id: 'pessoas',
    eyebrow: 'Pessoas',
    title: 'Conhece quem\npartilha os teus gostos',
    text: 'Estudantes, recém-chegados e vianenses de gema — liga-te a pessoas como tu.',
    image: IMAGES.comunidade,
  },
  {
    id: 'servicos',
    eyebrow: 'Serviços',
    title: 'Tudo o que precisas\npara te instalares',
    text: 'Casa, saúde, transportes e burocracia explicados de forma simples.',
    image: IMAGES.praca,
  },
  {
    id: 'casa',
    eyebrow: 'Sente-te em casa',
    title: 'Juntos, criamos\nraízes',
    text: 'Diz-nos um pouco sobre ti e preparamos a app à tua medida.',
    image: IMAGES.ponteEiffel,
  },
];
