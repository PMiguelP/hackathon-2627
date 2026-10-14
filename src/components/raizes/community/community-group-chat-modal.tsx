import { useEffect, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import type { Group, GroupChatMessage } from '@/data/community';

function getGroupReply(groupName: string, text: string): { author: string; text: string } {
  const lower = text.toLowerCase();
  if (lower.includes('café') || lower.includes('encontro') || lower.includes('onde')) {
    return {
      author: 'Inês Costa',
      text: 'Estamos quase todos pela Praça da República ou no Natário! Junta-te quando quiseres. ☕',
    };
  }
  if (lower.includes('surf') || lower.includes('praia') || lower.includes('ondas')) {
    return {
      author: 'Tomás Alvim',
      text: 'O mar no Cabedelo está clássico hoje! Vale a pena dar um salto. 🏄‍♂️',
    };
  }
  if (lower.includes('estudar') || lower.includes('aulas') || lower.includes('ipvc')) {
    return {
      author: 'Mateus Fontes',
      text: 'A sala de estudo do IPVC tem malta até às 20h. Passa por lá!',
    };
  }
  return {
    author: 'Lucas Moreira',
    text: 'Bem-vindo ao grupo! Qualquer dúvida sobre Viana, apita que a malta ajuda sempre. 🙌',
  };
}

export function CommunityGroupChatModal({
  group,
  visible,
  onClose,
}: {
  group: Group | null;
  visible: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (group && visible) {
      setMessages([...group.chatMessages]);
      setInputText('');
      setIsTyping(null);
    }
  }, [group, visible]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text || !group) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes(),
    ).padStart(2, '0')}`;

    const newMsg: GroupChatMessage = {
      id: `gmsg-${Date.now()}`,
      author: 'Eu',
      text,
      time: timeStr,
      isMe: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simula escrita de um membro da comunidade
    const replyData = getGroupReply(group.name, text);
    setIsTyping(replyData.author);

    setTimeout(() => {
      setIsTyping(null);
      const replyTime = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes(),
      ).padStart(2, '0')}`;

      const replyMsg: GroupChatMessage = {
        id: `greply-${Date.now()}`,
        author: replyData.author,
        text: replyData.text,
        time: replyTime,
        isMe: false,
      };

      setMessages((prev) => [...prev, replyMsg]);

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1400);
  };

  if (!group) return null;

  const quickPrompts = [
    '👋 Olá a todos!',
    '☕ Onde é o próximo convívio?',
    '📍 Alguém livre no centro?',
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          {/* Cabeçalho do Chat de Grupo */}
          <View style={styles.header}>
            <Pressable
              hitSlop={12}
              onPress={onClose}
              style={styles.backButton}
              accessibilityLabel="Voltar">
              <Icon name="back" size={20} color={RaizesColors.texto} />
            </Pressable>

            <View style={styles.headerInfo}>
              <View style={styles.groupThumbWrap}>
                <Image source={group.image} style={styles.groupThumb} resizeMode="cover" />
                <Text style={styles.groupThumbEmoji}>{group.emoji}</Text>
              </View>
              <View style={styles.groupTextWrap}>
                <Text style={styles.groupTitle} numberOfLines={1}>
                  {group.name}
                </Text>
                <Text style={styles.groupSub} numberOfLines={1}>
                  ● {group.members} membros activos em Viana
                </Text>
              </View>
            </View>

            <Pressable
              hitSlop={12}
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="Fechar chat">
              <Icon name="close" size={16} color={RaizesColors.textoSecundario} />
            </Pressable>
          </View>

          {/* Subbarra informativa de comunidade */}
          <View style={styles.subBar}>
            <CoracaoViana size={12} variant="filled" color={RaizesColors.ouro} />
            <Text style={styles.subBarText} numberOfLines={1}>
              {group.description}
            </Text>
          </View>

          {/* Lista de Mensagens */}
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>Hoje • Chat do Grupo</Text>
            </View>

            {messages.map((m) => {
              const isMe = m.isMe || m.author === 'Eu';
              return (
                <View
                  key={m.id}
                  style={[
                    styles.messageRow,
                    isMe ? styles.messageRowMe : styles.messageRowOther,
                  ]}>
                  <View
                    style={[
                      styles.bubble,
                      isMe ? styles.bubbleMe : styles.bubbleOther,
                    ]}>
                    {!isMe && (
                      <Text style={styles.bubbleAuthor}>{m.author}</Text>
                    )}
                    <Text
                      style={[
                        styles.bubbleText,
                        isMe ? styles.bubbleTextMe : styles.bubbleTextOther,
                      ]}>
                      {m.text}
                    </Text>
                    <Text
                      style={[
                        styles.bubbleTime,
                        isMe ? styles.bubbleTimeMe : styles.bubbleTimeOther,
                      ]}>
                      {m.time}
                    </Text>
                  </View>
                </View>
              );
            })}

            {/* Indicador de escrita comunitária */}
            {isTyping && (
              <View style={styles.typingRow}>
                <View style={styles.typingBubble}>
                  <Text style={styles.typingText}>
                    {isTyping} está a escrever...
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Sugestões Rápidas de Mensagem */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickPromptsWrap}>
            {quickPrompts.map((prompt) => (
              <Pressable
                key={prompt}
                style={styles.promptChip}
                onPress={() => handleSend(prompt)}>
                <Text style={styles.promptChipText}>{prompt}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Barra de Envio */}
          <View style={styles.inputArea}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Mensagem para o grupo ${group.name}...`}
              placeholderTextColor={RaizesColors.textoMuted}
              returnKeyType="send"
              onSubmitEditing={() => handleSend()}
            />
            <Pressable
              onPress={() => handleSend()}
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              disabled={!inputText.trim()}
              accessibilityLabel="Enviar mensagem">
              <Icon
                name="next"
                size={16}
                color={
                  inputText.trim()
                    ? RaizesColors.textoInverso
                    : 'rgba(255, 255, 255, 0.6)'
                }
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(28, 16, 12, 0.6)',
    justifyContent: 'flex-end',
    zIndex: 10000,
  },
  container: {
    width: '100%',
    height: '92%',
    maxHeight: 740,
    backgroundColor: RaizesColors.linhoFundo,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.raised,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: RaizesColors.linhoCartao,
    borderBottomWidth: 1,
    borderBottomColor: RaizesColors.ouroLinha,
    gap: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(247, 238, 223, 0.7)',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  groupThumbWrap: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
  },
  groupThumb: {
    width: 40,
    height: 40,
  },
  groupThumbEmoji: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    fontSize: 13,
  },
  groupTextWrap: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  groupSub: {
    fontSize: 11,
    color: '#3E8E5A',
    fontWeight: RaizesType.weight.medium,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(247, 238, 223, 0.6)',
  },
  subBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(214, 168, 78, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(214, 168, 78, 0.2)',
  },
  subBarText: {
    flex: 1,
    fontSize: 11,
    color: RaizesColors.ouroEscuro,
    fontWeight: RaizesType.weight.medium,
  },
  messagesList: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
  },
  dateBadge: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'rgba(122, 94, 60, 0.12)',
    borderRadius: 10,
    marginBottom: 8,
  },
  dateBadgeText: {
    fontSize: 10.5,
    color: RaizesColors.textoSecundario,
    fontWeight: RaizesType.weight.medium,
  },
  messageRow: {
    flexDirection: 'row',
    maxWidth: '85%',
  },
  messageRowMe: {
    alignSelf: 'flex-end',
  },
  messageRowOther: {
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    gap: 3,
  },
  bubbleMe: {
    backgroundColor: RaizesColors.vermelho600,
    borderBottomRightRadius: 4,
    boxShadow: RaizesShadow.card,
  },
  bubbleOther: {
    backgroundColor: RaizesColors.linhoCartao,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    boxShadow: RaizesShadow.card,
  },
  bubbleAuthor: {
    fontSize: 11,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroEscuro,
  },
  bubbleText: {
    fontSize: 13.5,
    lineHeight: 18,
  },
  bubbleTextMe: {
    color: RaizesColors.textoInverso,
  },
  bubbleTextOther: {
    color: RaizesColors.texto,
  },
  bubbleTime: {
    fontSize: 9.5,
    alignSelf: 'flex-end',
  },
  bubbleTimeMe: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  bubbleTimeOther: {
    color: RaizesColors.textoMuted,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  typingBubble: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(214, 168, 78, 0.15)',
  },
  typingText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: RaizesColors.ouroEscuro,
  },
  quickPromptsWrap: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    height: 48,
  },
  promptChip: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: RaizesColors.linhoCartao,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  promptChipText: {
    fontSize: 11.5,
    color: RaizesColors.texto,
    fontWeight: RaizesType.weight.medium,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    backgroundColor: RaizesColors.linhoCartao,
    borderTopWidth: 1,
    borderTopColor: RaizesColors.ouroLinha,
    gap: 10,
    flexShrink: 0,
  },
  textInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 13.5,
    color: RaizesColors.texto,
    borderWidth: 1,
    borderColor: RaizesColors.ouroLinha,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: RaizesColors.vermelho600,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: RaizesShadow.card,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(163, 21, 32, 0.4)',
  },
});
