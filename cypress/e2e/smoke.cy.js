import LoginPage from '../pages/LoginPage'

describe('Smoke Test', () => {
    it('Exibe a tela de login', () => {
        LoginPage.visitar()
        LoginPage.campo('username').should('be.visible')
        LoginPage.campo('password').should('be.visible')
        LoginPage.botaoEntrar().should('be.visible')
    })
})
