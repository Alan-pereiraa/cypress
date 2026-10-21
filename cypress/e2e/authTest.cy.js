import LoginPage from '../pages/LoginPage'
// import (e não cy.fixture) porque o forEach precisa dos dados para gerar os it()
import usuarios from '../fixtures/usuarios.json'

describe('Autenticação', () => {
    beforeEach(() => {
        LoginPage.visitar()
    })

    it('Deve autenticar com sucesso', () => {
        LoginPage.preencher(usuarios.valido)
        LoginPage.entrar()
        cy.url().should('include', '/inventory.html')
    })

    usuarios.invalidos.forEach(({ tipo, credenciais, erro }) => {
        it(`Deve recusar o usuário ${tipo}`, () => {
            LoginPage.preencher(credenciais)
            LoginPage.entrar()
            LoginPage.erro().should('have.text', erro)
        })
    })
})
