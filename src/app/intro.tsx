import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import { CamisaHearts, FiligreeLace, LençoFloralBand } from '@/components/raizes/page-decor';
import { Button } from '@/components/raizes/ui/button';
import { INTRO_SLIDES } from '@/config/intro';
import {
  RaizesColors,
  RaizesFonts,
  RaizesLayout,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_WIDTH = Math.min(SCREEN_WIDTH, RaizesLayout.maxWidth);

export default function IntroScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SLIDE_WIDTH);
    if (index !== currentIndex && index >= 0 && index < INTRO_SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < INTRO_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.root}>
      {/* Detalhe Superior de Renda Dourada de Viana */}
      <FiligreeLace width={200} style={styles.laceTopLeft} opacity={0.35} />
      <FiligreeLace width={160} style={styles.laceTopRight} flip opacity={0.3} />

      <SafeAreaView style={styles.safe}>
        {/* Barra Superior com Pular e Marca Raízes */}
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <CoracaoViana size={28} />
            <Text style={styles.brandTitle}>Raízes</Text>
          </View>
          <Pressable hitSlop={10} onPress={handleSkip} style={styles.skipBtn}>
            <Text style={styles.skipText}>Saltar</Text>
          </Pressable>
        </View>

        {/* Carrossel de 6 Slides */}
        <FlatList
          ref={flatListRef}
          data={INTRO_SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.slider}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
              {/* Fotografia Enquadrada de Viana com Borda Dourada */}
              <View style={styles.imageCard}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
                <View style={styles.imageOverlay} />
                <View style={styles.imageBadge}>
                  <Text style={styles.eyebrow}>{item.eyebrow}</Text>
                </View>
              </View>

              {/* Textos do Slide */}
              <View style={styles.slideContent}>
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideText}>{item.text}</Text>
                <LençoFloralBand width={220} style={styles.slideBand} />
              </View>
            </View>
          )}
        />

        {/* Rodapé: Indicadores de Progresso + Botões */}
        <View style={styles.footer}>
          {/* Indicadores (Dots) */}
          <View style={styles.dotsRow}>
            {INTRO_SLIDES.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === currentIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>

          {/* Botão de Avançar ou Iniciar */}
          <View style={styles.actionRow}>
            <Button
              title={currentIndex === INTRO_SLIDES.length - 1 ? 'Começar a Explorar' : 'Continuar'}
              onPress={handleNext}
              variant="primary"
              icon={currentIndex === INTRO_SLIDES.length - 1 ? 'heartFill' : 'next'}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: RaizesColors.linhoFundo,
  },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
  },
  laceTopLeft: {
    position: 'absolute',
    top: -10,
    left: -10,
  },
  laceTopRight: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontFamily: RaizesFonts.serif,
    fontSize: 22,
    fontWeight: RaizesType.weight.bold,
    fontStyle: 'italic',
    color: RaizesColors.ouroTexto,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  skipText: {
    fontSize: 14,
    color: RaizesColors.textoSecundario,
    fontWeight: RaizesType.weight.medium,
  },
  slider: {
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  imageCard: {
    width: '100%',
    height: 320,
    borderRadius: RaizesRadius.card,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.raised,
    backgroundColor: RaizesColors.linhoCartao,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(53, 9, 18, 0.12)',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    backgroundColor: 'rgba(34, 5, 10, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RaizesRadius.pill,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: RaizesType.weight.bold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: RaizesColors.ouroClaro,
  },
  slideContent: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  slideTitle: {
    fontFamily: RaizesFonts.serif,
    fontSize: RaizesType.size.h1,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    textAlign: 'center',
    lineHeight: 32,
  },
  slideText: {
    fontSize: RaizesType.size.body,
    color: RaizesColors.textoSecundario,
    textAlign: 'center',
    lineHeight: 22,
  },
  slideBand: {
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 28,
    backgroundColor: RaizesColors.vermelho600,
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(122, 94, 60, 0.25)',
  },
  actionRow: {
    width: '100%',
  },
});
