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
import type { StayInVianaSpot } from '@/data/stay-in-viana';

export function StayStoryModal({
  spot,
  visible,
  onClose,
}: {
  spot: StayInVianaSpot | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!spot) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropTouch} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Botão fechar no topo */}
          <Pressable
            hitSlop={12}
            onPress={onClose}
            style={styles.closeButton}
            accessibilityLabel="Fechar história">
            <Icon name="close" size={18} color={RaizesColors.texto} />
          </Pressable>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Foto de Destaque do Local */}
            <View style={styles.imageWrap}>
              <Image source={spot.image} style={styles.heroImage} resizeMode="cover" />
              {/* Badge de Destaque sobre a Imagem */}
              <View style={styles.heroBadge}>
                <CoracaoViana size={14} variant="filled" color={RaizesColors.ouro} />
                <Text style={styles.heroBadgeText}>{spot.hook}</Text>
              </View>
            </View>

            {/* Cabeçalho da Pessoa e Origem */}
            <View style={styles.personHeader}>
              <View style={styles.personMetaRow}>
                <View style={styles.originPill}>
                  <Text style={styles.originPillText}>{spot.personOrigin}</Text>
                </View>
                <Text style={styles.ageText}>{spot.personAge} anos</Text>
              </View>

              <Text style={styles.personName}>{spot.personName}</Text>
              <Text style={styles.personRole}>{spot.personRole}</Text>
              <Text style={styles.spotPlaceName}>📍 {spot.name}</Text>
            </View>

            {/* Citação em Destaque */}
            <View style={styles.quoteCard}>
              <CoracaoViana size={22} variant="outline" color={RaizesColors.ouro} />
              <Text style={styles.quoteText}>{spot.quote}</Text>
            </View>

            {/* Razões Principais pelas quais decidiu ficar */}
            <View style={styles.reasonsSection}>
              <Text style={styles.sectionHeaderTitle}>
                Porque decidiu ficar em Viana do Castelo:
              </Text>

              {spot.keyReasons.map((reason, idx) => (
                <View key={idx} style={styles.reasonCard}>
                  <View style={styles.reasonNumber}>
                    <Text style={styles.reasonNumberText}>{idx + 1}</Text>
                  </View>
                  <View style={styles.reasonBody}>
                    <Text style={styles.reasonTitle}>{reason.title}</Text>
                    <Text style={styles.reasonDesc}>{reason.desc}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* História Completa */}
            <View style={styles.storySection}>
              <Text style={styles.sectionHeaderTitle}>A história de quem ficou</Text>
              {spot.fullStory.map((paragraph, pIdx) => (
                <Text key={pIdx} style={styles.storyParagraph}>
                  {paragraph}
                </Text>
              ))}
            </View>

            {/* Botão de Conclusão / Explorar mais */}
            <Pressable style={styles.actionButton} onPress={onClose}>
              <Text style={styles.actionButtonText}>Explorar outros pontos no mapa</Text>
              <Icon name="map" size={16} color={RaizesColors.textoInverso} />
            </Pressable>
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
    padding: 18,
    zIndex: 9999,
  },
  backdropTouch: {
    ...StyleSheet.absoluteFill,
  },
  modalCard: {
    width: '100%',
    maxWidth: 395,
    maxHeight: '88%',
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
    backgroundColor: 'rgba(255, 253, 249, 0.94)',
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
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(34, 5, 10, 0.82)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroClaro,
    letterSpacing: 0.3,
  },
  personHeader: {
    gap: 3,
  },
  personMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  originPill: {
    backgroundColor: 'rgba(163, 21, 32, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(163, 21, 32, 0.25)',
  },
  originPillText: {
    fontSize: 11,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.vermelho600,
  },
  ageText: {
    fontSize: 11.5,
    color: RaizesColors.textoSecundario,
  },
  personName: {
    fontSize: 21,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  personRole: {
    fontSize: 12.5,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.ouroEscuro,
  },
  spotPlaceName: {
    fontSize: 11.5,
    color: RaizesColors.textoSecundario,
    marginTop: 2,
  },
  quoteCard: {
    backgroundColor: RaizesColors.linhoCartao,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    gap: 8,
    boxShadow: RaizesShadow.card,
  },
  quoteText: {
    fontSize: 13.5,
    fontStyle: 'italic',
    lineHeight: 19,
    color: RaizesColors.texto,
  },
  reasonsSection: {
    gap: 10,
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: RaizesType.weight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: RaizesColors.textoSecundario,
  },
  reasonCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: RaizesColors.linhoCartao,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(214, 168, 78, 0.3)',
  },
  reasonNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: RaizesColors.vermelho600,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  reasonNumberText: {
    fontSize: 12,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
  },
  reasonBody: {
    flex: 1,
    gap: 2,
  },
  reasonTitle: {
    fontSize: 13,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  reasonDesc: {
    fontSize: 12,
    color: RaizesColors.textoSecundario,
    lineHeight: 16,
  },
  storySection: {
    gap: 8,
    backgroundColor: 'rgba(247, 238, 223, 0.45)',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(214, 168, 78, 0.25)',
  },
  storyParagraph: {
    fontSize: 13,
    lineHeight: 18.5,
    color: RaizesColors.texto,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: RaizesColors.vermelho600,
    paddingVertical: 12,
    borderRadius: RaizesRadius.button,
    boxShadow: RaizesShadow.card,
    marginTop: 4,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
  },
});
