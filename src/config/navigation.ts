import type { Href } from 'expo-router';

import type { IconName } from '@/components/raizes/icon';

/**
 * Separadores da navbar — personalizável.
 * `name` = nome do ficheiro em src/app/(tabs)/. O coração central fica
 * sempre ao meio (entre a 2.ª e a 3.ª entrada) e abre `NAV_CENTER.href`.
 */
export type NavTab = {
  name: string;
  href: Href;
  label: string;
  icon: IconName;
  iconActive: IconName;
};

export const NAV_TABS: NavTab[] = [
  { name: 'home', href: '/home', label: 'Início', icon: 'home', iconActive: 'homeFill' },
  { name: 'mapa', href: '/mapa', label: 'Mapa', icon: 'map', iconActive: 'mapFill' },
  {
    name: 'comunidade',
    href: '/comunidade',
    label: 'Comunidade',
    icon: 'community',
    iconActive: 'communityFill',
  },
  { name: 'perfil', href: '/perfil', label: 'Perfil', icon: 'profile', iconActive: 'profileFill' },
];

/** Ação do Coração de Viana central. */
export const NAV_CENTER = {
  href: '/publicar' as Href,
  accessibilityLabel: 'Partilhar algo com a comunidade',
};
