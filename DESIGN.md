---
"name": "Alanna Rodrigues — Fotografia Pet"
"description": "Sistema visual observado na V1.8 local: fotografias reais, creme, verde pinheiro e bordô."
"colors":
  "page": "#f9f7f2"
  "surface": "#f0ede5"
  "paper": "#fffdf9"
  "sand": "#e2d8c8"
  "soft-green": "#e0e5db"
  "ink": "#293a30"
  "muted": "#565d52"
  "accent": "#344b3c"
  "accent-ink": "#fbf8f0"
  "secondary": "#743d43"
  "border": "#dad9cc"
  "scenario-end": "#586952"
  "evergreen-page": "#faf9f6"
  "evergreen-surface": "#efeee9"
  "evergreen-paper": "#fffefa"
  "evergreen-sand": "#e3e0d7"
  "evergreen-soft-green": "#e3e5df"
  "evergreen-ink": "#3f423e"
  "evergreen-muted": "#595f55"
  "evergreen-accent": "#51564e"
  "evergreen-secondary": "#6f6d60"
  "evergreen-border": "#dcdcd4"
"typography":
  "display":
    "fontFamily": "Playfair Display, Georgia, serif"
    "fontSize": "clamp(42px, 13.5vw, 56px)"
    "fontWeight": 400
    "lineHeight": 1.03
    "letterSpacing": "-.035em"
  "display-wide":
    "fontFamily": "Playfair Display, Georgia, serif"
    "fontSize": "clamp(54px, 4.3vw, 64px)"
    "fontWeight": 400
    "lineHeight": 1.03
    "letterSpacing": "-.035em"
  "headline":
    "fontFamily": "Playfair Display, Georgia, serif"
    "fontSize": "clamp(36px, 4vw, 52px)"
    "fontWeight": 400
    "lineHeight": 1.12
    "letterSpacing": "-.03em"
  "body":
    "fontFamily": "Montserrat, Arial, sans-serif"
    "fontSize": "clamp(16px, 1.25vw, 18px)"
    "fontWeight": 400
    "lineHeight": 1.7
  "control":
    "fontFamily": "Montserrat, Arial, sans-serif"
    "fontSize": "16px"
    "fontWeight": 600
    "lineHeight": 1.5
  "field":
    "fontFamily": "Montserrat, Arial, sans-serif"
    "fontSize": "16px"
    "fontWeight": 400
    "lineHeight": 1.5
  "meta":
    "fontFamily": "Montserrat, Arial, sans-serif"
    "fontSize": "14px"
    "fontWeight": 400
    "lineHeight": 1.6
"rounded":
  "field": "5px"
  "panel": "10px"
  "dialog": "18px"
  "pill": "999px"
  "circle": "50%"
"spacing":
  "12": "12px"
  "16": "16px"
  "18": "18px"
  "20": "20px"
  "24": "24px"
  "32": "32px"
  "60": "60px"
"components":
  "button-outline":
    "backgroundColor": "transparent"
    "textColor": "{colors.accent}"
    "typography": "{typography.control}"
    "rounded": "{rounded.pill}"
    "padding": "16px 24px"
    "width": "min(100%, 344px)"
  "button-outline-hover":
    "backgroundColor": "{colors.accent}"
    "textColor": "{colors.accent-ink}"
  "button-inverse":
    "backgroundColor": "transparent"
    "textColor": "{colors.accent-ink}"
    "typography": "{typography.control}"
    "rounded": "{rounded.pill}"
    "padding": "16px 24px"
  "button-inverse-hover":
    "backgroundColor": "{colors.paper}"
    "textColor": "{colors.accent}"
  "button-submit":
    "backgroundColor": "{colors.accent}"
    "textColor": "{colors.accent-ink}"
    "typography": "{typography.control}"
    "rounded": "{rounded.pill}"
    "padding": "16px 24px"
    "width": "100%"
  "input":
    "backgroundColor": "{colors.paper}"
    "textColor": "{colors.ink}"
    "typography": "{typography.field}"
    "rounded": "{rounded.field}"
    "padding": "11px 12px"
    "width": "100%"
  "faq-panel":
    "backgroundColor": "{colors.paper}"
    "textColor": "{colors.ink}"
    "rounded": "{rounded.panel}"
  "contact-icon":
    "backgroundColor": "transparent"
    "textColor": "{colors.accent}"
    "rounded": "{rounded.circle}"
    "width": "44px"
    "height": "44px"
