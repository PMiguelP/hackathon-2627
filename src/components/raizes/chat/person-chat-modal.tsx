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
import type { FeedPerson } from '@/data/people';

export type ChatMessage = {
  id: string;
  sender: 'other' | 'me';
  text: string;
  time: string;
};

// Mensagens iniciais de boas-vindas autênticas baseadas na personalidade de cada pessoa
const DEFAULT_WELCOME_MESSAGES: Record<string, string> = {
  fp1: 'Olá! Vi que também te interessas por fotografia em Viana. Quando quiseres podemos combinar um passeio pelo centro histórico ou até ao pôr do sol em Santa Luzia! 📸',
  fp2: 'Olá! Que bom ver-te por cá! Se precisares de alguma dica sobre o campus do IPVC ou os melhores dias para apanhar ondas no Cabedelo, estás à vontade. 🌊',
  fp3: 'Boas! Estás há muito tempo por Viana? Se gostares de boa gastronomia e música ao vivo, temos de cruzar-nos pela Ribeira! 🎸',
  fp4: 'Olá! Fico muito contente pela ligação. Viana tem um património riquíssimo e recantos lindos. Se quiseres trocar ideias sobre a cidade, diz-me! 🏛️',
  fp5: 'Viva! Sempre um gosto conhecer malta nova interessada nas nossas tradições e raízes minhotas. Quando passares por Santa Marta, avisa! 🧵',
  fp6: 'Olá! Que bom conectarmo-nos! Estou sempre disponível para partilhar dicas sobre espaços sustentáveis, feiras locais e café de especialidade em Viana. ☕',
};

// Respostas inteligentes automáticas para a simulação de conversa
function getSimulatedReply(personName: string, userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes('café') || lower.includes('beber') || lower.includes('encontrar')) {
    return 'Adorava! Que tal combinarmos na Praça da República ou no Natário ao fim da tarde? Fica prometido! ☕✨';
  }
  if (lower.includes('surf') || lower.includes('praia') || lower.includes('mar')) {
    return 'O mar do Cabedelo tem estado incrível esta semana! Se quiseres ir um destes dias dá o toque. 🏄‍♂️';
  }
  if (lower.includes('foto') || lower.includes('santa luzia') || lower.includes('passeio')) {
    return 'Sem dúvida! A luz de fim de tarde perto do templo é das melhores coisas de Viana. Levo a câmara! 📷';
  }
  if (lower.includes('ipvc') || lower.includes('estudar') || lower.includes('escola')) {
    return 'O ambiente no politécnico é super acolhedor! Há sempre malta fixe a organizar convívios. 🎒';
  }
  return `Obrigado pela mensagem! É mesmo fixe ver a comunidade de Viana tão ativa por aqui. Vamos falando e combinamos algo em breve! 🙌`;
}

export function PersonChatModal({
  person,
  visible,
  onClose,
}: {
  person: FeedPerson | null;
  visible: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  // Inicializa o chat quando abre com uma pessoa específica
  useEffect(() => {
    if (person && visible) {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes(),
      ).padStart(2, '0')}`;

      const welcome =
        DEFAULT_WELCOME_MESSAGES[person.id] ??
        `Olá! Fico muito contente por conectarmo-nos aqui nas Raízes de Viana. Tudo bem contigo?`;

      setMessages([
        {
          id: 'm-welcome',
          sender: 'other',
          text: welcome,
          time: timeStr,
        },
      ]);
      setInputText('');
      setIsTyping(false);
    }
  }, [person, visible]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text || !person) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes(),
    ).padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text,
      time: timeStr,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Scroll para baixo
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simula resposta inteligente após 1.4s
    setTimeout(() => {
      setIsTyping(false);
      const replyTime = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes(),
      ).padStart(2, '0')}`;
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'other',
        text: getSimulatedReply(person.name, text),
        time: replyTime,
      };
      setMessages((prev) => [...prev, replyMsg]);

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1400);
  };

  if (!person) return null;

  const quickPrompts = [
    '☕ Alinhas num café na Praça?',
    '📸 Qual o melhor sítio para fotos?',
    '👋 Olá, tudo bem contigo?',
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          {/* Cabeçalho do Chat */}
          <View style={styles.header}>
            <Pressable
              hitSlop={12}
              onPress={onClose}
              style={styles.backButton}
              accessibilityLabel="Voltar">
              <Icon name="back" size={20} color={RaizesColors.texto} />
            </Pressable>

            {/* Avatar e Estado */}
            <View style={styles.headerProfile}>
              <View style={styles.avatarWrap}>
                <Image source={person.image} style={styles.avatar} resizeMode="cover" />
                <View style={styles.onlineDot} />
              </View>
              <View style={styles.headerTextWrap}>
                <Text style={styles.headerName} numberOfLines={1}>
                  {person.name}
                </Text>
                <Text style={styles.headerStatus} numberOfLines={1}>
                  ● Online agora em Viana
                </Text>
              </View>
            </View>

            {/* Ícone de fechar no topo */}
            <Pressable
              hitSlop={12}
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="Fechar chat">
              <Icon name="close" size={16} color={RaizesColors.textoSecundario} />
            </Pressable>
          </View>

          {/* Subbarra com freguesia e filigrana */}
          <View style={styles.subBar}>
            <CoracaoViana size={13} variant="filled" color={RaizesColors.ouro} />
            <Text style={styles.subBarText}>
              Conversa direta com morador de {person.place}
            </Text>
          </View>

          {/* Lista de Mensagens */}
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>Hoje • Conexão estabelecida</Text>
            </View>

            {messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <View
                  key={m.id}
                  style={[
                    styles.messageRow,
                    isMe ? styles.messageRowMe : styles.messageRowOther,
                  ]}>
                  {!isMe && (
                    <Image source={person.image} style={styles.msgAvatar} resizeMode="cover" />
                  )}
                  <View
                    style={[
                      styles.bubble,
                      isMe ? styles.bubbleMe : styles.bubbleOther,
                    ]}>
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

            {/* Indicador de escrita simulado */}
            {isTyping && (
              <View style={styles.typingRow}>
                <Image source={person.image} style={styles.msgAvatar} resizeMode="cover" />
                <View style={styles.typingBubble}>
                  <Text style={styles.typingText}>
                    {person.name.split(' ')[0]} está a escrever...
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Sugestões rápidas (Icebreakers) */}
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

          {/* Barra de Entrada de Texto */}
          <View style={styles.inputArea}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Mensagem para ${person.name.split(' ')[0]}...`}
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
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: RaizesColors.ouroLinha,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#3E8E5A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerName: {
    fontSize: 15,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.texto,
  },
  headerStatus: {
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
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(214, 168, 78, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(214, 168, 78, 0.2)',
  },
  subBarText: {
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
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '85%',
  },
  messageRowMe: {
    alignSelf: 'flex-end',
  },
  messageRowOther: {
    alignSelf: 'flex-start',
  },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 2,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 4,
    flexShrink: 1,
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
    gap: 8,
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
    flexDirection: 'row',
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
