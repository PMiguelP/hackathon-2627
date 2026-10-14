import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import { STAY_IN_VIANA_SPOTS, type StayInVianaSpot } from '@/data/stay-in-viana';

export function FullscreenVianaMap({
  selectedSpotId,
  onSelectSpot,
  onOpenStory,
}: {
  selectedSpotId: string | null;
  onSelectSpot: (spot: StayInVianaSpot | null) => void;
  onOpenStory: (spot: StayInVianaSpot) => void;
}) {
  const selectedSpot =
    STAY_IN_VIANA_SPOTS.find((s) => s.id === selectedSpotId) ?? null;

  return (
    <View style={styles.container}>
      {/* MAPA CARTOGRÁFICO DE VIANA (ESCALA REGIONAL, VISÃO AMPLA 400x850) */}
      <View style={StyleSheet.absoluteFill}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 400 850"
          preserveAspectRatio="xMidYMid slice">
          <Defs>
            {/* Gradiente suave do Oceano Atlântico */}
            <LinearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#B3CFDF" stopOpacity="0.95" />
              <Stop offset="0.75" stopColor="#CDE1ED" stopOpacity="0.9" />
              <Stop offset="1" stopColor="#DFEDF5" stopOpacity="0.85" />
            </LinearGradient>

            {/* Gradiente do Rio Lima */}
            <LinearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#C0D9E8" stopOpacity="0.95" />
              <Stop offset="1" stopColor="#ADCDE0" stopOpacity="0.95" />
            </LinearGradient>

            {/* Gradiente da Terra / Linho Pergaminho */}
            <LinearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#F9F4EB" />
              <Stop offset="1" stopColor="#F4EDE1" />
            </LinearGradient>
          </Defs>

          {/* Fundo da Terra (Pergaminho Linho) */}
          <Rect x="0" y="0" width="400" height="850" fill="url(#landGrad)" />

          {/* OCEANO ATLÂNTICO (Costa Norte a Sul em escala ampla) */}
          {/* Costa: Afife (x:110, y:0) -> Carreço (x:125, y:140) -> Areosa (x:145, y:280) -> Foz do Lima (x:155, y:370) -> Cabedelo (x:130, y:450) -> Amorosa (x:115, y:600) -> Neiva (x:95, y:850) */}
          <Path
            d="
              M 0 0
              L 110 0
              C 105 70, 125 140, 125 180
              C 125 220, 145 280, 145 320
              C 145 345, 155 365, 155 385
              L 125 395
              C 115 440, 130 480, 130 520
              C 130 580, 115 640, 115 700
              C 115 760, 95 800, 95 850
              L 0 850
              Z
            "
            fill="url(#oceanGrad)"
          />

          {/* ONDAS NÁUTICAS SUAVES NO OCEANO */}
          <G stroke="rgba(42, 79, 168, 0.22)" strokeWidth="0.8" fill="none">
            <Path d="M 15 80 q 8 -4 16 0 t 16 0" />
            <Path d="M 30 180 q 8 -4 16 0 t 16 0" />
            <Path d="M 20 290 q 8 -4 16 0 t 16 0" />
            <Path d="M 12 430 q 8 -4 16 0 t 16 0" />
            <Path d="M 25 560 q 8 -4 16 0 t 16 0" />
            <Path d="M 18 690 q 8 -4 16 0 t 16 0" />
            <Path d="M 32 780 q 8 -4 16 0 t 16 0" />
          </G>

          {/* AREAL DOURADO DO CABEDELO E PRAIAS DA COSTA */}
          {/* Cabedelo */}
          <Path
            d="
              M 155 425
              C 170 435, 175 460, 165 490
              C 155 520, 135 535, 130 520
              C 125 470, 140 435, 155 425
              Z
            "
            fill="#EAD9B4"
          />
          {/* Praia de Afife / Carreço ao Norte */}
          <Path
            d="
              M 110 30
              C 118 60, 124 100, 126 140
              L 121 142
              C 118 100, 112 60, 106 30
              Z
            "
            fill="#EAD9B4"
            opacity="0.85"
          />

          {/* RIO LIMA (Serpenteia do Interior a Este até à Foz em Viana) */}
          <Path
            d="
              M 400 375
              C 350 365, 305 385, 260 375
              C 230 368, 200 382, 175 380
              C 160 380, 150 385, 125 395
              C 140 415, 155 425, 185 418
              C 220 410, 255 418, 290 405
              C 330 395, 365 412, 400 402
              Z
            "
            fill="url(#riverGrad)"
          />

          {/* Ilhotas e bancos de areia no estuário do Lima */}
          <Path
            d="M 215 396 C 228 393, 238 395, 232 400 C 222 403, 212 400, 215 396 Z"
            fill="#EAD9B4"
          />
          <Path
            d="M 270 390 C 282 387, 290 389, 285 394 C 278 397, 268 394, 270 390 Z"
            fill="#EAD9B4"
          />

          {/* PONTE EIFFEL DE VIANA (Linha de ferro sobre o rio) */}
          <Line
            x1="238"
            y1="375"
            x2="242"
            y2="415"
            stroke={RaizesColors.ouroEscuro}
            strokeWidth="2.4"
            strokeDasharray="2, 1.2"
          />

          {/* PONTE NOVA (A28) A MONTANTE */}
          <Line
            x1="310"
            y1="382"
            x2="314"
            y2="410"
            stroke="rgba(122, 94, 60, 0.45)"
            strokeWidth="1.8"
          />

          {/* MONTE DE SANTA LUZIA — Curvas de nível e relevo florestal */}
          <G fill="none" stroke="rgba(62, 142, 90, 0.35)" strokeWidth="0.8">
            <Path d="M 180 280 C 200 170, 290 160, 310 240 C 320 290, 270 325, 220 315 C 195 310, 175 295, 180 280 Z" />
            <Path d="M 200 270 C 215 190, 280 180, 295 240 C 302 280, 260 305, 230 298 C 210 292, 195 282, 200 270 Z" />
            <Path d="M 218 260 C 228 205, 270 200, 280 242 C 285 270, 255 288, 238 282 C 225 278, 215 270, 218 260 Z" />
          </G>
          {/* Mancha florestal de Santa Luzia */}
          <Path
            d="M 210 220 C 235 180, 280 185, 290 230 C 275 255, 240 260, 210 220 Z"
            fill="rgba(62, 142, 90, 0.12)"
          />

          {/* SERRA D'ARGA AO NORTE (Horizontes distantes) */}
          <Path
            d="M 240 60 C 280 30, 340 35, 380 50 L 400 30 L 400 100 C 340 90, 290 80, 240 60 Z"
            fill="rgba(62, 142, 90, 0.08)"
          />

          {/* REDE VIÁRIA E MALHA URBANA PRINCIPAL */}
          <G stroke="rgba(140, 110, 75, 0.28)" strokeWidth="0.9" fill="none">
            {/* EN13 Norte-Sul */}
            <Path d="M 125 30 L 140 180 L 165 340 L 195 372" />
            <Path d="M 242 415 L 255 520 L 240 680 L 220 850" />
            {/* Eixo Viana - Ponte de Lima pela margem norte */}
            <Path d="M 195 372 L 238 375 L 310 382 L 400 365" />
            {/* Eixo Viana - Santa Marta */}
            <Path d="M 238 375 C 280 340, 310 330, 360 325 L 400 320" />
            {/* Subida a Santa Luzia */}
            <Path d="M 195 365 C 210 330, 225 300, 232 265" strokeDasharray="3, 2" />
          </G>

          {/* LINHAS DE RUMO NÁUTICAS (Rhumb lines em ouro discreto) */}
          <G stroke="rgba(214, 168, 78, 0.28)" strokeWidth="0.5" strokeDasharray="4, 3" fill="none">
            <Line x1="65" y1="210" x2="380" y2="210" />
            <Line x1="65" y1="210" x2="280" y2="0" />
            <Line x1="65" y1="210" x2="350" y2="495" />
            <Line x1="65" y1="210" x2="65" y2="820" />
            <Line x1="65" y1="210" x2="0" y2="350" />
            <Line x1="65" y1="210" x2="220" y2="700" />
          </G>

          {/* ROSA DOS VENTOS CLÁSSICA NO OCEANO (x:65, y:210) */}
          <G transform="translate(65, 210)">
            <Circle cx="0" cy="0" r="24" fill="none" stroke={RaizesColors.ouroLinha} strokeWidth="0.8" />
            <Circle cx="0" cy="0" r="18" fill="rgba(255, 253, 249, 0.6)" stroke={RaizesColors.ouroLinha} strokeWidth="0.5" />
            {/* Pontas dos Ventos */}
            <Path d="M 0 -18 L 3 -4 L 0 0 L -3 -4 Z" fill={RaizesColors.vermelho600} />
            <Path d="M 0 18 L 3 4 L 0 0 L -3 4 Z" fill={RaizesColors.ouroEscuro} />
            <Path d="M 18 0 L 4 3 L 0 0 L 4 -3 Z" fill={RaizesColors.ouroEscuro} />
            <Path d="M -18 0 L -4 3 L 0 0 L -4 -3 Z" fill={RaizesColors.ouroEscuro} />
            {/* Flor de Lis Norte */}
            <SvgText
              x="0"
              y="-21"
              fontSize="9"
              fontWeight="bold"
              fill={RaizesColors.vermelho600}
              textAnchor="middle">
              N
            </SvgText>
          </G>

          {/* TOPONÍMIA CARTOGRÁFICA CLÁSSICA */}
          {/* Oceano Atlântico (Vertical) */}
          <G transform="translate(26, 480) rotate(-90)">
            <SvgText
              x="0"
              y="0"
              fontSize="10"
              letterSpacing="3"
              fill="rgba(42, 79, 168, 0.55)"
              fontWeight="bold"
              fontFamily="Georgia">
              OCEANO ATLÂNTICO
            </SvgText>
          </G>

          {/* Rio Lima */}
          <SvgText
            x="340"
            y="386"
            fontSize="9"
            letterSpacing="2.5"
            fill="rgba(42, 79, 168, 0.65)"
            fontWeight="bold"
            fontFamily="Georgia">
            RIO LIMA
          </SvgText>

          {/* Santa Luzia */}
          <SvgText
            x="200"
            y="235"
            fontSize="9"
            letterSpacing="1.2"
            fill={RaizesColors.ouroEscuro}
            fontWeight="bold">
            MONTE DE SANTA LUZIA
          </SvgText>

          {/* Viana do Castelo (Centro) */}
          <SvgText
            x="230"
            y="355"
            fontSize="10.5"
            letterSpacing="1.5"
            fill={RaizesColors.texto}
            fontWeight="bold"
            fontFamily="Georgia">
            VIANA DO CASTELO
          </SvgText>

          {/* Cabedelo */}
          <SvgText
            x="175"
            y="495"
            fontSize="8.5"
            letterSpacing="1.2"
            fill={RaizesColors.ouroTexto}
            fontWeight="bold">
            CABEDELO
          </SvgText>

          {/* Darque */}
          <SvgText
            x="255"
            y="435"
            fontSize="8.5"
            letterSpacing="1"
            fill={RaizesColors.textoSecundario}>
            DARQUE
          </SvgText>

          {/* Santa Marta de Portuzelo */}
          <SvgText
            x="320"
            y="360"
            fontSize="8.5"
            letterSpacing="1"
            fill={RaizesColors.textoSecundario}>
            STA. MARTA
          </SvgText>

          {/* MOLDURA NÁUTICA EXTERIOR */}
          <Rect
            x="4"
            y="4"
            width="392"
            height="842"
            fill="none"
            stroke={RaizesColors.ouroLinha}
            strokeWidth="1"
          />
          <Rect
            x="8"
            y="8"
            width="384"
            height="834"
            fill="none"
            stroke="rgba(214, 168, 78, 0.35)"
            strokeWidth="0.5"
          />
        </Svg>
      </View>

      {/* PINS NÁUTICOS DOURADOS COM FOTOS / CORAÇÃO */}
      {STAY_IN_VIANA_SPOTS.map((spot) => {
        const isSelected = spot.id === selectedSpotId;
        return (
          <Pressable
            key={spot.id}
            hitSlop={12}
            onPress={() => onSelectSpot(isSelected ? null : spot)}
            style={[
              styles.pinWrap,
              { left: `${spot.x * 100}%`, top: `${spot.y * 100}%` },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Ponto: ${spot.name}`}>
            {/* Halo radiante pulsante quando selecionado */}
            {isSelected && <View style={styles.pulseRing} />}

            {/* Medalhão Dourado com a Foto do Local */}
            <View style={[styles.pinMedal, isSelected && styles.pinMedalSelected]}>
              <Image source={spot.image} style={styles.pinPhoto} resizeMode="cover" />
              {/* Pingente Coração de Viana no bordo */}
              <View style={styles.miniHeartBadge}>
                <CoracaoViana
                  size={10}
                  variant="filled"
                  color={isSelected ? RaizesColors.vermelho600 : RaizesColors.ouro}
                />
              </View>
            </View>

            {/* Ponteiro agudo para a coordenada exata */}
            <View style={[styles.pinPointer, isSelected && styles.pinPointerSelected]} />
          </Pressable>
        );
      })}

      {/* TOOLTIP FLUTUANTE QUANDO UM PONTO ESTÁ SELECIONADO */}
      {selectedSpot && (
        <View style={styles.tooltipWrap}>
          <Pressable
            style={styles.tooltipCard}
            onPress={() => onOpenStory(selectedSpot)}
            accessibilityRole="button"
            accessibilityLabel="Abrir história de quem ficou">
            {/* Botão fechar tooltip */}
            <Pressable
              hitSlop={10}
              onPress={() => onSelectSpot(null)}
              style={styles.tooltipClose}
              accessibilityLabel="Fechar cartão">
              <Icon name="close" size={14} color={RaizesColors.textoSecundario} />
            </Pressable>

            {/* Linha de Destaque / Slogan */}
            <View style={styles.tooltipBadgeRow}>
              <CoracaoViana size={13} variant="filled" color={RaizesColors.ouro} />
              <Text style={styles.tooltipBadgeText}>ISTO FAZ QUERER FICAR EM VIANA</Text>
            </View>

            {/* Conteúdo com Foto e Texto */}
            <View style={styles.tooltipMainRow}>
              <Image
                source={selectedSpot.image}
                style={styles.tooltipThumb}
                resizeMode="cover"
              />

              <View style={styles.tooltipTextCol}>
                <Text style={styles.tooltipPlaceTitle} numberOfLines={1}>
                  {selectedSpot.name}
                </Text>
                <Text style={styles.tooltipPersonTeaser} numberOfLines={1}>
                  {selectedSpot.personName} · {selectedSpot.personOrigin}
                </Text>
                <Text style={styles.tooltipQuoteSnippet} numberOfLines={2}>
                  {selectedSpot.quote}
                </Text>
              </View>
            </View>

            {/* Botão de Ação: Ler História Completa */}
            <View style={styles.tooltipButton}>
              <Text style={styles.tooltipButtonText}>Ler história de quem ficou</Text>
              <Icon name="chevronRight" size={14} color={RaizesColors.textoInverso} />
            </View>
          </Pressable>
        </View>
      )}

      {/* Pílula discreta na base quando nenhum ponto está selecionado */}
      {!selectedSpot && (
        <View style={styles.hintPill} pointerEvents="none">
          <CoracaoViana size={14} variant="filled" color={RaizesColors.ouro} />
          <Text style={styles.hintText}>
            Toca nos pontos do mapa para descobrir porque decidiram ficar em Viana
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#F9F4EB',
    overflow: 'hidden',
  },
  pinWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -18 }, { translateY: -38 }],
    zIndex: 20,
  },
  pulseRing: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(214, 168, 78, 0.25)',
    borderWidth: 2,
    borderColor: RaizesColors.vermelho600,
  },
  pinMedal: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: RaizesColors.ouroEscuro,
    boxShadow: RaizesShadow.raised,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  pinMedalSelected: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2.5,
    borderColor: RaizesColors.vermelho600,
    transform: [{ scale: 1.15 }],
  },
  pinPhoto: {
    width: '100%',
    height: '100%',
  },
  miniHeartBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 253, 249, 0.95)',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: RaizesColors.ouroEscuro,
    marginTop: -1,
  },
  pinPointerSelected: {
    borderTopColor: RaizesColors.vermelho600,
    borderTopWidth: 9,
  },
  tooltipWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 92,
    zIndex: 35,
  },
  tooltipCard: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.raised,
    gap: 10,
    position: 'relative',
  },
  tooltipClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(247, 238, 223, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  tooltipBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 24,
  },
  tooltipBadgeText: {
    fontSize: 10.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroEscuro,
    letterSpacing: 0.5,
  },
  tooltipMainRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  tooltipThumb: {
    width: 68,
    height: 68,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  tooltipTextCol: {
    flex: 1,
    gap: 2,
  },
  tooltipPlaceTitle: {
    fontSize: 14.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  tooltipPersonTeaser: {
    fontSize: 11,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.vermelho600,
  },
  tooltipQuoteSnippet: {
    fontSize: 11.5,
    color: RaizesColors.textoSecundario,
    fontStyle: 'italic',
    lineHeight: 15,
    marginTop: 2,
  },
  tooltipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: RaizesColors.vermelho600,
    paddingVertical: 9,
    borderRadius: RaizesRadius.button,
  },
  tooltipButtonText: {
    fontSize: 12.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
  },
  hintPill: {
    position: 'absolute',
    bottom: 96,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 253, 249, 0.94)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    maxWidth: '92%',
  },
  hintText: {
    fontSize: 12,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.texto,
    textAlign: 'center',
  },
});
