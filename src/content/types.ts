export type SiteMode = "christmas2026" | "evergreen";
export interface Photo {
  src: string;
  alt: string;
  caption: string;
  mobileSrc?: string;
  position?: string;
  fit?: "cover" | "contain";
}
export interface SiteContent {
  whatsappMessage: string;
  emotionalHighlight: { text: string; photos: Photo[] } | null;
  ribbon: string;
  edition: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  hero: Photo | null;
  about?: { title: string; paragraphs: string[] };
  scenarioVideo?: { src: string; poster: string; title: string };
  photography?: {
    openingGallery: Photo[];
    closingGallery: Photo[];
    openingBand: Photo[];
    bridgeBand: Photo[];
    scenario: Photo[];
    contact: Photo;
    faq: Photo;
    closing: Photo;
  };
  experience: { title: string; paragraphs: string[]; photo: Photo | null };
  gallery: { title: string; intro: string; photos: Photo[] };
  preparation: {
    title: string;
    intro: string;
    tips: string[];
    colors: { name: string; token: string }[];
  } | null;
  faq: { question: string; answer: string; includePreparation?: boolean }[];
  contact: { title: string; text: string; status: string };
  seo: { title: string; description: string };
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  pet?: string;
  photo?: { src: string; alt: string; objectPosition: string };
}
