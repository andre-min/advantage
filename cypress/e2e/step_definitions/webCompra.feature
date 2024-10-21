Feature: Realizar compra no site Advantage Online Shopping 

Scenario: Realizar a busca de um produto pelo nome com sucesso
   Given que o usuario esteja na pagina home "#"
   And visualiza o texto "DEMO"
   When realiza uma busca pelo produto "HP Z3200 WIRELESS MOUSE"
   Then devera ser direcionado para a pagina resultado da pesquisa


Scenario: Validar resultado da pesquisa
   Given que o usuario esteja na pagina resultado da pesquisa "#/search/?viewAll=HP%20Z3200%20WIRELESS%20MOUSE"
   And verifica se resultado da busca apresenta o produto "HP Z3200 WIRELESS MOUSE"
   When passa mouse sobre imagem do produto verifica se aparece o texto "SHOP NOW"
   When clica na imagem do produto
   Then devera ser direcionado para a pagina especificacao do produto


Scenario: Incluir produtos no carrinho
   Given que o usuario esteja na pagina de especificacao do produto id "28"
   And seleciono uma cor "RED"
   And clica em adicionar o produto no carrinho
   And seleciono uma cor "GRAY"
   When clica em adicionar o produto no carrinho
   Then devera apresenta pou-up com  produtos adicionado


Scenario: Validar pagina pagamento
   Given que o usuario esteja na pagina de especificacao do produto id "28"
   And seleciono uma cor "RED"
   And clica em adicionar o produto no carrinho
   And seleciono uma cor "GRAY"
   And clica em adicionar o produto no carrinho
   And verifico quantidade valor cor do produto
   And clica no botao CHECKOUT
   When sou direcionado para a pagina PEDIDO DE PAGAMENTO
   Then verificar informacao RESUMO DO PEDIDO valor total cor quantidade igual "2"


Scenario: Realizar a busca de um produto inexistente
    Given que o usuario esteja na pagina home "#"
    And visualiza o texto "DEMO"
    When preencho o campo busca pelo produto "Teste produto inexistente" inexistente
    Then devera apresentar mensagem No results for "Teste produto inexistente"