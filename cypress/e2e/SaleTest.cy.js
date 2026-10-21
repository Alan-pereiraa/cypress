import CheckoutOverviewPage from '../pages/CheckoutOverviewPage'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'

describe('Venda', () => {
    beforeEach(() => {
        cy.fixture('usuarios').then(({ valido }) => {
            cy.login(valido.username, valido.password)
        })
        cy.fixture('produtos').then(({ mochila }) => {
            cy.adicionarAoCarrinho(mochila.slug)
        })
    })

    it('Deve realizar uma venda', () => {
        cy.fixture('checkout').then(({ cliente, sucesso }) => {
            cy.preencherCheckout(cliente)
            CheckoutOverviewPage.finalizar()
            CheckoutCompletePage.titulo().should('have.text', sucesso)
        })
    })
})
