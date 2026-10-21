import InventoryPage from '../pages/InventoryPage'

describe('Catálogo de Produtos', () => {
    beforeEach(() => {
        cy.fixture('usuarios').then(({ valido }) => {
            cy.login(valido.username, valido.password)
        })
    })

    it('Deve exibir a lista de produtos', () => {
        InventoryPage.itens().should('have.length.greaterThan', 0)
        InventoryPage.itens().first().within(() => {
            InventoryPage.nome().should('not.be.empty')
        })
    })
})