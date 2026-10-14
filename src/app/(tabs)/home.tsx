import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { PersonChatModal } from '@/components/raizes/chat/person-chat-modal';
import { PersonMasonryCard } from '@/components/raizes/feed/person-masonry-card';
import { PersonProfileModal } from '@/components/raizes/feed/person-profile-modal';
import { PostCard } from '@/components/raizes/feed/post-card';
import { FiligreeCardDivider } from '@/components/raizes/page-decor';
import { ServiceCard } from '@/components/raizes/services/service-card';
import { ServiceDetailModal } from '@/components/raizes/services/service-detail-modal';
import { ChipRow } from '@/components/raizes/ui/chip';
import { Screen } from '@/components/raizes/ui/screen';
import { IconButton, ScreenHeader } from '@/components/raizes/ui/screen-header';
import { SearchBar } from '@/components/raizes/ui/search-bar';
import { FEED_CATEGORIES, type FeedCategoryId } from '@/config/feed';
import { RaizesColors, RaizesLayout, RaizesNavbar, RaizesType } from '@/constants/raizes-theme';
import { FEED_PEOPLE, type FeedPerson } from '@/data/people';
import { POSTS } from '@/data/posts';
import {
  SERVICE_CATEGORIES,
  VIANA_SERVICES,
  type ServiceCategory,
  type VianaService,
} from '@/data/services';
import { usePreferences } from '@/store/preferences';

