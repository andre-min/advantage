import {Given, When, And, Then} from "cypress-cucumber-preprocessor/steps"

var nomeProdutoBusca;


Given(/^que o usuario esteja na pagina home "([^"]*)"$/, (args1) => {
	cy.visit(`https://advantageonlineshopping.com/${args1}`)
    cy.intercept('GET', '/app/views/home-page.html*').as('getElements')
    cy.wait('@getElements')
    
});
And(/^visualiza o texto "([^"]*)"$/, (args1) => {
	cy.get('.logoDemo').should('have.text', args1)
});
When(/^realiza uma busca pelo produto "([^"]*)"$/, (nomeProduto) => {
    nomeProdutoBusca = nomeProduto
    const btnBuscar = cy.get('#search > a')
    btnBuscar.click()
    cy.get('#autoComplete').type(nomeProdutoBusca)
    cy.get('.product > .roboto-regular').should('have.text', nomeProdutoBusca)
    btnBuscar.click()
});
Then(/^devera ser direcionado para a pagina resultado da pesquisa$/, () => {

	cy.get('.select').should('contains.text', nomeProdutoBusca)
});


Given(/^que o usuario esteja na pagina resultado da pesquisa "([^"]*)"$/, (args1) => {
	cy.visit(`https://advantageonlineshopping.com/${args1}`)
    cy.intercept('GET', '/app/views/search-page.html*').as('getElement')
    cy.wait('@getElement')
});
And(/^verifica se resultado da busca apresenta o produto "([^"]*)"$/, (args1) => {
	cy.get('#searchResultLabel').should('contains.text', `Search result: "${args1}"`)                                                   
});                                                                                                                                                                                                               


And(/^passa mouse sobre imagem do produto verifica se aparece o texto "([^"]*)"$/, (args1) => {
	cy.get('.imgProduct').realHover()
    cy.get('.AddToCard > .ng-scope')
        .should('be.visible')
        .should('contains.text', args1)
});

When(/^clica na imagem do produto$/, () => {
	cy.get('.AddToCard > .ng-scope').click()
});

Then(/^devera ser direcionado para a pagina especificacao do produto$/, () => {
	cy.get('section.ng-scope > :nth-child(3) > .roboto-regular').should('have.text', 'PRODUCT SPECIFICATIONS')
});


Given(/^que o usuario esteja na pagina de especificacao do produto id "([^"]*)"$/, (args1) => {
	cy.visit(`https://advantageonlineshopping.com/#/product/${args1}`)
    cy.intercept('GET', '/app/views/product-page.html*').as('getProduto')
    cy.wait('@getProduto')
});


And(/^seleciono uma cor "([^"]*)"$/, (args1) => {
	cy.get(`[ng-show="firstImageToShow"] > .${args1}`).click()
});


When(/^clica em adicionar o produto no carrinho$/, () => {
   
	cy.get('.fixedBtn > .roboto-medium').click()
});


Then(/^devera apresentar um pop-up com nome produto "([^"]*)"$/, (args1) => {
	cy.get('li > #toolTipCart > :nth-child(1) > table > tbody > #product > :nth-child(2) > a > h3.ng-binding')
        .should('have.text', args1)
});


Then(/^devera apresenta pou-up com  produtos adicionado$/, () => {
	cy.get('[colspan="2"] > .roboto-medium').invoke('text').then(($qtde) => {
        cy.log($qtde)
    })
});


And(/^clica no botao CHECKOUT$/, () => {
	cy.get('#checkOutPopUp').click()
});

And(/^sou direcionado para a pagina PEDIDO DE PAGAMENTO$/, () => {
	cy.get('.select').should('have.text', 'ORDER PAYMENT');
});

var cor1;
var cor2;
var vlr;
When(/^verifico quantidade valor cor do produto$/, () => {
    cy.get('li > #toolTipCart > :nth-child(1) > table > tbody > :nth-child(1) > :nth-child(2) > a > :nth-child(3) > .ng-binding')
        .invoke('text').then(($1cor) => {
            cor1 = $1cor
            
        })

    cy.get('li > #toolTipCart > :nth-child(1) > table > tbody > .lastProduct > :nth-child(2) > a > :nth-child(3) > .ng-binding')
        .invoke('text').then(($2cor) => {
            cor2 = $2cor
    })

    cy.get('li > #toolTipCart > :nth-child(1) > table > tbody > :nth-child(1) > :nth-child(2) > a > :nth-child(2)')
        .invoke('text').then(($qtde) => {
            cy.log('Aquiiiiiiiiiiiiiiii',$qtde)
        })

    cy.get('li > #toolTipCart > :nth-child(1) > table > tbody > :nth-child(1) > :nth-child(3) > .price')
        .invoke('text').then(($vlr) => {
            vlr = $vlr
            cy.log('Aquiiiiiiiiiiiiiiii',vlr)
        })
});



Then(/^verificar informacao RESUMO DO PEDIDO valor total cor quantidade igual "([^"]*)"$/, (args1) => {
    const qtdeTotal = parseInt(args1.replace(/\D/g, ''),10)
    cy.get('#userCart > #toolTipCart > :nth-child(1) > table > tbody > :nth-child(1) > :nth-child(2) > a > :nth-child(3) > .ng-binding')
        .invoke('text').then(($1corTelaPagamento) => {
            expect(cor1).to.be.equal($1corTelaPagamento)
    })
    cy.get('#userCart > #toolTipCart > :nth-child(1) > table > tbody > .lastProduct > :nth-child(2) > a > :nth-child(3) > .ng-binding')
        .invoke('text').then(($2corTelaPagamento) => {
            expect(cor2).to.be.equal($2corTelaPagamento)
    })

    cy.get('li > #toolTipCart > :nth-child(1) > table > tfoot > :nth-child(1) > [colspan="2"]')
        .invoke('text').then((qtdeProduto) => {
            cy.log(qtdeProduto)
        })

    cy.get('.itemsCount').invoke('text').then((qtdeStr) => {
        const quantidadeTotalProduto = parseInt(qtdeStr.replace(/\D/g, ''),10)
        expect(quantidadeTotalProduto).to.be.equal(qtdeTotal)

    })
    cy.get('.roboto-bold > .roboto-medium').invoke('text').then(($vlrTotal) => {
        const vlrUnitario = parseFloat(vlr.replace(/[^\d,.-]/g, '').replace(',', '.'));
        const vlrTotalFormatado = parseFloat($vlrTotal.replace(/[^\d,.-]/g, '').replace(',', '.'));
        expect(vlrTotalFormatado).to.be.equal(vlrUnitario * qtdeTotal)
        cy.log($vlrTotal)
    })
	
});


When(/^preencho o campo busca pelo produto "([^"]*)" inexistente$/, (args1) => {
    const btnBuscar = cy.get('#search > a')
    btnBuscar.click()
    cy.get('#autoComplete').type(args1)
    btnBuscar.click()
});



Then(/^devera apresentar mensagem No results for "([^"]*)"$/, (args1) => {
    
    cy.intercept('GET', '/catalog/api/v1/categories/all_data*').as('getElement')
    cy.wait('@getElement', {timeout: 10000})    
    
	cy.get('.textAlignCenter').find('span').invoke('text').then((msg) => {
        const msgFormatada = msg.replace(/\s+/g, ' ').trim();
        const msgSemAspas = msgFormatada.replaceAll('"', '')
        
        expect(`No results for ${args1}`).to.be.equal(msgSemAspas)
    })
});


