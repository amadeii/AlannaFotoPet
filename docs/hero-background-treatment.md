# Tratamento da fotografia do Hero natalino

Correção local posterior à aprovação da V1.8.6, restrita ao fundo do Hero. Sem commit, push ou deploy.

- O overlay desktop mantém creme sobre a coluna de leitura, com opacidades menores e transparência completa a partir de 680 px. A extensão deixa de aumentar proporcionalmente à largura da tela; a árvore recupera o contraste da fotografia sem filtros de contraste, saturação ou nitidez artificial.
- A fonte local original extraída do PDF (`tmp/pdfs/page-3-image-0.jpg`) tem 1307 × 1960 px, contra 1200 × 1800 px do arquivo anterior. `src/assets/christmas/scenario-desktop.webp` preserva a resolução nativa, sem ampliação, otimizado em WebP qualidade 90 / método 6: 406.926 bytes, contra 963.969 bytes do JPEG fonte. O ganho de resolução é modesto; a principal correção visual vem do overlay.
- `<picture>` seleciona a imagem anterior em larguras abaixo de 1000 px. Mobile/tablet mantêm o arquivo e o gradiente aprovados. O desktop usa a nova fonte. Cada tamanho solicita somente seu arquivo fotográfico, além dos módulos JavaScript do Vite em desenvolvimento.
- Permanecem as mesmas dimensões de renderização, `object-fit`, `object-position`, carregamento prioritário e seletores de animação. Logo, textos, CTA, alturas, demais seções e institucional não foram alterados.

Arquivos: `src/styles/global.css` (somente a declaração do gradiente desktop), `src/components/sections/Hero.tsx` (seleção responsiva da fonte), `src/content/christmasPhotography.ts` (referência exclusiva do Hero) e o novo asset desktop. A fotografia anterior permanece intacta.

Validações: 10 testes aprovados, lint aprovado e build TypeScript/Vite aprovado. Capturas em 390, 768, 1024, 1440 e 1920 px nos dois temas: geometria de Hero, textos, logo e CTA idêntica em todos os dez cenários; capturas mobile/tablet e de todos os tamanhos do Hero institucional idênticas pixel a pixel às anteriores. Sem overflow ou erros de console nessa matriz. CTA/formulário e replay do Hero conferidos em mobile e desktop.

Capturas e relatórios em `tmp/hero-treatment-qa/`; [comparação antes/depois](http://127.0.0.1:5173/tmp/hero-treatment-qa/comparacao.html). Limite: inspeção em Edge/Chromium; Safari/iPhone físico não disponível.
