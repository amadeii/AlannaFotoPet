import type { SiteContent } from "./types";
import scenario from "../assets/christmas/scenario.webp";
import candles from "../assets/christmas/candles.webp";
import gifts from "../assets/christmas/gifts.webp";
import details from "../assets/christmas/details.webp";
import { christmasPhotography } from "./christmasPhotography";

export const christmas2026: SiteContent = {
  whatsappMessage:
    "Olá, Alanna! Conheci seu site e gostaria de saber mais sobre os ensaios Memórias Natalinas 2026.",
  emotionalHighlight: {
    text: "Você merece viver isso!",
    photos: christmasPhotography.carousel,
  },
  ribbon: "Um Natal para guardar",
  edition: "Memórias Natalinas — edição 2026",
  eyebrow: "Especial de Natal 2026",
  title: "Memórias Natalinas",
  subtitle: "Um Natal para guardar • 2026",
  intro:
    "Os pequenos momentos de hoje.\nAs lembranças mais queridas de amanhã.",
  hero: christmasPhotography.hero,
  photography: christmasPhotography.slots,
  about: {
    title: "Muito prazer, eu sou a Alanna!",
    paragraphs: [
      "Antes de ser fotógrafa, também sou mãe de pets e sei o quanto esse amor merece ser guardado.",
      "Desde 2018, fotografo famílias que, assim como a minha, consideram seus pets parte da família.",
      "Meu propósito é registrar o jeitinho do seu pet e a conexão de vocês, para que, lá na frente, cada foto te faça lembrar de como é bom viver esse amor.",
    ],
  },
  scenarioVideo: {
    src: "/videos/memorias-natalinas-2026.mp4",
    poster: "/videos/memorias-natalinas-2026-poster.webp",
    title: "Um pouco do ensaio Memórias Natalinas",
  },
  experience: {
    title: "O tempo passa.\nO afeto fica.",
    paragraphs: [
      "Existem momentos que parecem simples enquanto acontecem. A árvore acesa na sala, os presentes no chão, a família reunida, o pet correndo pela casa…",
      "São justamente esses pequenos momentos que, com o passar dos anos, se transformam nas nossas memórias mais queridas.",
      "Em 2026, criamos um cenário inspirado nesse Natal: acolhedor, atemporal e cheio de afeto.",
    ],
    photo: christmasPhotography.experience,
  },
  gallery: {
    title: "Entre luzes, laços\ne boas lembranças.",
    intro:
      "Um cantinho de Natal para se sentir em casa. Cada detalhe faz parte dessa história.",
    photos: [
      {
        src: scenario,
        alt: "Vista completa do cenário com árvore de Natal e lareira",
        caption: "O cenário",
      },
      {
        src: candles,
        alt: "Velas iluminadas e pinhas na decoração natalina",
        caption: "A luz que acolhe",
      },
      {
        src: gifts,
        alt: "Presentes em verde e creme com laços bordô",
        caption: "Pequenos encantos",
      },
      {
        src: details,
        alt: "Lareira com meias natalinas, velas e quadros",
        caption: "Detalhes com afeto",
      },
    ],
  },
  preparation: {
    title: "Harmonia nos tons.\nLeveza nos momentos.",
    intro:
      "Pequenas escolhas deixam as fotos ainda mais bonitas — e todo mundo mais à vontade.",
    colors: [
      { name: "Off-white", token: "offwhite" },
      { name: "Bege", token: "beige" },
      { name: "Caramelo escuro", token: "caramel" },
      { name: "Verde oliva", token: "olive" },
      { name: "Bordô", token: "burgundy" },
    ],
    tips: [
      "Prefira peças lisas e cores da paleta, evitando estampas e tons que não combinem com o cenário.",
      "Escolha tecidos frescos para aproveitar a sessão com conforto, mesmo nos dias de calor.",
      "Para os pets, priorize acessórios: coleiras, bandanas, laços e gravatas, em vez de roupinhas.",
    ],
  },
  faq: [
    {
      question: "Quando acontecem os ensaios?",
      answer:
        "Os ensaios acontecem aos sábados, entre outubro e dezembro de 2026. As datas são liberadas conforme a disponibilidade da agenda.",
    },
    {
      question: "Onde os ensaios são realizados?",
      answer: "As sessões são realizadas no Jardim Samburá, em Bauru/SP.",
    },
    {
      question: "Quem pode participar?",
      answer:
        "Todos os membros do seu núcleo familiar: você, marido ou esposa, filhos humanos e pets. Avós também são bem-vindos, com aviso prévio.",
    },
    {
      question: "Como funciona o agendamento?",
      answer:
        "O agendamento é todo feito pelo WhatsApp. As reservas são realizadas mediante pagamento integral ou parcial (sinal).",
    },
    {
      question: "Qual look usar na sessão?",
      includePreparation: true,
      answer:
        "Pequenas escolhas deixam as fotos ainda mais bonitas — e todo mundo mais à vontade.",
    },
    {
      question: "Meu pet precisa usar roupinha?",
      answer:
        "A orientação é evitar roupinhas e priorizar acessórios, como coleira, bandana, laços e gravatas.",
    },
  ],
  contact: {
    title: "Vamos guardar\nesse Natal?",
    text: "Um encontro com quem você ama. Uma lembrança para levar por muitos Natais.",
    status: "",
  },
  seo: {
    title: "Memórias Natalinas 2026 | Alanna Rodrigues Fotografia Pet",
    description:
      "Ensaios de Natal com pets e família em Bauru/SP. Conheça o cenário Memórias Natalinas 2026 e as orientações para sua sessão.",
  },
};
