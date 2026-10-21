describe('Catálogo de Produtos', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    })

    it('Deve exibir a lista de produtos', () => {
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })
})