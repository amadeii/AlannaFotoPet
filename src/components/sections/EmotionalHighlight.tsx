import type { Photo, SiteContent } from "../../content/types";

export function MemoryLane({
  photos,
  side,
}: {
  photos: Photo[];
  side: "left" | "right";
}) {
  return (
    <div className={`memory-lane memory-lane--${side}`} aria-hidden="true">
      <div className="memory-track">
        {[0, 1].map((copy) => (
          <div className="memory-group" key={copy}>
            {photos.map((photo, index) => (
              <img
                className="memory-photo"
                src={photo.src}
                alt=""
                width="400"
                height="600"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: photo.position }}
                key={`${photo.src}-${index}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmotionalHighlight({
  content,
}: {
  content: SiteContent["emotionalHighlight"];
}) {
  if (!content) return null;
  return <section className="emotional-highlight emotional-highlight--integrated" aria-labelledby="highlight-title">
    {content.photos.length > 0 && <MemoryLane photos={content.photos} side="left" />}
    <div className="highlight-copy"><h2 id="highlight-title">{content.text}</h2></div>
    {content.photos.length > 0 && <MemoryLane photos={[...content.photos].reverse()} side="right" />}
  </section>;
}
