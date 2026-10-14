import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { RaizesColors, RaizesDecor } from '@/constants/raizes-theme';

/* ==========================================================================
 *  Decoração discreta para as páginas claras:
 *  - FiligreeLace: renda dourada nos cantos superiores (como na maquete)
 *  - FlowerSprig: raminho de flores bordadas do traje
 *  - PageDecor: combina tudo, posicionado em absoluto atrás do conteúdo
 * ========================================================================== */

/* --------------------------------------------------------- Renda dourada */

export function FiligreeLace({
  width = 190,
  color = RaizesColors.ouro,
  opacity = RaizesDecor.filigreeOpacity,
  flip = false,
  style,
}: {
  width?: number;
  color?: string;
  opacity?: number;
  flip?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const height = (width * 120) / 190;
  return (
    <View style={[{ width, height, opacity }, flip && { transform: [{ scaleX: -1 }] }, style]}>
      <Svg width={width} height={height} viewBox="0 0 190 120">
        <G fill="none" stroke={color} strokeLinecap="round">
          {/* voluta principal */}
          <Path strokeWidth={1.4} d="M0 18 C 30 10, 52 22, 56 44 C 60 66, 40 76, 30 64 C 22 54, 32 44, 40 50" />
          <Path strokeWidth={1.1} d="M56 44 C 70 30, 96 26, 112 36 C 126 45, 120 62, 106 60 C 96 58, 98 48, 106 48" />
          <Path strokeWidth={1} d="M112 36 C 130 22, 160 18, 190 26" />
          {/* volutas secundárias */}
          <Path strokeWidth={0.9} d="M0 46 C 14 44, 22 54, 18 66 C 15 76, 4 78, 2 70" />
          <Path strokeWidth={0.9} d="M30 64 C 32 84, 50 98, 70 92 C 84 88, 84 74, 74 74" />
          <Path strokeWidth={0.8} d="M70 92 C 76 104, 70 116, 58 118" />
          <Path strokeWidth={0.8} d="M106 60 C 118 74, 140 74, 150 62 C 158 52, 150 44, 144 50" />
          {/* folhas */}
          <Path strokeWidth={0.9} d="M86 30 C 82 20, 88 12, 96 10 C 96 20, 92 26, 86 30 Z" />
          <Path strokeWidth={0.9} d="M140 22 C 144 12, 154 10, 160 14 C 154 22, 148 24, 140 22 Z" />
        </G>
        {/* contas */}
        <G fill={color}>
          {[
            [40, 50],
            [106, 48],
            [74, 74],
            [144, 50],
            [2, 70],
            [58, 118],
            [56, 44],
            [112, 36],
          ].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={i < 6 ? 2 : 1.4} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <Circle key={`d${i}`} cx={120 + i * 8} cy={30 - i * 0.4} r={0.9} />
          ))}
        </G>
      </Svg>
    </View>
  );
}

/* ------------------------------------------------------- Flores bordadas */

function Flower({ x, y, r, color, center }: { x: number; y: number; r: number; color: string; center: string }) {
  return (
    <G>
      {[0, 72, 144, 216, 288].map((a) => (
        <Circle
          key={a}
          cx={x + Math.cos(((a - 90) * Math.PI) / 180) * r * 0.62}
          cy={y + Math.sin(((a - 90) * Math.PI) / 180) * r * 0.62}
          r={r * 0.5}
          fill={color}
        />
      ))}
      <Circle cx={x} cy={y} r={r * 0.32} fill={center} />
    </G>
  );
}

