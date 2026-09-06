# dev-burger-api
#![Tests](https://github.com/OzielCosta-Dev/dev-burger-api/actions/workflows/tests.yml/badge.svg)


API para o projeto Dev Burger.

## Tecnologias

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT
- bcrypt
- multer
- yup

## Configuração

1. Copie o arquivo de exemplo de variáveis de ambiente:

```bash
cp .env.example .env
```

2. Ajuste `DATABASE_URL` em `.env` se necessário.

## Instalação

Instale as dependências:

```bash
pnpm install
```

> Se não estiver usando `pnpm`, `npm install` também funcionará.

## Executando o projeto

Inicie o servidor em modo de desenvolvimento:

```bash
pnpm dev
```

O servidor principal está em `src/server.js`.

## Banco de dados

Este projeto usa PostgreSQL. Você pode iniciar o serviço PostgreSQL com Docker Compose:

```bash
pnpm db:up
```

Para parar o banco:

```bash
pnpm db:down
```

Para acompanhar os logs do banco de dados:

```bash
pnpm db:logs
```

## Estrutura principal

- `src/server.js` - inicialização do servidor
- `src/routes.js` - definição de rotas
- `src/app/controllers` - controladores
- `src/app/models` - modelos
- `src/config` - configuração de autenticação, banco e uploads
- `src/database/migrations` - migrações do Sequelize
- `uploads/` - arquivos enviados

## Observações

- Mantenha o arquivo `.env` fora do controle de versão.
- Use `src/database/migrations` para gerenciar alterações no esquema do banco.
