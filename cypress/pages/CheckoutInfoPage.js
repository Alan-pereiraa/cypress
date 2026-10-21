const CheckoutInfoPage = {
    campo: (nome) => cy.get(`[data-test="${nome}"]`),
    erro: () => cy.get('[data-test="error"]'),

    // Campo ausente no cliente não é digitado (cy.type não aceita string vazia)
    preencher(cliente) {
        Object.entries(cliente).forEach(([nome, valor]) => this.campo(nome).type(valor))
    },

    continuar() {
        cy.get('[data-test="continue"]').click()
    },
}

export default CheckoutInfoPage
