import { useId } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Stop } from 'react-native-svg';

import { RaizesColors } from '@/constants/raizes-theme';

/**
 * Coração de Viana em filigrana (SVG).
 *
 * Reutilizável em qualquer sítio: navbar, logótipo, marcadores de mapa,
 * estados vazios, perfil, etc.
 *
 *   <CoracaoViana size={48} />                      // dourado, filigrana
 *   <CoracaoViana size={24} variant="outline" />    // só contornos
 *   <CoracaoViana size={32} color="#A31520" />      // noutra cor
 */

export type CoracaoVianaProps = {
  /** Altura em px (a largura é proporcional: 100/120). */
  size?: number;
  /** "filled" = ouro maciço com relevo; "outline" = só filigrana. */
  variant?: 'filled' | 'outline';
  /** Cor principal (linhas). */
  color?: string;
  /** Cor de brilho (gradiente / detalhes). */
  highlight?: string;
  /** Cor de sombra (gradiente / linhas internas no "filled"). */
  shade?: string;
  style?: StyleProp<ViewStyle>;
};

/* ---------- Geometria (calculada uma vez) ---------- */

// Coração paramétrico clássico: x = 16 sin³t, y = 13cos t − 5cos2t − 2cos3t − cos4t
function heartPoint(t: number, scale: number, cx: number, cy: number) {
  const x = 16 * Math.sin(t) ** 3;
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return [cx + x * scale, cy + y * scale] as const;
}

function heartPath(scale: number, cx: number, cy: number, steps = 96) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const [x, y] = heartPoint((i / steps) * Math.PI * 2, scale, cx, cy);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + 'Z';
}

const CX = 50;
const CY = 66;
const OUTER = heartPath(2.75, CX, CY);
const INNER = heartPath(2.2, CX, CY - 1);
const CORE = heartPath(1.55, CX, CY - 2);

// Contas (bolinhas) à volta do contorno — o "cordão" da filigrana
const BEADS = Array.from({ length: 34 }, (_, i) => {
  const t = (i / 34) * Math.PI * 2;
  return heartPoint(t, 2.48, CX, CY - 0.5);
});

// Volutas (espirais) da filigrana — lado esquerdo; o direito é espelhado
const SCROLL_LEFT =
  'M40 50 C 30 44, 22 52, 27 60 C 31 66, 40 62, 37 56 C 35 52, 30 54, 31 57';
const SCROLL_LOW_LEFT = 'M44 84 C 36 82, 32 74, 37 70 C 41 67, 45 72, 41 75';

// Chama no topo
const FLAME_OUT =
  'M50 4 C 43 12, 40 19, 44 26 C 45.5 28.5, 47.5 30, 50 31 C 52.5 30, 54.5 28.5, 56 26 C 60 19, 57 12, 50 4 Z';
const FLAME_IN = 'M50 13 C 46.5 18, 46 22.5, 48.2 26 C 49 27, 51 27, 51.8 26 C 54 22.5, 53.5 18, 50 13 Z';

