/**
 * Perguntas do onboarding — personalizável.
 * Cada passo é uma pergunta. `multi: true` permite escolher várias opções.
 * As respostas ficam guardadas em src/store/preferences.ts com a `key`.
 */
export type OnboardingOption = { id: string; label: string; emoji?: string };

export type OnboardingStep = {
  key: 'perfil' | 'tempo' | 'hobbies' | 'barreiras' | 'interesses';
  title: string;
  subtitle: string;
  multi: boolean;
  options: OnboardingOption[];
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    key: 'perfil',
    title: 'Quem és tu?',
    subtitle: 'Ajuda-nos a perceber o teu momento.',
    multi: false,
    options: [
      { id: 'estudante', label: 'Estudante', emoji: '🎓' },
      { id: 'trabalhador', label: 'Trabalhador(a)', emoji: '💼' },
      { id: 'recem-chegado', label: 'Recém-chegado(a)', emoji: '🧳' },
      { id: 'vianense', label: 'Vianense de gema', emoji: '❤️' },
      { id: 'empreendedor', label: 'Empreendedor(a)', emoji: '🚀' },
      { id: 'reformado', label: 'Reformado(a)', emoji: '🌿' },
      { id: 'visitante', label: 'De visita', emoji: '📸' },
    ],
  },
  {
    key: 'tempo',
    title: 'Há quanto tempo vives em Viana?',
    subtitle: 'Assim sugerimos o que faz mais sentido para ti.',
    multi: false,
    options: [
      { id: 'ainda-nao', label: 'Ainda não vivo cá' },
      { id: 'menos-1', label: 'Menos de 1 ano' },
      { id: '1-2', label: '1 a 2 anos' },
      { id: '3-5', label: '3 a 5 anos' },
      { id: 'mais-5', label: 'Mais de 5 anos' },
      { id: 'sempre', label: 'Desde sempre' },
    ],
  },
  {
    key: 'hobbies',
    title: 'O que gostas de fazer?',
    subtitle: 'Escolhe quantos quiseres.',
    multi: true,
    options: [
      { id: 'folclore', label: 'Folclore & tradições', emoji: '💃' },
      { id: 'surf', label: 'Surf & mar', emoji: '🏄' },
      { id: 'gastronomia', label: 'Gastronomia', emoji: '🍲' },
      { id: 'musica', label: 'Música', emoji: '🎶' },
      { id: 'natureza', label: 'Caminhadas', emoji: '🥾' },
      { id: 'fotografia', label: 'Fotografia', emoji: '📷' },
      { id: 'artesanato', label: 'Arte & artesanato', emoji: '🧵' },
      { id: 'voluntariado', label: 'Voluntariado', emoji: '🤝' },
      { id: 'festas', label: 'Festas & romarias', emoji: '🎉' },
      { id: 'desporto', label: 'Desporto', emoji: '⚽' },
      { id: 'leitura', label: 'Leitura', emoji: '📚' },
      { id: 'tecnologia', label: 'Tecnologia', emoji: '💻' },
    ],
  },
  {
    key: 'barreiras',
    title: 'O que sentes que é mais difícil em Viana?',
    subtitle: 'Sê sincero — é para te ajudarmos.',
    multi: true,
    options: [
      { id: 'amigos', label: 'Fazer amigos' },
      { id: 'casa', label: 'Encontrar casa' },
      { id: 'lingua', label: 'Língua' },
      { id: 'transportes', label: 'Transportes' },
      { id: 'burocracia', label: 'Burocracia' },
      { id: 'informacao', label: 'Saber o que acontece' },
      { id: 'emprego', label: 'Emprego' },
      { id: 'integracao', label: 'Integração cultural' },
      { id: 'custo', label: 'Custo de vida' },
      { id: 'nenhuma', label: 'Nenhuma, estou bem!' },
    ],
  },
  {
    key: 'interesses',
    title: 'O que queres ver primeiro?',
    subtitle: 'Vamos organizar o teu feed com base nisto.',
    multi: true,
    options: [
      { id: 'eventos', label: 'Eventos', emoji: '📅' },
      { id: 'pessoas', label: 'Pessoas', emoji: '👋' },
      { id: 'servicos', label: 'Serviços', emoji: '🏪' },
      { id: 'locais', label: 'Locais', emoji: '📍' },
      { id: 'grupos', label: 'Grupos', emoji: '👥' },
    ],
  },
];
