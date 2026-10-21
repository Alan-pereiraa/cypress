import LoginPage from '../pages/LoginPage'

describe('Autenticação', () => {
    const credentials = [
        { username: 'standard_user', password: 'secret_sauce', expectedUrl: '/inventory.html' },
        { username: 'locked_out_user', password: 'secret_sauce' },
    ]

    it('Deve autenticar com sucesso', () => {
        LoginPage.visitar()
        LoginPage.preencher({ username: credentials[0].username, password: credentials[0].password })
        LoginPage.entrar()
        cy.url().should('include', credentials[0].expectedUrl)
    })

    it('Deve falhar na autenticação com usuário incorreto', () => {
        LoginPage.visitar()
        LoginPage.preencher(credentials[1])
        LoginPage.entrar()
        LoginPage.erro().should('be.visible')
    })
})