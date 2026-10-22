import type { SiteContent } from "../../content/types";
import { Eyebrow } from "../ui/Elements";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";
// O pré-atendimento é compartilhado por todos os CTAs de WhatsApp.
export function ContactInterest({ status }: { status: string }) {
  return (
    <div className="contact-interest">
      <div className="contact-actions">
        <WhatsAppTrigger intent="Conversar sobre um ensaio">
          Conversar pelo WhatsApp
        </WhatsAppTrigger>
      </div>
      <p>{status}</p>
    </div>
  );
}
export function Contact({ content }: { content: SiteContent["contact"] }) {
  return (
    <section className="contact-section reveal" id="contato">
      <div className="container contact-inner">
        <Eyebrow>O próximo capítulo é com vocês</Eyebrow>
        <h2>{content.title}</h2>
        <p>{content.text}</p>
        <ContactInterest status={content.status} />
        <span className="contact-location">
          ALANNA RODRIGUES · FOTOGRAFIA PET · BAURU, SP
        </span>
      </div>
    </section>
  );
}
