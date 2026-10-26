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

Pets usam as opções 1, 2, 3, 4 e 5+; em 5+, a pessoa informa a quantidade exata. Pessoas usam 0, 1, 2, 3, 4 e 5+, mantendo a possibilidade de ensaio somente com pets. As duas perguntas e a preferência de investimento usam seletores expansíveis que iniciam fechados e recolhem após a escolha. Cidade e UF ficam em um campo, com aceitação de formatos como `São Paulo - SP`, `São Paulo/SP` e `São Paulo SP`; a UF é validada e não é inferida pelo DDD.

A faixa informativa “Faixa de valores dos ensaios: R$ 650 a R$ 1.260” foi removida. A pergunta de investimento permanece com as alternativas “Entre R$650 e R$850”, “Entre R$850 e R$1.200” e “Indiferente, dependendo da entrega”, sem seleção inicial; a opção escolhida é incluída na mensagem para Alanna. Não são pacotes nem novas ofertas.

Máscara de telefone, validação, erros associados aos campos, Escape, ciclo de foco, retorno ao acionador e descarte dos dados ao fechar foram mantidos. Nenhum dado é armazenado. A abertura do WhatsApp continua dependendo da confirmação final, e o envio é realizado pelo visitante.

## Validação

- Nesta continuação, `npm run lint` e `npm run build` (TypeScript/Vite) passaram. `npm test` não iniciou com o Node 20.17 instalado porque `--experimental-strip-types` requer o runtime mínimo do projeto; usando o TypeScript já instalado com um loader temporário local, os 12 testes passaram.
- Formulário verificado no navegador local em 375, 390, 430 e 1440 px, com tokens natalinos e institucionais; sem overflow horizontal. Os três seletores, a quantidade exata para pets 5+, o estado incompleto, a confirmação obrigatória e a mensagem final foram conferidos. A abertura do WhatsApp foi interceptada; nenhuma mensagem externa foi enviada.
- As capturas e o roteiro da validação anterior ficam em `tmp/briefing-20261026-qa/` e `tmp/briefing-20261026-qa.py`. A inspeção visual usa navegador emulado, sem teste em aparelho físico.

Sem dependências novas, commit, push ou deploy nesta rodada.
