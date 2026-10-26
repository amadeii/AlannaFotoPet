import { useId, useState } from "react";
import type { Photo, SiteContent } from "../../content/types";
import { PhotoFrame } from "../ui/Elements";
import { Icon } from "../ui/Icon";
import { Preparation } from "./Preparation";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";
function FAQItem({ question, answer, preparation }: SiteContent["faq"][number] & { preparation?: SiteContent["preparation"] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`faq-item${open ? " is-open" : ""}`}>
      <h3>
        <button
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          id={`${id}-question`}
          onClick={() => setOpen(!open)}
        >
          <Icon name="plus" />
          {question}
        </button>
      </h3>
      <div
        className="faq-answer"
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        inert={!open}
      >
        <div>
          <p>{answer}</p>
          {preparation && <Preparation content={preparation} compact />}
        </div>
      </div>
    </div>
  );
}
export function FAQ({ items, photo, companion, preparation, booking = false }: { items: SiteContent["faq"]; photo?: Photo; companion?: Photo; preparation: SiteContent["preparation"]; booking?: boolean }) {
  if (!items.length) return null;
  return (
    <section className={`faq-section${companion ? " faq-section--paired" : ""}`} id="faq" aria-labelledby="faq-title">
      {companion ? <div className="faq-photographs">
        {photo && <PhotoFrame photo={photo} className="faq-photo" />}
        <PhotoFrame photo={companion} className="faq-photo faq-photo--companion" />
      </div> : photo && <PhotoFrame photo={photo} className="faq-photo" />}
      <div className="faq-list">
        <h2 id="faq-title">Perguntas frequentes</h2>
        {items.map((item) => (
          <FAQItem key={item.question} {...item} preparation={item.includePreparation ? preparation : undefined} />
        ))}
        {preparation && !items.some((item) => item.includePreparation) && <details className="preparation-disclosure disclosure">
          <summary>Como se preparar para o ensaio<Icon name="plus" /></summary>
          <Preparation content={preparation} />
        </details>}
        {booking && <div className="faq-booking"><WhatsAppTrigger intent="Agendar um ensaio após consultar as perguntas frequentes">Quero agendar meu ensaio</WhatsAppTrigger></div>}
      </div>
    </section>
  );
}
