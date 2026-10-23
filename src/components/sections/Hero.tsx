import type { CSSProperties } from "react";
import type { SiteContent } from "../../content/types";
import { shared } from "../../content/shared";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";
import { Portrait } from "../ui/Portrait";

export function Hero({ content }: { content: SiteContent }) {
  let letterIndex = 0;
  const scene = Boolean(content.photography);
  return <section className={`hero${scene ? " hero--scene" : ""}`} id="inicio" aria-labelledby="hero-title">
    <div className="hero-stage">
      <div className="hero-copy">
        <h1 id="hero-title" aria-label={content.title}>
          {content.title.split(" ").map((word) => <span className="hero-word" key={word} aria-hidden="true">
            {Array.from(word).map((letter) => <span className="hero-letter" key={letterIndex}
              style={{ "--letter-index": letterIndex++ } as CSSProperties}>{letter}</span>)}
          </span>)}
        </h1>
        <p className="hero-subtitle">{content.subtitle}</p>
      </div>
      {scene && content.hero ? <figure className="hero-image hero-portrait hero-scene">
        <img src={content.hero.src} alt={content.hero.alt} loading="eager" fetchPriority="high" decoding="async" width="1200" height="1800" />
      </figure> : <Portrait eager className="hero-image hero-portrait" />}
      <div className="hero-actions"><WhatsAppTrigger intent="Agendar um ensaio">Agendar um ensaio</WhatsAppTrigger></div>
      <p className="hero-intro">{content.intro}</p>
      <a className="hero-brand brand" href="#inicio" aria-label="Alanna Rodrigues — início">
        <img src={shared.logo} width="560" height="208" alt="Alanna Rodrigues Fotografia Pet" />
      </a>
    </div>
  </section>;
}
