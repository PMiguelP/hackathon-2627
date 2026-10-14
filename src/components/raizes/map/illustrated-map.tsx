import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon, type IconName } from '@/components/raizes/icon';
import { RaizesColors, RaizesRadius, RaizesShadow } from '@/constants/raizes-theme';
import type { MapPlace, MapPlaceKind } from '@/data/community';

/**
 * Mapa ilustrado de Viana (offline, sem SDK de mapas).
 * Mar à esquerda, rio Lima, monte de Santa Luzia e pins posicionados (0–1).
 */

const KIND_STYLE: Record<MapPlaceKind, { color: string; icon: IconName }> = {
  locais: { color: RaizesColors.vermelho600, icon: 'place' },
  eventos: { color: RaizesColors.ouroEscuro, icon: 'event' },
  servicos: { color: RaizesColors.azul, icon: 'service' },
};

export function kindStyle(kind: MapPlaceKind) {
  return KIND_STYLE[kind];
}

export function IllustratedMap({
  places,
  selectedId,
  onSelect,
  height = 300,
}: {
  places: MapPlace[];
  selectedId?: string;
  onSelect: (id: string) => void;
  height?: number;
}) {
  return (
    <View style={[styles.wrap, { height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* terra */}
        <Rect x="0" y="0" width="100" height="100" fill="#F3EBDD" />
        {/* monte de Santa Luzia — curvas de nível */}
        <G fill="none" stroke="rgba(62,142,90,0.25)" strokeWidth="0.4">
          <Path d="M45 30 C 50 8, 78 6, 84 24 C 88 36, 70 42, 58 40 C 50 39, 44 36, 45 30 Z" />
          <Path d="M51 28 C 54 14, 74 12, 78 24 C 80 32, 68 36, 60 35 C 54 34, 50 32, 51 28 Z" />
          <Path d="M57 26 C 59 18, 70 17, 72 24 C 73 29, 66 31, 62 30 C 58 30, 56 28, 57 26 Z" />
        </G>
        {/* ruas */}
        <G stroke="rgba(122,94,60,0.18)" strokeWidth="0.5" fill="none">
          <Path d="M30 48 L 90 48" />
          <Path d="M36 56 L 88 40" />
          <Path d="M50 30 L 56 62" />
          <Path d="M66 34 L 70 62" />
          <Path d="M28 40 C 40 44, 60 50, 95 54" />
        </G>
        {/* mar */}
        <Path d="M0 0 L 26 0 C 22 20, 30 34, 24 52 C 20 64, 30 80, 22 100 L 0 100 Z" fill="#CFE0EA" />
        <G stroke="rgba(42,79,168,0.18)" strokeWidth="0.4" fill="none">
          <Path d="M4 20 q 3 -2 6 0 t 6 0" />
          <Path d="M2 46 q 3 -2 6 0 t 6 0" />
          <Path d="M5 78 q 3 -2 6 0 t 6 0" />
        </G>
        {/* rio Lima */}
        <Path
          d="M24 70 C 40 66, 52 72, 64 66 C 76 60, 88 66, 100 62 L 100 70 C 88 74, 76 68, 64 74 C 52 80, 40 74, 25 78 Z"
          fill="#CFE0EA"
        />
        {/* ponte */}
        <Path d="M71 61 L 73 74" stroke={RaizesColors.ouroEscuro} strokeWidth="0.8" />
        {/* areal do Cabedelo */}
        <Path d="M24 80 C 30 82, 40 84, 44 92 L 40 100 L 22 100 C 26 92, 22 86, 24 80 Z" fill="#EADBB8" />
        {/* moldura dourada */}
        <Rect x="1" y="1" width="98" height="98" fill="none" stroke={RaizesColors.ouroLinha} strokeWidth="0.4" />
        <Circle cx="92" cy="9" r="4" fill="none" stroke={RaizesColors.ouroLinha} strokeWidth="0.4" />
      </Svg>

      {/* rosa dos ventos */}
      <View style={styles.compass}>
        <Text style={styles.compassN}>N</Text>
      </View>

      {/* pins */}
      {places.map((p) => {
        const s = KIND_STYLE[p.kind];
        const active = p.id === selectedId;
        return (
          <Pressable
            key={p.id}
            accessibilityLabel={p.name}
            onPress={() => onSelect(p.id)}
            hitSlop={8}
            style={[
              styles.pin,
              { left: `${p.x * 100}%`, top: `${p.y * 100}%` },
              active && styles.pinActive,
            ]}>
            <View style={[styles.pinHead, { backgroundColor: s.color }, active && styles.pinHeadActive]}>
              <Icon name={s.icon} size={active ? 16 : 13} color={RaizesColors.textoInverso} />
            </View>
            <View style={[styles.pinTail, { borderTopColor: s.color }]} />
          </Pressable>
        );
      })}

      {/* "estás aqui" */}
      <View style={[styles.me, { left: '52%', top: '54%' }]}>
        <CoracaoViana size={22} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: RaizesRadius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    backgroundColor: '#F3EBDD',
  },
  compass: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassN: { fontSize: 11, fontWeight: '800', color: RaizesColors.ouroEscuro },
  pin: { position: 'absolute', alignItems: 'center', transform: [{ translateX: -14 }, { translateY: -34 }] },
  pinActive: { zIndex: 10, transform: [{ translateX: -18 }, { translateY: -42 }] },
  pinHead: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: RaizesColors.linhoCartao,
    boxShadow: RaizesShadow.card,
  },
  pinHeadActive: { width: 36, height: 36, borderRadius: 18, borderColor: RaizesColors.ouro },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  me: { position: 'absolute', transform: [{ translateX: -9 }, { translateY: -11 }] },
});
