import type { SiteContent } from "../../content/types";
import { MotionTitle, PhotoFrame, Placeholder } from "../ui/Elements";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";
import { Experience } from "./Experience";

export function Scenario({ content, seasonal }: { content: SiteContent; seasonal: boolean }) {
  return <section className={`scenario${seasonal ? " scenario--story" : ""}`} id="cenario" aria-labelledby="scenario-title">
    <div className="scenario-layout container">
      <div className="scenario-copy">
        <p className="section-label">{seasonal ? "Bauru, SP" : "Fotografia pet em Bauru"}</p>
        <div id="scenario-title"><MotionTitle text={seasonal ? "Um Natal para\nse sentir em casa." : content.gallery.title} /></div>
        {seasonal ? <div className="scenario-description" id="experiencia">
          {content.experience.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div> : <p>{content.gallery.intro}</p>}
        <WhatsAppTrigger intent="Conhecer o cenário e agendar um ensaio">Agendar um ensaio</WhatsAppTrigger>
        {!seasonal && <Experience content={content.experience} />}
      </div>
      <div className="scenario-photos">
        {content.photography ? content.photography.scenario.map((photo, index) =>
          <PhotoFrame key={photo.src} photo={photo} className={`scenario-photo scenario-photo-${index + 1}`} />
        ) : <>
          {content.hero ? <PhotoFrame photo={content.hero} className="scenario-main" /> : <Placeholder>Fotografia institucional a receber</Placeholder>}
          {content.gallery.photos[3] && <PhotoFrame photo={content.gallery.photos[3]} className="scenario-detail" />}
        </>}
      </div>
    </div>
  </section>;
}
