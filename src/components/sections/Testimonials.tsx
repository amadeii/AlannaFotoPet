import { useEffect, useRef, useState } from "react";
import { shared } from "../../content/shared";
import type { Testimonial } from "../../content/types";

export function Testimonials({ items = shared.testimonials.items }: { items?: Testimonial[] }) {
  const { title } = shared.testimonials;
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [positions, setPositions] = useState<number[]>([]);
  const [activePosition, setActivePosition] = useState(0);
  const multiple = items.length > 1;
  const updateEdges = () => {
    const element = track.current;
    if (!element) return;
    const limit = Math.max(0, element.scrollWidth - element.clientWidth);
    const origin = element.firstElementChild?.getBoundingClientRect().left ?? 0;
    const stops: number[] = [];
    Array.from(element.children).forEach((card) => {
      const position = Math.min(limit, Math.max(0, card.getBoundingClientRect().left - origin));
      if (!stops.length || position - stops[stops.length - 1] > 2) stops.push(position);
    });
    setEdges((current) => {
      const start = element.scrollLeft <= 2;
      const end = element.scrollLeft >= limit - 2;
      return current.start === start && current.end === end ? current : { start, end };
    });
    setPositions((current) => current.length === stops.length && current.every((position, index) => Math.abs(position - stops[index]) < 1) ? current : stops);
    setActivePosition(stops.reduce((nearest, position, index) => Math.abs(position - element.scrollLeft) < Math.abs(stops[nearest] - element.scrollLeft) ? index : nearest, 0));
  };
  useEffect(() => {
    const element = track.current;
    if (!element || !multiple) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(element);
    return () => observer.disconnect();
  }, [multiple, items.length]);
  const move = (direction: number) => {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };
  if (!items.length) return null;
  return (
    <section
      className={`section testimonials container reveal${multiple ? " testimonials--carousel" : ""}`}
      id="depoimentos"
      aria-labelledby="testimonials-title"
    >
      <div className="section-heading testimonial-heading">
        <h2 id="testimonials-title">{title}</h2>
      </div>
      <div className="testimonial-grid" id="testimonial-track" ref={track} onScroll={multiple ? updateEdges : undefined}
        role={multiple ? "region" : undefined} aria-label={multiple ? "Depoimentos de clientes" : undefined}
        aria-roledescription={multiple ? "carrossel" : undefined} tabIndex={multiple ? 0 : undefined}
        onKeyDown={multiple ? (event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1);
          }
          if (event.key === "Home" || event.key === "End") {
            event.preventDefault(); event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: "smooth" });
          }
        } : undefined}>
        {items.map((item) => (
          <figure key={item.id} className={`testimonial-card${item.photo ? " testimonial-card--photo" : ""}`}>
            {item.photo && <img className="testimonial-photo" src={item.photo.src} alt={item.photo.alt}
              width="854" height="1280" loading="lazy" decoding="async" style={{ objectPosition: item.photo.objectPosition }} />}
            <figcaption className="testimonial-copy">
              <span className="testimonial-quote" aria-hidden="true">“</span>
              <blockquote>
                {item.quote.split(/\n\s*\n/u).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <span className="testimonial-quote testimonial-quote--closing" aria-hidden="true">”</span>
              </blockquote>
              <div className="testimonial-signature">
                {item.name}
                {item.pet && <span>Pet: {item.pet}</span>}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {multiple && <div className="testimonial-controls" role="group" aria-label="Navegar pelos depoimentos">
        <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label="Depoimento anterior" aria-controls="testimonial-track">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
        </button>
        <div className="testimonial-pagination" role="group" aria-label="Posições dos depoimentos">
          {positions.map((position, index) => <button key={index} type="button" className="testimonial-dot"
            aria-label={`Mostrar posição ${index + 1} de ${positions.length} dos depoimentos`}
            aria-current={index === activePosition ? "true" : undefined} aria-controls="testimonial-track"
            onClick={() => track.current?.scrollTo({ left: position, behavior: "smooth" })} />)}
        </div>
        <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label="Próximo depoimento" aria-controls="testimonial-track">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
        </button>
      </div>}
    </section>
  );
}