export function FlowerSprig({
  size = 70,
  opacity = RaizesDecor.flowerOpacity,
  rotate = 0,
  style,
}: {
  size?: number;
  opacity?: number;
  rotate?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [red, yellow, blue] = RaizesDecor.flowerColors;
  return (
    <View style={[{ width: size, height: size, opacity, transform: [{ rotate: `${rotate}deg` }] }, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* caules e folhas */}
        <G fill="none" stroke={RaizesColors.verde} strokeWidth={2} strokeLinecap="round">
          <Path d="M50 95 C 48 75, 40 60, 30 46" />
          <Path d="M50 95 C 54 72, 64 58, 74 50" />
          <Path d="M50 95 C 50 80, 52 64, 52 30" />
        </G>
        <G fill={RaizesColors.verde}>
          <Path d="M40 70 C 30 68, 24 60, 24 54 C 32 56, 38 62, 40 70 Z" />
          <Path d="M58 74 C 68 72, 76 66, 78 60 C 70 60, 62 66, 58 74 Z" />
          <Path d="M51 55 C 44 50, 42 44, 44 40 C 50 44, 52 50, 51 55 Z" />
        </G>
        <Flower x={30} y={42} r={13} color={red} center={yellow} />
        <Flower x={75} y={46} r={10} color={blue} center={yellow} />
        <Flower x={52} y={24} r={11} color={yellow} center={red} />
        <Circle cx={64} cy={78} r={3} fill={red} />
        <Circle cx={36} cy={82} r={2.4} fill={blue} />
      </Svg>
    </View>
  );
}

/* ----------------------------------------------- Divisor com cordão de ouro */

export function GoldDivider({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.divider, style]}>
      <View style={styles.dividerLine} />
      <View style={styles.dividerBead} />
      <View style={styles.dividerDiamond} />
      <View style={styles.dividerBead} />
      <View style={styles.dividerLine} />
    </View>
  );
}

/* ------------------------------------------------------ Fundo da página */

/* ------------------------------------------------ Fundo da página com Tiara de Filigrana e Flores */

import { CoracaoViana } from '@/components/raizes/coracao-viana';

/**
 * Tiara / Arco de Filigrana Dourada no Topo (como na Maquete 1).
 * Abraça o topo do ecrã e desce suavemente por trás do cabeçalho.
 */
export function FiligreeHeaderArch({
  opacity = 0.55,
  style,
}: {
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ width: '100%', height: 130, opacity }, style]} pointerEvents="none">
      <Svg width="100%" height={130} viewBox="0 0 430 130" preserveAspectRatio="none">
        <G fill="none" stroke={RaizesColors.ouro} strokeLinecap="round">
          {/* Arco superior principal em cordão de ouro */}
          <Path d="M -20 -10 Q 215 90 450 -10" strokeWidth={1.8} stroke={RaizesColors.ouro} />
          <Path d="M -20 -16 Q 215 82 450 -16" strokeWidth={1} stroke={RaizesColors.ouroClaro} />
          
          {/* Festões rendados (ondas de filigrana) */}
          <Path
            d="M 10 12 C 25 32, 45 32, 60 18 C 75 38, 95 38, 110 24 C 125 44, 145 44, 160 30 C 175 50, 195 50, 215 36 C 235 50, 255 50, 270 30 C 285 44, 305 44, 320 24 C 335 38, 355 38, 370 18 C 385 32, 405 32, 420 12"
            strokeWidth={1.2}
            stroke={RaizesColors.ouroLinhaForte}
          />

          {/* Segunda linha de festões menores */}
          <Path
            d="M 35 25 C 45 42, 65 42, 75 28 C 85 48, 105 48, 115 34 C 125 54, 145 54, 155 40 C 165 60, 185 60, 195 46 C 205 64, 225 64, 235 46 C 245 60, 265 60, 275 40 C 285 54, 305 54, 315 34 C 325 48, 345 48, 355 28 C 365 42, 385 42, 395 25"
            strokeWidth={0.9}
            stroke={RaizesColors.ouro}
          />

          {/* Volutas centrais em forma de coração de filigrana no vértice */}
          <Path d="M 215 36 C 205 24, 188 28, 192 42 C 196 52, 215 62, 215 62 C 215 62, 234 52, 238 42 C 242 28, 225 24, 215 36 Z" strokeWidth={1.4} stroke={RaizesColors.ouro} />
          <Path d="M 215 42 C 208 34, 198 36, 201 44 C 204 50, 215 56, 215 56 C 215 56, 226 50, 229 44 C 232 36, 222 34, 215 42 Z" strokeWidth={0.9} stroke={RaizesColors.ouroClaro} />
          
          {/* Volutas laterais decorativas estilo Viana */}
          <Path d="M 160 30 C 150 20, 138 24, 142 36 C 146 44, 160 52, 160 52" strokeWidth={1} />
          <Path d="M 270 30 C 280 20, 292 24, 288 36 C 284 44, 270 52, 270 52" strokeWidth={1} />
          
          {/* Folhas de acanto estilizadas */}
          <Path d="M 110 24 C 100 12, 88 18, 94 28 C 100 36, 110 40, 110 40" strokeWidth={0.9} />
          <Path d="M 320 24 C 330 12, 342 18, 336 28 C 330 36, 320 40, 320 40" strokeWidth={0.9} />
        </G>

        {/* Gotas e contas de ouro suspensas */}
        <G fill={RaizesColors.ouro}>
          <Circle cx={215} cy={66} r={3.2} />
          <Circle cx={215} cy={74} r={2.2} />
          <Circle cx={215} cy={80} r={1.4} />

          <Circle cx={160} cy={56} r={2.4} />
          <Circle cx={270} cy={56} r={2.4} />

          <Circle cx={110} cy={44} r={2} />
          <Circle cx={320} cy={44} r={2} />

          <Circle cx={60} cy={34} r={1.8} />
          <Circle cx={370} cy={34} r={1.8} />
        </G>
      </Svg>
    </View>
  );
}

