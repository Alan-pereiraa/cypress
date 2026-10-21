import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'

describe('Carrinho de Compras', () => {
    beforeEach(() => {
        LoginPage.visitar()
        LoginPage.preencher({ username: 'standard_user', password: 'secret_sauce' })
        LoginPage.entrar()
        cy.url().should('include', '/inventory.html')
    })

    it('Deve adicionar um produto ao carrinho', () => {
        InventoryPage.adicionar('sauce-labs-backpack')
        InventoryPage.badge().should('contain', '1')
    })
})
