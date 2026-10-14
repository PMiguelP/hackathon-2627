import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoldButton, OutlineButton, RaizesField } from '@/components/raizes/controls';
import {
  EmbroideryBand,
  FiligreeFrame,
  GoldChain,
  VianaEmblem,
} from '@/components/raizes/ornaments';
import { Raizes } from '@/constants/raizes-theme';
import { Fonts } from '@/constants/theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Ecrã de Registo / Criar Conta (apenas UI — sem backend).
 * Baseado no tema e design do Raízes (Viana do Castelo).
 */
export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  function handleRegister() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Introduz o teu nome ou utilizador.';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Introduz um email válido.';
    if (password.length < 6) next.password = 'A palavra-passe deve ter pelo menos 6 caracteres.';
    setErrors(next);
    if (Object.keys(next).length) return;

    // Transição para o onboarding (interesses, hobbies, etc.)
    router.replace('/onboarding');
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      {/* Halo vermelho-lenço suave no topo */}
      <View style={styles.glowTop} pointerEvents="none">
        {[520, 430, 340, 250].map((s) => (
          <View key={s} style={[styles.glowRing, { width: s, height: s, borderRadius: s / 2 }]} />
        ))}
      </View>
      <View style={styles.glowBottom} pointerEvents="none" />
      <FiligreeFrame />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {/* Marca */}
              <View style={styles.brand}>
                <VianaEmblem />
                <Text style={styles.logo}>Raízes</Text>
                <Text style={styles.place}>VIANA DO CASTELO</Text>
              </View>

              <GoldChain />

              {/* Título e Subtítulo */}
              <View style={styles.heading}>
                <Text style={styles.title}>Cria a tua conta</Text>
                <Text style={styles.subtitle}>
                  Junta-te à comunidade de Viana.
                </Text>
              </View>

              {/* Formulário */}
              <View style={styles.form}>
                <RaizesField
                  label="Nome de utilizador"
                  icon={{ ios: 'person', android: 'person', web: 'person' }}
                  placeholder="ex: Maria Silva"
                  value={name}
                  onChangeText={(t) => {
                    setName(t);
                    if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
                  }}
                  error={errors.name}
                  autoCapitalize="words"
                  autoComplete="name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />

                <RaizesField
                  ref={emailRef}
                  label="Email"
                  icon={{ ios: 'envelope', android: 'mail', web: 'mail' }}
                  placeholder="nome@exemplo.pt"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                  }}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />

                <RaizesField
                  ref={passwordRef}
                  label="Palavra-passe"
                  icon={{ ios: 'lock', android: 'lock', web: 'lock' }}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                  }}
                  error={errors.password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  returnKeyType="go"
                  onSubmitEditing={handleRegister}
                  right={
                    <Pressable
                      hitSlop={10}
                      accessibilityRole="button"
                      accessibilityLabel={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                      onPress={() => setShowPassword((s) => !s)}>
                      <SymbolView
                        name={
                          showPassword
                            ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
                            : { ios: 'eye', android: 'visibility', web: 'visibility' }
                        }
                        size={18}
                        tintColor={Raizes.linhoSuave}
                      />
                    </Pressable>
                  }
                />

                <GoldButton title="Registar" onPress={handleRegister} loading={loading} />
              </View>

              {/* Social */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou continuas com</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialRow}>
                <OutlineButton
                  title="Google"
                  onPress={() => {}}
                  icon={<Text style={styles.googleG}>G</Text>}
                />
                <OutlineButton
                  title="Apple"
                  onPress={() => {}}
                  icon={
                    <SymbolView
                      name={{ ios: 'apple.logo' }}
                      size={18}
                      tintColor={Raizes.linho}
                    />
                  }
                />
              </View>

              {/* Termos e Condições */}
              <Text style={styles.terms}>
                Ao criar conta, concordas com os nossos{' '}
                <Text style={styles.termsLink}>Termos</Text> e a{' '}
                <Text style={styles.termsLink}>Política de Privacidade</Text>.
              </Text>

              {/* Link para voltar ao Login */}
              <View style={styles.loginRow}>
                <Text style={styles.muted}>Já tens conta? </Text>
                <Pressable hitSlop={8} onPress={() => router.push('/')}>
                  <Text style={styles.linkStrong}>Entrar</Text>
                </Pressable>
              </View>
            </View>

            <EmbroideryBand />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Raizes.vinho900, overflow: 'hidden' },
  flex: { flex: 1 },
  safe: { flex: 1 },
  glowTop: {
    position: 'absolute',
    top: -300,
    alignSelf: 'center',
    width: 520,
    height: 520,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    backgroundColor: Raizes.vinho700,
    opacity: 0.22,
  },
  glowBottom: {
    position: 'absolute',
    bottom: -300,
    alignSelf: 'center',
    width: 700,
    height: 460,
    borderRadius: 350,
    backgroundColor: Raizes.vinho950,
    opacity: 0.45,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 28,
    gap: 24,
  },
  content: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    gap: 20,
  },

  brand: { alignItems: 'center' },
  logo: {
    marginTop: 4,
    color: Raizes.ouro,
    fontFamily: Fonts?.serif,
    fontStyle: 'italic',
    fontSize: 52,
    fontWeight: '600',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  place: {
    marginTop: 2,
    color: Raizes.linhoSuave,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 4,
  },

  heading: { alignItems: 'center', gap: 6 },
  title: { color: Raizes.linho, fontSize: 24, fontWeight: '700' },
  subtitle: { color: Raizes.linhoSuave, fontSize: 14, textAlign: 'center' },

  form: { gap: 16 },
  linkStrong: {
    color: Raizes.ouro,
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  muted: { color: Raizes.linhoSuave, fontSize: 14 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Raizes.linhaOuro },
  dividerText: { color: Raizes.linhoTenue, fontSize: 13 },

  socialRow: { flexDirection: 'row', gap: 12 },
  googleG: { color: Raizes.linho, fontSize: 17, fontWeight: '800' },

  terms: {
    color: Raizes.linhoTenue,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  termsLink: {
    color: Raizes.ouroClaro,
    fontWeight: '600',
  },

  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
