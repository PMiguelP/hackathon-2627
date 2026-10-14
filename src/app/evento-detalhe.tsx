import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import { CamisaHearts, FiligreeLace, LençoFloralBand } from '@/components/raizes/page-decor';
import { Avatar } from '@/components/raizes/ui/avatar';
import { Button } from '@/components/raizes/ui/button';
import {
  RaizesColors,
  RaizesFonts,
  RaizesLayout,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import { POSTS } from '@/data/posts';

export default function EventoDetalheModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const post = POSTS.find((p) => p.id === id) || POSTS[0];

  return (
    <View style={styles.root}>
      <FiligreeLace width={160} style={styles.laceTopRight} flip opacity={0.3} />

      <SafeAreaView style={styles.safe}>
        {/* Barra Superior */}
        <View style={styles.header}>
          <Pressable hitSlop={10} onPress={() => router.back()} style={styles.closeBtn}>
            <Icon name="close" size={22} color={RaizesColors.texto} />
          </Pressable>
          <View style={styles.headerTitleRow}>
            <CoracaoViana size={22} />
            <Text style={styles.headerTitle}>Tradição de Viana</Text>
          </View>
          <Pressable hitSlop={10}>
            <Icon name="bookmark" size={20} color={RaizesColors.texto} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Imagem do Evento */}
          {post.image ? (
            <View style={styles.imageCard}>
              <Image source={post.image} style={styles.image} resizeMode="cover" />
              {post.date ? (
                <View style={styles.dateBadge}>
                  <Text style={styles.dateDay}>{post.date.split(' ')[0]}</Text>
                  <Text style={styles.dateMonth}>{post.date.split(' ')[1]}</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* Autor & Local */}
          <View style={styles.authorRow}>
            <Avatar name={post.author.name} size={44} ring />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{post.author.name}</Text>
              <Text style={styles.authorPlace}>📍 {post.author.place}</Text>
            </View>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{post.category.toUpperCase()}</Text>
            </View>
          </View>

          {/* Título & Descrição Completa */}
          <View style={styles.body}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.text}>{post.text}</Text>
            <Text style={styles.longDesc}>
              A celebração em honra de Nossa Senhora da Agonia e as festividades tradicionais de Viana do Castelo reúnem milhares de romeiros, famílias e visitantes numa comunhão viva de trajes, ouro reluzente, tapetes floridos e devoção.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Icon name="time" size={20} color={RaizesColors.ouroTexto} />
              <View>
                <Text style={styles.infoLabel}>Horário Previsto</Text>
                <Text style={styles.infoValue}>A partir das 10h00</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Icon name="place" size={20} color={RaizesColors.vermelho600} />
              <View>
                <Text style={styles.infoLabel}>Ponto de Encontro</Text>
                <Text style={styles.infoValue}>{post.author.place}</Text>
              </View>
            </View>
          </View>

          <CamisaHearts size={24} style={styles.camisaHearts} />
          <LençoFloralBand width={260} style={styles.floralBand} />

          {/* Botões de Ação */}
          <View style={styles.actions}>
            <Button title="Marcar Presença" variant="primary" icon="heartFill" />
            <Button title="Ver no Mapa de Viana" variant="outline" icon="map" onPress={() => router.replace('/mapa')} />
          </View>
        </ScrollView>
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
  },
  laceTopRight: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: RaizesColors.linhoBorda,
  },
  closeBtn: {
    padding: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontFamily: RaizesFonts.serif,
    fontSize: RaizesType.size.h3,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
    paddingBottom: 40,
  },
  imageCard: {
    width: '100%',
    height: 240,
    borderRadius: RaizesRadius.card,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.raised,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 52,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouro,
    boxShadow: RaizesShadow.card,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: RaizesType.weight.extraBold,
    color: RaizesColors.vermelho600,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoSecundario,
    letterSpacing: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: RaizesType.size.body,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  authorPlace: {
    fontSize: RaizesType.size.caption,
    color: RaizesColors.textoMuted,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RaizesRadius.pill,
    backgroundColor: 'rgba(214, 168, 78, 0.14)',
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroTexto,
  },
  body: {
    gap: 8,
  },
  title: {
    fontSize: RaizesType.size.h2,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    lineHeight: 28,
  },
  text: {
    fontSize: RaizesType.size.body,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.textoSecundario,
    lineHeight: 22,
  },
  longDesc: {
    fontSize: RaizesType.size.body - 1,
    color: RaizesColors.textoMuted,
    lineHeight: 20,
    marginTop: 4,
  },
  infoBox: {
    padding: 14,
    borderRadius: RaizesRadius.lg,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.linhoBorda,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 11,
    color: RaizesColors.textoMuted,
  },
  infoValue: {
    fontSize: RaizesType.size.body - 1,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.texto,
  },
  camisaHearts: {
    alignSelf: 'center',
  },
  floralBand: {
    alignSelf: 'center',
  },
  actions: {
    gap: 10,
    marginTop: 8,
  },
});
