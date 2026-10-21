import LoginPage from '../pages/LoginPage'

describe('Catálogo de Produtos', () => {
    beforeEach(() => {
        LoginPage.visitar()
        LoginPage.preencher({ username: 'standard_user', password: 'secret_sauce' })
        LoginPage.entrar()
    })

    it('Deve exibir a lista de produtos', () => {
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })
})