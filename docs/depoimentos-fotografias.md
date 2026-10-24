# Fotografias dos depoimentos — 24/10/2026

A seção “Histórias que ficam no coração”, exclusiva da campanha natalina, apresenta os relatos reais nesta ordem:

| Assinatura | Original fornecido | Asset local |
| --- | --- | --- |
| Ana Carolina Valverde | WhatsApp Image 2026-10-24 at 18.49.15.jpeg | src/assets/christmas/testimonial-ana-carolina.jpeg |
| Natália Fugiwara | WhatsApp Image 2026-10-24 at 18.48.45.jpeg | src/assets/christmas/testimonial-natalia.jpeg |
| Laura Meyer | WhatsApp Image 2026-10-24 at 18.50.13.jpeg | src/assets/christmas/testimonial-laura.jpeg |

O pedido menciona `(1)` no nome da foto da Laura, mas o anexo disponível não tem esse sufixo. Foi utilizado o próprio anexo que mostra o casal, os dachshunds e o pet de barriga para cima. As três cópias locais preservam integralmente os arquivos recebidos, sem conversão ou retoque.

O relato anterior da Ana e a referência à Filó permanecem intactos. Os textos completos de Natália e Laura foram incorporados conforme fornecidos, incluindo as aspas de “pose” e o coração no relato da Laura.

Os cards mantêm Playfair Display, Montserrat e os tokens existentes. A partir de 900 px, fotografia e texto ficam lado a lado; abaixo disso, a composição é vertical e mostra uma prévia do próximo card. As imagens usam sua proporção original e `object-fit: contain`, sem recorte, com `object-position` individual registrado no conteúdo. A composição familiar da Laura aparece inteira.

O carrossel mantém scroll-snap, swipe nativo, setas, indicadores e navegação por teclado (setas, Home e End), sem autoplay. Outras seções e o tema institucional não foram alterados.

Validação local: `npm test` (10 testes), `npm run lint` e `npm run build` aprovados com Node 24.22.1. Playwright/Edge verificou os três cards em 375, 390, 430, 768 e 1440 px, proporções das imagens, associação dos nomes, ausência de overflow, setas, indicadores, teclado e swipe por eventos de toque. Sem erros de console. Inspeção visual das capturas dos três cards em mobile e desktop concluída; institucional conferido em 390 e 1440 px por interceptação local da configuração, sem editar o tema ativo. Capturas e script de QA em `tmp/testimonials-corrected-qa/` e `tmp/testimonials-corrected-test.py` (ignorados pelo Git). A simulação de toque não substitui teste em aparelho físico.