/**
 * Ramagens florais do Lenço de Viana a espreitar nas margens do ecrã (como na Imagem 3).
 */
export function LencoSideFlourishes() {
  const [red, yellow, blue] = RaizesDecor.flowerColors;
  return (
    <>
      {/* Ramo floral na margem esquerda superior */}
      <View style={styles.sideFlourishLeft1} pointerEvents="none">
        <Svg width={44} height={90} viewBox="0 0 44 90">
          <G fill="none" stroke={RaizesColors.verde} strokeWidth={1.8} strokeLinecap="round">
            <Path d="M -10 45 C 10 40, 24 30, 26 15" />
            <Path d="M -10 45 C 12 50, 28 60, 24 78" />
          </G>
          <Flower x={24} y={16} r={9} color={red} center={yellow} />
          <Flower x={22} y={76} r={7} color={blue} center={yellow} />
          <Circle cx={12} cy={34} r={2.4} fill={RaizesColors.verde} />
          <Circle cx={14} cy={56} r={2.4} fill={RaizesColors.verde} />
        </Svg>
      </View>

      {/* Ramo floral na margem direita intermédia */}
      <View style={styles.sideFlourishRight1} pointerEvents="none">
        <Svg width={44} height={90} viewBox="0 0 44 90">
          <G fill="none" stroke={RaizesColors.verde} strokeWidth={1.8} strokeLinecap="round">
            <Path d="M 54 45 C 34 40, 20 30, 18 15" />
            <Path d="M 54 45 C 32 50, 16 60, 20 78" />
          </G>
          <Flower x={20} y={16} r={8.5} color={yellow} center={red} />
          <Flower x={22} y={76} r={8.5} color={red} center={yellow} />
          <Circle cx={32} cy={34} r={2.4} fill={RaizesColors.verde} />
          <Circle cx={30} cy={56} r={2.4} fill={RaizesColors.verde} />
        </Svg>
      </View>

      {/* Ramo floral na margem esquerda inferior */}
      <View style={styles.sideFlourishLeft2} pointerEvents="none">
        <Svg width={44} height={80} viewBox="0 0 44 80">
          <G fill="none" stroke={RaizesColors.verde} strokeWidth={1.6} strokeLinecap="round">
            <Path d="M -10 40 C 12 35, 26 22, 22 10" />
            <Path d="M -10 40 C 14 46, 26 56, 20 70" />
          </G>
          <Flower x={20} y={12} r={7.5} color={blue} center={yellow} />
          <Flower x={18} y={68} r={8.5} color={red} center={yellow} />
        </Svg>
      </View>
    </>
  );
}

/**
 * Divisor tradicional de joalharia minhota: fio de ouro fino com mini Coração de Viana ao centro.
 */
export function FiligreeCardDivider({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.cardDividerWrap, style]}>
      <View style={styles.cardDividerLine} />
      <CoracaoViana size={22} color={RaizesColors.ouro} />
      <View style={styles.cardDividerLine} />
    </View>
  );
}

/**
 * Decoração de fundo para páginas claras.
 * Inclui o Arco de Filigrana no topo e as flores do Lenço de Viana nas margens.
 */
export function PageDecor({
  lace = true,
  flowers = 'corners',
}: {
  lace?: boolean;
  flowers?: 'corners' | 'bottom' | 'none';
}) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* 1. Arco de Filigrana no Topo (como na Imagem 1) */}
      {lace && <FiligreeHeaderArch opacity={0.75} style={styles.headerArch} />}

      {/* 2. Flores do Lenço nas Margens (como na Imagem 3) */}
      {flowers !== 'none' && <LencoSideFlourishes />}
    </View>
  );
}

