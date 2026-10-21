import CheckoutInfoPage from '../pages/CheckoutInfoPage'
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
        cy.url().should('include', '/checkout-complete.html')
    })

    it('Deve exigir o primeiro nome no checkout', () => {
        cy.fixture('checkout').then(({ semNome, erroSemNome }) => {
            cy.preencherCheckout(semNome)
            CheckoutInfoPage.erro().should('have.text', erroSemNome)
        })
        cy.url().should('include', '/checkout-step-one.html')
    })
})
