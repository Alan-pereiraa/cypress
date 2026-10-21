import CheckoutOverviewPage from '../pages/CheckoutOverviewPage'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'

describe('Venda', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    it('Deve realizar uma venda', () => {
        cy.adicionarAoCarrinho('sauce-labs-backpack')
        cy.preencherCheckout({ firstName: 'Alan', lastName: 'Pereira', postalCode: '12345-678' })
        CheckoutOverviewPage.finalizar()
        CheckoutCompletePage.titulo().should('have.text', 'Thank you for your order!')
    })
})
