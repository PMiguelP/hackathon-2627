import { Redirect } from 'expo-router';

/** Ponto de entrada: começa pela página de login */
export default function Index() {
  return <Redirect href="/login" />;
}
