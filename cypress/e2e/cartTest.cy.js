import LoginPage from '../pages/LoginPage'

describe('Carrinho de Compras', () => {
    beforeEach(() => {
        LoginPage.visitar()
        LoginPage.preencher({ username: 'standard_user', password: 'secret_sauce' })
        LoginPage.entrar()
        cy.url().should('include', '/inventory.html')
    })

    it('Deve adicionar um produto ao carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '1')
    })
})
