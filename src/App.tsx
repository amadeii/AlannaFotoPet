import { useEffect, useRef } from "react";
import { site } from "./config/site";
import { useEditorialMotion } from "./hooks/useEditorialMotion";
import { WhatsAppInquiryProvider } from "./components/contact/WhatsAppInquiry";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Experience } from "./components/sections/Experience";
import { Gallery } from "./components/sections/Gallery";
import { About } from "./components/sections/About";
import { Preparation } from "./components/sections/Preparation";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { EmotionalHighlight } from "./components/sections/EmotionalHighlight";
import { Testimonials } from "./components/sections/Testimonials";

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const { content } = site;
  const seasonal = site.mode === "christmas2026";
  useEditorialMotion(root);
  useEffect(() => {
    document.documentElement.dataset.theme = site.mode;
    document.title = content.seo.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", content.seo.description);
  }, [content]);
  return (
    <WhatsAppInquiryProvider themeMessage={content.whatsappMessage}>
      <div ref={root} data-theme={site.mode}>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <main id="conteudo">
          <Hero content={content} />
          <div className="editorial-ribbon">
            <span>Afeto em cada detalhe</span>
            <span aria-hidden="true">✳</span>
            <span>{content.ribbon}</span>
            <span aria-hidden="true">✳</span>
            <span>Você, sua família e seu pet</span>
          </div>
          <Experience content={content.experience} />
          <Gallery content={content.gallery} seasonal={seasonal} />
          <EmotionalHighlight content={content.emotionalHighlight} />
          <About />
          <Testimonials />
          <Preparation content={content.preparation} />
          <FAQ items={content.faq} />
          <Contact content={content.contact} />
        </main>
        <Footer />
      </div>
    </WhatsAppInquiryProvider>
  );
}
