import logo from "../assets/brand/alanna-logo.png";
import portrait from "../assets/brand/alanna-portrait.webp";
import anaPhoto from "../assets/christmas/testimonial-family-dachshunds.jpeg";
import nataliaPhoto from "../assets/christmas/testimonial-white-red-bow.jpeg";
import lauraPhoto from "../assets/christmas/testimonial-green-dress.jpeg";
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
    title: "O que dizem as famílias que já passaram por aqui",
    // Adicionar somente avaliações reais recebidas e aprovadas pela cliente.
    items: [{
      id: "laura-meyer",
      name: "Laura Meyer",
      photo: { src: lauraPhoto, alt: "Laura de vestido verde com dois dachshunds caramelo junto ao sofá no cenário natalino.", objectPosition: "50% 65%" },
      quote: "Alanna, obrigada mais uma vez pela experiência incrível! Seu carinho, paciência e dedicação com as meninas e nossa família fazem toda a diferença, e isso se reflete nas fotos perfeitas! Você registrou com tanta leveza e amor momentos únicos. Obrigada por eternizar nossas memórias! Você merece todo sucesso do mundo! ❤️",
    }, {
      id: "natalia-fugiwara",
      name: "Natália Fugiwara",
      photo: { src: nataliaPhoto, alt: "Natália de roupa branca segurando um cachorrinho branco e preto com laço vermelho.", objectPosition: "50% 55%" },
      quote: 'Eu tinha receio de tirar fotos e parecer artificial. E também imaginei que seria difícil tirar foto da Dercy, pois ela é muito agitada e não para muito numa "pose". Mas a sessão foi rápida, Dercy saiu linda e as fotos ficaram muito naturais. Tanto amamos, que já repetimos a dose. Tudo incrível. Muito obrigada!',
    }, {
      id: "ana-carolina-valverde",
      name: "Ana Carolina Valverde",
      photo: { src: anaPhoto, alt: "Ana Carolina e seu companheiro no cenário de Natal com vários dachshunds, um deles de barriga para cima em primeiro plano.", objectPosition: "50% 75%" },
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
