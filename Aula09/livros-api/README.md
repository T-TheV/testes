# API de Livros - TDD

API desenvolvida seguindo Test-Driven Development (TDD) para gerenciar livros.

## Pré-requisitos

- Node.js (versão 16+)
- PostgreSQL
- npm

## Como executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados
- Crie um banco PostgreSQL chamado `livros_db`
- Configure as credenciais no arquivo `.env`

### 3. Executar aplicação
```bash
npm start
```

### 4. Executar em modo desenvolvimento
```bash
npm run dev
```

### 5. Executar testes
```bash
npm test
```

## Endpoints

- `POST /livros` - Criar livro
- `GET /livros` - Listar livros
- `GET /livros/busca?titulo=nome` - Buscar por título
- `GET /livros/:id` - Buscar por ID
- `PUT /livros/:id` - Atualizar livro
- `DELETE /livros/:id` - Deletar livro

## Exemplo de Uso

```json
POST /livros
{
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien",
  "ano_publicacao": 1954,
  "genero": "Fantasia",
  "preco": 59.90
}
```
