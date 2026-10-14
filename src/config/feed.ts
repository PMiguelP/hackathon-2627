import type { IconName } from '@/components/raizes/icon';

/**
 * Categorias do Feed — personalizável.
 * Adiciona, remove ou reordena aqui e a barra de filtros atualiza sozinha.
 * `id` tem de corresponder ao campo `category` dos posts (ver src/data/posts.ts).
 */
export type FeedCategoryId = 'tudo' | 'eventos' | 'pessoas' | 'servicos' | 'locais' | 'grupos';

export type FeedCategory = {
  id: FeedCategoryId;
  label: string;
  icon: IconName;
};

export const FEED_CATEGORIES: FeedCategory[] = [
  { id: 'tudo', label: 'Tudo', icon: 'all' },
  { id: 'eventos', label: 'Eventos', icon: 'event' },
  { id: 'pessoas', label: 'Pessoas', icon: 'person' },
  { id: 'servicos', label: 'Serviços', icon: 'service' },
  { id: 'locais', label: 'Locais', icon: 'place' },
  { id: 'grupos', label: 'Grupos', icon: 'group' },
];