export default function FeedScreen() {
  const params = useLocalSearchParams<{
    categoria?: FeedCategoryId;
    perfil?: string;
    chat?: string;
    servico?: string;
  }>();
  const prefs = usePreferences();
  const [category, setCategory] = useState<FeedCategoryId>(params.categoria || 'tudo');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<FeedPerson | null>(
    params.perfil ? FEED_PEOPLE.find((p) => p.id === params.perfil) ?? null : null,
  );
  const [chatPerson, setChatPerson] = useState<FeedPerson | null>(
    params.chat ? FEED_PEOPLE.find((p) => p.id === params.chat) ?? null : null,
  );
  const [serviceSubCategory, setServiceSubCategory] = useState<ServiceCategory>('todos');
  const [selectedService, setSelectedService] = useState<VianaService | null>(
    params.servico ? VIANA_SERVICES.find((s) => s.id === params.servico) ?? null : null,
  );

  // Categorias ordenadas pelos interesses escolhidos no onboarding
  const categories = useMemo(() => {
    const [all, ...rest] = FEED_CATEGORIES;
    const rank = (id: string) => {
      const i = prefs.interesses.indexOf(id);
      return i === -1 ? 99 : i;
    };
    return [all, ...rest.sort((a, b) => rank(a.id) - rank(b.id))];
  }, [prefs.interesses]);

  // Lista de pessoas para o separador "Pessoas"
  const people = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FEED_PEOPLE.filter((p) => {
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.place.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Lista de serviços úteis para o separador "Serviços"
  const services = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VIANA_SERVICES.filter((s) => {
      const matchCat =
        serviceSubCategory === 'todos' || s.category === serviceSubCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.phoneDisplay.includes(q) ||
        (s.details && s.details.some((d) => d.toLowerCase().includes(q)))
      );
    });
  }, [serviceSubCategory, query]);

  // Distribuição equilibrada em 2 colunas para efeito escalonado (masonry)
  const [leftCol, rightCol] = useMemo(() => {
    const left: FeedPerson[] = [];
    const right: FeedPerson[] = [];
    let leftHeight = 0;
    let rightHeight = 0;
    for (const person of people) {
      if (leftHeight <= rightHeight) {
        left.push(person);
        leftHeight += person.cardHeight + 12;
      } else {
        right.push(person);
        rightHeight += person.cardHeight + 12;
      }
    }
    return [left, right];
  }, [people]);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => category === 'tudo' || p.category === category).filter(
      (p) =>
        !q ||
        [p.title, p.text, p.author.name, p.author.place, p.tag ?? '']
          .join(' ')
          .toLowerCase()
          .includes(q),
    );
  }, [category, query]);

  return (
    <Screen>
      <View style={styles.fixedHeaderArea}>
        <ScreenHeader
          title="Feed"
          right={
            <>
              <IconButton
                icon={searchOpen ? 'close' : 'search'}
                label={searchOpen ? 'Fechar pesquisa' : 'Pesquisar'}
                active={searchOpen}
                onPress={() => {
                  if (searchOpen) setQuery('');
                  setSearchOpen((v) => !v);
                }}
              />
              <IconButton icon="filters" label="Filtros" />
            </>
          }
        />

        {searchOpen && (
          <SearchBar value={query} onChangeText={setQuery} onClose={() => setSearchOpen(false)} />
        )}

        <ChipRow items={categories} value={category} onChange={setCategory} />
      </View>

      <ScrollView
        style={styles.scrollList}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}>
        {category === 'pessoas' ? (
          people.length > 0 ? (
            <View style={styles.masonryRow}>
              <View style={styles.masonryCol}>
                {leftCol.map((person) => (
                  <PersonMasonryCard
                    key={person.id}
                    person={person}
                    onPress={setSelectedPerson}
                  />
                ))}
              </View>
              <View style={styles.masonryCol}>
                {rightCol.map((person) => (
                  <PersonMasonryCard
                    key={person.id}
                    person={person}
                    onPress={setSelectedPerson}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.empty}>
              <CoracaoViana size={64} variant="outline" />
              <Text style={styles.emptyTitle}>Nenhuma pessoa encontrada</Text>
              <Text style={styles.emptyText}>
                Experimenta pesquisar por outro nome ou interesse.
              </Text>
            </View>
          )
        ) : category === 'servicos' ? (
          <View style={styles.servicesContainer}>
            {/* Sub-filtros temáticos de Serviços */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.serviceSubChipsWrap}>
              {SERVICE_CATEGORIES.map((sc) => {
                const active = serviceSubCategory === sc.id;
                return (
                  <Pressable
                    key={sc.id}
                    onPress={() => setServiceSubCategory(sc.id)}
                    style={[styles.serviceSubChip, active && styles.serviceSubChipActive]}>
                    <Text
                      style={[
                        styles.serviceSubChipText,
                        active && styles.serviceSubChipTextActive,
                      ]}>
                      {sc.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Lista de cartões de serviços úteis */}
            <View style={styles.servicesListWrap}>
              {services.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  onPress={setSelectedService}
                />
              ))}

              {services.length === 0 && (
                <View style={styles.empty}>
                  <CoracaoViana size={64} variant="outline" />
                  <Text style={styles.emptyTitle}>Nenhum serviço encontrado</Text>
                  <Text style={styles.emptyText}>
                    Experimenta pesquisar por outra palavra ou selecionar outro filtro.
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <>
            {posts.map((p, index) => (
              <View key={p.id} style={styles.postWrap}>
                <PostCard post={p} />
                {index < posts.length - 1 && <FiligreeCardDivider style={styles.cardDivider} />}
              </View>
            ))}

            {posts.length === 0 && (
              <View style={styles.empty}>
                <CoracaoViana size={64} variant="outline" />
                <Text style={styles.emptyTitle}>Nada por aqui… ainda</Text>
                <Text style={styles.emptyText}>
                  Experimenta outra categoria ou pesquisa por outra palavra.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Modal de Perfil e Interesses da Pessoa */}
      <PersonProfileModal
        person={selectedPerson}
        visible={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onOpenChat={(person) => {
          setSelectedPerson(null);
          setChatPerson(person);
        }}
      />

      {/* Modal de Chat Simulado com a Pessoa */}
      <PersonChatModal
        person={chatPerson}
        visible={!!chatPerson}
        onClose={() => setChatPerson(null)}
      />

      {/* Modal de Detalhes do Serviço Útil */}
      <ServiceDetailModal
        service={selectedService}
        visible={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  fixedHeaderArea: {
    width: '100%',
    flexShrink: 0,
    zIndex: 10,
  },
  scrollList: {
    flex: 1,
  },
  list: {
    padding: RaizesLayout.screenPadding,
    paddingTop: 8,
    gap: RaizesLayout.cardGap,
    paddingBottom: RaizesNavbar.height + 60,
  },
  masonryRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    width: '100%',
  },
  masonryCol: {
    flex: 1,
  },
  postWrap: {
    gap: RaizesLayout.cardGap,
  },
  cardDivider: {
    marginVertical: 4,
    opacity: 0.85,
  },
  empty: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  emptyTitle: {
    marginTop: 8,
    fontSize: RaizesType.size.h3,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  emptyText: { fontSize: RaizesType.size.small, color: RaizesColors.textoSecundario, textAlign: 'center' },
  servicesContainer: {
    gap: 14,
  },
  serviceSubChipsWrap: {
    gap: 8,
    paddingVertical: 2,
    flexDirection: 'row',
  },
  serviceSubChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceSubChipActive: {
    backgroundColor: RaizesColors.vermelho600,
    borderColor: RaizesColors.vermelho600,
  },
  serviceSubChipText: {
    fontSize: 12,
    fontWeight: RaizesType.weight.medium,
    color: RaizesColors.texto,
  },
  serviceSubChipTextActive: {
    color: RaizesColors.textoInverso,
    fontWeight: RaizesType.weight.bold,
  },
  servicesListWrap: {
    gap: 12,
  },
});
