const LoginPage = {
    visitar: () => cy.visit('/'),
    campo: (nome) => cy.get(`[data-test="${nome}"]`),
    botaoEntrar: () => cy.get('[data-test="login-button"]'),
    erro: () => cy.get('[data-test="error"]'),

    // Campo ausente nas credenciais não é digitado (cy.type não aceita string vazia)
    preencher(credenciais) {
        Object.entries(credenciais).forEach(([nome, valor]) => this.campo(nome).type(valor))
    },

    entrar() {
        this.botaoEntrar().click()
    },
}

export default LoginPage
