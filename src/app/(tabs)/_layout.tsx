import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet } from 'react-native';

import { RaizesNavbar } from '@/components/raizes/navbar/raizes-navbar';
import { NAV_TABS } from '@/config/navigation';

/**
 * Layout dos separadores. As rotas são registadas a partir de
 * src/config/navigation.ts (TabList escondida) e a barra visível
 * é o componente isolado <RaizesNavbar />.
 */
export default function TabLayout() {
  return (
    <Tabs style={styles.flex}>
      <TabSlot style={styles.flex} />
      <TabList style={styles.hidden}>
        {NAV_TABS.map((t) => (
          <TabTrigger key={t.name} name={t.name} href={t.href} />
        ))}
      </TabList>
      <RaizesNavbar />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  hidden: { display: 'none' },
});
