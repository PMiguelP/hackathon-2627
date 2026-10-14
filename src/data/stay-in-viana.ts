import type { ImageSourcePropType } from 'react-native';

import { IMAGES } from '@/data/images';

export type StayInVianaSpot = {
  id: string;
  name: string;
  hook: string;
  subtitle: string;
  personName: string;
  personAge: number;
  personOrigin: string;
  personRole: string;
  quote: string;
  fullStory: string[];
  keyReasons: { title: string; desc: string }[];
  image: ImageSourcePropType;
  personImage?: ImageSourcePropType;
  x: number;
  y: number;
  tags: string[];
};

export const STAY_IN_VIANA_SPOTS: StayInVianaSpot[] = [
  {
    id: 'spot-santa-luzia',
    name: 'Santuário & Miradouro de Santa Luzia',
    hook: 'Isto faz querer ficar em Viana',
    subtitle: 'Onde o monte abraça o mar e o rio',
    personName: 'Mariana Silva',
    personAge: 24,
    personOrigin: 'Vinda de Coimbra',
    personRole: 'Investigadora & Fotógrafa',
    quote:
      '«Vim apenas para fazer o mestrado no IPVC e achava que regressaria a Coimbra. Mas bastou um pôr do sol aqui em cima para perceber que não queria mais nenhuma cidade.»',
    fullStory: [
      'A Mariana chegou a Viana do Castelo em 2022 vinda de Coimbra. Estava habituada ao ritmo acelerado e ao stress típico das grandes cidades universitárias.',
      'Nos primeiros meses, o hábito de subir ao escadório de Santa Luzia ao final do dia transformou-se no seu refúgio de paz. A vista panorâmica que une o oceano Atlântico, as margens recortadas do rio Lima e o manto verde do Minho provocou um clique.',
      'Hoje, a Mariana terminou os estudos e escolheu estabelecer a sua vida aqui. Trabalha remotamente para projetos internacionais e diz que a qualidade de vida, a segurança a qualquer hora do dia e o contacto diário com a natureza não têm comparação.',
    ],
    keyReasons: [
      {
        title: 'Paz de espírito inigualável',
        desc: 'A poucos minutos do centro urbano, existe um refúgio natural com uma das vistas mais belas do mundo.',
      },
      {
        title: 'Qualidade de vida real',
        desc: 'Menos horas no trânsito, ar puro e uma escala humana que permite desacelerar.',
      },
      {
        title: 'Inspiração diária',
        desc: 'A luz única do Minho e a harmonia entre o verde da serra e o azul do mar.',
      },
    ],
    image: IMAGES.santaLuzia,
    personImage: IMAGES.pessoaInes,
    x: 0.575,
    y: 0.325,
    tags: ['Natureza', 'Pôr do Sol', 'Serenidade', 'IPVC'],
  },
  {
    id: 'spot-cabedelo',
    name: 'Praia do Cabedelo',
    hook: 'Isto faz querer ficar em Viana',
    subtitle: 'Surf matinal antes de começar o trabalho',
    personName: 'Tomás Alvim',
    personAge: 28,
    personOrigin: 'Vindo de Lisboa',
    personRole: 'Product Designer Remoto',
    quote:
      '«Em Lisboa demorava hora e meia no trânsito para chegar ao mar ao fim de semana. Aqui vivo a 5 minutos da areia e surfo antes da primeira reunião da manhã.»',
    fullStory: [
      'O Tomás trocou a correria da capital por Viana do Castelo em 2023. Trabalhando em regime 100% remoto, procurava um sítio onde o desporto e o mar fizessem parte da rotina diária e não apenas de escapadinhas de fim de semana.',
      'O areal selvagem do Cabedelo, as dunas protegidas e as condições mundiais de surf e kitesurf foram a resposta ideal. Conheceu uma comunidade jovem de nómadas e locais que partilham a mesma paixão pelo mar.',
      'Diz que a poupança nos custos de habitação e a ausência total de trânsito lhe devolveram quase 3 horas livres por dia.',
    ],
    keyReasons: [
      {
        title: 'Mar à porta de casa',
        desc: 'Condições de surf de classe mundial a poucos minutos a pé de habitações acessíveis.',
      },
      {
        title: 'Comunidade ativa & desportiva',
        desc: 'Clubes de surf, vela, remo e ciclismo com malta jovem e acolhedora.',
      },
      {
        title: 'Equilíbrio trabalho-vida',
        desc: 'A oportunidade de trabalhar para qualquer parte do mundo vivendo no paraíso atlântico.',
      },
    ],
    image: IMAGES.cabedelo,
    personImage: IMAGES.pessoaLucas,
    x: 0.38,
    y: 0.58,
    tags: ['Surf', 'Oceano', 'Teletrabalho', 'Desporto'],
  },
  {
    id: 'spot-praca',
    name: 'Praça da República & Centro Histórico',
    hook: 'Isto faz querer ficar em Viana',
    subtitle: 'Viver tudo a pé e com calor humano',
    personName: 'Carla Pires',
    personAge: 31,
    personOrigin: 'Vinda de Paris (França)',
    personRole: 'Empreendedora Local',
    quote:
      '«Os meus pais eram emigrantes e eu cresci nos subúrbios de Paris. Quando visitei Viana pela primeira vez, senti que pertencia aqui: toda a gente se cumprimenta e ajuda.»',
    fullStory: [
      'Filha de minhotos, a Carla viveu em França até aos 29 anos. Quando decidiu criar o seu próprio projeto de artesanato contemporâneo e cerâmica, procurou uma cidade com alma cultural viva.',
      'No centro histórico de Viana do Castelo, encontrou ruas em calçada onde se caminha com segurança total, comércio tradicional vibrante e um espírito de vizinhança raro.',
      'Hoje não precisa de carro para nada no dia a dia: vai ao mercado municipal buscar peixe fresco, bebe o café na Praça e conhece cada comerciante pelo nome.',
    ],
    keyReasons: [
      {
        title: 'Segurança e vida a pé',
        desc: 'Uma cidade onde as crianças brincam na praça e tudo se resolve a menos de 10 minutos a pé.',
      },
      {
        title: 'Espírito de vizinhança autêntico',
        desc: 'Sentir que se faz parte de uma comunidade unida, onde ninguém é invisível.',
      },
      {
        title: 'Comércio e produtos frescos',
        desc: 'Mercado com peixe da doca, frutas do vale e pastelarias históricas.',
      },
    ],
    image: IMAGES.praca,
    personImage: IMAGES.pessoaSofia,
    x: 0.50,
    y: 0.435,
    tags: ['Centro Histórico', 'Comunidade', 'Segurança', 'Cultura'],
  },
  {
    id: 'spot-ponte-eiffel',
    name: 'Ponte Eiffel & Margem do Lima',
    hook: 'Isto faz querer ficar em Viana',
    subtitle: 'Onde o rio encontra a história de ferro',
    personName: 'Mateus Fontes',
    personAge: 22,
    personOrigin: 'Vindo de São Paulo (Brasil)',
    personRole: 'Estudante de Engenharia IPVC',
    quote:
      '«Vim de uma metrópole de 12 milhões de pessoas. Em Viana aprendi o que é o silêncio e a paz. Caminhar sobre o Lima ao entardecer faz-me ter a certeza de que tomei a decisão certa.»',
    fullStory: [
      'O Mateus atravessou o Atlântico para ingressar na Escola Superior de Tecnologia e Gestão do IPVC. O contraste com o tráfego caótico e o ruído da sua cidade natal foi imediato.',
      'Ficou impressionado com a facilidade com que foi integrado pelos colegas de curso e pelos professores. A Ponte Eiffel, que liga Darque ao centro da cidade, tornou-se o seu trajeto favorito de bicicleta.',
      'Já planeia fixar residência em Viana após a licenciatura, atraído pelas empresas de tecnologia e energias renováveis instaladas na região.',
    ],
    keyReasons: [
      {
        title: 'Ensino de proximidade',
        desc: 'O IPVC oferece um ensino universitário prático com forte ligação às empresas locais.',
      },
      {
        title: 'Mobilidade suave',
        desc: 'Ciclovias ao longo do rio Lima e caminhos pedonais sem poluição sonora.',
      },
      {
        title: 'Oportunidades em crescimento',
        desc: 'Pólo industrial moderno no porto de mar e setor das energias limpas.',
      },
    ],
    image: IMAGES.ponteEiffel,
    personImage: IMAGES.pessoaAmir,
    x: 0.60,
    y: 0.495,
    tags: ['Rio Lima', 'IPVC', 'Ciclovia', 'Futuro'],
  },
  {
    id: 'spot-santa-marta',
    name: 'Santa Marta & Romarias Tradicionais',
    hook: 'Isto faz querer ficar em Viana',
    subtitle: 'O coração de filigrana e as raízes que não se esquecem',
    personName: 'D. Rosa & Tiago',
    personAge: 65,
    personOrigin: 'Vianenses de Gema',
    personRole: 'Bordadeira Tradicional & Neto',
    quote:
      '«Quem bebe da água do Lima já não quer outra terra. Viana acolhe quem vem por bem, ensina os nossos cantares e partilha o que tem de melhor à mesa.»',
    fullStory: [
      'A D. Rosa borda lenços de namorados e trajes à vianesa há mais de cinquenta anos. Nos últimos anos, viu crescer o número de estudantes e famílias de fora que chegam a Viana encantados pelas tradições.',
      'O seu neto Tiago, de 20 anos, estuda na cidade e ajuda a dinamizar os grupos de folclore e os ensaios de bombos e concertinas com os novos residentes.',
      'Para eles, o segredo de Viana é o calor com que recebe quem vem viver para cá, integrando toda a gente nas festas da Romaria d’Agonia e no convívio comunitário.',
    ],
    keyReasons: [
      {
        title: 'Orgulho nas tradições',
        desc: 'Uma das culturas populares mais ricas e bem preservadas de Portugal.',
      },
      {
        title: 'Acolhimento minhoto',
        desc: 'A hospitalidade genuína de quem abre as portas de casa e oferece um copo de vinho verde.',
      },
      {
        title: 'Festas que unem gerações',
        desc: 'A Romaria d’Agonia, os tapetes de flores e as noites de concertina partilhadas por todos.',
      },
    ],
    image: IMAGES.traje,
    personImage: IMAGES.pessoaJoao,
    x: 0.80,
    y: 0.40,
    tags: ['Tradição', 'Romaria', 'Filigrana', 'Acolhimento'],
  },
];
