import { shared } from "../../content/shared";
import { MotionTitle } from "../ui/Elements";
import { Portrait } from "../ui/Portrait";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";

export function About() {
  return <section className="about" id="sobre" aria-labelledby="about-title">
    <div className="about-layout container">
      <div className="about-copy">
        <p className="section-label">A fotógrafa</p>
        <div id="about-title"><MotionTitle text="Conheça a Alanna" /></div>
        <p className="about-name">{shared.name}</p>
        <div className="about-biography">{shared.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <WhatsAppTrigger intent="Conhecer a fotógrafa e agendar um ensaio">Agendar um ensaio</WhatsAppTrigger>
      </div>
      <Portrait className="about-portrait" />
    </div>
  </section>;
}
