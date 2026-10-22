# Alanna Rodrigues — Fotografia Pet

Frontend em React, Vite e TypeScript. Campanha inicial: **Memórias Natalinas — Um Natal para guardar • 2026**.

Retrato integrado: [máscara transparente sobre a foto original, enquadramento e validação](docs/portrait-refinement.md).

V1.5.1: [contato compacto, footer com ícones, cards e comparativo de medidas](docs/V1.5.1-contato-cards.md). Os três acessos ao formulário continuam no hero, contato e ícone de WhatsApp do rodapé; Cidade/UF e as regras atuais foram preservadas.

V1.5: [efeitos por seção, parâmetros de velocidade, arquivos, validações e checklist visual](docs/V1.5-motion.md). Os registros abaixo documentam também as versões anteriores; os parâmetros atuais de movimento ficam em `src/styles/motion.css`.

## Executar

Use Node.js 22.13+ ou 24 LTS.

## Primeira publicação no Coolify

Projeto estático React/Vite. A versão de Node recomendada é 24, registrada em `.nvmrc`. Instalação reproduzível: `npm ci`. Verificações: `npm test`, `npm run lint` e `npm run build`. O diretório de publicação é `dist/`, com `index.html` e assets versionados por hash. Não é necessário backend, variável secreta ou serviço de banco de dados. As fontes atuais são carregadas do Google Fonts e exigem acesso a esse serviço no navegador.

`dist/`, `node_modules/`, `tmp/`, caches TypeScript, logs e arquivos `.env` permanecem locais e não entram no Git. As fotografias otimizadas, a máscara do retrato, o código, o lockfile e a documentação devem ser versionados. O conteúdo de `tmp/` inclui materiais de trabalho e capturas e foi preservado sem publicação.

Esta preparação não executa deploy, não configura DNS e não modifica o servidor Coolify. Não use `vite dev` ou `vite preview` como servidor de produção.

### Comandos locais

```sh
npm install
npm run dev
npm run lint
npm test
npm run build
```

A prévia normalmente fica em http://127.0.0.1:5173. O build estático é gerado em `dist/`. A V1.4 abre um formulário de pré-atendimento antes dos CTAs de WhatsApp. Os dados permanecem somente na memória enquanto o modal está aberto. Não há backend, checkout, persistência ou reserva automática. O WhatsApp só abre após a confirmação final, com uma mensagem para o visitante revisar e enviar.

## Organização

- `src/App.tsx`: composição da página, temas e reveal das seções.
- `src/components/layout/Footer.tsx`: logotipo, navegação remanescente e canais oficiais. A navbar superior foi removida na V1.2.
- `src/components/sections/`: hero, experiência, cenário, destaque emocional, apresentação, preparação, FAQ, contato e estrutura de depoimentos reais.
- `src/components/ui/`: botões, fotografias com legenda, placeholders e ornamentação.
- `src/config/site.ts`: seleção central de `christmas2026` ou `evergreen`.
- `src/config/contact.ts`: número internacional, número de exibição, Instagram e função `getWhatsAppUrl`, que usa `encodeURIComponent`.
- `src/content/christmas2026.ts`: textos, fotografias, perguntas, destaque emocional e mensagem de WhatsApp da campanha.
- `src/content/evergreen.ts`: conteúdo institucional provisório e mensagem de WhatsApp sem referência ao Natal.
- `src/content/shared.ts`: apresentação oficial da Alanna, retrato, marca, navegação do rodapé e lista de avaliações reais.
- `src/content/types.ts`: contratos tipados de conteúdo e avaliações.
- `src/styles/tokens.css`: fontes, cores e escala desktop. Playfair Display 400 normal/itálico e Montserrat 400/500/600, com fallback Georgia/Arial.
- `src/styles/themes.css`: cores por tema; a identidade institucional permanece provisória.
- `src/styles/global.css`: composição, breakpoints e animações CSS existentes.
- `src/assets/christmas/`: fotografias reais do PDF, em WebP.
- `src/assets/brand/`: logotipo original recuperado do PDF e retrato real otimizado a partir de `Alannabio.JPEG`.

## Contatos e conteúdo

Canais oficiais ficam somente em `src/config/contact.ts`:

- WhatsApp: +55 14 99775-4940, número internacional `5514997754940`.
- Instagram: https://www.instagram.com/alannafotopet/.

As mensagens pré-preenchidas são específicas de cada modo, no respectivo arquivo de conteúdo. Hero, contato e rodapé usam a mesma configuração. Não há envio automático de mensagens.

