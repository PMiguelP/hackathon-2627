import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

import { Icon } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesInput,
  RaizesLayout,
  RaizesShadow,
} from '@/constants/raizes-theme';

/** Campo de pesquisa que aparece por baixo do cabeçalho (abre com a lupa). */
export function SearchBar({
  value,
  onChangeText,
  onClose,
  placeholder = 'Pesquisar eventos, pessoas, serviços…',
}: {
  value: string;
  onChangeText: (t: string) => void;
  onClose: () => void;
  placeholder?: string;
}) {
  const ref = useRef<TextInput>(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View entering={FadeInUp.duration(180)} exiting={FadeOutUp.duration(140)} style={styles.wrap}>
      <View style={styles.field}>
        <Icon name="search" size={RaizesInput.iconSize} color={RaizesColors.ouroTexto} />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={RaizesColors.textoMuted}
          selectionColor={RaizesColors.vermelho600}
          returnKeyType="search"
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar pesquisa"
          hitSlop={10}
          onPress={() => {
            onChangeText('');
            onClose();
          }}>
          <Icon name="close" size={18} color={RaizesColors.textoSecundario} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: RaizesLayout.screenPadding, paddingBottom: 10 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: RaizesInput.height - 6,
    paddingHorizontal: RaizesInput.paddingHorizontal,
    borderRadius: RaizesInput.radius,
    borderWidth: RaizesInput.borderWidth,
    borderColor: RaizesColors.ouroLinha,
    backgroundColor: RaizesColors.campoClaro,
    boxShadow: RaizesShadow.card,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: RaizesInput.fontSize,
    color: RaizesColors.texto,
    outlineStyle: 'none',
  } as object,
});
