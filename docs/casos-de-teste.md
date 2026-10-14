# Casos de Teste — Sauce Demo

Sistema sob teste: [https://saucedemo.com](https://saucedemo.com)
Ferramenta de automação: Cypress

---

## 1. Caso de teste: Autenticação correta

| Campo | Descrição |
|---|---|
| **ID** | CT-01 |
| **Funcionalidade** | Autenticação |
| **Objetivo** | Verificar que um usuário válido consegue acessar o sistema |
| **Pré-condições** | Usuário na página de login |
| **Dados de teste** | Usuário: `standard_user` · Senha: `secret_sauce` |
| **Automação** | `cypress/e2e/authTest.cy.js` — "Deve autenticar com sucesso" |

**Passos:**
1. Acessar a página inicial do sistema.
2. Preencher o campo **Username** com `standard_user`.
3. Preencher o campo **Password** com `secret_sauce`.
4. Clicar no botão **Login**.

**Resultado esperado:**
- O usuário é redirecionado para `/inventory.html`.
- A lista de produtos é exibida.

---

## 2. Caso de teste: Autenticação com usuário incorreto

| Campo | Descrição |
|---|---|
| **ID** | CT-02 |
| **Funcionalidade** | Autenticação |
| **Objetivo** | Verificar que o sistema bloqueia o acesso de um usuário inexistente |
| **Pré-condições** | Usuário na página de login |
| **Dados de teste** | Usuário: `usuario_invalido` · Senha: `secret_sauce` |
| **Automação** | `cypress/e2e/authTest.cy.js` — "Deve falhar na autenticação com usuário incorreto" |

**Passos:**
1. Acessar a página inicial do sistema.
2. Preencher o campo **Username** com `usuario_invalido`.
3. Preencher o campo **Password** com `secret_sauce`.
4. Clicar no botão **Login**.

**Resultado esperado:**
- O usuário permanece na página de login.
- É exibida a mensagem de erro: *"Epic sadface: Username and password do not match any user in this service"*.

---

## 3. Caso de teste: Ordenar produtos por preço

| Campo | Descrição |
|---|---|
| **ID** | CT-03 |
| **Funcionalidade** | Catálogo de produtos (inventário) |
| **Objetivo** | Verificar que o filtro de ordenação organiza os produtos do menor para o maior preço |
| **Pré-condições** | Usuário autenticado com `standard_user` e na página `/inventory.html` |
| **Dados de teste** | Opção de ordenação: `Price (low to high)` |
| **Automação** | A implementar em `cypress/e2e/inventoryTest.cy.js` |

**Passos:**
1. Realizar login com `standard_user` / `secret_sauce`.
2. Na lista de produtos, abrir o seletor de ordenação.
3. Selecionar a opção **Price (low to high)**.

**Resultado esperado:**
- Os produtos são exibidos em ordem crescente de preço.
- O primeiro produto da lista é `Sauce Labs Onesie` ($7.99).
- O último produto da lista é `Sauce Labs Fleece Jacket` ($49.99).

---

## 4. Caso de teste: Adicionar produto ao carrinho

| Campo | Descrição |
|---|---|
| **ID** | CT-04 |
| **Funcionalidade** | Carrinho de compras |
| **Objetivo** | Verificar que o usuário consegue adicionar um produto ao carrinho |
| **Pré-condições** | Usuário autenticado com `standard_user` e carrinho vazio |
| **Dados de teste** | Produto: `Sauce Labs Backpack` |
| **Automação** | A implementar em `cypress/e2e/cartTest.cy.js` |

**Passos:**
1. Realizar login com `standard_user` / `secret_sauce`.
2. Na lista de produtos, clicar em **Add to cart** no produto `Sauce Labs Backpack`.
3. Clicar no ícone do carrinho.

**Resultado esperado:**
- O botão do produto muda para **Remove**.
- O ícone do carrinho exibe o contador `1`.
- Na página do carrinho (`/cart.html`), o produto `Sauce Labs Backpack` é listado com quantidade 1.

---

## 5. Caso de teste: Finalizar compra com sucesso

| Campo | Descrição |
|---|---|
| **ID** | CT-05 |
| **Funcionalidade** | Checkout |
| **Objetivo** | Verificar que o usuário consegue concluir uma compra com um produto no carrinho |
| **Pré-condições** | Usuário autenticado com `standard_user` e com o produto `Sauce Labs Backpack` no carrinho |
| **Dados de teste** | First Name: `Alan` · Last Name: `Pereira` · Zip/Postal Code: `12345-678` |
| **Automação** | A implementar em `cypress/e2e/cartTest.cy.js` |

**Passos:**
1. Acessar o carrinho e clicar em **Checkout**.
2. Preencher **First Name**, **Last Name** e **Zip/Postal Code** com os dados de teste.
3. Clicar em **Continue**.
4. Na tela de resumo (`/checkout-step-two.html`), conferir o produto e o valor total.
5. Clicar em **Finish**.

**Resultado esperado:**
- O usuário é redirecionado para `/checkout-complete.html`.
- É exibida a mensagem *"Thank you for your order!"*.
- O contador do carrinho deixa de ser exibido.
