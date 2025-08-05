
# 🧪 Testes com Mocks no Jest (Node.js + Express)

## 📌 O que é um Mock?

No contexto de testes com Jest, um **mock** é uma **simulação** de uma função, módulo ou comportamento. Ele permite que você **controle e observe** como as dependências externas são utilizadas pela unidade que está sendo testada — sem realmente executá-las.

Mocks são úteis para:

- Simular serviços externos (ex: banco de dados, APIs, etc.)
- Evitar efeitos colaterais
- Controlar o retorno de funções para cenários específicos
- Verificar se uma função foi chamada corretamente

---

## 🧱 Estrutura do Projeto (MVC)

Vamos usar a estrutura MVC com três camadas:

```
📁 models/
  └── usuarioModel.js
📁 controllers/
  └── usuarioController.js
📁 routes/
  └── usuarioRoutes.js
📁 tests/
  └── usuarioController.test.js
```

---

## 📂 `models/usuarioModel.js`

```js
// models/usuarioModel.js
function salvarUsuario(usuario) {
  console.log('Salvando usuário no banco...');
  return { id: 1, ...usuario };
}

module.exports = { salvarUsuario };
```

---

## 📂 `controllers/usuarioController.js`

```js
// controllers/usuarioController.js
const { salvarUsuario } = require('../models/usuarioModel');

async function criarUsuarioController(req, res) {
  try {
    const novoUsuario = await salvarUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

module.exports = { criarUsuarioController };
```

---

## 📂 `routes/usuarioRoutes.js`

```js
const express = require('express');
const router = express.Router();
const { criarUsuarioController } = require('../controllers/usuarioController');

router.post('/usuarios', criarUsuarioController);

module.exports = router;
```

---

## 📁 `tests/usuarioController.test.js`

### 🧪 Passo a passo do teste com Mock

```js
// tests/usuario.test.js
const request = require('supertest');

// 👇 Fazemos mock do serviço antes de importar o app
jest.mock('../models/usuarioModel', () => ({
  salvarUsuario: jest.fn()
}));

const { salvarUsuario } = require('../models/usuarioModel');
const app = require('../app');

describe('POST /usuarios', () => {
  it('deve criar usuário com sucesso', async () => {
    const usuarioMockado = { id: 1, nome: 'Maria' };

    criarUsuario.mockResolvedValue(usuarioMockado);

    const resposta = await request(app)
      .post('/usuarios')
      .send({ nome: 'Maria' });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual(usuarioMockado);
    expect(criarUsuario).toHaveBeenCalledWith({ nome: 'Maria' });
  });
});

```


---

## 🧠 Explicações Importantes

✅ `jest.mock(...)`  
Substitui o arquivo `usuarioModel.js` por um objeto com funções falsas.

O `salvarUsuario` agora é um `jest.fn()`, ou seja, uma mock function.

✅ `mockReturnValue(...)`  
Define qual valor o mock deve retornar quando for chamado.

✅ `toHaveBeenCalledWith(...)`  
Verifica se a função mock foi chamada com os parâmetros corretos.

✅ `supertest`  
Lib que permite simular requisições HTTP à aplicação sem subir um servidor real.

---


## ✅ Conclusão

Com esse padrão, conseguimos testar o comportamento do controller isoladamente, simulando as dependências externas como o service. Isso facilita muito a criação de testes unitários precisos e eficientes.
