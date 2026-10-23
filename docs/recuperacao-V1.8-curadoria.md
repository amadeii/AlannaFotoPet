# Recuperação da V1.8 e integração do novo acervo

## Versão recuperada e evidência

A versão visual aprovada é a **V1.8 local, anterior à V1.8.1**. Ela não havia sido commitada: o histórico contém `4dcbc21` (favicon/compartilhamento) e `a9ed797` (preparação inicial). Restaurar o HEAD teria perdido melhorias aprovadas anteriores. Por isso, a recuperação usou `tmp/v181-qa/baseline/src/`, cópia feita antes da primeira edição da V1.8.1, conferida com `tmp/v181-qa/before/`, `tmp/v18-qa/` e o mapa estrutural aprovado.

Antes de recuperar, foram auditados status, diff, histórico e diferenças entre os fontes atuais e esse backup. O estado interrompido foi preservado em **`tmp/recovery-qa/interrupted-backup/`**: 68 arquivos relevantes, incluindo fontes, documentação, assets, arquivos não rastreados, AGENTS/DESIGN/PRODUCT e configurações locais pertinentes, mais status, diff e histórico. `manifest.json` registra caminhos e SHA-256. A cópia anterior da V1.8 permanece intacta.

Foram recuperados somente os 13 arquivos de código modificados/removidos durante a V1.8.1:

- `src/App.tsx` e `src/styles/global.css`.
- `src/components/sections/Contact.tsx`, `EmotionalHighlight.tsx`, `FAQ.tsx`, `Gallery.tsx`, `Hero.tsx`, `Scenario.tsx` e `PhotoBand.tsx` (recriado a partir do backup).
- `src/components/ui/Elements.tsx`.
- `src/content/christmas2026.ts`, `evergreen.ts` e `types.ts`.

Antes de integrar as fotos, **todos os arquivos de `src` coincidiam byte a byte com a V1.8 salva**. A recuperação foi novamente renderizada e capturada nos dois temas. Registro: `tmp/recovery-qa/restoration.json`. Não houve reset, clean, checkout indiscriminado ou alteração do histórico.

## Mudanças estruturais indevidas revertidas

- Voltaram os dois conjuntos fotográficos intermediários, nos mesmos lugares e tamanhos.
- Voltou a segunda galeria, com quatro posições; a primeira também recuperou suas quatro posições, duas colunas no mobile e quatro no desktop.
- Cenário recuperou as duas posições fotográficas de desktop e sua composição mobile original.
- Contato e FAQ recuperaram suas fotografias e a distribuição original entre imagem/texto.
- Voltou o bloco fotográfico final antes do rodapé. No natalino, ele agora recebe `emocao-sofi-25.webp`, evitando repetir o retrato da fotógrafa sem eliminar o bloco.
- A faixa bordô e o carrossel recuperaram suas posições independentes na sequência da V1.8. Não foram combinados, movidos ou encurtados novamente.
- Hero, tipografia, proporções, grids, fundos, degradês e espaçamentos foram recuperados. As novas fotografias ocupam os espaços existentes.

Sequência natalina: **Hero → galeria → faixa bordô → conjunto fotográfico → Conheça a Alanna → faixa fotográfica → cenário → carrossel → convite → galeria complementar → FAQ → fotografia final → rodapé**. O componente de depoimentos continua sem renderizar, pois não há avaliações reais aprovadas.

## Comprovação geométrica

O número, a ordem e a altura de cada região principal foram comparados entre a V1.8 recuperada e a página com o novo acervo. As quatro comparações têm **as mesmas alturas de todas as regiões**, além da mesma altura total:

| Tema / viewport | V1.8 aprovada recuperada | Após integrar as fotos |
| --- | --- | --- |
| Natalino · 390 × 844 | 7626 px | **7626 px** |
| Natalino · 1440 × 1000 | 6272 px | **6272 px** |
| Institucional · 390 × 844 | 4231 px | **4231 px** |
| Institucional · 1440 × 1000 | 3822 px | **3822 px** |

Não há a redução de 27–29% da tentativa rejeitada. O natalino tem as mesmas 13 regiões principais contando o rodapé; o institucional, as mesmas sete. No institucional, as capturas completas antes/depois também ficaram **pixel a pixel idênticas** em 390 e 1440 px.

