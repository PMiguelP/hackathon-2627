import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import { CamisaHearts, LençoFloralBand } from '@/components/raizes/page-decor';
import { Avatar } from '@/components/raizes/ui/avatar';
import { Button } from '@/components/raizes/ui/button';
import { Screen } from '@/components/raizes/ui/screen';
import { IconButton, ScreenHeader } from '@/components/raizes/ui/screen-header';
import { SearchBar } from '@/components/raizes/ui/search-bar';
import {
  RaizesColors,
  RaizesLayout,
  RaizesNavbar,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';
import { usePreferences } from '@/store/preferences';

export default function PerfilScreen() {
  const prefs = usePreferences();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleLogout = () => {
    router.replace('/login');
  };

  const badges = [
    { label: 'Romaria d’Agonia', icon: 'favorite' as const },
    { label: 'Coração de Ouro', icon: 'bookmark' as const },
    { label: 'Amigo de Viana', icon: 'person' as const },
  ];

  return (
    <Screen>
      <ScreenHeader
        title="Perfil"
        subtitle="As tuas raízes e atividades"
        right={
          <>
            <IconButton
              icon={searchOpen ? 'close' : 'search'}
              label="Pesquisar no perfil"
              active={searchOpen}
              onPress={() => {
                if (searchOpen) setQuery('');
                setSearchOpen((v) => !v);
              }}
            />
            <IconButton icon="settings" label="Definições" />
          </>
        }
      />

      {searchOpen && (
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClose={() => setSearchOpen(false)}
          placeholder="Pesquisar publicações, gostos, grupos…"
        />
      )}

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cartão de Perfil Principal com Detalhe Minhoto */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Avatar name={prefs.name || 'Maria Sousa'} size={82} ring />
            <View style={styles.coracaoBadge}>
              <CoracaoViana size={20} />
            </View>
          </View>

          <Text style={styles.name}>{prefs.name || 'Maria Sousa'}</Text>
          <Text style={styles.location}>📍 Viana do Castelo · Desde 2021</Text>
          
          <View style={styles.camisaDetail}>
            <CamisaHearts size={24} />
          </View>

          {/* Estatísticas */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>14</Text>
              <Text style={styles.statLabel}>Publicações</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNum}>186</Text>
              <Text style={styles.statLabel}>Conexões</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNum}>6</Text>
              <Text style={styles.statLabel}>Grupos</Text>
            </View>
          </View>

          <View style={styles.editBtnWrap}>
            <Button title="Editar Perfil" size="sm" variant="outline" icon="edit" />
          </View>
        </View>

        {/* Insígnias & Tradição de Viana */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Insígnias Tradicionais</Text>
          <View style={styles.badgesRow}>
            {badges.map((b, i) => (
              <View key={i} style={styles.badgeItem}>
                <View style={styles.badgeCircle}>
                  <CoracaoViana size={26} />
                </View>
                <Text style={styles.badgeLabel}>{b.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Preferências e Hobbies de Viana */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Interesses & Hobbies</Text>
          <Text style={styles.cardSubtitle}>Definidos durante a tua integração</Text>
          <View style={styles.tagsContainer}>
            {prefs.hobbies && prefs.hobbies.length > 0 ? (
              prefs.hobbies.map((h, i) => (
                <View key={i} style={styles.tagPill}>
                  <Text style={styles.tagText}>{h}</Text>
                </View>
              ))
            ) : (
              ['Folclore', 'Gastronomia', 'Surf no Cabedelo', 'Fotografia'].map((h, i) => (
                <View key={i} style={styles.tagPill}>
                  <Text style={styles.tagText}>{h}</Text>
                </View>
              ))
            )}
          </View>
          <LençoFloralBand width={240} style={styles.cardBottomFloral} />
        </View>

        {/* Ações e Suporte */}
        <View style={styles.menuCard}>
          <Pressable style={styles.menuRow} onPress={() => router.push('/onboarding')}>
            <Icon name="heart" size={20} color={RaizesColors.ouroTexto} />
            <Text style={styles.menuLabel}>Refazer Onboarding (Preferências)</Text>
            <Icon name="chevronRight" size={16} color={RaizesColors.textoMuted} />
          </Pressable>
          <View style={styles.menuDivider} />
          <Pressable style={styles.menuRow} onPress={() => router.push('/intro')}>
            <Icon name="school" size={20} color={RaizesColors.azul} />
            <Text style={styles.menuLabel}>Ver Slides de Introdução (6 Slides)</Text>
            <Icon name="chevronRight" size={16} color={RaizesColors.textoMuted} />
          </Pressable>
          <View style={styles.menuDivider} />
          <Pressable style={styles.menuRow}>
            <Icon name="bookmark" size={20} color={RaizesColors.texto} />
            <Text style={styles.menuLabel}>Itens Guardados</Text>
            <Icon name="chevronRight" size={16} color={RaizesColors.textoMuted} />
          </Pressable>
          <View style={styles.menuDivider} />
          <Pressable style={styles.menuRow} onPress={handleLogout}>
            <Icon name="logout" size={20} color={RaizesColors.vermelho600} />
            <Text style={[styles.menuLabel, { color: RaizesColors.vermelho600, fontWeight: RaizesType.weight.bold }]}>
              Terminar Sessão
            </Text>
            <Icon name="chevronRight" size={16} color={RaizesColors.vermelho600} />
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: RaizesLayout.screenPadding,
    paddingBottom: RaizesNavbar.height + 60,
    gap: 16,
  },
  profileCard: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 10,
  },
  coracaoBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: RaizesColors.ouro,
  },
  name: {
    fontSize: RaizesType.size.h2,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  location: {
    fontSize: RaizesType.size.small,
    color: RaizesColors.textoSecundario,
    marginTop: 2,
    marginBottom: 6,
  },
  camisaDetail: {
    marginVertical: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 14,
    marginVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: RaizesColors.linhoBorda,
  },
  statItem: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: 18,
    fontWeight: RaizesType.weight.extraBold,
    color: RaizesColors.vermelho600,
  },
  statLabel: {
    fontSize: 11,
    color: RaizesColors.textoMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: RaizesColors.linhoBorda,
  },
  editBtnWrap: {
    width: '100%',
    marginTop: 4,
  },
  card: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: RaizesColors.linhoBorda,
    boxShadow: RaizesShadow.card,
  },
  cardTitle: {
    fontSize: RaizesType.size.h3,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: RaizesType.size.caption,
    color: RaizesColors.textoMuted,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  badgeItem: {
    alignItems: 'center',
    gap: 6,
  },
  badgeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(214, 168, 78, 0.12)',
    borderWidth: 1,
    borderColor: RaizesColors.ouro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoSecundario,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RaizesRadius.pill,
    backgroundColor: 'rgba(163, 21, 32, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(163, 21, 32, 0.2)',
  },
  tagText: {
    fontSize: 12,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.vermelho600,
  },
  cardBottomFloral: {
    marginTop: 8,
    alignSelf: 'center',
  },
  menuCard: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: RaizesColors.linhoBorda,
    boxShadow: RaizesShadow.card,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: RaizesType.size.body,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.texto,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: RaizesColors.linhoBorda,
    marginLeft: 48,
  },
});
