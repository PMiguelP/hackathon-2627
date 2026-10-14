import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { CommunityGroupChatModal } from '@/components/raizes/community/community-group-chat-modal';
import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import { CamisaHearts, LençoFloralBand } from '@/components/raizes/page-decor';
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
import { GROUPS, MEETUPS, type Group } from '@/data/community';

export default function ComunidadeScreen() {
  const params = useLocalSearchParams<{ tab?: string; chatGroup?: string }>();
  const [subTab, setSubTab] = useState<'explorar' | 'seguir'>(
    params.tab === 'explorar' ? 'explorar' : 'seguir'
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [joinedGroups, setJoinedGroups] = useState<Record<string, boolean>>({
    g1: true,
    g2: true,
    g3: true,
  });
  const [activeChatGroup, setActiveChatGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (params.tab === 'explorar' || params.tab === 'seguir') {
      setSubTab(params.tab);
    }
    if (params.chatGroup) {
      const g = GROUPS.find((group) => group.id === params.chatGroup);
      if (g) setActiveChatGroup(g);
    }
  }, [params.tab, params.chatGroup]);

  const toggleGroup = (id: string) => {
    setJoinedGroups((prev) => {
      const nextState = !prev[id];
      return { ...prev, [id]: nextState };
    });
  };

  const followedGroups = GROUPS.filter((g) => !!joinedGroups[g.id]);
  const followedCount = followedGroups.length;

  const filteredExploreGroups = GROUPS.filter((g) =>
    !query ||
    g.name.toLowerCase().includes(query.toLowerCase()) ||
    g.description.toLowerCase().includes(query.toLowerCase()) ||
    g.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredFollowedGroups = followedGroups.filter((g) =>
    !query ||
    g.name.toLowerCase().includes(query.toLowerCase()) ||
    g.description.toLowerCase().includes(query.toLowerCase()) ||
    g.lastMessage.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Screen>
      <ScreenHeader
        title="Comunidade"
        subtitle="Vianenses, estudantes e recém-chegados"
        right={
          <>
            <IconButton
              icon={searchOpen ? 'close' : 'search'}
              label="Pesquisar comunidade"
              active={searchOpen}
              onPress={() => {
                if (searchOpen) setQuery('');
                setSearchOpen((v) => !v);
              }}
            />
          </>
        }
      />

      {searchOpen && (
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClose={() => setSearchOpen(false)}
          placeholder={
            subTab === 'seguir'
              ? 'Pesquisar chats e grupos seguidos…'
              : 'Pesquisar comunidades e encontros em Viana…'
          }
        />
      )}

      {/* Segmented Control de 2 Sub-Tabs: Explorar vs A Seguir */}
      <View style={styles.tabSwitcherContainer}>
        <View style={styles.tabSwitcher}>
          <Pressable
            style={[styles.tabButton, subTab === 'explorar' && styles.tabButtonActive]}
            onPress={() => setSubTab('explorar')}
            accessibilityRole="tab"
            accessibilityState={{ selected: subTab === 'explorar' }}>
            <Icon
              name="all"
              size={15}
              color={subTab === 'explorar' ? RaizesColors.textoInverso : RaizesColors.textoSecundario}
            />
            <Text
              style={[styles.tabButtonText, subTab === 'explorar' && styles.tabButtonTextActive]}>
              Explorar
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tabButton, subTab === 'seguir' && styles.tabButtonActive]}
            onPress={() => setSubTab('seguir')}
            accessibilityRole="tab"
            accessibilityState={{ selected: subTab === 'seguir' }}>
            <Icon
              name="comment"
              size={15}
              color={subTab === 'seguir' ? RaizesColors.textoInverso : RaizesColors.textoSecundario}
            />
            <Text
              style={[styles.tabButtonText, subTab === 'seguir' && styles.tabButtonTextActive]}>
              A Seguir
            </Text>
            {followedCount > 0 && (
              <View
                style={[
                  styles.tabBadge,
                  subTab === 'seguir' ? styles.tabBadgeActive : styles.tabBadgeInactive,
                ]}>
                <Text
                  style={[
                    styles.tabBadgeText,
                    subTab === 'seguir' ? styles.tabBadgeTextActive : styles.tabBadgeTextInactive,
                  ]}>
                  {followedCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* ============================================================ */}
        {/* SUBTAB 1: EXPLORAR                                           */}
        {/* ============================================================ */}
        {subTab === 'explorar' && (
          <>
            {/* Banner de Boas-Vindas à Tradição */}
            <View style={styles.traditionCard}>
              <View style={styles.traditionHeader}>
                <CamisaHearts size={26} />
                <Text style={styles.traditionTag}>BEM-VINDO A VIANA</Text>
              </View>
              <Text style={styles.traditionTitle}>Cria raízes no coração do Minho</Text>
              <Text style={styles.traditionDesc}>
                Descobre comunidades ativas, participa em grupos e faz parte da vida de Viana.
                Ao seguir um grupo, tens acesso direto ao chat comunitário!
              </Text>
              <LençoFloralBand width={260} style={styles.traditionBand} />
            </View>

            {/* Lista de Comunidades para Explorar */}
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={styles.sectionTitle}>Grupos de Viana</Text>
                  <Text style={styles.sectionSubtitle}>
                    Segue para conversar e combinar planos
                  </Text>
                </View>
              </View>

              <View style={styles.exploreList}>
                {filteredExploreGroups.map((g) => {
                  const isFollowing = !!joinedGroups[g.id];
                  return (
                    <View key={g.id} style={styles.exploreCard}>
                      <View style={styles.exploreCardTop}>
                        <View style={styles.groupThumbWrap}>
                          <Image source={g.image} style={styles.groupThumb} resizeMode="cover" />
                          <Text style={styles.groupEmojiBadge}>{g.emoji}</Text>
                        </View>

                        <View style={styles.exploreCardInfo}>
                          <Text style={styles.exploreCardTitle}>{g.name}</Text>
                          <Text style={styles.exploreCardMembers}>
                            👥 {g.members} membros activos em Viana
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.exploreCardDesc}>{g.description}</Text>

                      <View style={styles.tagsRow}>
                        {g.tags.map((t) => (
                          <View key={t} style={styles.tagPill}>
                            <Text style={styles.tagPillText}>#{t}</Text>
                          </View>
                        ))}
                      </View>

                      <View style={styles.exploreCardActions}>
                        <Pressable
                          style={[
                            styles.followButton,
                            isFollowing ? styles.followingButton : styles.notFollowingButton,
                          ]}
                          onPress={() => toggleGroup(g.id)}>
                          <Icon
                            name={isFollowing ? 'check' : 'add'}
                            size={14}
                            color={isFollowing ? RaizesColors.ouroEscuro : RaizesColors.textoInverso}
                          />
                          <Text
                            style={[
                              styles.followButtonText,
                              isFollowing
                                ? styles.followingButtonText
                                : styles.notFollowingButtonText,
                            ]}>
                            {isFollowing ? 'A Seguir' : 'Seguir'}
                          </Text>
                        </Pressable>

                        {isFollowing ? (
                          <Pressable
                            style={styles.openChatButton}
                            onPress={() => setActiveChatGroup(g)}>
                            <Icon name="comment" size={14} color={RaizesColors.textoInverso} />
                            <Text style={styles.openChatButtonText}>Mensagem</Text>
                          </Pressable>
                        ) : (
                          <View style={styles.chatLockedHint}>
                            <Text style={styles.chatLockedText}>Segue para aceder ao chat</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Próximos Encontros em Viana */}
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Próximos Encontros</Text>
              </View>
              <View style={styles.meetupList}>
                {MEETUPS.map((m) => (
                  <View key={m.id} style={styles.meetupCard}>
                    <View style={styles.calendarBadge}>
                      <Text style={styles.calDay}>{m.day}</Text>
                      <Text style={styles.calMonth}>{m.month}</Text>
                    </View>
                    <View style={styles.meetupInfo}>
                      <Text style={styles.meetupTitle}>{m.title}</Text>
                      <Text style={styles.meetupPlace}>📍 {m.place}</Text>
                    </View>
                    <Button title="Vou" size="sm" variant="gold" />
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* ============================================================ */}
        {/* SUBTAB 2: A SEGUIR (CHATS ATIVOS)                            */}
        {/* ============================================================ */}
        {subTab === 'seguir' && (
          <>
            <View style={styles.activeChatsNotice}>
              <View style={styles.activeChatsNoticeIcon}>
                <CoracaoViana size={16} variant="filled" color={RaizesColors.ouro} />
              </View>
              <Text style={styles.activeChatsNoticeText}>
                Comunidades que segues com chats em tempo real. Clica num grupo para conversar com os membros!
              </Text>
            </View>

            {filteredFollowedGroups.length === 0 ? (
              <View style={styles.emptyFollowCard}>
                <Text style={styles.emptyFollowEmoji}>💬</Text>
                <Text style={styles.emptyFollowTitle}>Ainda não segues nenhum grupo</Text>
                <Text style={styles.emptyFollowDesc}>
                  Segue grupos de Viana no separador "Explorar" para participares nas conversas comunitárias, tirares dúvidas e combinares saídas.
                </Text>
                <View style={{ marginTop: 8, width: '100%' }}>
                  <Button
                    title="Explorar Grupos de Viana"
                    variant="primary"
                    size="md"
                    icon="all"
                    onPress={() => setSubTab('explorar')}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.chatsList}>
                {filteredFollowedGroups.map((g) => (
                  <Pressable
                    key={g.id}
                    style={styles.chatCard}
                    onPress={() => setActiveChatGroup(g)}
                    accessibilityLabel={`Abrir chat de ${g.name}`}>
                    {/* Thumbnail com indicador online e emoji */}
                    <View style={styles.chatThumbWrapper}>
                      <Image source={g.image} style={styles.chatThumb} resizeMode="cover" />
                      <Text style={styles.chatEmojiBadge}>{g.emoji}</Text>
                      <View style={styles.chatOnlinePulse} />
                    </View>

                    {/* Informação e Última Mensagem */}
                    <View style={styles.chatContentWrap}>
                      <Text style={styles.chatGroupName} numberOfLines={1}>
                        {g.name}
                      </Text>

                      <Text style={styles.chatLastMsg} numberOfLines={1}>
                        {`${g.lastMessage.author}: ${g.lastMessage.text}`}
                      </Text>

                      <View style={styles.chatMetaRow}>
                        <Text style={styles.chatMembersTag}>
                          👥 {g.members} membros
                        </Text>
                        <View style={styles.chatTagPill}>
                          <Text style={styles.chatTagPillText}>#{g.tags[0]}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Coluna Direita: Hora e Badge de Mensagens / Chevron */}
                    <View style={styles.chatRightCol}>
                      <Text style={styles.chatTime}>{g.lastMessage.time}</Text>
                      {!!g.unreadCount && g.unreadCount > 0 ? (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>{g.unreadCount}</Text>
                        </View>
                      ) : (
                        <View style={styles.chatChevronWrap}>
                          <Icon name="chevronRight" size={13} color={RaizesColors.textoMuted} />
                        </View>
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Modal Interativo de Chat de Grupo */}
      <CommunityGroupChatModal
        group={activeChatGroup}
        visible={!!activeChatGroup}
        onClose={() => setActiveChatGroup(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabSwitcherContainer: {
    paddingHorizontal: RaizesLayout.screenPadding,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: RaizesColors.linhoFundo,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: RaizesColors.linhoCartao,
    padding: 4,
    borderRadius: RaizesRadius.pill,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: RaizesRadius.pill,
    gap: 7,
  },
  tabButtonActive: {
    backgroundColor: RaizesColors.vermelho600,
    boxShadow: RaizesShadow.card,
  },
  tabButtonText: {
    fontSize: 13.5,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.textoSecundario,
  },
  tabButtonTextActive: {
    color: RaizesColors.textoInverso,
    fontWeight: RaizesType.weight.bold,
  },
  tabBadge: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 10,
    marginLeft: 2,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  tabBadgeInactive: {
    backgroundColor: 'rgba(163, 21, 32, 0.1)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: RaizesType.weight.bold,
  },
  tabBadgeTextActive: {
    color: RaizesColors.textoInverso,
  },
  tabBadgeTextInactive: {
    color: RaizesColors.vermelho600,
  },
  content: {
    width: '100%',
    paddingHorizontal: RaizesLayout.screenPadding,
    paddingBottom: RaizesNavbar.height + 60,
    gap: 18,
  },
  traditionCard: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    overflow: 'hidden',
  },
  traditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  traditionTag: {
    fontSize: 11,
    fontWeight: RaizesType.weight.bold,
    letterSpacing: 2,
    color: RaizesColors.ouroTexto,
  },
  traditionTitle: {
    fontSize: RaizesType.size.h3,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    marginBottom: 4,
  },
  traditionDesc: {
    fontSize: RaizesType.size.small,
    color: RaizesColors.textoSecundario,
    lineHeight: 18,
  },
  traditionBand: {
    marginTop: 10,
    alignSelf: 'center',
  },
  sectionWrap: {
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: RaizesType.size.h3,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  sectionSubtitle: {
    fontSize: RaizesType.size.caption,
    color: RaizesColors.textoMuted,
    marginTop: 2,
  },
  exploreList: {
    gap: 14,
  },
  exploreCard: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    padding: 14,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    gap: 10,
  },
  exploreCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupThumbWrap: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
  },
  groupThumb: {
    width: 48,
    height: 48,
  },
  groupEmojiBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    fontSize: 14,
  },
  exploreCardInfo: {
    flex: 1,
  },
  exploreCardTitle: {
    fontSize: 15.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    marginBottom: 2,
  },
  exploreCardMembers: {
    fontSize: 11.5,
    color: RaizesColors.verde,
    fontWeight: RaizesType.weight.semiBold,
  },
  exploreCardDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    color: RaizesColors.textoSecundario,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RaizesRadius.pill,
    backgroundColor: 'rgba(214, 168, 78, 0.12)',
    borderWidth: 0.8,
    borderColor: 'rgba(214, 168, 78, 0.3)',
  },
  tagPillText: {
    fontSize: 10.5,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.ouroTexto,
  },
  exploreCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(122, 94, 60, 0.08)',
    gap: 8,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RaizesRadius.pill,
  },
  followingButton: {
    backgroundColor: 'rgba(214, 168, 78, 0.15)',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  notFollowingButton: {
    backgroundColor: RaizesColors.vermelho600,
    boxShadow: RaizesShadow.card,
  },
  followButtonText: {
    fontSize: 11.5,
    fontWeight: RaizesType.weight.bold,
  },
  followingButtonText: {
    color: RaizesColors.ouroEscuro,
  },
  notFollowingButtonText: {
    color: RaizesColors.textoInverso,
  },
  openChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RaizesRadius.pill,
    backgroundColor: RaizesColors.vermelho600,
    boxShadow: RaizesShadow.card,
  },
  openChatButtonText: {
    fontSize: 11.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
  },
  chatLockedHint: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  chatLockedText: {
    fontSize: 10.5,
    color: RaizesColors.textoMuted,
    fontStyle: 'italic',
  },
  meetupList: {
    gap: 10,
  },
  meetupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: RaizesRadius.card,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.linhoBorda,
    boxShadow: RaizesShadow.card,
  },
  calendarBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(163, 21, 32, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(163, 21, 32, 0.2)',
  },
  calDay: {
    fontSize: 16,
    fontWeight: RaizesType.weight.extraBold,
    color: RaizesColors.vermelho600,
  },
  calMonth: {
    fontSize: 10,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoSecundario,
    letterSpacing: 1,
  },
  meetupInfo: {
    flex: 1,
    gap: 2,
  },
  meetupTitle: {
    fontSize: RaizesType.size.body,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.texto,
  },
  meetupPlace: {
    fontSize: RaizesType.size.caption,
    color: RaizesColors.textoMuted,
  },
  activeChatsNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 168, 78, 0.12)',
    borderRadius: RaizesRadius.card,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  activeChatsNoticeIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: RaizesColors.linhoCartao,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  activeChatsNoticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: RaizesColors.ouroEscuro,
    fontWeight: RaizesType.weight.medium,
  },
  emptyFollowCard: {
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    gap: 8,
  },
  emptyFollowEmoji: {
    fontSize: 38,
    marginBottom: 4,
  },
  emptyFollowTitle: {
    fontSize: 16,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    textAlign: 'center',
  },
  emptyFollowDesc: {
    fontSize: 13,
    color: RaizesColors.textoSecundario,
    textAlign: 'center',
    lineHeight: 19,
  },
  chatsList: {
    gap: 12,
  },
  chatCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RaizesColors.linhoCartao,
    borderRadius: RaizesRadius.card,
    padding: 13,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
    gap: 12,
    overflow: 'hidden',
  },
  chatThumbWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
  },
  chatThumb: {
    width: 52,
    height: 52,
  },
  chatEmojiBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    fontSize: 13,
  },
  chatOnlinePulse: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#3E8E5A',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  chatContentWrap: {
    flex: 1,
    minWidth: 0,
    gap: 3,
    overflow: 'hidden',
  },
  chatTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatGroupName: {
    fontSize: 14.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
    flex: 1,
    minWidth: 0,
    marginRight: 6,
  },
  chatTime: {
    fontSize: 11,
    color: RaizesColors.textoMuted,
    fontWeight: RaizesType.weight.medium,
  },
  chatLastMsg: {
    fontSize: 12.5,
    lineHeight: 17,
    color: RaizesColors.textoSecundario,
  },
  chatLastAuthor: {
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroEscuro,
  },
  chatMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  chatMembersTag: {
    fontSize: 11,
    color: RaizesColors.textoMuted,
  },
  chatTagPill: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: RaizesRadius.pill,
    backgroundColor: 'rgba(214, 168, 78, 0.1)',
  },
  chatTagPillText: {
    fontSize: 10,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.ouroTexto,
  },
  chatRightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
    flexShrink: 0,
    minWidth: 42,
  },
  chatChevronWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: RaizesColors.vermelho600,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: RaizesShadow.card,
  },
  unreadBadgeText: {
    fontSize: 10.5,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.textoInverso,
  },
});