A biografia recebida da cliente está em `shared.about.paragraphs`. A fotografia preserva fundo neutro, rosto, pet e câmera com enquadramento 4:5 em CSS, sem alterar o original. A biografia e o retrato são compartilhados pelos temas.

Os pacotes antigos não fazem parte do código público ou dos metadados. O material original permanece no PDF fornecido pela cliente. Na V1.4, a faixa autorizada de R$ 650 a R$ 1.260 aparece exclusivamente no formulário, sem orçamento automático. Ela não é incluída na mensagem preparada para o WhatsApp, em nenhum dos temas.

## Temas

Altere somente `activeMode` em `src/config/site.ts` para `"evergreen"` ou `"christmas2026"`. Os componentes são compartilhados; textos, metadados e tokens mudam com o modo.

O destaque “Você merece viver isso!” é configurado em `emotionalHighlight` e fica `null` no institucional. Fotos, FAQ e preparação natalinos também não aparecem no institucional. A mensagem de WhatsApp institucional não menciona a campanha.

Antes de publicar o institucional, receber os materiais oficiais pendentes e atualizar os metadados estáticos de `index.html`, usados antes da execução do JavaScript.

## Referência Wix e pendências

O vídeo foi usado somente para revisão visual. Nenhum frame foi transformado em fotografia final.

- **Faixa fotográfica:** a V1.3 usa os quatro arquivos originais disponíveis (`family.webp`, `scenario.webp`, `details.webp` e `gifts.webp`) no carrossel da seção bordô. São desejáveis mais fotos originais distintas de pets e famílias do ensaio, em boa resolução, para ampliar o acervo. Nenhuma imagem foi extraída do vídeo.
- **Depoimentos:** `shared.testimonials.items` está vazio. `Testimonials` retorna `null` enquanto não houver avaliações reais. Para cadastrar, fornecer `name`, `quote` e, opcionalmente, `context`.
- **Institucional:** faltam portfólio, textos e identidade visual oficial definitivos.
- **Marca:** ainda é desejável receber o logotipo original em SVG ou PNG de alta resolução.
- **Biografia:** texto oficial já aplicado, centralizado para confirmação final e eventuais ajustes da cliente.

`ContactInterest`, hero e rodapé usam o mesmo formulário compartilhado de pré-atendimento na V1.4. Os links do Instagram continuam independentes.

## Animações e validação

O letter drop já existente foi preservado: 700 ms por letra, stagger de 25 ms, uma execução na carga inicial, título acessível completo. A fotografia do hero mantém reveal de 1,25 s e zoom de 1,045 para 1. Nenhuma biblioteca de animação foi acrescentada.

O gorro foi removido de componentes, estilos e assets. A navbar e os controles mobile/sticky foram excluídos. Lint e build devem ser executados com os scripts acima após alterações. Não foi realizado push nem deploy.

## Arquivos do refinamento V1.2

- Alterados: `src/App.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/About.tsx`, `src/components/sections/Contact.tsx`, `src/components/ui/Elements.tsx`, `src/content/types.ts`, `src/content/shared.ts`, `src/content/christmas2026.ts`, `src/content/evergreen.ts`, `src/styles/tokens.css`, `src/styles/global.css` e `README.md`.
- Criados: `src/config/contact.ts`, `src/components/sections/EmotionalHighlight.tsx` e `src/components/sections/Testimonials.tsx`.
- Removido: `src/components/layout/Header.tsx`.
- Gerado novamente: `dist/`. A configuração ativa permanece `christmas2026`.

Verificados os modos natalino e institucional, desktop 1440/1760/1920 px, tablet e mobile, título sem quebra de letras, ausência de overflow, âncoras, URLs e mensagens pré-preenchidas de WhatsApp, Instagram e ausência de depoimentos vazios. A verificação dos contatos confere os destinos configurados, sem enviar mensagens. Lint e build concluídos sem erros.

## Refinamento editorial V1.3

- Logo original integrado à abertura do hero, com o mesmo asset do rodapé. Navbar e gorro continuam ausentes.
- Frase central fixa na seção bordô. No desktop, duas trilhas fotográficas laterais; em até 900 px, uma faixa compacta abaixo do texto.
- Cada trilha tem dois grupos idênticos e se move exatamente pela largura de um grupo, em 72 s, com `transform` linear e máscara suave nas bordas. O espaçamento após cada grupo é igual ao espaçamento entre fotos para preservar a emenda do loop.
- Movimento contínuo, sem lógica de `prefers-reduced-motion`. O controle de pausa/retomada foi removido no ajuste posterior à V1.3.
- Fotografias configuradas em `christmas2026.emotionalHighlight.photos`. No institucional, `emotionalHighlight` permanece `null` e a faixa não é renderizada.
- Playfair Display e Montserrat preservadas. Optou-se por não carregar uma terceira família manuscrita: o itálico editorial já atende ao caráter delicado da composição.

