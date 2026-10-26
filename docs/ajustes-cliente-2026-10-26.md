# Ajustes da cliente — 26/10/2026

Implementação do arquivo `Briefing de Ajustes para Site Pet.png` e do esclarecimento do usuário sobre as partes circuladas. A estrutura editorial, as fotografias, os carrosséis e os efeitos existentes foram preservados.

## Conteúdo e FAQ

- Apresentação natalina com o título “Muito prazer, eu sou a Alanna!” e os três parágrafos exatos do briefing.
- Depoimentos com o título “O que dizem as famílias que já passaram por aqui”, sem subtítulo. Fotos, relatos, assinaturas, ordem e aspas permanecem intactos.
- Removido somente o pequeno texto “Um Natal para guardar” acima do título do convite. O restante da seção continua presente.
- Agendamento informa que a reserva ocorre pelo WhatsApp mediante pagamento integral ou parcial (sinal).
- A pergunta “Quais roupas são recomendadas?” e sua resposta foram retiradas. A nova pergunta “Qual look usar na sessão?” reúne a introdução, a paleta, as dicas e a orientação final da preparação. Não há disclosure de preparação separado abaixo das perguntas.
- Novo CTA “Quero agendar meu ensaio” após o FAQ abre o mesmo formulário dos demais botões, com contexto próprio na mensagem.

## Formulário compartilhado

O modal dos dois temas passa a ter um único fluxo: nome, raça, número de pets, número de pessoas, WhatsApp, cidade/UF e preferência de investimento, além da confirmação obrigatória de veracidade. O conteúdo e a composição institucional da página permanecem inalterados; ela utiliza o mesmo formulário atualizado.

Pets são informados como número inteiro positivo. Pessoas usam opções de 1 a 5+, mantendo também zero para o ensaio somente com pets já permitido no projeto. Cidade e UF ficam em um campo, com aceitação de formatos como `São Paulo - SP`, `São Paulo/SP` e `São Paulo SP`; a UF é validada e não é inferida pelo DDD.

A faixa de R$ 650 a R$ 1.260 continua informativa. As três preferências de investimento seguem o briefing, sem seleção inicial; a opção escolhida é incluída na mensagem para Alanna. Não são pacotes nem novas ofertas.

Máscara de telefone, validação, erros associados aos campos, Escape, ciclo de foco, retorno ao acionador e descarte dos dados ao fechar foram mantidos. Nenhum dado é armazenado. A abertura do WhatsApp continua dependendo da confirmação final, e o envio é realizado pelo visitante.

## Validação

- `npm test`: 12 testes aprovados, incluindo cidade/UF, quantidade numérica de pets, preferências de investimento e confirmação obrigatória.
- `npm run lint` e `npm run build` (TypeScript/Vite) aprovados com Node 24.
- Playwright/Edge: campanha natalina em 375, 390, 430 e 1440 px; institucional em 390 e 1440 px. Conteúdo, FAQ, CTA, estados inválidos, máscara, confirmação, mensagem final, teclado, foco, cancelamento, limpeza dos campos e ausência de overflow conferidos. Sem erros de console.
- Capturas e roteiro locais: `tmp/briefing-20261026-qa/` e `tmp/briefing-20261026-qa.py`. WhatsApp interceptado localmente durante o teste; nenhuma mensagem externa enviada. A inspeção visual usa navegador emulado, sem teste em aparelho físico.

Sem dependências novas, commit, push ou deploy nesta rodada.