Os únicos acréscimos ao CSS global aprovado são três regras locais para acomodar a fotografia responsiva do Hero no mesmo espaço: caixa com proporção 4:5, preenchimento da imagem e `contain` no desktop. A foto horizontal mostra o grupo inteiro, sem distorção ou corte lateral, dentro da área original. Não foram alterados contêineres, colunas, posições, alturas ou espaçamentos para acomodar o acervo.

## Fotografias fornecidas e distribuição

Origem: `C:/Users/gabri/Downloads/Alanna_Fotos_Curadoria_WebP.zip`. As 19 fotografias foram extraídas com validação dos caminhos e copiadas sem recompressão/edição para **`src/assets/christmas/curated/`**. Os 19 SHA-256 são idênticos aos arquivos extraídos. O LEIA-ME foi consultado como indicação de uso; a estrutura aprovada e as instruções diretas do usuário prevaleceram.

| Arquivo novo | Uso na estrutura existente |
| --- | --- |
| `hero-desktop-carol-21.webp` | Hero em 1000 px ou mais; grupo completo em foto horizontal |
| `hero-mobile-carol-19.webp` | Hero abaixo de 1000 px; alternativa responsiva, nunca uma segunda foto simultânea |
| `experiencia-sofi-14.webp` | Primeira posição do conjunto fotográfico após a faixa bordô; experiência tutor/pet |
| `galeria-carol-04.webp` | Galeria inicial, posição 1 |
| `galeria-carol-13.webp` | Galeria inicial, posição 2 |
| `galeria-sofi-07.webp` | Galeria inicial, posição 3 |
| `galeria-sofi-21.webp` | Galeria inicial, posição 4 |
| `galeria-carol-18.webp` | Galeria complementar, posição 1; `contain` preserva os três pets da foto horizontal |
| `galeria-sofi-22.webp` | Galeria complementar, posição 2 |
| `carrossel-carol-05.webp` | Posição principal já existente na apresentação do cenário |
| `carrossel-carol-15.webp` | Fotografia já existente junto ao FAQ |
| `contato-carol-23.webp` | Fotografia do convite/contato |
| `emocao-sofi-25.webp` | Bloco fotográfico final já existente, antes do rodapé |
| `carrossel-carol-11.webp` | Carrossel de 72 segundos |
| `carrossel-sofi-02.webp` | Carrossel de 72 segundos |
| `carrossel-carol-20.webp` | Carrossel de 72 segundos |
| `carrossel-sofi-10.webp` | Carrossel de 72 segundos |
| `carrossel-sofi-18.webp` | Carrossel de 72 segundos |
| `carrossel-sofi-24.webp` | Carrossel de 72 segundos |

Há oito posições de galeria na composição completa e seis fotos novas com prefixo `galeria-`. Foram usados os seis arquivos nessas posições e mantidos dois materiais originais distintos nos espaços restantes: `gifts.webp` e `family.webp`. Não foram criadas posições novas nem repetidas fotos para completar a grade.

Também continuam os originais `scenario.webp` na segunda imagem do conjunto intermediário, `candles.webp` na faixa de ligação e `details.webp` na segunda imagem do cenário. O retrato verdadeiro `alanna-portrait.webp`, com a máscara original, permanece intacto em **Conheça a Alanna**. Todos os oito assets antigos (fotos, logo e máscara) foram preservados sem alteração.

Os nomes com prefixo `carrossel-` foram usados tanto no loop como nas duas posições adicionais já existentes de cenário/FAQ, respeitando a indicação de aproveitar fotos adicionais somente onde o layout já tinha espaço. **Nenhum desses arquivos estáticos é reutilizado no loop**. Assim, as 19 fotos fornecidas são aproveitadas, sem adicionar ou suprimir regiões.

No natalino há **18 fotografias estáticas, todas com arquivos distintos**, incluindo o retrato real da fotógrafa. As seis imagens do loop são exclusivas dele, em dois grupos idênticos por trilha. A duplicação técnica do loop é intencional; não há repetição estática nem compartilhamento de fotos entre os espaços estáticos e o carrossel.

