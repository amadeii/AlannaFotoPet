import { shared } from "../../content/shared";
import { Botanical, Eyebrow, MotionTitle, Placeholder } from "../ui/Elements";
export function About() {
  return (
    <section className="section about container reveal" id="sobre">
      <div className="about-copy">
        <Eyebrow>03 / Conheça a Alanna</Eyebrow>
        <MotionTitle text={shared.about.title} />
        <p className="about-name">
          {shared.name}
          <span>{shared.specialty}</span>
        </p>
        {shared.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="about-image">
        {shared.about.portrait ? (
          <img
            className="about-portrait"
            loading="lazy"
            decoding="async"
            width="1200"
            height="1804"
            src={shared.about.portrait}
            style={{
              maskImage: `url(${shared.about.portraitMask})`,
              WebkitMaskImage: `url(${shared.about.portraitMask})`,
            }}
            alt="Alanna Rodrigues com seu pet no colo e uma câmera nas mãos, diante de um fundo neutro"
          />
        ) : (
          <Placeholder>
            Retrato da Alanna
            <br />
            em breve por aqui
          </Placeholder>
        )}
        <Botanical />
      </div>
    </section>
  );
}
