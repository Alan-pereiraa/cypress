describe('Autenticação', () => {
    const credentials = [
        { username: 'standard_user', password: 'secret_sauce', expectedUrl: '/inventory.html' },
        { username: 'locked_out_user', password: 'secret_sauce' },
    ]

    it('Deve autenticar com sucesso', () => {
        cy.visit('/')
        cy.wait(5000)
        cy.get('[data-test="username"]').type(credentials[0].username)
        cy.wait(5000)
        cy.get('[data-test="password"]').type(credentials[0].password)
        cy.wait(5000)
        cy.get('[data-test="login-button"]').click()
        cy.wait(5000)
        cy.url().should('include', credentials[0].expectedUrl)
    })

    it('Deve falhar na autenticação com usuário incorreto', () => {
        cy.visit('/')
        cy.wait(5000)
        cy.get('[data-test="username"]').type(credentials[1].username)
        cy.wait(5000)
        cy.get('[data-test="password"]').type(credentials[1].password)
        cy.wait(5000)
        cy.get('[data-test="login-button"]').click()
        cy.wait(5000)
        cy.get('[data-test="error"]').should('be.visible')
    })
})