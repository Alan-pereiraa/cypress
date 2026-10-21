import InventoryPage from '../pages/InventoryPage'

describe('Carrinho de Compras', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    it('Deve adicionar um produto ao carrinho', () => {
        cy.adicionarAoCarrinho('sauce-labs-backpack')
        InventoryPage.badge().should('contain', '1')
    })
})
