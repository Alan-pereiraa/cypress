# Refatoração da suíte — Atividade 2

Diagnóstico de smells da suíte entregue na A1 (commit `632ca63`), ponto de partida da refatoração, e a solução aplicada em cada um.

## Smells: problema → solução

| # | Smell | Onde (A1) | Por que é um problema | Solução |
|---|---|---|---|---|
| 1 | Esperas fixas `cy.wait(5000)` | `authTest.cy.js:9-27` (8×), `catalogTest.cy.js:4-8` (3×) | 57 s dos 61 s da execução são espera; não garante que a tela está pronta e esconde problemas de sincronização (a suíte da A1 chegou a travar no `catalogTest` durante a refatoração) | Esperas removidas; só asserções com retry (`should`) e `cy.wait('@alias')` de intercept |
| 2 | Login duplicado | `SaleTest.cy.js:2-8`, `cartTest.cy.js:2-8`, `catalogTest.cy.js:2-10`, `authTest.cy.js:7-27` | Qualquer mudança no login exige editar 5 lugares | Comando `cy.login(username, password)` em `cypress/support/commands.js` |
| 3 | Seletores espalhados nas specs | Todas as specs (ex.: `[data-test="username"]` em 6 lugares) | Mudança de UI quebra vários arquivos | Page Objects em `cypress/pages/`, um por tela; nenhum `cy.get` nas specs nem nos comandos |
| 4 | Seletor por classe CSS | `catalogTest.cy.js:13` (`.inventory_item`) | Classe de estilo muda com o layout | `[data-test="inventory-item"]` no `InventoryPage` |
| 5 | Dados fixos dentro do teste | `SaleTest.cy.js:11-19`, credenciais em todas as specs | Dados não podem ser reaproveitados nem variados sem editar o teste | Fixtures `usuarios.json`, `produtos.json`, `checkout.json` (`cy.fixture().then`) |
| 6 | Índices mágicos | `authTest.cy.js:2-5` (`credentials[0]`, `credentials[1]`) | Leitura difícil e estrutura de dados inconsistente | Array de cenários `invalidos` + `forEach(({ tipo, credenciais, erro }) => it(...))` |
| 7 | Nome do teste diferente do dado | `authTest.cy.js:19` ("usuário incorreto" usa `locked_out_user`) | O teste engana o leitor e cobre uma regra diferente da documentada | Cenários nomeados pelo dado: bloqueado, inexistente (CT-02) e sem senha (limite, CT-09) |
| 8 | Asserções fracas | `authTest.cy.js:28`, `catalogTest.cy.js:2-10`, `SaleTest.cy.js:19` | Mensagem errada ou página errada ainda passariam | Texto exato do erro, URL conferida no `cy.login` e no fim da venda, botão **Remove** no `cy.adicionarAoCarrinho` |
| 9 | Sem infraestrutura de reuso | `cypress.config.js` (`supportFile: false`) | Impede comandos customizados | `cypress/support/e2e.js` + `commands.js` |
| 10 | Dependência externa sem controle | Todas as specs; `baseUrl` `saucedemo.com` (301 para `www`) | Redirect extra a cada visita; nenhum cenário cobre falha de rede | `baseUrl` `www`; stubs `cy.intercept` nas imagens: sucesso (fixture) e falha (`404`) |

## Estrutura

| Item | Onde |
|---|---|
| Page Objects (um por tela) | `cypress/pages/`: `LoginPage`, `InventoryPage`, `CartPage`, `CheckoutInfoPage`, `CheckoutOverviewPage`, `CheckoutCompletePage` |
| Comandos (passos repetidos) | `cy.login`, `cy.adicionarAoCarrinho`, `cy.preencherCheckout` |
| Dados | `cypress/fixtures/` |
| Stubs | `cypress/e2e/catalogStubTest.cy.js` (CT-07 sucesso, CT-08 falha) |

Cobertura: os 6 testes da A1 continuam (o de usuário bloqueado foi renomeado para refletir o dado) e foram adicionados 5: usuário inexistente, sem senha, checkout sem nome e os 2 stubs. Total: 11.

## Desvios conscientes dos slides

| Padrão | Por que não |
|---|---|
| `data-cy` | O Sauce Demo é de terceiros e já expõe `data-test` estável |
| `cy.session` no `cy.login` | O login é local e instantâneo; o deep link `/inventory.html` responde 404 no GitHub Pages |
| `cy.request`, `cy.task`, `Date.now()` | O Sauce Demo não tem API nem banco; os dados são fixos |
| `Cypress.env` para a senha | `secret_sauce` é pública (aparece na própria tela de login) |

## Estabilidade

Suíte executada 3 vezes seguidas com `npx cypress run` (Electron, Cypress 16.1.0):

| Execução | Resultado | Duração |
|---|---|---|
| 1 | 11/11 ✔ | 6 s |
| 2 | 11/11 ✔ | 6 s |
| 3 | 11/11 ✔ | 6 s |

Antes da refatoração: 6 testes em 61 s.
