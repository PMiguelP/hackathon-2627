import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { FullscreenVianaMap } from '@/components/raizes/map/fullscreen-viana-map';
import { StayStoryModal } from '@/components/raizes/map/stay-story-modal';
import { STAY_IN_VIANA_SPOTS, type StayInVianaSpot } from '@/data/stay-in-viana';

export default function MapaScreen() {
  const params = useLocalSearchParams<{ spot?: string; historia?: string }>();

  // Ponto selecionado para exibir o tooltip no mapa
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(
    params.spot ?? 'spot-santa-luzia',
  );

  // Ponto aberto no modal da história completa
  const [storySpot, setStorySpot] = useState<StayInVianaSpot | null>(
    params.historia
      ? STAY_IN_VIANA_SPOTS.find((s) => s.id === params.historia) ?? null
      : null,
  );

  return (
    <View style={styles.fullscreen}>
      {/* O mapa ocupa o ecrã todo sem mais nada a estorvar */}
      <FullscreenVianaMap
        selectedSpotId={selectedSpotId}
        onSelectSpot={(spot) => setSelectedSpotId(spot ? spot.id : null)}
        onOpenStory={(spot) => setStorySpot(spot)}
      />

      {/* Modal com a história completa de quem decidiu ficar em Viana */}
      <StayStoryModal
        spot={storySpot}
        visible={!!storySpot}
        onClose={() => setStorySpot(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F4EDE1',
    overflow: 'hidden',
  },
});
