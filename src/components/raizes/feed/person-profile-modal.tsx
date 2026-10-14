import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import type { FeedPerson } from '@/data/people';

export function PersonProfileModal({
  person,
  visible,
  onClose,
  initialConnected = false,
  onToggleConnect,
  onOpenChat,
}: {
  person: FeedPerson | null;
  visible: boolean;
  onClose: () => void;
  initialConnected?: boolean;
  onToggleConnect?: (connected: boolean) => void;
  onOpenChat?: (person: FeedPerson) => void;
}) {
  const [connected, setConnected] = useState(initialConnected);

  if (!person) return null;

  const handleToggle = () => {
    const next = !connected;
    setConnected(next);
    onToggleConnect?.(next);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        {/* Fundo clicável para fechar */}
        <Pressable style={styles.backdropTouch} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Botão fechar no topo */}
          <Pressable
            hitSlop={12}
            onPress={onClose}
            style={styles.closeButton}
            accessibilityLabel="Fechar perfil">
            <Icon name="close" size={18} color={RaizesColors.texto} />
          </Pressable>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Foto de retrato grande com moldura nobre */}
            <View style={styles.imageWrap}>
              <Image source={person.image} style={styles.heroImage} resizeMode="cover" />
              {/* Marca de filigrana d'ouro no canto */}
              <View style={styles.watermark} pointerEvents="none">
                <CoracaoViana size={70} variant="outline" color={RaizesColors.ouroClaro} />
              </View>
            </View>

            {/* Identificação principal */}
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{person.name}</Text>
              <Text style={styles.role}>{person.role}</Text>
              <View style={styles.locationPill}>
                <Icon name="place" size={13} color={RaizesColors.vermelho600} />
                <Text style={styles.locationText}>{person.place}</Text>
              </View>
            </View>

            {/* Ações principais: Conectar + Mensagem */}
            <View style={styles.actionsRow}>
              <Pressable
                onPress={handleToggle}
                style={[styles.primaryAction, connected && styles.connectedAction]}>
                <Icon
                  name={connected ? 'check' : 'add'}
                  size={16}
                  color={connected ? RaizesColors.vermelho600 : RaizesColors.textoInverso}
                />
                <Text
                  style={[
                    styles.primaryActionText,
                    connected && styles.connectedActionText,
                  ]}>
                  {connected ? 'Conectado' : 'Conectar'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => onOpenChat?.(person)}
                style={styles.secondaryAction}
                accessibilityRole="button"
                accessibilityLabel={`Iniciar conversa com ${person.name}`}>
                <Icon
                  name="comment"
                  size={16}
                  color={RaizesColors.ouroEscuro}
                />
                <Text style={styles.secondaryActionText}>Mensagem</Text>
              </Pressable>
            </View>

            {/* Linha divisória de filigrana */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <CoracaoViana size={14} variant="filled" color={RaizesColors.ouro} />
              <View style={styles.dividerLine} />
            </View>

            {/* Biografia / Sobre mim */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sobre mim</Text>
              <Text style={styles.bioText}>{person.bio}</Text>
            </View>

            {/* Interesses & Hobbies */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interesses em Viana</Text>
              <View style={styles.tagsWrap}>
                {person.tags.map((tag) => (
                  <View key={tag} style={styles.tagBadge}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Destaque de afinidade comunitária */}
            <View style={styles.affinityBox}>
              <Icon name="community" size={18} color={RaizesColors.ouroEscuro} />
              <View style={{ flex: 1 }}>
                <Text style={styles.affinityTitle}>Em comum convosco</Text>
                <Text style={styles.affinityDesc}>
                  Partilham o gosto pelas tradições, natureza e vida ativa em Viana do Castelo.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(28, 16, 12, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 9999,
  },
  backdropTouch: {
    ...StyleSheet.absoluteFill,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '85%',
    backgroundColor: RaizesColors.linhoFundo,
    borderRadius: RaizesRadius.card,
    borderWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.raised,
    overflow: 'hidden',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 253, 249, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
  },
  scrollContent: {
    padding: 18,
    gap: 16,
  },
  imageWrap: {
    width: '100%',
    height: 240,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  watermark: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    opacity: 0.25,
  },
  headerInfo: {
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    textAlign: 'center',
  },
  role: {
    fontSize: 13,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.ouroEscuro,
    textAlign: 'center',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: 'rgba(139, 21, 39, 0.08)',
    borderRadius: 12,
  },
  locationText: {
    fontSize: 11,
    color: RaizesColors.vermelho600,
    fontWeight: RaizesType.weight.medium,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  primaryAction: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: RaizesColors.vermelho600,
    paddingVertical: 10,
    borderRadius: RaizesRadius.button,
    boxShadow: RaizesShadow.card,
  },
  connectedAction: {
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1.5,
    borderColor: RaizesColors.vermelho600,
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
  },
  connectedActionText: {
    color: RaizesColors.vermelho600,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    paddingVertical: 10,
    borderRadius: RaizesRadius.button,
  },
  secondaryActionText: {
    fontSize: 13,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.texto,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 2,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: RaizesColors.ouroLinha,
    opacity: 0.6,
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: RaizesType.weight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: RaizesColors.textoSecundario,
  },
  bioText: {
    fontSize: 13,
    lineHeight: 18,
    color: RaizesColors.texto,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  tagText: {
    fontSize: 11,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.ouroEscuro,
  },
  affinityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  affinityTitle: {
    fontSize: 12,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  affinityDesc: {
    fontSize: 11,
    color: RaizesColors.textoSecundario,
    lineHeight: 15,
  },
});
