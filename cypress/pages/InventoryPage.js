const InventoryPage = {
    itens: () => cy.get('[data-test="inventory-item"]'),
    // Usado dentro de within() para olhar um item específico da lista
    nome: () => cy.get('[data-test="inventory-item-name"]'),
    badge: () => cy.get('[data-test="shopping-cart-badge"]'),
    botaoRemover: (slug) => cy.get(`[data-test="remove-${slug}"]`),

    adicionar(slug) {
        cy.get(`[data-test="add-to-cart-${slug}"]`).click()
    },

    abrirCarrinho() {
        cy.get('[data-test="shopping-cart-link"]').click()
    },
}

export default InventoryPage
