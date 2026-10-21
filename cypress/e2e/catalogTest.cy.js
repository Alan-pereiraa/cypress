import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'

describe('Catálogo de Produtos', () => {
    beforeEach(() => {
        LoginPage.visitar()
        LoginPage.preencher({ username: 'standard_user', password: 'secret_sauce' })
        LoginPage.entrar()
    })

    it('Deve exibir a lista de produtos', () => {
        InventoryPage.itens().should('have.length.greaterThan', 0)
        InventoryPage.itens().first().within(() => {
            InventoryPage.nome().should('not.be.empty')
        })
    })
})