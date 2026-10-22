import type { SiteContent } from "../../content/types";
import { Eyebrow } from "../ui/Elements";
export function Preparation({
  content,
}: {
  content: SiteContent["preparation"];
}) {
  if (!content) return null;
  return (
    <section className="section preparation container reveal" id="preparacao">
      <div>
        <Eyebrow>04 / Prepare-se para o ensaio</Eyebrow>
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
        <div className="color-palette" aria-label="Paleta sugerida de roupas">
          {content.colors.map((color) => (
            <div key={color.token}>
              <span className={`swatch swatch-${color.token}`} />
              <span>{color.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="preparation-tips">
        {content.tips.map((tip, index) => (
          <div className="preparation-tip" key={tip}>
            <span>0{index + 1}</span>
            <p>{tip}</p>
          </div>
        ))}
        <p className="preparation-aside">
          O melhor look é aquele em que vocês se sentem bem.
        </p>
      </div>
    </section>
  );
}
