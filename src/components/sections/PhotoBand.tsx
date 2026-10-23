import type { Photo } from "../../content/types";
import { Portrait } from "../ui/Portrait";
import { MemoryLane } from "./EmotionalHighlight";
export function PhotoBand({ photos, name, moving = false }: { photos: (Photo | null | undefined)[]; name: string; moving?: boolean }) {
  const available = photos.filter((photo): photo is Photo => Boolean(photo));
  if (!available.length) return null;
  if (moving) return <div className={`photo-band photo-band--${name} photo-band--moving`} role="img" aria-label={available.map(photo => photo.alt).join(". ")}>
    <MemoryLane photos={available} side="left" />
  </div>;
  return <div className={`photo-band photo-band--${name}`} aria-label="Detalhes do ensaio em fotografias">
    {available.map((photo) => <img key={photo.src} src={photo.src} alt={photo.alt} style={{objectPosition: photo.position}} loading="lazy" decoding="async" />)}
  </div>;
}
export function ClosingPortrait({ photo }: { photo?: Photo }) { return <div className="closing-portrait">
  {photo ? <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" style={{objectPosition: photo.position}} /> : <Portrait />}
</div>; }
