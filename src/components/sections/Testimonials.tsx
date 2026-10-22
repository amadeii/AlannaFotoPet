import { shared } from "../../content/shared";

export function Testimonials() {
  const { title, items } = shared.testimonials;
  if (!items.length) return null;
  return (
    <section
      className="section testimonials container reveal"
      aria-labelledby="testimonials-title"
    >
      <h2 id="testimonials-title">{title}</h2>
      <div className="testimonial-grid">
        {items.map((item, index) => (
          <figure key={`${item.name}-${index}`}>
            <blockquote>
              <p>{item.quote}</p>
            </blockquote>
            <figcaption>
              {item.name}
              {item.context && <span>{item.context}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
