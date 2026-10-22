import { shared } from "../../content/shared";
import { contact } from "../../config/contact";
import { WhatsAppTrigger } from "../contact/WhatsAppInquiry";
import { SocialIcon } from "../ui/SocialIcon";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="brand" href="#inicio">
          <img
            src={shared.logo}
            alt="Alanna Rodrigues Fotografia Pet"
            width="220"
            height="73"
          />
        </a>
        <div className="footer-social">
          <a className="footer-icon" href={contact.instagram} target="_blank"
            rel="noopener noreferrer" aria-label="Instagram da Alanna (abre em nova aba)">
            <SocialIcon name="instagram" />
          </a>
          <WhatsAppTrigger
            variant="icon"
            ariaLabel="WhatsApp — abrir formulário de ensaio"
            intent="Saber mais sobre os ensaios"
          >
            <SocialIcon name="whatsapp" />
          </WhatsAppTrigger>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {shared.name}. Todos os direitos
          reservados.
        </span>
        <div className="footer-meta">
          <span>{shared.location}</span>
          {shared.developmentCredit && (
            <a href={shared.developmentCredit.url}>
              {shared.developmentCredit.label}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
