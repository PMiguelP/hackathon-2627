import { Platform } from 'react-native';

/**
 * ============================================================================
 *  RAÍZES — DESIGN SYSTEM (ficheiro único de tokens)
 * ============================================================================
 *  Tudo o que é visual vive aqui: cores, tipografia, espaçamentos, larguras,
 *  raios, sombras, inputs, botões, navbar e decoração.
 *  Muda um valor aqui → muda na app inteira.
 *
 *  Coerência de cor: todos os vermelhos pertencem à MESMA família de tom
 *  (vermelho do lenço, ~355°), só muda a luminosidade.
 * ============================================================================
 */

/* ------------------------------------------------------------------ CORES */
export const RaizesColors = {
  // Vermelhos (escuro → vivo) — mesma família
  vinho950: '#22050A',
  vinho900: '#350912', // fundo dos ecrãs escuros (intro, login, registo)
  vinho800: '#4C0D18',
  vinho700: '#6B1220',
  vermelho600: '#A31520', // vermelho principal da UI clara (pílulas, tab ativa)
  vermelho500: '#C41E2E', // vermelho do lenço (acentos, gostos)
  vermelho400: '#E0413F',
  vermelhoSuave: 'rgba(163, 21, 32, 0.08)',

  // Ouro (filigrana / cordões)
  ouro: '#D6A84E',
  ouroClaro: '#F2D896',
  ouroEscuro: '#9A7428',
  ouroTexto: '#A87A22', // ouro legível sobre fundo claro
  ouroLinha: 'rgba(214, 168, 78, 0.45)',
  ouroLinhaForte: 'rgba(214, 168, 78, 0.9)',
  ouroDecor: 'rgba(214, 168, 78, 0.35)', // filigranas decorativas discretas

  // Linho (camisa) — fundos claros
  linho: '#F7EEDF',
  linhoFundo: '#F8F3EA', // fundo das páginas claras
  linhoCartao: '#FFFDF9', // cartões
  linhoBorda: 'rgba(122, 94, 60, 0.12)',
  linhoSuave: 'rgba(247, 238, 223, 0.72)', // texto secundário em fundo escuro
  linhoTenue: 'rgba(247, 238, 223, 0.45)',

  // Texto (fundo claro)
  texto: '#1E1714',
  textoSecundario: '#6F635A',
  textoMuted: '#9C9087',
  textoInverso: '#FFFFFF',

  // Bordados
  azul: '#2A4FA8',
  amarelo: '#F2B632',
  verde: '#3E8E5A',

  // Campos em fundo escuro
  campo: 'rgba(34, 5, 10, 0.55)',
  campoFoco: 'rgba(34, 5, 10, 0.8)',
  // Campos em fundo claro
  campoClaro: '#FFFFFF',

  erro: '#C0392B',
  erroEscuro: '#FFB4A8', // erro sobre fundo escuro
  sucesso: '#3E8E5A',
} as const;

/* ------------------------------------------------------------- TIPOGRAFIA */
export const RaizesFonts = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia, "Times New Roman", serif',
  }) as string,
  sans: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
  }) as string,
};

export const RaizesType = {
  size: {
    logo: 52,
    hero: 30, // títulos de página ("Feed")
    h1: 26,
    h2: 21,
    h3: 18,
    cardTitle: 17,
    body: 15,
    small: 13,
    caption: 12,
    tab: 11,
  },
  weight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },
  lineHeight: {
    hero: 36,
    h1: 32,
    h2: 27,
    body: 22,
    small: 18,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1.2,
    wider: 4,
  },
} as const;

/* ------------------------------------------------ ESPAÇAMENTOS E LARGURAS */
export const RaizesSpacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const RaizesLayout = {
  maxWidth: 480, // largura máxima do conteúdo (web/tablet)
  screenPadding: 16, // padding lateral das páginas
  authPadding: 32, // padding lateral dos ecrãs escuros (login, intro)
  cardPadding: 14,
  cardGap: 16,
  sectionGap: 24,
  avatar: { sm: 32, md: 42, lg: 92 },
  postImageHeight: 220,
} as const;

/* ---------------------------------------------------------------- RAIOS */
export const RaizesRadius = {
  sm: 8,
  md: 14,
  lg: 18,
  card: 22,
  image: 16,
  pill: 999,
  input: 14,
  button: 27,
  sheet: 28,
} as const;

/* -------------------------------------------------------------- SOMBRAS */
export const RaizesShadow = {
  card: '0 4px 14px rgba(54, 36, 23, 0.07)',
  raised: '0 8px 22px rgba(54, 36, 23, 0.12)',
  navbar: '0 -4px 18px rgba(54, 36, 23, 0.08)',
  gold: '0 6px 16px rgba(154, 116, 40, 0.35)',
  button: '0 6px 18px rgba(0, 0, 0, 0.30)',
} as const;

/* ------------------------------------------------------ INPUTS / BOTÕES */
export const RaizesInput = {
  height: 52,
  paddingHorizontal: 16,
  fontSize: RaizesType.size.body,
  borderWidth: 1,
  radius: RaizesRadius.input,
  iconSize: 18,
} as const;

export const RaizesButton = {
  height: 54,
  heightSm: 40,
  radius: RaizesRadius.button,
  fontSize: 17,
  fontSizeSm: 14,
} as const;

/* --------------------------------------------------------------- NAVBAR */
export const RaizesNavbar = {
  height: 56,
  radius: 22,
  iconSize: 22,
  heartSize: 54, // coração central
  heartLift: 22, // quanto o coração sobe acima da barra
  activeColor: RaizesColors.vermelho600,
  inactiveColor: RaizesColors.textoSecundario,
  background: RaizesColors.linhoCartao,
} as const;

/* ------------------------------------------------------------ DECORAÇÃO */
export const RaizesDecor = {
  filigreeOpacity: 0.55, // renda dourada do topo
  flowerOpacity: 0.5, // flores bordadas espalhadas
  flowerColors: [RaizesColors.vermelho500, RaizesColors.amarelo, RaizesColors.azul],
} as const;

/* ---------------------------------------------------------------------------
 *  Alias de compatibilidade para os componentes do tema escuro (login, etc.)
 * ------------------------------------------------------------------------- */
export const Raizes = {
  ...RaizesColors,
  linhaOuro: RaizesColors.ouroLinha,
  linhaOuroForte: RaizesColors.ouroLinhaForte,
  erro: RaizesColors.erroEscuro,
} as const;

/** @deprecated usar RaizesType / RaizesFonts */
export const RaizesTypography = {
  fontFamily: RaizesFonts,
  sizes: RaizesType.size,
  weights: RaizesType.weight,
  lineHeights: RaizesType.lineHeight,
} as const;
