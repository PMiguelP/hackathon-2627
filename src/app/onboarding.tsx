import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { CamisaHearts, FiligreeLace, LençoFloralBand } from '@/components/raizes/page-decor';
import { Button } from '@/components/raizes/ui/button';
import { ONBOARDING_STEPS, type OnboardingOption, type OnboardingStep } from '@/config/onboarding';
import {
  RaizesColors,
  RaizesFonts,
  RaizesLayout,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import { setPreferences, usePreferences } from '@/store/preferences';

export default function OnboardingScreen() {
  const prefs = usePreferences();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Armazena as seleções de cada passo
  const [answers, setAnswers] = useState<Record<string, string[]>>({
    perfil: prefs.perfil || [],
    tempo: prefs.tempo || [],
    hobbies: prefs.hobbies || [],
    barreiras: prefs.barreiras || [],
    interesses: prefs.interesses || [],
  });

  const step: OnboardingStep = ONBOARDING_STEPS[currentStepIdx];
  const selectedOptions = answers[step.key] || [];

  const toggleOption = (id: string) => {
    if (step.multi) {
      setAnswers((prev) => {
        const current = prev[step.key] || [];
        const exists = current.includes(id);
        const updated = exists ? current.filter((item) => item !== id) : [...current, id];
        return { ...prev, [step.key]: updated };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [step.key]: [id] }));
    }
  };

  const handleNext = () => {
    // Guarda na store de preferências
    setPreferences(answers);

    if (currentStepIdx < ONBOARDING_STEPS.length - 1) {
      setCurrentStepIdx((i) => i + 1);
    } else {
      // Concluiu as preferências de onboarding -> passa para os 6 slides de introdução
      router.replace('/intro');
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((i) => i - 1);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.root}>
      {/* Detalhes de Renda Dourada de Viana */}
      <FiligreeLace width={160} style={styles.laceTopRight} flip opacity={0.3} />

      <SafeAreaView style={styles.safe}>
        {/* Barra Superior com Progresso e Voltar */}
        <View style={styles.topBar}>
          <Pressable hitSlop={10} onPress={handleBack} style={styles.backBtn}>
            <Text style={styles.backBtnText}>‹ Voltar</Text>
          </Pressable>
          <View style={styles.coracaoCenter}>
            <CoracaoViana size={26} />
          </View>
          <Text style={styles.stepIndicator}>
            {currentStepIdx + 1}/{ONBOARDING_STEPS.length}
          </Text>
        </View>

        {/* Barra de Progresso Dourada */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentStepIdx + 1) / ONBOARDING_STEPS.length) * 100}%` },
            ]}
          />
        </View>

        {/* Conteúdo da Pergunta */}
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionTitle}>{step.title}</Text>
            <Text style={styles.questionSubtitle}>{step.subtitle}</Text>
            <CamisaHearts size={24} style={styles.camisaHearts} />
          </View>

          {/* Lista de Opções */}
          <View style={styles.optionsGrid}>
            {step.options.map((opt: OnboardingOption) => {
              const isSelected = selectedOptions.includes(opt.id);
              return (
                <Pressable
                  key={opt.id}
                  onPress={() => toggleOption(opt.id)}
                  style={({ pressed }) => [
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                    pressed && styles.pressed,
                  ]}>
                  {opt.emoji ? <Text style={styles.optionEmoji}>{opt.emoji}</Text> : null}
                  <Text
                    style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected,
                    ]}>
                    {opt.label}
                  </Text>
                  <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                    {isSelected && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <LençoFloralBand width={240} style={styles.bottomBand} />
        </ScrollView>

        {/* Rodapé com Botão Continuar */}
        <View style={styles.footer}>
          <Button
            title={currentStepIdx === ONBOARDING_STEPS.length - 1 ? 'Concluir Integração' : 'Continuar'}
            onPress={handleNext}
            disabled={selectedOptions.length === 0}
            variant="primary"
          />
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
    paddingBottom: 8,
  },
  backBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  backBtnText: {
    fontSize: 16,
    color: RaizesColors.textoSecundario,
    fontWeight: RaizesType.weight.medium,
  },
  coracaoCenter: {
    alignItems: 'center',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroTexto,
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(122, 94, 60, 0.15)',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: RaizesColors.vermelho600,
  },
  content: {
    paddingHorizontal: RaizesLayout.screenPadding + 4,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 20,
  },
  questionHeader: {
    alignItems: 'center',
    gap: 6,
  },
  questionTitle: {
    fontFamily: RaizesFonts.serif,
    fontSize: RaizesType.size.h1,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    textAlign: 'center',
    lineHeight: 32,
  },
  questionSubtitle: {
    fontSize: RaizesType.size.small + 1,
    color: RaizesColors.textoSecundario,
    textAlign: 'center',
  },
  camisaHearts: {
    marginTop: 8,
  },
  optionsGrid: {
    gap: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.lg,
    borderWidth: 1,
    borderColor: RaizesColors.linhoBorda,
    boxShadow: RaizesShadow.card,
    gap: 12,
  },
  optionCardSelected: {
    borderColor: RaizesColors.vermelho600,
    backgroundColor: 'rgba(163, 21, 32, 0.04)',
  },
  optionEmoji: {
    fontSize: 20,
  },
  optionLabel: {
    flex: 1,
    fontSize: RaizesType.size.body,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.texto,
  },
  optionLabelSelected: {
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.vermelho600,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: RaizesColors.linhoBorda,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleSelected: {
    borderColor: RaizesColors.vermelho600,
    backgroundColor: RaizesColors.vermelho600,
  },
  checkMark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomBand: {
    alignSelf: 'center',
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: RaizesLayout.screenPadding + 4,
    paddingBottom: 20,
  },
  pressed: {
    opacity: 0.8,
  },
});
