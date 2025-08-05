const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/configDB');
const Livro = require('./modules/livro/models/livroModel');
const livroRoutes = require('./modules/livro/routes/livroRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
  res.json({
    message: '📚 API de Livros',
    version: '1.0.0',
    endpoints: {
      'GET /livros': 'Listar todos os livros',
      'POST /livros': 'Criar novo livro',
      'GET /livros/:id': 'Buscar livro por ID',
      'GET /livros/busca?titulo=': 'Buscar livro por título',
      'PUT /livros/:id': 'Atualizar livro',
      'DELETE /livros/:id': 'Deletar livro'
    }
  });
});

app.use('/livros', livroRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro capturado:', err);
  res.status(500).json({
    msg: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    msg: 'Rota não encontrada',
    suggestion: 'Verifique a documentação da API'
  });
});

module.exports = app;
