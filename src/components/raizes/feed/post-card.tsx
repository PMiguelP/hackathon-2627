import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import { Avatar } from '@/components/raizes/ui/avatar';
import { Button } from '@/components/raizes/ui/button';
import { FEED_CATEGORIES } from '@/config/feed';
import {
  RaizesColors,
  RaizesLayout,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import type { Post } from '@/data/posts';

/** Cartão de publicação do Feed:
 * - Para Pessoas: Botão "Seguir" / "A Seguir"
 * - Para Eventos: Indicador da data e botão "Ver mais" que abre os detalhes do evento
 * - Sem botões supérfluos de like, comment ou share
 * - Detalhes tradicionais de Viana: filigrana em marca d'água e duplo filete a ouro
 */
export function PostCard({ post }: { post: Post }) {
  const [following, setFollowing] = useState(false);
  const category = FEED_CATEGORIES.find((c) => c.id === post.category);
  const isPerson = post.category === 'pessoas';
  const isEvent = post.category === 'eventos';

  const handleOpenDetail = () => {
    router.push({
      pathname: '/evento-detalhe',
      params: { id: post.id },
    });
  };

  return (
    <View style={styles.card}>
      {/* Marca d'água de Filigrana no fundo do cartão */}
      <View style={styles.watermarkContainer} pointerEvents="none">
        <CoracaoViana size={120} variant="outline" color={RaizesColors.ouro} style={styles.watermark} />
      </View>

      {/* 1. Imagem a ocupar a largura total do card e a começar logo no topo */}
      {post.image ? (
        <Pressable onPress={handleOpenDetail} style={styles.topImageWrap}>
          <Image source={post.image} style={styles.topImage} resizeMode="cover" />
          {post.date ? (
            <View style={styles.dateBadge}>
              <Text style={styles.dateDay}>{post.date.split(' ')[0]}</Text>
              <Text style={styles.dateMonth}>{post.date.split(' ')[1]}</Text>
            </View>
          ) : null}
        </Pressable>
      ) : null}

      {/* 2. Conteúdo em baixo: pessoa, categoria, título e descrição compactos */}
      <View style={styles.contentWrap}>
        {/* Linha da pessoa (Autor) + Categoria à direita */}
        <View style={styles.authorRow}>
          <Avatar name={post.author.name} size={36} ring />
          <View style={styles.author}>
            <Text style={styles.name}>{post.author.name}</Text>
            <Text style={styles.meta}>
              {post.author.place} · {post.author.time}
            </Text>
          </View>

          {/* Categoria do evento / post */}
          {category ? (
            <View style={styles.tag}>
              <Icon name={category.icon} size={12} color={RaizesColors.ouroTexto} />
              <Text style={styles.tagText}>{category.label}</Text>
            </View>
          ) : null}

          {/* Botão Seguir se for categoria Pessoas */}
          {isPerson && (
            <Button
              title={following ? 'A seguir ✓' : 'Seguir'}
              size="sm"
              variant={following ? 'outline' : 'primary'}
              onPress={() => setFollowing((f) => !f)}
            />
          )}
        </View>

        {/* Título & Descrição Compactos */}
        <View style={styles.body}>
          <Text style={styles.title} onPress={handleOpenDetail}>
            {post.title}
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            {post.text}
          </Text>
        </View>

        {/* Rodapé com botão Ver mais */}
        <View style={styles.footer}>
          <View style={styles.spacer} />
          <Pressable hitSlop={8} onPress={handleOpenDetail} style={styles.seeMoreBtn}>
            <Text style={styles.more}>
              {isEvent ? 'Ver evento e detalhes →' : 'Ver mais →'}
            </Text>
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
    borderColor: RaizesColors.linhoBorda,
    boxShadow: RaizesShadow.card,
    position: 'relative',
    overflow: 'hidden',
  },
  watermarkContainer: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    opacity: 0.11,
    zIndex: 0,
  },
  watermark: {},

  topImageWrap: {
    width: '100%',
    height: 185,
    position: 'relative',
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 48,
    paddingVertical: 5,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouro,
    boxShadow: RaizesShadow.card,
  },
  dateDay: {
    fontSize: 16,
    fontWeight: RaizesType.weight.extraBold,
    color: RaizesColors.vermelho600,
  },
  dateMonth: {
    fontSize: 9.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoSecundario,
    letterSpacing: 1,
  },

  contentWrap: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    gap: 8,
    zIndex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  author: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  meta: {
    fontSize: 11,
    color: RaizesColors.textoMuted,
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RaizesRadius.pill,
    backgroundColor: 'rgba(214, 168, 78, 0.12)',
  },
  tagText: {
    fontSize: 11,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.ouroTexto,
  },

  body: {
    gap: 3,
  },
  title: {
    fontSize: 15.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    lineHeight: 20,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    color: RaizesColors.textoSecundario,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: RaizesColors.linhoBorda,
  },
  spacer: {
    flex: 1,
  },
  seeMoreBtn: {
    paddingVertical: 2,
  },
  more: {
    fontSize: 12.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.vermelho600,
  },
});
