![Logo](github-images/emprestimo.png)

Esta API fornece uma solução para validar se uma pessoa é apta a realizar um empréstimo. Ela valida as informações da pessoa, e retorna um JSON com o valor de cada parcela de cada mês. Assim, as instituições financeiras podem utilizar esta API para avaliar rapidamente a capacidade de empréstimo de seus clientes e oferecer soluções financeiras personalizadas.


## Instalação

Primeiramente clone este repositório

```bash
  git clone https://github.com/Casmei/validador-de-emprestimo
  cd validador-de-emprestimo
```

<!-- Dentro da pasta do projeto, clone as variáveis de ambiente 
```bash
  cp .env.example .env
``` -->

Baixe as dependências e inicie o projeto

```bash
  npm i
  npm run start:dev
```
## Documentação
Para documentar a aplicação, foi utilizado o [Swagger](https://docs.nestjs.com/openapi/introduction), para acessar, inicie o projeto e entre nesse [link](http://localhost:3033/docs)
## Stack utilizada

**Back-end:** Typescript, Nest.js, TypeORM, SQLite
