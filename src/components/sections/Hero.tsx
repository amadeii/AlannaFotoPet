import type { CSSProperties } from "react";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";
import type { SiteContent } from "../../content/types";
import { shared } from "../../content/shared";
import { Botanical, Eyebrow, PhotoFrame, Placeholder } from "../ui/Elements";
export function Hero({ content }: { content: SiteContent }) {
  const words = content.title.split(" ");
  return (
    <section
      className="hero container"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <a
        className="hero-brand brand"
        href="#inicio"
        aria-label="Alanna Rodrigues — início"
      >
        <img
          src={shared.logo}
          alt="Alanna Rodrigues Fotografia Pet"
          width="220"
          height="73"
        />
      </a>
      <div className="hero-copy">
        <Eyebrow>
          <span className="tiny-star" aria-hidden="true">
            ✳
          </span>{" "}
          {content.eyebrow}
        </Eyebrow>
        <h1 id="hero-title" aria-label={content.title}>
          {words.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className={`hero-word${wordIndex === 1 ? " italic" : ""}`}
              aria-hidden="true"
            >
              {Array.from(word).map((letter, letterIndex) => (
                <span
                  className="hero-letter"
                  key={letterIndex}
                  style={
                    {
                      "--letter-index":
                        words.slice(0, wordIndex).join("").length + letterIndex,
                    } as CSSProperties
                  }
                >
                  {letter}
                </span>
              ))}{" "}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle">{content.subtitle}</p>
        <p className="hero-intro">{content.intro}</p>
        <div className="hero-actions">
          <WhatsAppTrigger intent="Agendar um ensaio">
            Agendar um ensaio
          </WhatsAppTrigger>
          <a className="text-link" href="#experiencia">
            Conhecer a experiência <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-note">
          <span className="note-line" />
          Fotografias que viram parte da sua história.
        </div>
      </div>
      <div className="hero-visual">
        {content.hero ? (
          <PhotoFrame photo={content.hero} eager className="hero-image" />
        ) : (
          <Placeholder>Fotografia institucional a receber</Placeholder>
        )}
        <Botanical />
        <span className="photo-edition">{content.edition}</span>
      </div>
    </section>
  );
}
