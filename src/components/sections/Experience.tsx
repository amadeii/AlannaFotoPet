import type { SiteContent } from "../../content/types";
import { Icon } from "../ui/Icon";
export function Experience({ content }: { content: SiteContent["experience"] }) {
  return <details className="experience disclosure" id="experiencia">
    <summary>{content.title.replace(/\n/g, " ")}<Icon name="plus" /></summary>
    <div className="experience-copy">{content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
  </details>;
}
