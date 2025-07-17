# Passo a Passo - Produção de APIs com Testes

## 1. Configuração Inicial do Projeto

### 1.1 Criar estrutura do projeto
```bash
mkdir minha-api
cd minha-api
npm init -y
```

### 1.2 Instalar dependências principais
```bash
npm install express cors helmet morgan
npm install -D nodemon jest supertest
```

## 2. Estrutura de Pastas

```
projeto/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
└── server.js
```

## 3. Configuração Básica da API

### 3.1 Criar app.js
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

module.exports = app;
```

### 3.2 Criar server.js
```javascript
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

## 4. Implementação de Rotas

### 4.1 Exemplo de controller
```javascript
// src/controllers/userController.js
const users = [];

const getUsers = (req, res) => {
    res.json(users);
};

const createUser = (req, res) => {
    const { name, email } = req.body;
    const user = { id: Date.now(), name, email };
    users.push(user);
    res.status(201).json(user);
};

module.exports = { getUsers, createUser };
```

### 4.2 Configurar rotas
```javascript
// src/routes/userRoutes.js
const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;
```

## 5. Configuração de Testes

### 5.1 Configurar Jest no package.json
```json
{
    "scripts": {
        "test": "jest",
        "test:watch": "jest --watch",
        "dev": "nodemon server.js"
    },
    "jest": {
        "testEnvironment": "node"
    }
}
```

### 5.2 Criar testes unitários
```javascript
// tests/unit/userController.test.js
const { getUsers, createUser } = require('../../src/controllers/userController');

describe('User Controller', () => {
    test('should return empty array initially', () => {
        const req = {};
        const res = {
            json: jest.fn()
        };
        
        getUsers(req, res);
        expect(res.json).toHaveBeenCalledWith([]);
    });
});
```

### 5.3 Criar testes de integração
```javascript
// tests/integration/api.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('API Integration Tests', () => {
    test('GET /users should return 200', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
    });

    test('POST /users should create user', async () => {
        const userData = { name: 'João', email: 'joao@email.com' };
        const response = await request(app)
            .post('/users')
            .send(userData);
        
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('João');
    });
});
```

## 6. Comandos para Execução

```bash
# Executar testes
npm test

# Executar em modo desenvolvimento
npm run dev

# Executar testes em modo watch
npm run test:watch
```

## 7. Boas Práticas

- Sempre escrever testes antes ou junto com o código
- Usar middlewares para validação
- Implementar tratamento de erros
- Documentar endpoints
- Usar variáveis de ambiente para configurações
- Implementar logs adequados