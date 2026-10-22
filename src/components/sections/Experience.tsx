import type { SiteContent } from "../../content/types";
import { Eyebrow, MotionTitle, PhotoFrame, Placeholder } from "../ui/Elements";
export function Experience({
  content,
}: {
  content: SiteContent["experience"];
}) {
  return (
    <section className="section experience container reveal" id="experiencia">
      <div className="experience-image">
        {content.photo ? (
          <PhotoFrame photo={content.photo} />
        ) : (
          <Placeholder>Fotografia da experiência a receber</Placeholder>
        )}
        <span className="image-stamp" aria-hidden="true">
          feito de
          <br />
          <i>afeto.</i>
        </span>
      </div>
      <div className="experience-copy">
        <Eyebrow>01 / A experiência</Eyebrow>
        <MotionTitle text={content.title} />
        {content.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <span className="signature">Alanna Rodrigues</span>
      </div>
    </section>
  );
}
