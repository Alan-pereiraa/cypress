import InventoryPage from '../pages/InventoryPage'
import CartPage from '../pages/CartPage'
import CheckoutInfoPage from '../pages/CheckoutInfoPage'
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'

describe('Venda', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    it('Deve realizar uma venda', () => {
        InventoryPage.adicionar('sauce-labs-backpack')
        InventoryPage.abrirCarrinho()
        CartPage.checkout()
        CheckoutInfoPage.preencher({ firstName: 'Alan', lastName: 'Pereira', postalCode: '12345-678' })
        CheckoutInfoPage.continuar()
        CheckoutOverviewPage.finalizar()
        CheckoutCompletePage.titulo().should('have.text', 'Thank you for your order!')
    })
})
