import { useSyncExternalStore } from 'react';

import type { OnboardingStep } from '@/config/onboarding';

/**
 * Preferências do utilizador (em memória — sem backend).
 * Preenchidas no onboarding, usadas no Feed (ordem das categorias) e no Perfil.
 */
export type Preferences = Record<OnboardingStep['key'], string[]> & { name: string };

let state: Preferences = {
  name: 'Maria Sousa',
  perfil: [],
  tempo: [],
  hobbies: [],
  barreiras: [],
  interesses: [],
};

const listeners = new Set<() => void>();

export function setPreferences(patch: Partial<Preferences>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function usePreferences() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => state,
  );
}
