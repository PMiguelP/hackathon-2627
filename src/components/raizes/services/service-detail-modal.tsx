import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon, type IconName } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import type { VianaService } from '@/data/services';

export function ServiceDetailModal({
  service,
  visible,
  onClose,
}: {
  service: VianaService | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!service) return null;

  const handleCall = () => {
    Linking.openURL(`tel:${service.phone}`);
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent(`${service.name}, ${service.address}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropTouch} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Botão fechar */}
          <Pressable
            hitSlop={12}
            onPress={onClose}
            style={styles.closeButton}
            accessibilityLabel="Fechar detalhes">
            <Icon name="close" size={18} color={RaizesColors.texto} />
          </Pressable>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Cabeçalho */}
            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Icon
                  name={service.iconName as IconName}
                  size={26}
                  color={RaizesColors.vermelho600}
                />
              </View>
              <Text style={styles.categoryBadge}>{service.categoryLabel}</Text>
              <Text style={styles.title}>{service.name}</Text>
              <Text style={styles.description}>{service.description}</Text>
            </View>

            {/* Botão de Chamada Direta */}
            <Pressable
              style={styles.callHeroButton}
              onPress={handleCall}
              accessibilityRole="button"
              accessibilityLabel={`Ligar para ${service.phoneDisplay}`}>
              <Icon name="phone" size={18} color={RaizesColors.textoInverso} />
              <View>
                <Text style={styles.callHeroSub}>Ligar Agora (Contacto Oficial)</Text>
                <Text style={styles.callHeroNum}>{service.phoneDisplay}</Text>
              </View>
            </Pressable>

            {/* Informações de Horário e Morada */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Icon name="time" size={16} color={RaizesColors.ouroEscuro} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Horário de Funcionamento</Text>
                  <Text style={styles.infoValue}>{service.schedule}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoRow}>
                <Icon name="place" size={16} color={RaizesColors.vermelho600} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Localização em Viana</Text>
                  <Text style={styles.infoValue}>{service.address}</Text>
                </View>
              </View>
            </View>

            {/* Botão Abrir no Mapa */}
            <Pressable style={styles.mapButton} onPress={handleOpenMaps}>
              <Icon name="map" size={16} color={RaizesColors.ouroEscuro} />
              <Text style={styles.mapButtonText}>Ver rota no mapa</Text>
            </Pressable>

            {/* Serviços e Valências Disponíveis */}
            {service.details && service.details.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <CoracaoViana size={14} variant="filled" color={RaizesColors.ouro} />
                  <Text style={styles.sectionTitle}>Serviços e Valências</Text>
                </View>
                <View style={styles.detailsList}>
                  {service.details.map((item, idx) => (
                    <View key={idx} style={styles.detailItem}>
                      <Icon name="check" size={14} color={RaizesColors.verde} />
                      <Text style={styles.detailItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
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
    maxWidth: 390,
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
    padding: 20,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(163, 21, 32, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(163, 21, 32, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroEscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 19,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: RaizesColors.textoSecundario,
    textAlign: 'center',
    lineHeight: 18,
  },
  callHeroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: RaizesColors.vermelho600,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: RaizesRadius.button,
    boxShadow: RaizesShadow.card,
  },
  callHeroSub: {
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: RaizesType.weight.medium,
  },
  callHeroNum: {
    fontSize: 15,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
    letterSpacing: 0.3,
  },
  infoCard: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoLabel: {
    fontSize: 11,
    color: RaizesColors.textoSecundario,
    fontWeight: RaizesType.weight.medium,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    marginTop: 1,
  },
  infoDivider: {
    height: 1,
    backgroundColor: RaizesColors.ouroLinha,
    opacity: 0.4,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    borderRadius: RaizesRadius.button,
  },
  mapButtonText: {
    fontSize: 13,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.texto,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsList: {
    gap: 8,
    backgroundColor: RaizesColors.linhoCartao,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailItemText: {
    flex: 1,
    fontSize: 12.5,
    color: RaizesColors.texto,
    lineHeight: 17,
  },
});
