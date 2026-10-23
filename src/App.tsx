import { useEffect, useRef } from "react";
import { site } from "./config/site";
import { useEditorialMotion } from "./hooks/useEditorialMotion";
import { WhatsAppInquiryProvider } from "./components/contact/WhatsAppInquiry";
import { Footer } from "./components/layout/Footer";
import { DevelopmentCredit } from "./components/layout/DevelopmentCredit";
import { Hero } from "./components/sections/Hero";
import { Gallery } from "./components/sections/Gallery";
import { About } from "./components/sections/About";
import { Scenario } from "./components/sections/Scenario";
import { ClosingPortrait, PhotoBand } from "./components/sections/PhotoBand";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { EmotionalHighlight } from "./components/sections/EmotionalHighlight";
import { Testimonials } from "./components/sections/Testimonials";

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const { content } = site;
  const seasonal = site.mode === "christmas2026";
  const openingBand = <PhotoBand name="opening" moving={seasonal} photos={content.photography?.openingBand ?? [content.gallery.photos[3], content.gallery.photos[2]]} />;
  const bridgeBand = <PhotoBand name="family" moving={seasonal} photos={content.photography?.bridgeBand ?? [content.gallery.photos[1]]} />;
  const emotionalBand = <EmotionalHighlight content={content.emotionalHighlight} />;
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
        <main id="conteudo" className={seasonal ? "editorial-rhythm" : undefined}>
          <Hero content={content} />
          <Gallery content={content.gallery} family={content.experience.photo} selection={content.photography?.openingGallery} moving={seasonal} />
          {!seasonal && emotionalBand}
          {!seasonal && openingBand}
          <About content={content.about} />
          {seasonal && emotionalBand}
          {!seasonal && bridgeBand}
          <Scenario content={content} seasonal={seasonal} />
          <Testimonials />
          {seasonal && bridgeBand}
          <Contact content={content.contact} photo={content.photography?.contact ?? content.experience.photo} seasonal={seasonal} video={content.scenarioVideo} />
          {content.gallery.photos.length > 0 && <Gallery content={content.gallery} family={content.experience.photo} selection={content.photography?.closingGallery} closing moving={seasonal} />}
          <FAQ items={content.faq} photo={content.photography?.faq ?? content.gallery.photos[0]} companion={content.photography?.closing} preparation={content.preparation} />
          {seasonal ? openingBand : <ClosingPortrait />}
        </main>
        <Footer />
        {seasonal && <DevelopmentCredit />}
      </div>
    </WhatsAppInquiryProvider>
  );
}
