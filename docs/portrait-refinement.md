# Retrato da Alanna — integração editorial

O retrato continua usando **o arquivo fotográfico original do site**, `src/assets/brand/alanna-portrait.webp`, sem alterações de cor, rosto, pet, câmera, roupas ou tatuagens. Os pixels RGB das variantes geradas não foram usados.

Uma edição com a ferramenta nativa de imagem produziu a transparência; somente seu canal alfa foi aproveitado como máscara CSS. A máscara foi otimizada sem perdas em `src/assets/brand/alanna-portrait-mask.png` (1023 × 1537, aproximadamente 124 KB). Assim, a imagem exibida continua sendo a fotografia real, com a visibilidade do fundo controlada pela máscara. O original com fundo permanece disponível.

O arco atual foi preservado e recebeu um gradiente muito sutil entre os tokens `--surface` e `--page`, sem branco puro. A fotografia e sua máscara usam `cover` e a mesma posição `50% 80%`, reduzindo o espaço vazio acima do pet e preservando rosto, orelhas, câmera e tatuagens. O container mobile passou de 87% para 94% da largura disponível. A proporção 4:5, os textos, os demais componentes e as animações foram mantidos.

## Verificação

- Desktop 1440/1920 px, tablet 768 px e mobile 390/320 px revisados no navegador.
- Máscara carregada; sem overflow horizontal. Fotografia, câmera e tatuagens visíveis no enquadramento final.
- A seção é compartilhada pelos dois temas e usa os tokens de cada tema.
- Lint, 10 testes existentes e build aprovados. Asset fotográfico original permanece com o mesmo hash no build (`alanna-portrait-Kdr3tHvN.webp`).
- Capturas internas: `tmp/portrait-qa/`.
- Sem commit, push ou deploy.

## Arquivos

- `src/assets/brand/alanna-portrait-mask.png`: máscara alfa otimizada.
- `src/content/shared.ts`: referência à máscara compartilhada.
- `src/components/sections/About.tsx`: aplica a máscara à fotografia original.
- `src/styles/global.css`: fundo creme do arco, enquadramento e largura mobile.
- `README.md` e este documento: registro do refinamento.
- `dist/`: build regenerado.

## Ferramenta e prompt final da máscara

### Ajuste posterior: moldura e movimento das duas seções

O arco recebeu uma moldura de 1 px em `--secondary` (bordô), sem alterar a fotografia ou o recorte. Ela entra suavemente junto ao retrato. A legenda “Sua família inteira cabe nesta lembrança.” foi removida da foto da Experiência, e `PhotoFrame` não renderiza legendas vazias.

Os títulos da Experiência e da Alanna agora usam letter drop real, com 700 ms por letra e stagger de 18 ms (`--motion-section-letter-stagger`). As palavras permanecem inteiras no layout, as quebras e os nomes acessíveis dos títulos foram preservados. Os blocos de texto e fotografias continuam utilizando as transições do observer existente, sem adicionar listeners ou repetir animações continuamente.

Arquivos deste ajuste: `src/content/christmas2026.ts`, `src/components/ui/Elements.tsx`, `src/styles/global.css`, `src/styles/motion.css` e este documento. Desktop 1440 px, tablet 768 px e mobile 390/320 px revisados, sem overflow. Lint, 10 testes e build aprovados. Capturas em `tmp/final-sections-qa/`. Sem commit, push ou deploy.

### Prompt utilizado anteriormente

Modo: ferramenta nativa `image_gen`, edição com fundo transparente. Entrada: o retrato original otimizado do site. A primeira variação, com enquadramento alterado, foi descartada; da segunda foi utilizado exclusivamente o canal alfa, preservando a fotografia original no site.

```text
BACKGROUND REMOVAL ONLY. Edit this exact existing photograph. Make the beige wall and floor fully transparent, with natural accurate hair and fur edge alpha. Keep the entire original 2:3 portrait canvas and the exact subject placement, scale, pose and framing including the large blank area above the dog. Do not crop or recenter. Absolutely do not regenerate, enhance, retouch or change ANY part of the person, dog, camera, harness, clothing, skin, tattoos or hair. Preserve the exact real original face, facial proportions and expression; the precise same dog and ear shape, exact tattoo linework, original camera and lettering. This is a technical cutout, not a new photograph or a reinterpretation. Only background pixels should become transparent. No shadows, no extra text, no other edits.
```