---

# Design System: Alanna Rodrigues — Fotografia Pet

## Overview

**Creative North Star: "Identidade Alanna: fotografias reais, creme, verde pinheiro e bordô"**

A identidade da Alanna combina fotografias reais, acolhimento e leitura confortável. Creme e bege ligam retratos e conjuntos fotográficos; verde pinheiro e bordô sustentam contraste e chamadas. Playfair Display dá expressão aos títulos e Montserrat mantém textos e controles claros.

A V1.8 foi construída em código a partir da referência real fixada pelo usuário, sem comp gerado nem nova direção criativa. Este documento registra o sistema observado na implementação. A ordem das seções, alturas e equivalências desta campanha permanecem em `docs/V1.8-reference-map.md`, sem se tornarem regras universais da marca.

**Key Characteristics:**
- Fotografias e logo reais da Alanna, com texto fora das imagens.
- Fundos contínuos e composição fotográfica com pouca ornamentação.
- Títulos expressivos, parágrafos e controles confortáveis para leitura.
- CTAs em contorno, painéis claros e foco visível.
- Mesma linguagem de componentes e movimento nos dois temas.

## Colors

Neutros quentes, verde pinheiro e bordô formam a paleta natalina. Os valores normativos estão no frontmatter e correspondem aos estilos reais.

### Primary

- **Verde pinheiro (`accent`)**: texto e contorno dos CTAs, ambiente escuro do cenário e do convite.
- **Creme de contraste (`accent-ink`)**: texto e ícones sobre verde ou bordô.

### Secondary

- **Bordô (`secondary`)**: segunda linha do título, nomes, chamada emocional, erros e foco global.

### Neutral

- **Creme (`page`), superfície quente (`surface`) e papel (`paper`)**: fundo geral, apoio fotográfico e campos/painéis.
- **Bege (`sand`) e verde suave (`soft-green`)**: degradês que integram os retratos ao ambiente.
- **Texto verde escuro (`ink`), texto secundário (`muted`) e divisória (`border`)**: hierarquia de leitura e separação discreta.
- **Verde de transição (`scenario-end`)**: extremo literal dos degradês escuros; não substitui o papel semântico `accent`.

O tema `christmas2026` usa a base. Os tokens `evergreen-*` registram as substituições reais de `themes.css`; `accent-ink` e o extremo literal `scenario-end` continuam herdados. A variante institucional é explicitamente provisória no código e não deve apresentar fotos natalinas como portfólio institucional. As amostras de roupa da preparação são conteúdo contextual, não cores globais da marca. Tokens declarados sem consumidores na V1.8, como `gold` e `placeholder`, não foram promovidos ao frontmatter. As rampas do sidecar são auxiliares sintetizadas em OKLCH para o painel, não uma escala implementada no produto.

### Named Rules

**The Identidade Real Rule.** Usar o logo e as fotografias aprovadas da Alanna; preservar a integridade das pessoas e dos pets.

## Typography

**Display Font:** Playfair Display, com Georgia e serif de apoio.

**Body Font:** Montserrat, com Arial e sans-serif de apoio.

**Character:** títulos serifados de peso regular e textos sem serifa de leitura direta. O bordô pontua trechos dos títulos; a hierarquia depende de tamanho, espaço e cor, sem pesos de display adicionais.

### Hierarchy

