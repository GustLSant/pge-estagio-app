# Documentação Sistema de Gerenciamento de Processos - Estágio PGE

## Sumário
[1. Autenticação com useContext e sessionStorage](#autenticação-com-usecontext-e-sessionstorage)
[2. Proteção de rotas com o useContext e o react-router-dom](#proteção-de-rotas-com-o-usecontext-e-o-react-router-dom)


## Autenticação com useContext e sessionStorage

Esse sistema tem como objetivo realizar a autenticação do usuário e mantê-lo autenticado mesmo depois de atualizações e mudanças na url da janela.


### Arquivos envolvidos:

- /contexts/AuthContext.tsx
- /pages/general/LoginPage.tsx
- /backend/server.ts
- /backend/database.ts


### AuthContext.tsx

É o arquivo que guarda o context com todas as informações do usuário.

Ao iniciar o sistema, tenta resgatar os dados do usuário (do sessionStorage) logado da última vez, caso existam.

Ele fornece acesso ao `user: User | undefined` e ao `setUser: React.Dispatch<React.SetStateAction<User | undefined>>`para toda a aplicação.

<small>**Tanto o context quanto suas propriedades podem ser undefineds.**</small>


### LoginPage.tsx

É o arquivo da página em que o usuário digita suas credenciais de login.

Ao clicar no botão de fazer login, o sistema irá utilizar a função `tryLogin` do server.ts que retornará uma `Response` com os dados do usuário caso a requisição seja bem sucedida, ou com `null` caso a requisição seja má sucedida.

Caso a essa requisição seja bem sucedida, esse arquivo irá executar a função `authContext.setUser({...response.data});` para atualizar os dados do context, salvar as informações desse usuário atual no _sessionStorage_ e redirecionar o usuário para a página correta a depender de sua _role_.


### Server.ts
É o arquivo que faz a comunicação do front-end com o banco de dados local.

Nesse caso, atua procurando os dados do usuário e validando suas credenciais.

Sempre que o sistema é iniciado, salva as informações padrão do _Database.ts_ no _sessionStorage_, através da função `initializeDatabase();` importada e executada pelo arquivo _main.tsx_.


### Database.ts
É o arquivo que mantem o banco de dados local.

Possue as informações padrão do sistema.

<br />

## Proteção de rotas com o useContext e o react-router-dom

O objetivo deste sistema é restringir o acesso às páginas para usuários não autenticados ou com uma _role_ não autorizada.

## Arquivos Envolvidos

- /routes.tsx
- /components/ProtectedRoute.tsx
- /context/AuthContext.tsx

## routes.tsx

É o arquivo responsável por definir todas as rotas do sistema, especificando a hierarquia e a URL de redirecionamento caso o usuário tente acessar uma página não autorizada (através do _ProtectedRoute_) ou caso o usuário tente acessar alguma url mal estruturada (ex: parâmetros incompletos).

Exemplo de uso do _ProtectedRoute.tsx_ dentro do _routes.ts_: `<ProtectedRoute allowedRoles={['client']} />`, nesse exemplo, somente usuários clientes são permitidos.


## ProtectedRoute.tsx

É o arquivo que faz o controle do acesso à páginas restritas à _role(s)_ especifica(s).

Utiliza o `user` do _AuthContext.tsx_ e sua prop `allowedRoles: UserRole[]` para verificar se o usuário é permitido naquela página.

Caso o usuário não seja permitido, esse mesmo aquivo faz o redirecionamento.

## AuthContext.tsx

O state `user` desse arquivo é do tipo `User` (definido no arquivo /types.ts), e possue a informação de sua _role_ disponível para a validação pelo _ProtectedRoute.tsx_.


