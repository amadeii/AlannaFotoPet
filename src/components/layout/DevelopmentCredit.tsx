import { SocialIcon } from "../ui/SocialIcon";

export function DevelopmentCredit() {
  return (
    <aside className="development-credit" aria-label="Créditos de desenvolvimento">
      <div className="container development-credit-inner">
        <span>Desenvolvido por <strong>Gabriel Amadei</strong></span>
        <span className="development-credit-divider" aria-hidden="true">|</span>
        <a href="https://wa.me/5541991543278" target="_blank" rel="noopener noreferrer"
          aria-label="WhatsApp profissional de Gabriel Amadei (abre em nova aba)">
          <SocialIcon name="whatsapp" /> WhatsApp
        </a>
        <span className="development-credit-divider" aria-hidden="true">|</span>
        <a href="https://www.instagram.com/amadei.dev/" target="_blank" rel="noopener noreferrer"
          aria-label="Instagram profissional @amadei.dev (abre em nova aba)">
          <SocialIcon name="instagram" /> Instagram <strong>@amadei.dev</strong>
        </a>
      </div>
    </aside>
  );
}