- **Display**: `display` na abertura; `display-wide` passa a valer em 1000 px. Ambos têm peso regular e entrelinha compacta.
- **Headline**: `headline` nos títulos recorrentes. Convite, chamada emocional e modal possuem ajustes locais, sem constituir uma escala global adicional.
- **Body**: `body` define a base fluida. Muitos parágrafos usam explicitamente 16 px com entrelinhas de 1.6 a 1.7; biografia com largura máxima de 620 px e textos de apoio entre 440 e 560 px.
- **Control / Field**: botões com peso 600, campos com peso 400; rótulos de campos em 16 px e peso 500.
- **Meta**: dicas e informações secundárias em 14 px. Não usar esse papel no corpo principal ou nas perguntas do FAQ.

### Named Rules

**The Leitura Confortável Rule.** Manter textos corridos e controles em pelo menos 16 px; metadados e dicas podem usar o papel auxiliar de 14 px já observado.

## Layout

Fundos contínuos, retratos integrados e imagens sem moldura organizam o espaço. Os blocos com texto usam coluna única no celular e, quando apropriado, duas colunas no desktop. O contêiner recorrente é `min(calc(100% - 40px), 1200px)`. Abertura e convite possuem larguras locais: consultar o mapa da V1.8 antes de alterar sua composição.

Em 700 px, a grade passa de duas para quatro colunas e aparece a segunda trilha do carrossel. Em 1000 px, abertura, biografia, cenário, convite e FAQ passam às composições de desktop. O formulário continua em uma coluna, com ajuste de padding em 600 px. O media query de 1200 px altera `--max-width`, mas esse token não é consumido pelo layout atual; não confundir com o contêiner efetivo.

O espaçamento é local, com passos recorrentes registrados no frontmatter, sem impor uma grade matemática que o código não possui. Fotografias contíguas e áreas de texto mais espaçosas geram o ritmo. As alturas e a sequência desta página pertencem ao mapa específico, não à marca global.

## Elevation & Depth

Predomina profundidade por fotografia, recorte, degradê e contraste tonal. Grades e faixas não recebem sombras. O retrato usa a máscara existente sobre os pixels da fotografia real, sem moldura em arco. O diálogo recebe sombra difusa e backdrop para distinguir a tarefa ativa do conteúdo de fundo.

### Shadow Vocabulary

- **Diálogo** (`0 12px 40px #293a3030`): sombra efetivamente aplicada ao formulário modal.
- O token `--shadow` existe na base, mas não é consumido pela V1.8; não é uma elevação canônica.

### Named Rules

**The Profundidade Contida Rule.** Separar superfícies por cor, fotografia e espaço; reservar a sombra funcional observada ao diálogo.

## Shapes

Botões usam cápsulas; contatos sociais, círculos. Campos possuem cantos discretos, painéis do FAQ e fotos do cenário usam o mesmo raio intermediário, e o diálogo é mais arredondado. Valores exatos em `rounded`. As demais fotografias permanecem retangulares; grades compactas não têm espaço entre imagens. Amostras de roupa são circulares, sem criar um padrão de chip interativo.

## Components

### Buttons

CTAs largos em contorno, com seta SVG de traço fino.

- **Base**: `button-outline`, borda de 2 px na cor do texto, altura mínima de 60 px e espaço de 20 px entre rótulo e ícone.
- **Ambientes escuros**: `button-inverse`; hover troca fundo para papel e texto para verde.
- **Abertura mobile**: fundo de papel; em desktop volta ao contorno verde. Essa adaptação pertence à abertura.
- **Confirmação**: `button-submit`, preenchido de verde e largura integral. Desabilitado usa opacidade de .55 e cursor de indisponibilidade.
- **Estados**: transições de 200 ms, deslocamento vertical de -2 px no hover/foco e seta deslocada 2 px na diagonal. Active retorna à posição inicial. Foco global de 2 px, afastado 5 px.

### Inputs / Fields

