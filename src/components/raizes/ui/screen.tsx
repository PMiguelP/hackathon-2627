import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PageDecor } from '@/components/raizes/page-decor';
import { RaizesColors, RaizesLayout } from '@/constants/raizes-theme';

/**
 * Contentor base das páginas claras: fundo linho + renda dourada + flores
 * discretas + safe area + largura máxima centrada.
 */
export function Screen({
  children,
  decor = true,
  flowers = 'corners',
}: {
  children: ReactNode;
  decor?: boolean;
  flowers?: 'corners' | 'bottom' | 'none';
}) {
  return (
    <View style={styles.root}>
      {decor && <PageDecor flowers={flowers} />}
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.inner}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: RaizesColors.linhoFundo, overflow: 'hidden' },
  safe: { flex: 1 },
  inner: { flex: 1, width: '100%', maxWidth: RaizesLayout.maxWidth, alignSelf: 'center' },
});
