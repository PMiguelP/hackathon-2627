import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import type { FeedPerson } from '@/data/people';

/**
 * Cartão compacto da grelha de Pessoas (masonry):
 * - Imagem da pessoa (não de sítios!)
 * - Nome e ocupação/localização de forma limpa e visual
 * - Botão de conexão / seguir
 */
export function PersonMasonryCard({
  person,
  onPress,
}: {
  person: FeedPerson;
  onPress?: (person: FeedPerson) => void;
}) {
  const [connected, setConnected] = useState(false);

  return (
    <View style={[styles.card, { height: person.cardHeight }]}>
      {/* Área principal do cartão clicável para abrir perfil */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => onPress?.(person)}
        accessibilityRole="button"
        accessibilityLabel={`Abrir perfil de ${person.name}`}>
        {/* Imagem da pessoa ocupando todo o cartão */}
        <Image source={person.image} style={styles.image} resizeMode="cover" />

        {/* Marca de filigrana dourada subtil */}
        <View style={styles.watermark} pointerEvents="none">
          <CoracaoViana size={42} variant="outline" color={RaizesColors.ouroClaro} />
        </View>

        {/* Cápsula de Linho Fosco com nome e ocupação */}
        <View style={styles.infoBadge}>
          <Text style={styles.name} numberOfLines={1}>
            {person.name}
          </Text>
          <Text style={styles.role} numberOfLines={1}>
            {person.role}
          </Text>
        </View>
      </Pressable>

      {/* Botão de Conectar (+) no topo direito (irmão, sem aninhamento de botões) */}
      <Pressable
        hitSlop={8}
        onPress={() => setConnected((c) => !c)}
        style={[styles.connectButton, connected && styles.connectedButton]}
        accessibilityRole="button"
        accessibilityLabel={
          connected ? `Conectado com ${person.name}` : `Conectar com ${person.name}`
        }>
        <Icon
          name={connected ? 'check' : 'add'}
          size={14}
          color={connected ? RaizesColors.textoInverso : RaizesColors.texto}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: RaizesRadius.card,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  connectButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 253, 249, 0.94)',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
  },
  connectedButton: {
    backgroundColor: RaizesColors.vermelho600,
    borderColor: RaizesColors.vermelho600,
  },
  watermark: {
    position: 'absolute',
    bottom: 30,
    right: -6,
    opacity: 0.18,
  },
  infoBadge: {
    position: 'absolute',
    left: 7,
    right: 7,
    bottom: 7,
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 253, 249, 0.94)',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: '0 2px 8px rgba(35, 23, 19, 0.15)',
    gap: 1,
  },
  name: {
    fontSize: 12.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  role: {
    fontSize: 10,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.ouroEscuro,
  },
});
