import InventoryPage from '../pages/InventoryPage'

describe('Carrinho de Compras', () => {
    beforeEach(() => {
        cy.fixture('usuarios').then(({ valido }) => {
            cy.login(valido.username, valido.password)
        })
    })

    it('Deve adicionar um produto ao carrinho', () => {
        cy.fixture('produtos').then(({ mochila }) => {
            cy.adicionarAoCarrinho(mochila.slug)
        })
        InventoryPage.badge().should('contain', '1')
    })
})