Campos claros com borda discreta de 1 px, altura mínima de 48 px, padding e raio de `input`. Foco usa verde; erro usa bordô com mensagem textual e `aria-invalid`. Rótulos e dicas permanecem associados. Selects usam chevron SVG. O modal tem sete campos em uma coluna; não há padrão de formulário em duas colunas.

### FAQ / Disclosures

Painéis de papel com perguntas alinhadas à esquerda, ícone de mais e área acionável larga. Botões usam padding de 18 × 20 px. O mais gira 45 graus quando aberto; a resposta expande em 250 ms, e o conteúdo oculto fica inerte. Foco do FAQ entra no painel com offset de -4 px. Disclosures nativos de experiência e preparação usam linhas discretas e o mesmo SVG.

### Inquiry Dialog

Diálogo nativo com largura de `min(520px, calc(100% - 32px))`, altura máxima de 92dvh, scroll interno e cabeçalho de fechamento fixo durante a rolagem. Fundo em degradê de papel para bege e backdrop verde translúcido (`#293a3066`). Abre em 220 ms, foca o primeiro campo, permite Escape e devolve o foco ao acionador. A faixa de investimento é texto, sem card de preço. Os snippets do sidecar são amostras visuais; validação e navegação pertencem aos componentes React.

### Photography / Motion

Preservar fotos reais, recortes aprovados e máscara do retrato. Textos ficam em área própria; legendas não são sobrepostas às fotos. Ícones de interface usam SVG de 20 px com stroke de 1.5; contatos usam SVG de 22 px dentro de alvos circulares de 44 px.

Conteúdo permanece visível se o observador falhar. Entradas usam 720 ms, fotos 1100 ms, letras 700 ms e galeria 1000 ms; atrasos e easings reais constam no sidecar. O Hero só rearma após sair completamente acima da viewport e repete ao retornar ao início. A primeira galeria rearma após saída completa da seção. Retorno da aba/bfcache encerra entradas interrompidas sem encerrar o carrossel infinito. A trilha preserva dois grupos idênticos, translação de -50% e duração de 72 s; a segunda trilha inverte direção com atraso de -36 s. Esse loop é independente dos reveals.

## Do's and Don'ts

### Do:
- **Do** preservar Playfair Display nos títulos e Montserrat nos textos e controles.
- **Do** usar os papéis semânticos de cor e preservar a variante de tema existente.
- **Do** manter foco visível, rótulos associados aos campos e estados acessíveis de expansão.
- **Do** preservar SVGs consistentes, animações aprovadas, replay do Hero/galeria e o loop fotográfico de 72 segundos.
- **Do** manter texto fora das fotografias e preservar o retrato real com sua máscara existente.

### Don't:
- **Don't** trocar o logo, fabricar fotografias ou apresentar depoimentos sem material real aprovado.
- **Don't** introduzir navbar, emojis ou cards de preços, conforme as restrições confirmadas.
- **Don't** promover alturas, sequência de seções ou quantidades de fotos desta campanha a regras globais.
- **Don't** tratar o tema evergreen provisório como identidade institucional definitiva.
- **Don't** reproduzir os kickers/eyebrows existentes como regra de componentes para novas superfícies.

Específico da referência: kickers/eyebrows de 13 px em caixa alta permanecem na biografia, cenário e convite para respeitar a hierarquia observada e fixada pelo usuário. São uma adaptação intencional desta página, sem se tornarem regra para novas superfícies. Este passe de documentação não altera fontes nem a composição aprovada. Valores declarados sem consumo são evidência de código legado, não tokens recomendados.

Fontes inspecionadas: `src/styles/{tokens,themes,global,inquiry,motion}.css`, `src/App.tsx`, componentes de interface, FAQ, seções fotográficas e formulário, `src/hooks/useEditorialMotion.ts`, `PRODUCT.md`, mapa V1.8 e capturas finais em `.impeccable/review/`. Esta documentação não declara validação em Safari/iPhone físico.
