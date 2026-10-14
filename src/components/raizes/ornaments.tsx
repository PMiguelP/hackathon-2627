import { SymbolView } from 'expo-symbols';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Raizes } from '@/constants/raizes-theme';

/* -------------------------------------------------------------------------- */
/*  Moldura em filigrana — dupla linha dourada com cantos ornamentados        */
/* -------------------------------------------------------------------------- */

function Corner({ style }: { style: ViewStyle }) {
  return (
    <View style={[styles.corner, style]} pointerEvents="none">
      <View style={styles.cornerOuter} />
      <View style={styles.cornerInner} />
      <View style={styles.cornerDiamond} />
      <View style={styles.cornerDot} />
    </View>
  );
}

export function FiligreeFrame() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.frameOuter} />
      <View style={styles.frameInner} />
      <Corner style={{ top: 6, left: 6 }} />
      <Corner style={{ top: 6, right: 6, transform: [{ scaleX: -1 }] }} />
      <Corner style={{ bottom: 6, left: 6, transform: [{ scaleY: -1 }] }} />
      <Corner style={{ bottom: 6, right: 6, transform: [{ scaleX: -1 }, { scaleY: -1 }] }} />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Coração de Viana — coração dourado num anel de filigrana                  */
/* -------------------------------------------------------------------------- */

const RING_DOTS = 20;
const RING_RADIUS = 40;

export function VianaEmblem() {
  return (
    <View style={styles.emblem}>
      {Array.from({ length: RING_DOTS }).map((_, i) => {
        const angle = (i / RING_DOTS) * Math.PI * 2;
        const big = i % 2 === 0;
        const size = big ? 5 : 3;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: big ? Raizes.ouro : Raizes.ouroClaro,
              left: 48 + Math.cos(angle) * RING_RADIUS - size / 2,
              top: 48 + Math.sin(angle) * RING_RADIUS - size / 2,
            }}
          />
        );
      })}
      <View style={styles.emblemRing}>
        {/* "chama" no topo do coração */}
        <View style={styles.flameRow}>
          <View style={[styles.flame, styles.flameSide]} />
          <View style={styles.flame} />
          <View style={[styles.flame, styles.flameSide]} />
        </View>
        <SymbolView
          name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
          tintColor={Raizes.ouro}
          size={34}
          fallback={<View style={styles.heartFallback} />}
        />
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cordão — divisor em contas douradas (como os cordões de ouro)             */
/* -------------------------------------------------------------------------- */

export function GoldChain({ beads = 9 }: { beads?: number }) {
  const mid = Math.floor(beads / 2);
  return (
    <View style={styles.chain}>
      <View style={styles.chainLine} />
      {Array.from({ length: beads }).map((_, i) => {
        const d = Math.abs(i - mid);
        const size = i === mid ? 8 : Math.max(3, 6 - d);
        return (
          <View
            key={i}
            style={
              i === mid
                ? [styles.chainCenter]
                : {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: d % 2 ? Raizes.ouroClaro : Raizes.ouro,
                  }
            }
          />
        );
      })}
      <View style={styles.chainLine} />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Faixa bordada — flores do bordado do traje                                 */
/* -------------------------------------------------------------------------- */

const FLOWER_COLORS = [Raizes.vermelho500, Raizes.amarelo, Raizes.azul];

function Flower({ color, size }: { color: string; size: number }) {
  const petal = size * 0.42;
  const r = size * 0.28;
  return (
    <View style={{ width: size, height: size }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: petal,
              height: petal,
              borderRadius: petal / 2,
              backgroundColor: color,
              left: size / 2 + Math.cos(a) * r - petal / 2,
              top: size / 2 + Math.sin(a) * r - petal / 2,
            }}
          />
        );
      })}
      <View
        style={{
          position: 'absolute',
          width: size * 0.26,
          height: size * 0.26,
          borderRadius: size,
          backgroundColor: color === Raizes.amarelo ? Raizes.vermelho500 : Raizes.amarelo,
          left: size * 0.37,
          top: size * 0.37,
        }}
      />
    </View>
  );
}

export function EmbroideryBand({ count = 11 }: { count?: number }) {
  return (
    <View style={styles.band} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.bandItem}>
          <View style={[styles.leaf, { transform: [{ rotate: '-35deg' }] }]} />
          <Flower color={FLOWER_COLORS[i % 3]} size={i % 2 ? 16 : 22} />
          <View style={[styles.leaf, { transform: [{ rotate: '35deg' }] }]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  /* moldura */
  frameOuter: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    borderWidth: 1,
    borderColor: Raizes.linhaOuroForte,
    borderRadius: 28,
  },
  frameInner: {
    position: 'absolute',
    top: 17,
    left: 17,
    right: 17,
    bottom: 17,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Raizes.linhaOuro,
    borderRadius: 24,
  },
  corner: { position: 'absolute', width: 44, height: 44 },
  cornerOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 34,
    height: 34,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: Raizes.ouro,
    borderTopLeftRadius: 22,
  },
  cornerInner: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 18,
    height: 18,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: Raizes.ouroClaro,
    borderTopLeftRadius: 10,
  },
  cornerDiamond: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 9,
    height: 9,
    backgroundColor: Raizes.ouro,
    transform: [{ rotate: '45deg' }],
  },
  cornerDot: {
    position: 'absolute',
    top: 38,
    left: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Raizes.ouroClaro,
  },

  /* emblema */
  emblem: { width: 96, height: 96, alignItems: 'center', justifyContent: 'center' },
  emblemRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: Raizes.ouro,
    backgroundColor: Raizes.vinho950,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flameRow: {
    position: 'absolute',
    top: 7,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  flame: {
    width: 5,
    height: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: Raizes.ouroClaro,
  },
  flameSide: { height: 5, opacity: 0.8 },
  heartFallback: {
    width: 22,
    height: 22,
    backgroundColor: Raizes.ouro,
    transform: [{ rotate: '45deg' }],
  },

  /* cordão */
  chain: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'stretch' },
  chainLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Raizes.linhaOuro },
  chainCenter: {
    width: 9,
    height: 9,
    backgroundColor: Raizes.ouro,
    transform: [{ rotate: '45deg' }],
  },

  /* faixa bordada */
  band: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    overflow: 'hidden',
  },
  bandItem: { flexDirection: 'row', alignItems: 'center' },
  leaf: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: Raizes.verde,
  },
});
