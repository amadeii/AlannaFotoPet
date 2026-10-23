import type { CSSProperties, ReactNode } from "react";
import type { Photo } from "../../content/types";
import { Icon } from "./Icon";

export function Arrow() {
  return <Icon name="arrow-up-right" />;
}
export function Button({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      className="button"
      href={href}
      target={href.startsWith("https://") ? "_blank" : undefined}
      rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
    >
      {children}
      <Arrow />
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function MotionTitle({ text }: { text: string }) {
  let letterIndex = 0;
  return (
    <h2 className="motion-title" aria-label={text}>
      <span aria-hidden="true">
        {text.split(/(\s+)/u).map((part, index) =>
          /\S/u.test(part) ? (
            <span className="motion-title-word" key={index}>
              {Array.from(part).map((letter, index) => (
                <span className="motion-letter" key={index}
                  style={{ "--letter-index": letterIndex++ } as CSSProperties}>
                  {letter}
                </span>
              ))}
            </span>
          ) : part,
        )}
      </span>
    </h2>
  );
}
export function PhotoFrame({
  photo,
  className = "",
  eager = false,
}: {
  photo: Photo;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure className={`photo-frame ${className}`}>
      <div className="photo-media">
        <img
          src={photo.src}
          alt={photo.alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          style={{ objectPosition: photo.position, objectFit: photo.fit }}
        />
      </div>
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="image-placeholder">
      <span aria-hidden="true">AR</span>
      <p>{children}</p>
    </div>
  );
}
