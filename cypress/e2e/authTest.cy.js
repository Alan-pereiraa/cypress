import LoginPage from '../pages/LoginPage'

describe('Autenticação', () => {
    beforeEach(() => {
        LoginPage.visitar()
    })

    it('Deve autenticar com sucesso', () => {
        cy.fixture('usuarios').then(({ valido }) => {
            LoginPage.preencher(valido)
        })
        LoginPage.entrar()
        cy.url().should('include', '/inventory.html')
    })

    it('Deve falhar na autenticação com usuário incorreto', () => {
        cy.fixture('usuarios').then(({ bloqueado }) => {
            LoginPage.preencher(bloqueado)
        })
        LoginPage.entrar()
        LoginPage.erro().should('be.visible')
    })
})
