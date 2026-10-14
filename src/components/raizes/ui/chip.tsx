import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesLayout,
  RaizesRadius,
  RaizesType,
} from '@/constants/raizes-theme';

/** Pílula selecionável (filtros, onboarding, interesses). */
export function Chip({
  label,
  selected,
  onPress,
  icon,
  emoji,
  size = 'md',
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  emoji?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.chip,
        styles[size],
        selected ? styles.selected : styles.idle,
        pressed && styles.pressed,
      ]}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      {icon ? (
        <Icon
          name={icon}
          size={size === 'sm' ? 14 : 16}
          color={selected ? RaizesColors.textoInverso : RaizesColors.textoSecundario}
        />
      ) : null}
      <Text
        style={[
          styles.label,
          size === 'sm' && styles.labelSm,
          selected ? styles.labelSelected : styles.labelIdle,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

/** Barra horizontal de categorias (Feed, Mapa…). */
export function ChipRow<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { id: T; label: string; icon?: IconName }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        style={styles.scroll}>
        {items.map((it) => (
          <Chip
            key={it.id}
            label={it.label}
            selected={value === it.id}
            onPress={() => onChange(it.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    minHeight: 56,
    maxHeight: 56,
    width: '100%',
    flexShrink: 0,
    justifyContent: 'center',
    zIndex: 10,
  },
  scroll: {
    flex: 1,
    height: 56,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: RaizesRadius.pill,
    borderWidth: 1.5,
  },
  sm: { paddingHorizontal: 12, height: 32 },
  md: { paddingHorizontal: 18, height: 38 },
  lg: { paddingHorizontal: 22, height: 44 },
  idle: { backgroundColor: RaizesColors.linhoCartao, borderColor: RaizesColors.linhoBorda },
  selected: { backgroundColor: RaizesColors.vermelho600, borderColor: RaizesColors.vermelho600 },
  pressed: { opacity: 0.75 },
  emoji: { fontSize: 15 },
  label: { fontSize: RaizesType.size.body - 1, fontWeight: RaizesType.weight.semiBold, lineHeight: 20 },
  labelSm: { fontSize: RaizesType.size.caption, lineHeight: 16 },
  labelIdle: { color: RaizesColors.textoSecundario },
  labelSelected: { color: RaizesColors.textoInverso },

  row: {
    paddingHorizontal: RaizesLayout.screenPadding,
    gap: 8,
    alignItems: 'center',
    height: 56,
  },
});
