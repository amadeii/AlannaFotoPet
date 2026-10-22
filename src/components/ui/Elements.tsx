import type { CSSProperties, ReactNode } from "react";
import type { Photo } from "../../content/types";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
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
      <img
        src={photo.src}
        alt={photo.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}
export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 180 220"
      fill="none"
      aria-hidden="true"
    >
      <path d="M20 207C75 160 110 98 145 12M56 171L29 126M73 145L125 135M88 116L67 64M108 80L151 69M126 44L112 14" />
      <path d="M30 126C4 130 11 157 56 171C50 146 47 132 30 126ZM125 135C124 110 90 123 73 145C102 153 123 151 125 135ZM67 64C42 71 57 104 88 116C86 85 83 64 67 64ZM151 69C154 46 121 53 108 80C137 88 148 85 151 69ZM112 14C92 22 109 41 126 44C131 25 127 9 112 14Z" />
      <circle cx="137" cy="113" r="6" />
      <circle cx="149" cy="105" r="5" />
      <circle cx="145" cy="121" r="5" />
    </svg>
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
