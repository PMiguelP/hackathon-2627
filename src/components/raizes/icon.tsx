import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { RaizesColors } from '@/constants/raizes-theme';

/**
 * Registo central de ícones: nome semântico → símbolo por plataforma.
 * iOS usa SF Symbols; Android/Web usam Material Symbols.
 * Para trocar um ícone na app inteira, muda só aqui.
 */
export const ICONS = {
  home: { ios: 'house', android: 'home', web: 'home' },
  homeFill: { ios: 'house.fill', android: 'home', web: 'home' },
  map: { ios: 'map', android: 'map', web: 'map' },
  mapFill: { ios: 'map.fill', android: 'map', web: 'map' },
  community: { ios: 'person.3', android: 'groups', web: 'groups' },
  communityFill: { ios: 'person.3.fill', android: 'groups', web: 'groups' },
  profile: { ios: 'person', android: 'person', web: 'person' },
  profileFill: { ios: 'person.fill', android: 'person', web: 'person' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  filters: { ios: 'slider.horizontal.3', android: 'tune', web: 'tune' },
  heart: { ios: 'heart', android: 'favorite', web: 'favorite' },
  heartFill: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
  comment: { ios: 'bubble.right', android: 'chat_bubble', web: 'chat_bubble' },
  share: { ios: 'square.and.arrow.up', android: 'share', web: 'share' },
  more: { ios: 'ellipsis', android: 'more_horiz', web: 'more_horiz' },
  event: { ios: 'calendar', android: 'event', web: 'event' },
  place: { ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' },
  service: { ios: 'storefront', android: 'storefront', web: 'storefront' },
  person: { ios: 'person.crop.circle', android: 'person', web: 'person' },
  group: { ios: 'person.2', android: 'groups', web: 'groups' },
  addPerson: { ios: 'person.badge.plus', android: 'group_add', web: 'group_add' },
  all: { ios: 'square.grid.2x2', android: 'explore', web: 'explore' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  language: { ios: 'globe', android: 'language', web: 'language' },
  edit: { ios: 'pencil', android: 'edit', web: 'edit' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  next: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  camera: { ios: 'camera', android: 'photo_camera', web: 'photo_camera' },
  school: { ios: 'graduationcap', android: 'school', web: 'school' },
  time: { ios: 'clock', android: 'schedule', web: 'schedule' },
  bookmark: { ios: 'bookmark', android: 'bookmark', web: 'bookmark' },
  add: { ios: 'plus', android: 'add', web: 'add' },
  mail: { ios: 'envelope', android: 'mail', web: 'mail' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  eye: { ios: 'eye', android: 'visibility', web: 'visibility' },
  eyeOff: { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' },
  phone: { ios: 'phone', android: 'phone', web: 'phone' },
  shield: { ios: 'shield.fill', android: 'shield', web: 'shield' },
  hospital: { ios: 'cross.case.fill', android: 'local_hospital', web: 'local_hospital' },
  building: { ios: 'building.columns.fill', android: 'account_balance', web: 'account_balance' },
  food: { ios: 'fork.knife', android: 'restaurant', web: 'restaurant' },
  train: { ios: 'tram.fill', android: 'train', web: 'train' },
  fire: { ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' },
} as const satisfies Record<string, SymbolViewProps['name']>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 22,
  color = RaizesColors.texto,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  return <SymbolView name={ICONS[name]} size={size} tintColor={color} />;
}
