# Fotografias dos depoimentos — 24/10/2026

A seção “Histórias que ficam no coração”, exclusiva da campanha natalina, apresenta os relatos reais nesta ordem:

| Assinatura | Original fornecido | Asset local |
| --- | --- | --- |
| Laura Meyer | WhatsApp Image 2026-10-24 at 18.48.45.jpeg | src/assets/christmas/testimonial-green-dress.jpeg |
| Natália Fugiwara | WhatsApp Image 2026-10-24 at 18.49.15.jpeg | src/assets/christmas/testimonial-white-red-bow.jpeg |
| Ana Carolina Valverde | WhatsApp Image 2026-10-24 at 18.50.13.jpeg | src/assets/christmas/testimonial-family-dachshunds.jpeg |

Associações corrigidas conforme a identificação mais recente do usuário nas três capturas: Laura com os dois dachshunds junto ao sofá, Ana com a família e os dachshunds, Natália de branco com o pet de laço vermelho. Essa identificação substitui as associações anteriores. Os assets agora têm nomes descritivos da composição para evitar confusão entre as pessoas. As três cópias locais preservam integralmente os arquivos recebidos, sem conversão ou retoque. O original da família está disponível sem o sufixo `(1)` citado no primeiro pedido.

O relato anterior da Ana e a referência à Filó permanecem intactos. Os textos completos de Natália e Laura foram incorporados conforme fornecidos, incluindo as aspas de “pose” e o coração no relato da Laura.

Os cards mantêm Playfair Display, Montserrat e os tokens existentes. A partir de 900 px, fotografia e texto ficam lado a lado; abaixo disso, a composição é vertical e mostra uma prévia do próximo card. As imagens usam sua proporção original e `object-fit: contain`, sem recorte, com `object-position` individual registrado no conteúdo. A composição familiar da Ana aparece inteira.

O carrossel mantém scroll-snap, swipe nativo, setas, indicadores e navegação por teclado (setas, Home e End), sem autoplay. Outras seções e o tema institucional não foram alterados.

Validação local: `npm test` (10 testes), `npm run lint` e `npm run build` aprovados com Node 24.22.1. Playwright/Edge verificou os três cards em 375, 390, 430, 768 e 1440 px, proporções das imagens, associação dos nomes, ausência de overflow, setas, indicadores, teclado e swipe por eventos de toque. Sem erros de console. Inspeção visual das capturas dos três cards em mobile e desktop concluída; institucional conferido em 390 e 1440 px por interceptação local da configuração, sem editar o tema ativo. Capturas e script de QA em `tmp/testimonials-corrected-qa/` e `tmp/testimonials-corrected-test.py` (ignorados pelo Git). A simulação de toque não substitui teste em aparelho físico.

Após a identificação final das pessoas, npm test (10 testes), lint e build foram reexecutados e aprovados. As associações atualizadas foram verificadas no navegador em 390 e 1440 px, com inspeção visual dos três cards, sem overflow nem erros de console. Textos, assinaturas e ordem foram comparados com o commit anterior e permanecem intactos. QA desta correção: tmp/testimonials-identities.py e tmp/testimonials-identities-qa/.
