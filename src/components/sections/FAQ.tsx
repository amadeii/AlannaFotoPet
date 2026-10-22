import { useId, useState } from "react";
import type { SiteContent } from "../../content/types";
import { Eyebrow } from "../ui/Elements";
function FAQItem({ question, answer }: SiteContent["faq"][number]) {
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
          {question}
          <span aria-hidden="true">+</span>
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
        </div>
      </div>
    </div>
  );
}
export function FAQ({ items }: { items: SiteContent["faq"] }) {
  if (!items.length) return null;
  return (
    <section className="section faq-section container reveal" id="faq">
      <div>
        <Eyebrow>05 / Perguntas frequentes</Eyebrow>
        <h2>
          Antes do
          <br />
          <i>nosso encontro.</i>
        </h2>
        <p>
          Os detalhes para você chegar
          <br />
          com tranquilidade.
        </p>
      </div>
      <div className="faq-list">
        {items.map((item) => (
          <FAQItem key={item.question} {...item} />
        ))}
      </div>
    </section>
  );
}
