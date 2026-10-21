import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'
import CartPage from '../pages/CartPage'
import CheckoutInfoPage from '../pages/CheckoutInfoPage'

Cypress.Commands.add('login', (username, password) => {
    LoginPage.visitar()
    LoginPage.preencher({ username, password })
    LoginPage.entrar()
    cy.url().should('include', '/inventory.html')
})

Cypress.Commands.add('adicionarAoCarrinho', (slug) => {
    InventoryPage.adicionar(slug)
    InventoryPage.botaoRemover(slug).should('be.visible')
})

Cypress.Commands.add('preencherCheckout', (cliente) => {
    InventoryPage.abrirCarrinho()
    CartPage.checkout()
    CheckoutInfoPage.preencher(cliente)
    CheckoutInfoPage.continuar()
})
