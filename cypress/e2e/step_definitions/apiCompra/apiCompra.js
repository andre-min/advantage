var produto;
var statusCode;
var token;
var usuarioId;
var idBuscaProduto;
var quantidadeImagem;

Given(/^faco um request metodo "([^"]*)" recurso "([^"]*)" enviando os parametros "([^"]*)" "([^"]*)"$/, (metodo,recurso,nomeProduto,limite) => {
	const limiteFormatado = parseInt(limite, 10)
	cy.request({
    method: metodo, 
    url: `https://www.advantageonlineshopping.com/${recurso}`,  
    qs: {
        name: nomeProduto,
        quantityPerEachCategory: limiteFormatado
    }
    }).then((response) => {
        statusCode = response.status
        produto = response.body
    });
});

When(/^status code do response for "([^"]*)"$/, (args1) => {
	const argsFormatado = parseInt(args1.trim(), 10)
	expect(statusCode).to.be.equal(argsFormatado)
});

Then(/^devo ver produtos conforme sua busca "([^"]*)"$/, (args1) => {
	const expectativa = JSON.stringify(produto[0].products[0].productName).replaceAll('"', '')
	expect(expectativa).to.be.equal(args1)
});


Then(/^devo ver produtos cuja categoria id seja "([^"]*)"$/, (args1) => {
	const produtos = produto[0].products
  const argsInt = parseInt(args1.trim(), 10)
  const todosIguais = produtos.every(produto => produto.categoryId === argsInt);
  expect(todosIguais).to.be.true;
});

Given(/^faco um request metodo "([^"]*)" recurso "([^"]*)" enviando os parametros obrigatorios$/, (metodo,recurso) => {
	cy.request({
        method: metodo, 
        url: `https://www.advantageonlineshopping.com/${recurso}`,  
        body: {
            email: "fidewa9734@angewy.com",
            loginPassword: "Ae223344",
            loginUser: "Paulo"
        }
        }).then((response) => {
            statusCode = response.status
            produto = response.body
            token = response.body.statusMessage.token
            usuarioId = response.body.statusMessage.userId
        });
});

Then(/^o token nao deve estar nulo$/, () => {
	expect(token).to.be.not.null
});

When(/^envio uma imagem para atualizar produto "([^"]*)"$/, (args1) => {  
  const argsFormatado = parseInt(args1.trim(), 10);
  const source = "teste_automatizado";
  const color = encodeURIComponent("#0000FF");    
    cy.fixture('bolo.jpg', 'binary').then(imageContent => {
        const blob = Cypress.Blob.binaryStringToBlob(imageContent);
        const formData = new FormData();
        formData.append('file', blob, 'bolo.jpg');
        cy.request({
            method: 'POST',
            url: `https://www.advantageonlineshopping.com/catalog/api/v1/product/image/${usuarioId}/${source}/${color}`,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
            },
            qs: {
                product_id: argsFormatado,
            },
            body: formData, 
        }).as('uploadImage').then((xhr) => {

        })
     });
});
  
Given(/^faco um request metodo "([^"]*)" recurso "([^"]*)" enviando id "([^"]*)"$/, (metodo,recurso,id) => {
  idBuscaProduto = id;
  cy.request({
    method: metodo, 
    url: `https://www.advantageonlineshopping.com/${recurso}/${id}`,  
    }).then((response) => {
        statusCode = response.status
        produto = response.body
    });
});

Then(/^devera apresentar produto com id conforme minha busca$/, () => {
  const idBuscaFormatado = parseInt(idBuscaProduto.trim(), 10)
	expect(idBuscaFormatado).to.be.equal(produto.productId)
});

And(/^verifico quantidade de imagem$/, () => {
  quantidadeImagem = produto.images.length

});

Then(/^apresentar a quantidade da imagem adicionando "([^"]*)"$/, (args1) => {
  const argsFormatado = parseInt(args1.trim(), 10)
	expect(quantidadeImagem + argsFormatado).to.be.equal(produto.images.length)
});
