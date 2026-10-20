# Refatoração da suíte — Atividade 2

Diagnóstico de smells da suíte entregue na A1 (commit `632ca63`), ponto de partida da refatoração.

## Smells encontrados

| # | Smell | Onde | Por que é um problema |
|---|---|---|---|
| 1 | Esperas fixas `cy.wait(5000)` | `authTest.cy.js:9-27` (8×), `catalogTest.cy.js:4-8` (3×) | 57 s dos 61 s da execução são espera; não garante que a tela está pronta e esconde problemas de sincronização |
| 2 | Login duplicado | `SaleTest.cy.js:2-8`, `cartTest.cy.js:2-8`, `catalogTest.cy.js:2-10`, `authTest.cy.js:7-27` | Qualquer mudança no login exige editar 5 lugares |
| 3 | Seletores espalhados nas specs | Todas as specs (ex.: `[data-test="username"]` em 6 lugares) | Mudança de UI quebra vários arquivos |
| 4 | Seletor por classe CSS | `catalogTest.cy.js:13` (`.inventory_item`) | Classe de estilo muda com o layout; a aplicação já expõe `data-test="inventory-item"` |
| 5 | Dados fixos dentro do teste | `SaleTest.cy.js:11-19` (produto, nome, CEP, mensagem), credenciais em todas as specs | Dados não podem ser reaproveitados nem variados sem editar o teste |
| 6 | Índices mágicos | `authTest.cy.js:2-5` (`credentials[0]`, `credentials[1]`; `expectedUrl` só no primeiro) | Leitura difícil e estrutura de dados inconsistente |
| 7 | Nome do teste diferente do dado | `authTest.cy.js:19` ("usuário incorreto" usa `locked_out_user`; o CT-02 documenta `usuario_invalido`) | O teste engana o leitor e cobre uma regra diferente da documentada |
| 8 | Asserções fracas | `authTest.cy.js:28` (só `be.visible`), `catalogTest.cy.js:2-10` (não confere o login), `SaleTest.cy.js:19` (não confere a URL final) | Mensagem errada ou página errada ainda passariam |
| 9 | Sem infraestrutura de reuso | `cypress.config.js` (`supportFile: false`) | Impede comandos customizados |
| 10 | Dependência externa sem controle | Todas as specs; `baseUrl` `saucedemo.com` (redireciona 301 para `www`) | Redirect extra a cada visita; nenhum cenário cobre falha de rede |
