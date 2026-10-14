import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CoracaoViana } from '@/components/raizes/coracao-viana';
import { Icon } from '@/components/raizes/icon';
import { CamisaHearts, FiligreeLace, LençoFloralBand } from '@/components/raizes/page-decor';
import { Button } from '@/components/raizes/ui/button';
import { Chip } from '@/components/raizes/ui/chip';
import { FEED_CATEGORIES, type FeedCategoryId } from '@/config/feed';
import {
  RaizesColors,
  RaizesFonts,
  RaizesInput,
  RaizesLayout,
  RaizesRadius,
  RaizesShadow,
  RaizesType,
} from '@/constants/raizes-theme';

export default function PublicarModal() {
  const [selectedCategory, setSelectedCategory] = useState<FeedCategoryId>('eventos');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Viana do Castelo');

  const categories = FEED_CATEGORIES.filter((c) => c.id !== 'tudo');

  const handlePublish = () => {
    // Ação simulada de publicação
    router.back();
  };

  return (
    <View style={styles.root}>
      <FiligreeLace width={160} style={styles.laceTopRight} flip opacity={0.3} />

      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Pressable hitSlop={10} onPress={() => router.back()} style={styles.closeBtn}>
            <Icon name="close" size={20} color={RaizesColors.texto} />
          </Pressable>
          <View style={styles.headerTitleRow}>
            <CoracaoViana size={22} />
            <Text style={styles.headerTitle}>Partilhar em Viana</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Escolha da Categoria */}
            <Text style={styles.label}>Categoria da Publicação</Text>
            <View style={styles.categoriesRow}>
              {categories.map((c) => (
                <Chip
                  key={c.id}
                  label={c.label}
                  icon={c.icon}
                  selected={selectedCategory === c.id}
                  onPress={() => setSelectedCategory(c.id)}
                />
              ))}
            </View>

            {/* Campos de Texto */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Festa de Santa Marta dos Cortiços"
                placeholderTextColor={RaizesColors.textoMuted}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Localização em Viana</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Ex: Praça da República"
                placeholderTextColor={RaizesColors.textoMuted}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Mensagem ou Descrição</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Partilha os detalhes com a comunidade..."
                placeholderTextColor={RaizesColors.textoMuted}
                multiline
                numberOfLines={4}
                style={[styles.input, styles.textArea]}
              />
            </View>

            {/* Adicionar Fotos / Tradição */}
            <Pressable style={styles.photoUploadBtn}>
              <Icon name="camera" size={24} color={RaizesColors.ouroTexto} />
              <Text style={styles.photoUploadText}>Adicionar Fotografias</Text>
              <CamisaHearts size={20} />
            </Pressable>

            <LençoFloralBand width={260} style={styles.floralBand} />

            <Button
              title="Publicar no Raízes"
              onPress={handlePublish}
              disabled={!title.trim() || !description.trim()}
              variant="primary"
              icon="heartFill"
            />
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingTop: 10,
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
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  label: {
    fontSize: RaizesType.size.small,
    fontWeight: RaizesType.weight.semiBold,
    color: RaizesColors.textoSecundario,
    marginBottom: 4,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 6,
  },
  fieldWrap: {
    gap: 4,
  },
  input: {
    height: RaizesInput.height,
    paddingHorizontal: RaizesInput.paddingHorizontal,
    borderRadius: RaizesInput.radius,
    borderWidth: RaizesInput.borderWidth,
    borderColor: RaizesColors.linhoBorda,
    backgroundColor: RaizesColors.campoClaro,
    fontSize: RaizesInput.fontSize,
    color: RaizesColors.texto,
    boxShadow: RaizesShadow.card,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  photoUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: RaizesRadius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: RaizesColors.ouroLinha,
    backgroundColor: 'rgba(214, 168, 78, 0.05)',
  },
  photoUploadText: {
    fontSize: RaizesType.size.body,
    fontWeight: RaizesType.weight.bold,
    color: RaizesColors.ouroTexto,
  },
  floralBand: {
    alignSelf: 'center',
    marginVertical: 4,
  },
});
