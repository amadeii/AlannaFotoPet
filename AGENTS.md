# Alanna Foto Pet — orientações do projeto

## Identidade e interface
- Marca: Alanna Rodrigues Fotografia Pet. Prioridade mobile-first, com atenção a 375, 390 e 430 px.
- Preservar Playfair Display, Montserrat e a paleta aprovada: creme, verde pinheiro e bordô. Tokens em `src/styles/`.
- Manter a estrutura editorial completa da V1.8. A redução estrutural da V1.8.1 foi rejeitada e revertida. Não retornar aos layouts V1.5–V1.7 nem iniciar outro redesign sem pedido.
- Usar fotografias reais, sem distorção ou retoques gerados. Cada foto tem uma função estática principal; reutilizações do carrossel e cópias técnicas do loop são intencionais.
- No natalino, preservar o retrato verdadeiro na apresentação profissional e adaptar o acervo aos demais espaços existentes. Não remover, encurtar ou reorganizar seções/faixas para distribuir fotos. Sem textos sobre fotos, ornamentos excessivos, emojis ou navbar.
- Exceção autorizada na V1.8.3: frase “Você merece viver isso!” e carrossel formam uma única seção bordô, com trilhas laterais e texto em área central limpa. Hero natalino usa cenário dominante e FAQ preserva o pet inteiro. Não desfazer esses refinamentos nem aplicar suas regras ao institucional.
- Exceção institucional confirmada pelo usuário: manter a composição da V1.8 idêntica por enquanto, inclusive as três aparições do retrato, até haver materiais institucionais próprios.
- Exceção autorizada na V1.8.5: campanha natalina alterna exatamente Hero/carrossel, Alanna/faixa bordô, cenário/carrossel, convite/carrossel e FAQ/carrossel. Seções principais têm altura mínima da viewport; galerias existentes usam movimento contínuo. Esta ordem substitui a restrição anterior de não reorganizar, sem autorizar outro redesign ou mudanças no institucional. Detalhes em `docs/V1.8.5-alternancia-estrutural.md`.

## Arquitetura
- React, Vite e TypeScript; conteúdo separado dos componentes em `src/content/`.
- `christmas2026` e `evergreen` têm conteúdo independente. Seleção em `src/config/site.ts`; não preencher o institucional com fotografias natalinas.
- Referências das fotos selecionadas e seus espaços existentes ficam em `src/content/christmasPhotography.ts`, consumido por `christmas2026.ts`; marca e retrato em `shared.ts`.
- Preservar a arquitetura simples, sem backend, chatbot, dependências ou serviços desnecessários.

## Funcionalidades
- Preservar o formulário de sete campos, máscara, validações, faixa informativa de investimento e confirmação deliberada para o WhatsApp. Não criar pacotes ou tabelas de preços.
- Contatos oficiais em `src/config/contact.ts`: WhatsApp +55 14 99775-4940 e Instagram @alannafotopet. Não trocar sem necessidade autorizada.
- Preservar FAQ, teclado, foco, SVGs, estados de hover, letter drop, replays e carrossel contínuo de 72 segundos.
- Não inventar depoimentos ou adicionar seções sem justificativa. Materiais institucionais pendentes devem continuar identificados com honestidade.

## Fluxo de trabalho
- Inspecionar código, Git e documentação antes de editar. Preservar mudanças anteriores e assets originais; não usar reset destrutivo.
- Validar renderização mobile e desktop, ambos os temas, ausência de overflow e fluxos afetados. Build aprovado não substitui inspeção visual.
- Executar `npm test`, `npm run lint` e `npm run build` (inclui TypeScript), usando Node 22.13+ ou 24. Não afirmar verificações não executadas.
- Documentar alterações relevantes e diferenças intencionais, sem duplicar todo o README.
- Não instalar dependências nem baixar ferramentas sem autorização. Não fazer commit, push, deploy ou alterações em produção/Coolify/DNS sem autorização explícita.

Referências locais: `README.md`, `DESIGN.md`, `docs/V1.8-reference-map.md`, `docs/recuperacao-V1.8-curadoria.md` e `docs/V1.8.3-refinamento.md`. `docs/V1.8.1-curadoria.md` registra uma tentativa rejeitada; não é a direção vigente.
