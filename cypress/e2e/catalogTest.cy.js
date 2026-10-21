import InventoryPage from '../pages/InventoryPage'

describe('Catálogo de Produtos', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    it('Deve exibir a lista de produtos', () => {
        InventoryPage.itens().should('have.length.greaterThan', 0)
        InventoryPage.itens().first().within(() => {
            InventoryPage.nome().should('not.be.empty')
        })
    })
})