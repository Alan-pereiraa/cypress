import LoginPage from '../pages/LoginPage'

Cypress.Commands.add('login', (username, password) => {
    LoginPage.visitar()
    LoginPage.preencher({ username, password })
    LoginPage.entrar()
    cy.url().should('include', '/inventory.html')
})
