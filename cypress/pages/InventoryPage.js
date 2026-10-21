const InventoryPage = {
    itens: () => cy.get('[data-test="inventory-item"]'),
    // nome e preco são usados dentro de within() para olhar um item específico da lista
    nome: () => cy.get('[data-test="inventory-item-name"]'),
    preco: () => cy.get('[data-test="inventory-item-price"]'),
    imagem: (slug) => cy.get(`[data-test="inventory-item-${slug}-img"]`),
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