/* ----------------------------------------------- Bordado Azul da Camisa Tradicional (Corações Gémeos) */

export function CamisaHearts({ size = 32, style }: { size?: number; style?: StyleProp<ViewStyle> }) {
  const width = size * 1.6;
  const height = size;
  return (
    <View style={[{ width, height }, style]} pointerEvents="none">
      <Svg width={width} height={height} viewBox="0 0 64 40">
        <G fill="none" stroke={RaizesColors.azul} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          {/* Coração Esquerdo da Camisa */}
          <Path d="M20 12 C 16 6, 8 6, 8 15 C 8 24, 20 32, 20 32 C 20 32, 32 24, 32 15 C 32 6, 24 6, 20 12 Z" />
          {/* Coração Direito Entrelaçado */}
          <Path d="M44 12 C 40 6, 32 6, 32 15 C 32 24, 44 32, 44 32 C 44 32, 56 24, 56 15 C 56 6, 48 6, 44 12 Z" />
          {/* Detalhes tradicionais nas pontas inferiores */}
          <Path d="M14 34 L 10 38" />
          <Path d="M26 34 L 30 38" />
          <Path d="M38 34 L 34 38" />
          <Path d="M50 34 L 54 38" />
        </G>
      </Svg>
    </View>
  );
}

/* ----------------------------------------------- Faixa Floral do Lenço de Viana (Vermelho/Ouro/Flores) */

export function LençoFloralBand({ width = 280, style }: { width?: number; style?: StyleProp<ViewStyle> }) {
  const height = (width * 36) / 280;
  return (
    <View style={[{ width, height }, style]} pointerEvents="none">
      <Svg width={width} height={height} viewBox="0 0 280 36">
        {/* Linha dupla dourada do lenço */}
        <Path d="M 0 18 L 280 18" stroke={RaizesColors.ouroLinha} strokeWidth={1} />
        
        {/* Volutas douradas inspiradas no lenço de Viana */}
        <Path
          d="M 20 18 C 30 6, 50 6, 60 18 C 70 30, 90 30, 100 18 C 110 6, 130 6, 140 18 C 150 30, 170 30, 180 18 C 190 6, 210 6, 220 18 C 230 30, 250 30, 260 18"
          fill="none"
          stroke={RaizesColors.ouro}
          strokeWidth={1.4}
        />

        {/* Flores do lenço tradicional */}
        <Flower x={60} y={18} r={7} color={RaizesColors.vermelho500} center={RaizesColors.amarelo} />
        <Flower x={140} y={18} r={8} color={RaizesColors.amarelo} center={RaizesColors.vermelho500} />
        <Flower x={220} y={18} r={7} color={RaizesColors.azul} center={RaizesColors.amarelo} />

        {/* Folhinhas verdes */}
        <Circle cx={45} cy={14} r={2} fill={RaizesColors.verde} />
        <Circle cx={75} cy={22} r={2} fill={RaizesColors.verde} />
        <Circle cx={125} cy={14} r={2} fill={RaizesColors.verde} />
        <Circle cx={155} cy={22} r={2} fill={RaizesColors.verde} />
        <Circle cx={205} cy={14} r={2} fill={RaizesColors.verde} />
        <Circle cx={235} cy={22} r={2} fill={RaizesColors.verde} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  headerArch: { position: 'absolute', top: -10, left: 0, right: 0 },
  sideFlourishLeft1: { position: 'absolute', top: 180, left: -10, zIndex: 0 },
  sideFlourishRight1: { position: 'absolute', top: 440, right: -10, zIndex: 0 },
  sideFlourishLeft2: { position: 'absolute', top: 720, left: -8, zIndex: 0 },

  cardDividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 4,
  },
  cardDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: RaizesColors.ouroLinha,
  },

  divider: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: RaizesColors.ouroLinha },
  dividerBead: { width: 4, height: 4, borderRadius: 2, backgroundColor: RaizesColors.ouro },
  dividerDiamond: {
    width: 7,
    height: 7,
    backgroundColor: RaizesColors.ouro,
    transform: [{ rotate: '45deg' }],
  },
});