Arquivos alterados na V1.3: `src/App.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/EmotionalHighlight.tsx`, `src/content/types.ts`, `src/content/christmas2026.ts`, `src/styles/global.css` e `README.md`. Nenhum novo asset fotográfico, dependência, commit, push ou deploy.

Validação V1.3: desktop 1440/1760/1920 px, tablet 768/900 px e mobile 320/390 px; título central legível e logo presente no topo. Grupos duplicados com largura idêntica, cobertura maior que a janela visível e passagem pelo ciclo completo conferidos. Tema institucional testado sem faixa ou textos natalinos; tema natalino restaurado. Lint e build aprovados.

## Pré-atendimento V1.4

Inventário: três CTAs em cada tema, com cobertura de 100% pelo mesmo `WhatsAppInquiryProvider`:

| Local | Texto preservado | Contexto na mensagem |
| --- | --- | --- |
| Hero | Agendar um ensaio | Agendar um ensaio |
| Contato | Conversar pelo WhatsApp | Conversar sobre um ensaio |
| Rodapé | WhatsApp · +55 14 99775-4940 ↗ | Saber mais sobre os ensaios |

O modal usa `<dialog>.showModal()`, fundo inerte, título/descrição associados, labels, foco inicial, ciclo de Tab/Shift+Tab, Escape, botão de fechar, cancelamento e retorno ao CTA de origem. Os sete campos são obrigatórios; cidade e estado (UF) também são coletados e incluídos na mensagem; aceita SRD e múltiplas raças, 1–5 ou mais pets, 0–5 ou mais pessoas, telefone fixo ou celular com DDD válido e colagem com +55. A máscara conserva a posição de edição. Erros aparecem após interação; o botão final fica desabilitado enquanto houver dados inválidos. Fechar ou concluir elimina o estado do formulário.

Somente a confirmação final chama `getWhatsAppUrl`, com `encodeURIComponent` e o número central. A abertura ocorre de forma síncrona ao clique; se o navegador bloquear a nova janela, o destino é aberto na aba atual. Nenhum dado é enviado automaticamente, registrado em logs, incluído na URL do site ou salvo em armazenamento persistente. Não há novo endpoint, biblioteca ou integração.

Arquivos da V1.4:

- Criados: `src/components/contact/WhatsAppInquiry.tsx`, `src/lib/inquiry.ts`, `src/styles/inquiry.css` e `tests/inquiry.test.mjs`.
- Alterados: `src/App.tsx`, `src/main.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/Contact.tsx`, `src/components/layout/Footer.tsx`, `package.json` e `README.md`.
- Build gerado novamente em `dist/`. Configuração final: `christmas2026`.

Exemplo ilustrativo da mensagem natalina (dados fictícios):

```text
Olá, Alanna! Conheci seu site e gostaria de saber mais sobre os ensaios Memórias Natalinas 2026.

Interesse: Conversar sobre um ensaio
Nome: João D’Ávila & Ana
Raça(s) do(s) pet(s): SRD, poodle e sem raça definida
Total de pets: 5 ou mais
Total de pessoas: 0 (ensaio somente com pets)
Telefone com DDD: (11) 90000-0000
Localização: São Paulo — SP

Gostaria de conversar sobre os detalhes do ensaio.
```

No institucional, a primeira frase usa a mensagem de fotografia pet de `evergreen.ts`, sem referência ao Natal. A intenção do botão e todos os campos continuam presentes.

Verificação final: `npm run lint`, `npm test` (6/6 aprovados) e `npm run build` concluídos sem erros.

Validação V1.4: seis testes automatizados de localização, campos obrigatórios, limites, SRD/múltiplas raças, caracteres especiais, contagens, máscara/DDD, mensagem temática e codificação do destino. Revisão no navegador dos três CTAs em ambos os temas, validação inválida/válida, foco, teclado, fechamento/reabertura e abertura final com dados fictícios (sem enviar mensagem). Modal conferido em 1440/1760/1920 px, tablet 768 px e mobile 320/390 px, sem overflow horizontal interno e com rolagem vertical para acessar todos os controles. Logo, hero, fotos, animações e carrossel CSS de 72 s preservados. Sem commit, push ou deploy.
