import LoginPage from '../pages/LoginPage'

describe('Venda', () => {
    beforeEach(() => {
        LoginPage.visitar()
        LoginPage.preencher({ username: 'standard_user', password: 'secret_sauce' })
        LoginPage.entrar()
        cy.url().should('include', '/inventory.html')
    })

    it('Deve realizar uma venda', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Alan')
        cy.get('[data-test="lastName"]').type('Pereira')
        cy.get('[data-test="postalCode"]').type('12345-678')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
    })
})
