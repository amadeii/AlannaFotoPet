import type { SiteContent } from "../../content/types";

export function ScenarioVideo({ content }: { content: NonNullable<SiteContent["scenarioVideo"]> }) {
  return <div className="photo-frame contact-photo contact-video">
    <video controls playsInline preload="none" poster={content.poster} src={content.src} aria-label={content.title} width="720" height="1280">
      Seu navegador não reproduz este vídeo. <a href={content.src}>Abrir o vídeo do ensaio</a>.
    </video>
  </div>;
}
