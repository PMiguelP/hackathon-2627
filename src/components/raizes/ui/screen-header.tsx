import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesFonts,
  RaizesLayout,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';

/** Botão redondo só com ícone (ações do cabeçalho). */
export function IconButton({
  icon,
  onPress,
  label,
  active,
}: {
  icon: IconName;
  onPress?: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        styles.iconButton,
        active && styles.iconButtonActive,
        pressed && styles.pressed,
      ]}>
      <Icon name={icon} size={20} color={active ? RaizesColors.textoInverso : RaizesColors.texto} />
    </Pressable>
  );
}

/** Cabeçalho das páginas: título em serifa + ações à direita. */
export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.titles}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.actions}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RaizesLayout.screenPadding + 4,
    paddingTop: 14,
    paddingBottom: 10,
  },
  titles: { flex: 1 },
  title: {
    fontFamily: RaizesFonts.serif,
    fontSize: RaizesType.size.hero,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    letterSpacing: RaizesType.letterSpacing.tight,
  },
  subtitle: {
    marginTop: 2,
    fontSize: RaizesType.size.small,
    color: RaizesColors.textoSecundario,
  },
  actions: { flexDirection: 'row', gap: 8 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.linhoBorda,
    boxShadow: RaizesShadow.card,
  },
  iconButtonActive: {
    backgroundColor: RaizesColors.vermelho600,
    borderColor: RaizesColors.vermelho600,
  },
  pressed: { opacity: 0.7 },
});
