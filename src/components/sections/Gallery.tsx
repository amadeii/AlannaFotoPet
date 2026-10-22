import type { SiteContent } from "../../content/types";
import { Eyebrow, PhotoFrame, Placeholder } from "../ui/Elements";
export function Gallery({
  content,
  seasonal,
}: {
  content: SiteContent["gallery"];
  seasonal: boolean;
}) {
  return (
    <section className="section gallery-section reveal" id="cenario">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>02 / {seasonal ? "Nosso cenário" : "Portfólio"}</Eyebrow>
            <h2>{content.title}</h2>
          </div>
          <p>{content.intro}</p>
        </div>
        <div className="gallery-grid">
          {content.photos.length ? (
            content.photos.map((photo, index) => (
              <PhotoFrame
                key={photo.src}
                photo={photo}
                className={`gallery-photo gallery-photo-${index + 1}`}
              />
            ))
          ) : (
            <Placeholder>Portfólio institucional a receber</Placeholder>
          )}
        </div>
        <div className="gallery-footnote">
          <span>Um olhar para os detalhes.</span>
          <span>
            {seasonal
              ? "Jardim Samburá · Bauru, SP"
              : "Alanna Rodrigues · Fotografia Pet"}
          </span>
        </div>
      </div>
    </section>
  );
}
