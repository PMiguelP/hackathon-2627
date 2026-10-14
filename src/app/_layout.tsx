import { Stack, ThemeProvider, DefaultTheme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { RaizesColors } from '@/constants/raizes-theme';

SplashScreen.preventAutoHideAsync();

/**
 * Fluxo:
 *   intro (6 slides) → login ──────────────→ (tabs) feed
 *                        └→ register → onboarding ↗
 */
export default function RootLayout() {
  return (
    <ThemeProvider
      value={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: RaizesColors.linhoFundo } }}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="intro" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="publicar" options={{ presentation: 'modal' }} />
        <Stack.Screen name="evento-detalhe" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
