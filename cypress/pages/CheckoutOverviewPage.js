const CheckoutOverviewPage = {
    finalizar() {
        cy.get('[data-test="finish"]').click()
    },
}

export default CheckoutOverviewPage