O usuário confirmou expressamente: **manter o institucional exatamente como a V1.8 por enquanto**. Portanto, nesse tema, as três aparições originais do retrato continuam temporariamente autorizadas. Não foram introduzidas fotos natalinas, novos placeholders ou outras composições institucionais.

## Código e funcionalidades preservadas

As atribuições das fotos ficam em `src/content/christmasPhotography.ts`, consumidas por `christmas2026.ts`. A propriedade opcional `photography` fornece seleções aos mesmos componentes; o institucional usa integralmente os caminhos anteriores. `Photo` aceita alternativa mobile e enquadramento, sem alterar arquivos de imagem.

Onze arquivos críticos continuam byte a byte iguais ao backup aprovado: formulário, regras de validação/mensagem, configuração de contatos, hook de animações, CSS de movimento/formulário/tokens/temas, conteúdo evergreen, Sobre e `index.html`. O Hero mantém letter drop e reveal; a galeria mantém replay; o carrossel continua com **72000 ms**, dois grupos idênticos e direção inversa na segunda trilha. Nenhuma dependência, serviço, backend ou infraestrutura foi alterada.

`AGENTS.md` foi corrigido para registrar a V1.8 completa como autoridade e a rejeição da redução estrutural; o documento anterior da V1.8.1 foi mantido como histórico explicitamente rejeitado. DESIGN e PRODUCT foram recuperados da versão aprovada, com o contexto atual de acervo registrado sem redefinir a identidade visual.

## Comparações e validação

[Comparativo local da V1.8 recuperada com o novo acervo](http://127.0.0.1:5173/tmp/recovery-qa/comparacao.html), com Vite ativo. São 20 pares: páginas completas e regiões natalinas em 390/1440 px, mais páginas completas institucionais nas duas larguras. As páginas completas são montagens ordenadas de capturas reais das seções após carregar fotos e concluir entradas; esse método está identificado no visualizador. Não há recomposição inventada ou remoção de conteúdo na montagem.

Foram abertos para inspeção visual os comparativos completos e enquadramentos de Hero, galeria, contato e áreas finais. As capturas recuperadas e finais incluem as regiões intermediárias, cenário, FAQ, fechamento e rodapé. Inventários com imagens/alturas em `tmp/recovery-qa/restored/inventory.json` e `final/inventory.json`.

- `npm test`: **10/10 testes existentes aprovados**.
- `npm run lint`: aprovado.
- `npm run build`: TypeScript (`tsc -b`) e Vite aprovados.
- Edge/Chromium: **16/16 combinações aprovadas** nos temas natalino/institucional e larguras 320, 375, 390, 430, 768, 1024, 1440 e 1920 px.
- Conferidos ordem/composição mobile e desktop, ausência de overflow, texto legível, Hero responsivo correto, quatro fotos em cada galeria, seções recuperadas, 18 fotos estáticas sem repetição no natalino e exceção institucional autorizada.
- Cinco entradas do formulário em ambos os temas; sete campos, máscara com +55, erros, validade, foco inicial/retorno, Tab/Shift+Tab, Escape, cancelamento e fechamento/reabertura. Submissão interceptada com dados fictícios: destino oficial `5514997754940`, mensagem por tema e cidade/UF corretos; faixa de investimento não incluída na mensagem. Nenhuma mensagem enviada.
- FAQ por teclado, Experiência/Preparação, retorno ao início, replay da galeria, Instagram, duração e emenda do loop conferidos. Console sem erros na verificação complementar final.
- Carregadas no navegador as 18 opções natalinas do comparativo; os dois pares institucionais também estão disponíveis e foram inspecionados como imagens.

Relatórios: `tmp/recovery-qa/test-results.json`, `extra-results.json`, `preservation-check.json`, `restoration.json` e `selected-inventory.json`. Backups, QA e o ZIP original são preservados; nada disso entra no build do site.

Safari/iPhone físico não estavam disponíveis. Materiais institucionais definitivos e depoimentos reais continuam pendentes. O tema ativo permanece `christmas2026`. **Sem commit, push, deploy, mudanças no Coolify, DNS ou produção.**
