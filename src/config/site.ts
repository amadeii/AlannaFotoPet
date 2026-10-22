import { christmas2026 } from "../content/christmas2026";
import { evergreen } from "../content/evergreen";
import type { SiteContent, SiteMode } from "../content/types";

// Troque apenas este valor para mudar conteúdo e tokens de toda a página.
export const activeMode: SiteMode = "christmas2026";
const campaigns: Record<SiteMode, SiteContent> = { christmas2026, evergreen };
export const site = { mode: activeMode, content: campaigns[activeMode] };
