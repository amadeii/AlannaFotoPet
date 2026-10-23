import logo from "../assets/brand/alanna-logo.png";
import portrait from "../assets/brand/alanna-portrait.webp";
import type { Testimonial } from "./types";
export const shared = {
  name: "Alanna Rodrigues",
  specialty: "Fotografia Pet",
  location: "Bauru/SP",
  logo,
  about: {
    eyebrow: "O olhar por trás da lente",
    title: "Por trás de cada memória",
    paragraphs: [
      "Antes de ser fotógrafa, também sou mãe de pets e sei o quanto esse amor merece ser guardado.",
      "Desde 2018, fotografo famílias que, assim como a minha, consideram seus pets parte da família.",
      "Meu propósito é registrar o jeitinho do seu pet e a conexão de vocês, para que, lá na frente, cada foto te faça lembrar de como é bom viver esse amor.",
    ],
    portrait: portrait as string | null,
  },
  testimonials: {
    title: "Histórias que ficam no coração",
    intro: "Cada encontro é único. E algumas palavras mostram o quanto essas memórias significam.",
    // Adicionar somente avaliações reais recebidas e aprovadas pela cliente.
    items: [{
      id: "ana-carolina-valverde",
      name: "Ana Carolina Valverde",
      pet: "Filó",
      quote: "Eu não tenho nem o que falar, né? Ficaram lindíssimas, perfeitas!\n\nAmei cada detalhe, cada foto vou guardar com tanto carinho.\n\nDa Filó, ainda, fiquei impressionada! Ela é muito desconfiada com todo mundo e ficou super à vontade com você desde a primeira vez.\n\nAmei demais! Obrigada por esse trabalho maravilhoso.",
    }] as Testimonial[],
  },
  developmentCredit: null as { label: string; url: string } | null,
  navigation: [
    { label: "Experiência", id: "experiencia" },
    { label: "Cenário", id: "cenario" },
    { label: "Sobre", id: "sobre" },
    { label: "FAQ", id: "faq" },
    { label: "Contato", id: "contato" },
  ],
};
