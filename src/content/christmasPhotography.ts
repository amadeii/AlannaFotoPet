import type { Photo } from "./types";
import heroDesktop from "../assets/christmas/curated/hero-desktop-carol-21.webp";
import experience from "../assets/christmas/curated/experiencia-sofi-14.webp";
import contact from "../assets/christmas/curated/contato-carol-23.webp";
import galleryCarol04 from "../assets/christmas/curated/galeria-carol-04.webp";
import galleryCarol13 from "../assets/christmas/curated/galeria-carol-13.webp";
import galleryCarol18 from "../assets/christmas/curated/galeria-carol-18.webp";
import gallerySofi21 from "../assets/christmas/curated/galeria-sofi-21.webp";
import carouselCarol11 from "../assets/christmas/curated/carrossel-carol-11.webp";
import carouselCarol15 from "../assets/christmas/curated/carrossel-carol-15.webp";
import carouselCarol20 from "../assets/christmas/curated/carrossel-carol-20.webp";
import carouselSofi02 from "../assets/christmas/curated/carrossel-sofi-02.webp";
import carouselSofi10 from "../assets/christmas/curated/carrossel-sofi-10.webp";
import carouselSofi18 from "../assets/christmas/curated/carrossel-sofi-18.webp";
import carouselSofi24 from "../assets/christmas/curated/carrossel-sofi-24.webp";
import scenario from "../assets/christmas/scenario.webp";
import details from "../assets/christmas/details.webp";
import gifts from "../assets/christmas/gifts.webp";
import family from "../assets/christmas/family.webp";

const photo = (src: string, alt: string, position?: string): Photo => ({ src, alt, caption: "", position });

// Assign photographs to existing V1.8 slots; this file does not define layout.
export const christmasPhotography = {
  hero: photo(heroDesktop, "Família com seus dachshunds no cenário Memórias Natalinas", "50% 0%"),
  experience: photo(experience, "Tutora abraçando seu pet no cenário natalino", "50% 55%"),
  slots: {
    openingGallery: [
      photo(galleryCarol04, "Dois pets na poltrona junto à decoração natalina", "50% 60%"),
      photo(galleryCarol13, "Retrato de pet com luzes natalinas ao fundo"),
      photo("/images/dercy-natal-2026/dercy-natal-2026-16.webp", "Casal com seu pet branco e preto no cenário natalino", "50% 37%"),
      photo("/images/dercy-natal-2026/dercy-natal-2026-29.webp", "Patinha branca do pet apoiada na mão da tutora"),
    ],
    closingGallery: [
      photo(galleryCarol18, "Três pets reunidos diante da árvore de Natal", "50% 65%"),
      photo("/images/dercy-natal-2026/dercy-natal-2026-27.webp", "Tutor segurando seu pet branco e preto no cenário natalino"),
      photo(gifts, "Presentes em verde e creme com laços bordô"),
      photo("/images/dercy-natal-2026/dercy-natal-2026-15.webp", "Retrato do pet branco e preto com laço bordô", "50% 36%"),
    ],
    openingBand: [
      photo("/images/dercy-natal-2026/dercy-natal-2026-08.webp", "Tutora beijando seu pet branco e preto no cenário natalino"),
      photo(heroDesktop, "Família com seus pets no cenário Memórias Natalinas", "50% 65%"),
      photo(carouselSofi18, "Tutor fazendo carinho em seu pet"),
      photo("/images/dercy-natal-2026/dercy-natal-2026-09.webp", "Tutora sorrindo com seu pet branco e preto", "50% 30%"),
      photo(carouselSofi10, "Pet diante da árvore iluminada"),
      photo(carouselSofi24, "Pet no colo da tutora visto de costas"),
    ],
    bridgeBand: [
      photo(carouselSofi02, "Dois pets diante da árvore de Natal"),
      photo("/images/dercy-natal-2026/dercy-natal-2026-18.webp", "Retrato do casal com seu pet branco e preto na poltrona"),
      photo(gallerySofi21, "Patinhas do pet apoiadas nas mãos da tutora"),
      photo(carouselSofi24, "Pet no colo da tutora visto de costas"),
      photo("/images/dercy-natal-2026/dercy-natal-2026-22.webp", "Pet branco e preto diante da árvore de Natal", "50% 40%"),
      photo(carouselSofi18, "Tutor fazendo carinho em seu pet"),
    ],
    scenario: [
      photo(scenario, "Vista ampla do cenário com árvore de Natal, poltrona e lareira"),
      photo(family, "Família com seus pets em uma vista ampla do cenário natalino", "50% 45%"),
      photo(details, "Lareira decorada com velas e meias natalinas"),
      photo(gifts, "Detalhe dos presentes e laços bordô da decoração natalina"),
    ],
    faq: photo(carouselCarol15, "Retrato de pet diante das luzes natalinas"),
    contact: photo(contact, "Casal com seu pet diante da árvore de Natal", "50% 38%"),
    closing: photo("/images/dercy-natal-2026/dercy-natal-2026-20.webp", "Tutora interagindo com seu pet branco e preto junto à árvore"),
  },
  carousel: [
    photo(carouselCarol11, "Pet na poltrona diante das estrelas natalinas"),
    photo("/images/dercy-natal-2026/dercy-natal-2026-03.webp", "Casal interagindo com seu pet branco e preto no cenário natalino"),
    photo(carouselCarol20, "Dupla de pets na poltrona do cenário"),
    photo(carouselSofi10, "Pet diante da árvore iluminada"),
    photo("/images/dercy-natal-2026/dercy-natal-2026-14.webp", "Tutor fazendo carinho em seu pet branco e preto"),
    photo(carouselSofi24, "Pet no colo da tutora visto de costas"),
  ],
};