export function CoracaoViana({
  size = 48,
  variant = 'filled',
  color = RaizesColors.ouro,
  highlight = RaizesColors.ouroClaro,
  shade = RaizesColors.ouroEscuro,
  style,
}: CoracaoVianaProps) {
  const gid = useId().replace(/:/g, '');
  const filled = variant === 'filled';
  const line = filled ? shade : color;
  const width = (size * 100) / 120;

  return (
    <View style={[{ width, height: size }, style]} pointerEvents="none">
      <Svg width={width} height={size} viewBox="0 0 100 120">
        <Defs>
          <LinearGradient id={`g${gid}`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={highlight} />
            <Stop offset="0.4" stopColor={color} />
            <Stop offset="1" stopColor={shade} />
          </LinearGradient>
          <LinearGradient id={`gFlame${gid}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={highlight} />
            <Stop offset="1" stopColor={color} />
          </LinearGradient>
        </Defs>

        {/* 1. Argola de suspensão no topo */}
        <Circle cx={50} cy={6} r={3.8} fill="none" stroke={color} strokeWidth={1.8} />
        <Circle cx={50} cy={12} r={3} fill={filled ? `url(#g${gid})` : 'none'} stroke={line} strokeWidth={1.2} />

        {/* 2. Chama / Coroa de Filigrana */}
        <G fill="none" stroke={line} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
          {/* Lóbulo esquerdo da chama */}
          <Path d="M 50 15 C 40 12, 32 17, 34 26 C 36 34, 46 34, 50 36" />
          <Path d="M 40 22 C 43 25, 46 22, 44 19 C 42 17, 38 20, 42 26" strokeWidth={0.9} />
          {/* Lóbulo direito da chama */}
          <Path d="M 50 15 C 60 12, 68 17, 66 26 C 64 34, 54 34, 50 36" />
          <Path d="M 60 22 C 57 25, 54 22, 56 19 C 58 17, 62 20, 58 26" strokeWidth={0.9} />
          {/* Chama central ascendente */}
          <Path d="M 50 15 C 47 22, 47 29, 50 35 C 53 29, 53 22, 50 15 Z" fill={filled ? highlight : 'none'} strokeWidth={1} />
        </G>
        {/* Contas da chama */}
        {[
          [35, 23], [65, 23], [42, 16], [58, 16], [41, 31], [59, 31]
        ].map(([x, y], i) => (
          <Circle key={`fb${i}`} cx={x} cy={y} r={1.3} fill={filled ? highlight : color} />
        ))}

        {/* 3. Corpo do Coração com Ponta Recurva à Esquerda */}
        {/* Contorno exterior com fio de ouro torcido */}
        <Path
          d="M 50 36 C 42 27, 18 26, 12 44 C 6 62, 18 80, 40 98 C 45 102, 47 106, 44 110 C 41 113, 36 113, 34 109 C 33 106, 35 103, 38 104 C 40 105, 40 108, 38 108 C 50 108, 56 99, 62 93 C 82 76, 94 60, 88 44 C 82 26, 58 27, 50 36 Z"
          fill={filled ? `url(#g${gid})` : 'none'}
          stroke={line}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />

        {/* Contorno interior paralelo de filigrana */}
        <Path
          d="M 50 40 C 44 32, 23 31, 17 46 C 12 61, 22 76, 42 93 C 48 98, 49 102, 46 106 C 54 102, 60 94, 65 89 C 79 74, 88 61, 83 46 C 77 31, 56 32, 50 40 Z"
          fill="none"
          stroke={filled ? highlight : color}
          strokeWidth={1.1}
        />

        {/* Cordão perolado / contas granuladas ao longo da orla */}
        {[
          [16, 38], [21, 33], [28, 31], [36, 32], [43, 35],
          [57, 35], [64, 32], [72, 31], [79, 33], [84, 38],
          [13, 46], [11, 54], [13, 63], [18, 71], [25, 79], [33, 87],
          [87, 46], [89, 54], [87, 63], [82, 71], [75, 79], [67, 87],
          [41, 95], [59, 95]
        ].map(([x, y], i) => (
          <Circle key={`cb${i}`} cx={x} cy={y} r={1.2} fill={filled ? (i % 2 === 0 ? highlight : shade) : color} />
        ))}

        {/* 4. Caracóis de Filigrana nos Lobos Superiores */}
        <G fill="none" stroke={line} strokeWidth={1.2} strokeLinecap="round">
          {/* Volutas do lobo esquerdo */}
          <Path d="M 24 48 C 22 40, 32 38, 36 43 C 40 48, 34 54, 29 52 C 26 50, 27 46, 30 46" />
          <Path d="M 22 62 C 20 54, 30 52, 34 57 C 37 62, 32 67, 28 66" strokeWidth={1} />
          {/* Volutas do lobo direito */}
          <Path d="M 76 48 C 78 40, 68 38, 64 43 C 60 48, 66 54, 71 52 C 74 50, 73 46, 70 46" />
          <Path d="M 78 62 C 80 54, 70 52, 66 57 C 63 62, 68 67, 72 66" strokeWidth={1} />
          {/* Volutas da cauda */}
          <Path d="M 46 82 C 40 85, 36 91, 41 94 C 45 97, 49 93, 46 90" strokeWidth={1} />
          <Path d="M 54 82 C 60 85, 64 91, 59 94 C 55 97, 51 93, 54 90" strokeWidth={1} />
        </G>

        {/* 5. A Flor Central de 8 Pétalas (Rosácea Tradicional de Viana) */}
        <G>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <G key={`petal${angle}`} transform={`rotate(${angle} 50 63)`}>
              {/* Pétala com aro dourado e nervura interior */}
              <Path
                d="M 47 54 C 47 49, 53 49, 53 54 C 53 58, 50 61, 50 61 C 50 61, 47 58, 47 54 Z"
                fill={filled ? highlight : 'none'}
                stroke={line}
                strokeWidth={1}
              />
              <Circle cx={50} cy={53} r={0.8} fill={shade} />
            </G>
          ))}
          {/* Miolo da flor: pérola dourada com anel granulado */}
          <Circle cx={50} cy={63} r={5.2} fill="none" stroke={line} strokeWidth={1.1} />
          <Circle cx={50} cy={63} r={3.8} fill={filled ? `url(#g${gid})` : color} />
          <Circle cx={48.8} cy={61.8} r={1.2} fill={highlight} />
        </G>

        {/* 6. Caracol Final da Ponta */}
        <Circle cx={36} cy={107} r={2.2} fill={filled ? highlight : color} stroke={line} strokeWidth={0.8} />
      </Svg>
    </View>
  );
}
