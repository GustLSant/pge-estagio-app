# Projeto Estágio PGE-SE

Nome Completo: Gustavo Lucas Santana

Url pública do projeto: https://pge-estagio-app.vercel.app/

Link do projeto de interfaces: https://www.figma.com/design/fzRvYmV8rrqipwqAwn0ghN/Estagio-PGE?node-id=0-1&t=ln5CueP1jCK6BRCC-1


## Considerações
Esse projeto foi realizado tendo como alvo a vaga de Desenvolvedor Front-end, sendo assim, toda a parte de servidor e de banco de dados funciona localmente:
- `./src/backend/server.ts` é o arquivo responsável pelas funções que simulam requisições para o servidor
- `./src/backend/database.ts` é o arquivo que contém os dados simulados de demonstração

A ideia foi criar um ambiente que simula uma aplicação real, com integração entre front-end e servidor (incluindo o delay natural das requisições HTTP), proporcionando uma experiência mais próxima da realidade.

Detalhes sobre o sistema de login e de proteção de rotas podem ser encontrados no arquivo `./Docs.md`


## Manual de execução do projeto
O projeto utiliza o Node.js como ambiente de execução.
https://nodejs.org/en/download

Comando para instalar as dependências: `npm install`

Comando para iniciar o ambiente de desenvolvimento: `npm run dev`


### Tecnologias utilizadas:
- Typscript
- HTML
- CSS
- JavaScript

### Framework utilizado:
- React

### Bibliotecas utilizadas:
- React Router DOM
- React Icons

### Bundler utilizado:
- Vite

