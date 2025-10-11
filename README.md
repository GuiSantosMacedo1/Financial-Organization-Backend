# Financial-Organization-Backend

Backend para organização financeira construído com Node.js, Express e TypeScript.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Superset tipado do JavaScript
- **CORS** - Middleware para Cross-Origin Resource Sharing

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/GuiSantosMacedo1/Financial-Organization-Backend.git
cd Financial-Organization-Backend
```

2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Como Executar

### Modo de Desenvolvimento
```bash
npm run dev
```

### Modo de Produção
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Health Check
- **GET** `/health` - Verifica se o servidor está funcionando

### Transações
- **GET** `/api/transactions` - Lista todas as transações
- **GET** `/api/transactions/:id` - Obtém uma transação por ID
- **POST** `/api/transactions` - Cria uma nova transação
- **PUT** `/api/transactions/:id` - Atualiza uma transação
- **DELETE** `/api/transactions/:id` - Remove uma transação

### Contas
- **GET** `/api/accounts` - Lista todas as contas
- **GET** `/api/accounts/:id` - Obtém uma conta por ID
- **POST** `/api/accounts` - Cria uma nova conta
- **PUT** `/api/accounts/:id` - Atualiza uma conta
- **DELETE** `/api/accounts/:id` - Remove uma conta

## 🧪 Testando a API

### Exemplo de requisição GET:
```bash
curl http://localhost:3000/api/transactions
```

### Exemplo de requisição POST:
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "description": "Nova transação"}'
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── routes/
│   │   ├── index.ts          # Agrupador de rotas
│   │   ├── transactions.ts   # Rotas de transações
│   │   └── accounts.ts       # Rotas de contas
│   └── server.ts             # Arquivo principal do servidor
├── dist/                     # Código compilado (gerado após build)
├── node_modules/             # Dependências
├── .gitignore               # Arquivos ignorados pelo git
├── package.json             # Configurações e dependências
├── tsconfig.json            # Configurações do TypeScript
└── README.md                # Documentação

```

## 🛠️ Scripts Disponíveis

- `npm run build` - Compila o código TypeScript para JavaScript
- `npm start` - Executa a aplicação compilada
- `npm run dev` - Executa em modo de desenvolvimento com auto-reload

## 📝 Licença

ISC