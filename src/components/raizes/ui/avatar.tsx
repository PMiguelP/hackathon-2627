import { StyleSheet, Text, View } from 'react-native';

import { RaizesColors, RaizesType } from '@/constants/raizes-theme';

const PALETTE = [
  RaizesColors.vermelho600,
  RaizesColors.azul,
  RaizesColors.verde,
  RaizesColors.ouroEscuro,
  RaizesColors.vinho700,
];

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

/** Avatar com iniciais e aro dourado (cor determinada pelo nome). */
export function Avatar({ name, size = 42, ring = true }: { name: string; size?: number; ring?: boolean }) {
  const color = PALETTE[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];
  return (
    <View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: size / 2, borderWidth: ring ? 1.5 : 0 },
      ]}>
      <View
        style={[
          styles.inner,
          { backgroundColor: color, borderRadius: size / 2, margin: ring ? 2 : 0 },
        ]}>
        <Text style={[styles.text, { fontSize: size * 0.36 }]}>{initials(name)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { borderColor: RaizesColors.ouro, overflow: 'hidden' },
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: RaizesColors.textoInverso, fontWeight: RaizesType.weight.bold },
});
