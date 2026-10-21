import InventoryPage from '../pages/InventoryPage'

// Rotas das imagens de produto do Sauce Demo (o hash no nome muda a cada deploy)
const IMAGEM_MOCHILA = '**/sauce-backpack-*.jpg'
const IMAGENS_DOS_PRODUTOS = '**/assets/*-1200x1500-*.jpg'

describe('Catálogo com stubs de imagem', () => {
    beforeEach(() => {
        // Estado previsível: as imagens têm cache de 10 min (max-age=600) e uma imagem
        // vinda do cache não passa pelo cy.intercept. Desliga o cache (Electron/Chrome).
        cy.wrap(Cypress.automation('remote:debugger:protocol', {
            command: 'Network.setCacheDisabled',
            params: { cacheDisabled: true },
        }))
    })

    it('Deve exibir a imagem do produto servida pelo stub', () => {
        cy.intercept('GET', IMAGEM_MOCHILA, { fixture: 'mochila.png' }).as('imagem')
        cy.fixture('usuarios').then(({ valido }) => {
            cy.login(valido.username, valido.password)
        })
        cy.wait('@imagem')
        cy.fixture('produtos').then(({ mochila }) => {
            // A imagem real tem 1200 px de largura; a do stub tem 1 px
            InventoryPage.imagem(mochila.slug).should(($img) => {
                expect($img[0].naturalWidth).to.eq(1)
            })
        })
    })

    it('Deve manter o catálogo utilizável quando as imagens falham', () => {
        cy.intercept('GET', IMAGENS_DOS_PRODUTOS, { statusCode: 404 }).as('imagens')
        cy.fixture('usuarios').then(({ valido }) => {
            cy.login(valido.username, valido.password)
        })
        cy.wait('@imagens')
        InventoryPage.itens().should('have.length.greaterThan', 0).each(($item) => {
            cy.wrap($item).within(() => {
                InventoryPage.nome().should('not.be.empty')
                InventoryPage.preco().should('contain', '$')
            })
        })
        cy.fixture('produtos').then(({ mochila }) => {
            InventoryPage.imagem(mochila.slug).should(($img) => {
                expect($img[0].complete).to.be.true
                expect($img[0].naturalWidth).to.eq(0)
            })
            cy.adicionarAoCarrinho(mochila.slug)
        })
        InventoryPage.badge().should('contain', '1')
    })
})
