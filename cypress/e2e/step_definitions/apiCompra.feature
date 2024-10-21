Feature: Teste de API para busca de produto

Scenario: Verifique se a lista exibe somente produtos conforme sua busca.
	Given faco um request metodo "GET" recurso "catalog/api/v1/products/search" enviando os parametros "HP USB 3 Button Optical Mouse" "1"
	When status code do response for "200"
    Then devo ver produtos conforme sua busca "HP USB 3 Button Optical Mouse"

Scenario: Buscar por categoria
    Given faco um request metodo "GET" recurso "catalog/api/v1/products/search" enviando os parametros "Speakers" "20"
	When status code do response for "200"
	Then devo ver produtos cuja categoria id seja "4"

Scenario: Realizar login 
	Given faco um request metodo "POST" recurso "accountservice/accountrest/api/v1/login" enviando os parametros obrigatorios
	When status code do response for "200" 
    Then o token nao deve estar nulo

Scenario: Verificar quantidade de imagem de um produto
	Given faco um request metodo "GET" recurso "catalog/api/v1/products" enviando id "13" 
    When status code do response for "200"
    Then devera apresentar produto com id conforme minha busca
	And verifico quantidade de imagem 

Scenario: Realizar Upload de nova imagem
    Given faco um request metodo "POST" recurso "accountservice/accountrest/api/v1/login" enviando os parametros obrigatorios
	When envio uma imagem para atualizar produto "13"
	Then status code do response for "200" 

Scenario: Validar se a imagem foi inserida com sucesso
	Given faco um request metodo "GET" recurso "catalog/api/v1/products" enviando id "13" 
    When status code do response for "200"
	Then apresentar a quantidade da imagem adicionando "1"