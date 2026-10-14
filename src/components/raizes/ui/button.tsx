import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/raizes/icon';
import {
  RaizesButton,
  RaizesColors,
  RaizesLayout,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';

/** Botão para páginas claras. `variant`: primary (vermelho), gold, outline. */
export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled,
  loading,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'gold' | 'outline';
  size?: 'sm' | 'md';
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
}) {
  const fg =
    variant === 'outline'
      ? RaizesColors.vermelho600
      : variant === 'gold'
        ? RaizesColors.vinho900
        : RaizesColors.textoInverso;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' ? styles.sm : styles.md,
        styles[variant],
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}>
      {variant === 'gold' && <View style={styles.shine} pointerEvents="none" />}
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon ? <Icon name={icon} size={size === 'sm' ? 16 : 18} color={fg} /> : null}
          <Text style={[styles.text, size === 'sm' && styles.textSm, { color: fg }]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

/** Título de secção com link opcional. */
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable hitSlop={8} onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: RaizesButton.radius,
    overflow: 'hidden',
  },
  md: { height: RaizesButton.height, paddingHorizontal: 24 },
  sm: { height: RaizesButton.heightSm, paddingHorizontal: 16 },
  primary: { backgroundColor: RaizesColors.vermelho600, boxShadow: RaizesShadow.card },
  gold: {
    backgroundColor: RaizesColors.ouro,
    borderWidth: 1,
    borderColor: RaizesColors.ouroClaro,
    boxShadow: RaizesShadow.gold,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.2,
    borderColor: RaizesColors.vermelho600,
  },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.985 }] },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 244, 214, 0.16)',
  },
  text: { fontSize: RaizesButton.fontSize, fontWeight: RaizesType.weight.bold, letterSpacing: 0.3 },
  textSm: { fontSize: RaizesButton.fontSizeSm },

  section: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: RaizesLayout.screenPadding,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: RaizesType.size.h3,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  sectionAction: {
    fontSize: RaizesType.size.small,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.ouroTexto,
  },
});
