const express = require('express');
const livroRoutes = require('./routes/livroRoutes');

const app = express();

// Middleware
app.use(express.json());

// Rotas
app.use('/livros', livroRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;
