# Atividade: Testes de Integração — API FeiraTech

## Visão Geral

A **FeiraTech** organiza feiras de inovação tecnológica e precisa de uma API para gerenciar **expositores** e seus **protótipos**. A API será desenvolvida com **Node.js**, **Express**, **Sequelize**, e testada usando **Jest** e **Supertest**.

---

## Objetivos

- Implementar endpoints conforme especificação.
- Validar regras de negócio.
- Criar testes de integração cobrindo todos os cenários.
- Verificar `statusCode`, mensagens e estrutura do body.
- Aplicar boas práticas de desenvolvimento e testes.

---

## Modelos de Dados

### Expositor

| Campo       | Tipo    | Regras                    |
|-------------|---------|---------------------------|
| id          | Integer | PK, auto-incremento       |
| nome        | String  | Obrigatório               |
| email       | String  | Obrigatório, único        |
| instituicao | String  | Obrigatório               |

### Protótipo

| Campo       | Tipo       | Regras                             |
|-------------|------------|------------------------------------|
| id          | Integer    | PK, auto-incremento                |
| titulo      | String     | Obrigatório, único por expositor   |
| descricao   | String     | Obrigatório                        |
| categoria   | String     | Obrigatório                        |
| expositorId | ForeignKey | Obrigatório, referência ao expositor|

---

## Endpoints

### Expositores

- `POST /expositores` — Cadastrar expositor
- `GET /expositores` — Listar expositores
- `GET /expositores/:id` — Buscar expositor por ID
- `DELETE /expositores/:id` — Remover expositor

### Protótipos

- `POST /prototipos` — Cadastrar protótipo
- `GET /prototipos` — Listar protótipos
- `GET /prototipos/:id` — Buscar protótipo por ID
- `GET /expositores/:id/prototipos` — Listar protótipos de um expositor
- `DELETE /prototipos/:id` — Remover protótipo

---

## Regras de Negócio

### Expositor

- `nome`, `email`, `instituicao` são obrigatórios.
- `email` deve ser único.
- Um expositor pode ter vários protótipos.

### Protótipo

- `titulo`, `descricao`, `categoria`, `expositorId` são obrigatórios.
- `titulo` deve ser único por expositor.
- Cada protótipo pertence a um expositor.

---

## Plano de Testes

### Expositores

| Cenário                                         | Status | Resposta Esperada                                             |
|-------------------------------------------------|--------|---------------------------------------------------------------|
| Criar expositor com sucesso                     | 201    | Mensagem: "Expositor cadastrado com sucesso", body com dados  |
| Email duplicado                                 | 400    | Mensagem: "Email já cadastrado"                               |
| Campos obrigatórios ausentes                    | 400    | Mensagem: "Campos obrigatórios não informados"                |
| Listar expositores                              | 200    | Array de expositores                                          |
| Buscar expositor por ID existente               | 200    | Dados do expositor                                            |
| Buscar expositor por ID inexistente             | 404    | Mensagem: "Expositor não encontrado"                          |
| Deletar expositor existente                     | 200    | Mensagem: "Expositor removido com sucesso"                    |

### Protótipos

| Cenário                                         | Status | Resposta Esperada                                             |
|-------------------------------------------------|--------|---------------------------------------------------------------|
| Criar protótipo com sucesso                     | 201    | Mensagem: "Protótipo cadastrado com sucesso", body com dados  |
| Título duplicado para mesmo expositor           | 400    | Mensagem: "Protótipo com este título já cadastrado para este expositor" |
| Campos obrigatórios ausentes                    | 400    | Mensagem: "Campos obrigatórios não informados"                |
| Listar protótipos                               | 200    | Array de protótipos                                           |
| Buscar protótipo por ID existente               | 200    | Dados do protótipo                                            |
| Listar protótipos de um expositor               | 200    | Array de protótipos vinculados ao expositor                   |
| Listar protótipos de expositor inexistente      | 404    | Mensagem: "Expositor não encontrado"                          |
| Deletar protótipo existente                     | 200    | Mensagem: "Protótipo removido com sucesso"                    |

---

## Recomendações para Testes

- Sempre validar o **statusCode**.
- Conferir mensagens de sucesso/erro.
- Verificar propriedades esperadas no body.
- Nos erros, garantir propriedade `message` ou `erro` clara.
- Nos `GET` de listas, garantir resposta como array.
- Validar relacionamentos corretos entre expositores e protótipos.

---

## Estrutura Sugerida do Projeto

```
feiratech-api/
├── src/
│   ├── modules/
│   │   ├── expositor/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── models/
│   │   └── prototipo/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── models/
│   └── app.js
├── tests/
│   ├── expositor.test.js
│   └── prototipo.test.js
├── database/
│   └── config/

```

Cada módulo (`expositor`, `prototipo`) possui suas próprias pastas de `controllers`, `routes` e `models` para facilitar manutenção.

---

## Entregáveis

- Código-fonte da API com endpoints implementados.
- Testes de integração em Jest + Supertest cobrindo todos os cenários.
- Documentação simples com instruções para rodar a API e os testes.
- Link do repositório GitHub ou pasta compartilhada com todos os arquivos do projeto.

