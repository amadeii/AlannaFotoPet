import { shared } from "../../content/shared";
import portraitMask from "../../assets/brand/alanna-portrait-mask.png";
import { Placeholder } from "./Elements";

// Alpha affects only the background; the RGB pixels remain the original photograph.
export function Portrait({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  if (!shared.about.portrait) return <Placeholder>Retrato da Alanna</Placeholder>;
  return <img className={`portrait-cutout ${className}`} src={shared.about.portrait}
    width="1200" height="1804" loading={eager ? "eager" : "lazy"}
    fetchPriority={eager ? "high" : "auto"} decoding="async"
    style={{ maskImage: `url(${portraitMask})`, WebkitMaskImage: `url(${portraitMask})` }}
    alt="Alanna Rodrigues com seu pet no colo e uma câmera nas mãos" />;
}
