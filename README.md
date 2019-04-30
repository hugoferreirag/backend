# API SignIn - SignUp
Teste Tech Mahinda

1 - Signup :
 * Sign up requer dados como nome , telefone , email, e insere dados do tipo data de ultimo acesso, criação, e atualização do uzuario atravez de variaveis geradas na função, no banco de dados.
 * Gera um token JWT de acesso a API que tambem e inserido no BD
 * Retorna um json com os campos inseridos apois concluir com exito
 2 - SignIn
 * requer email e senha para entrar, retornando os dados do usuario em json
 * Gera um token de Auth
 
 3 - Buscar usuario
 * Requer um token de autentificação, gerado no Signin, para que quando inserido no header bearer, seja autenticado e comparado ao do modelo logado, assim liberando a execução da busca de usuário por ID, Caso o token expire, ocorre falha na autentificação (o token expira em meia hora ** 30 mins)

URLS

SignUP:
https://backendsky.herokuapp.com/signup // Cadastrese 

SignIn :
https://backendsky.herokuapp.com/signin // Login

Buscar usuario:
https://backendsky.herokuapp.com/users/:id // busque
