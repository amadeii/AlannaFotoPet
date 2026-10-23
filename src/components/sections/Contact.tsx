import type { Photo, SiteContent } from "../../content/types";
import { Eyebrow } from "../ui/Elements";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";
import { PhotoFrame } from "../ui/Elements";
import { ScenarioVideo } from "./ScenarioVideo";
// O pré-atendimento é compartilhado por todos os CTAs de WhatsApp.
export function ContactInterest({ status }: { status: string }) {
  return (
    <div className="contact-interest">
      <div className="contact-actions">
        <WhatsAppTrigger intent="Conversar sobre um ensaio">
          Agendar um ensaio
        </WhatsAppTrigger>
      </div>
      <p>{status}</p>
    </div>
  );
}
export function Contact({ content, photo, seasonal, video }: { content: SiteContent["contact"]; photo: Photo | null; seasonal: boolean; video?: SiteContent["scenarioVideo"] }) {
  return (
    <section className={`contact-section reveal${seasonal && video ? " contact-section--video" : ""}`} id="contato">
      <div className="contact-layout container">
      {seasonal && video ? <ScenarioVideo content={video} /> : photo && <PhotoFrame photo={photo} className="contact-photo" />}
      <div className="contact-inner">
        <Eyebrow>{seasonal ? "Um Natal para guardar" : "Fotografia pet"}</Eyebrow>
        <h2>{content.title}</h2>
        <p>{content.text}</p>
        <ContactInterest status={content.status} />
        <span className="contact-location">
          ALANNA RODRIGUES · FOTOGRAFIA PET · BAURU, SP
        </span>
      </div>
      </div>
    </section>
  );
}
