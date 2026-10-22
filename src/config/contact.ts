// Canais oficiais. As mensagens pertencem ao conteúdo de cada tema.
export const contact = {
  whatsappNumber: "5514997754940",
  whatsappDisplay: "+55 14 99775-4940",
  instagram: "https://www.instagram.com/alannafotopet/",
  instagramHandle: "@alannafotopet",
};

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
