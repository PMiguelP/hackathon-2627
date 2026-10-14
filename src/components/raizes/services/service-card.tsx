import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon, type IconName } from '@/components/raizes/icon';
import {
  RaizesColors,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import type { VianaService } from '@/data/services';

const BADGE_COLORS = {
  danger: {
    bg: 'rgba(163, 21, 32, 0.12)',
    text: RaizesColors.vermelho600,
    border: 'rgba(163, 21, 32, 0.3)',
  },
  gold: {
    bg: 'rgba(214, 168, 78, 0.15)',
    text: RaizesColors.ouroEscuro,
    border: 'rgba(214, 168, 78, 0.4)',
  },
  info: {
    bg: 'rgba(42, 79, 168, 0.12)',
    text: '#2A4FA8',
    border: 'rgba(42, 79, 168, 0.3)',
  },
  success: {
    bg: 'rgba(62, 142, 90, 0.12)',
    text: '#2E7D47',
    border: 'rgba(62, 142, 90, 0.3)',
  },
};

export function ServiceCard({
  service,
  onPress,
}: {
  service: VianaService;
  onPress?: (service: VianaService) => void;
}) {
  const badgeStyle = BADGE_COLORS[service.badgeType ?? 'info'];

  const handleCall = () => {
    Linking.openURL(`tel:${service.phone}`);
  };

  return (
    <View style={styles.card}>
      {/* Marca de filigrana d'ouro discreta no canto */}
      <View style={styles.watermark} pointerEvents="none">
        <CoracaoViana size={54} variant="outline" color={RaizesColors.ouroClaro} />
      </View>

      <View style={styles.contentWrap}>
        {/* Corpo do cartão clicável para abrir detalhes */}
        <Pressable
          onPress={() => onPress?.(service)}
          accessibilityRole="button"
          accessibilityLabel={`Ver detalhes de ${service.name}`}
          style={styles.cardBodyPressable}>
          {/* Cabeçalho com Ícone e Título */}
          <View style={styles.headerRow}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: badgeStyle.bg, borderColor: badgeStyle.border },
              ]}>
              <Icon
                name={service.iconName as IconName}
                size={20}
                color={badgeStyle.text}
              />
            </View>

            <View style={styles.titleArea}>
              <View style={styles.badgeRow}>
                <Text style={styles.categoryLabel}>{service.categoryLabel}</Text>
                {service.badge && (
                  <View
                    style={[
                      styles.badgePill,
                      { backgroundColor: badgeStyle.bg, borderColor: badgeStyle.border },
                    ]}>
                    <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
                      {service.badge}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.title}>{service.name}</Text>
            </View>
          </View>

          {/* Descrição */}
          <Text style={styles.description} numberOfLines={2}>
            {service.description}
          </Text>

          {/* Informações rápidas: Horário e Morada */}
          <View style={styles.metaBox}>
            <View style={styles.metaRow}>
              <Icon name="time" size={13} color={RaizesColors.ouroEscuro} />
              <Text style={styles.metaText} numberOfLines={1}>
                {service.schedule}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <Icon name="place" size={13} color={RaizesColors.vermelho600} />
              <Text style={styles.metaText} numberOfLines={1}>
                {service.address}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Rodapé com Ações Rápidas (irmão, sem aninhamento de botões) */}
        <View style={styles.actionsRow}>
          <Pressable
            style={styles.callButton}
            onPress={handleCall}
            accessibilityRole="button"
            accessibilityLabel={`Ligar para ${service.phoneDisplay}`}>
            <Icon name="phone" size={15} color={RaizesColors.textoInverso} />
            <Text style={styles.callButtonText}>{service.phoneDisplay}</Text>
          </Pressable>

          <Pressable
            style={styles.detailsButton}
            onPress={() => onPress?.(service)}
            accessibilityRole="button"
            accessibilityLabel="Ver detalhes do serviço">
            <Text style={styles.detailsButtonText}>Detalhes</Text>
            <Icon name="chevronRight" size={13} color={RaizesColors.texto} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    top: -10,
    right: -10,
    opacity: 0.15,
  },
  contentWrap: {
    gap: 12,
  },
  cardBodyPressable: {
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  titleArea: {
    flex: 1,
    gap: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.textoSecundario,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: RaizesType.weight.bold,
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 16,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  description: {
    fontSize: 13,
    color: RaizesColors.textoSecundario,
    lineHeight: 18,
  },
  metaBox: {
    backgroundColor: 'rgba(247, 238, 223, 0.45)',
    padding: 10,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(214, 168, 78, 0.2)',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    flex: 1,
    fontSize: 12,
    color: RaizesColors.texto,
    fontWeight: RaizesType.weight.medium,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  callButton: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: RaizesColors.vermelho600,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: RaizesRadius.button,
    boxShadow: RaizesShadow.card,
  },
  callButtonText: {
    fontSize: 13,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
  },
  detailsButton: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: RaizesRadius.button,
  },
  detailsButtonText: {
    fontSize: 12.5,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.texto,
  },
});
