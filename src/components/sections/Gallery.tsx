import type { SiteContent, Photo } from "../../content/types";
import { PhotoFrame, Placeholder } from "../ui/Elements";

export function Gallery({ content, family, closing = false, selection, moving = false }: {
  content: SiteContent["gallery"]; family: Photo | null; closing?: boolean; selection?: Photo[]; moving?: boolean;
}) {
  const photos = selection ?? (family ? [family, ...content.photos.slice(1)] : content.photos);
  return <section className={`gallery-section${closing ? " gallery-section--closing" : ""}${moving ? " gallery-section--moving" : ""}`}
    id={closing ? "mais-memorias" : "fotografias"} aria-label={closing ? "Mais memórias em fotografias" : "Fotografias dos ensaios"}>
    {photos.length && moving ? <div className="memory-lane">
      <div className="memory-track">
        {[0, 1].map(copy => <div className={`memory-group${closing ? "" : " gallery-grid"}`} key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {photos.map((photo, index) => <PhotoFrame key={photo.src} photo={photo} className={`memory-photo ${closing ? "closing-photo" : "gallery-photo"} gallery-photo-${index + 1}`} />)}
        </div>)}
      </div>
    </div> : photos.length ? <div className={`${closing ? "" : "gallery-grid "}compact-grid`}>
      {photos.map((photo, index) => <PhotoFrame key={photo.src} photo={photo} className={`${closing ? "closing-photo" : "gallery-photo"} gallery-photo-${index + 1}`} />)}
    </div> : !closing && <Placeholder>Portfólio institucional a receber</Placeholder>}
  </section>;
}
