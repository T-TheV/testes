const express = require('express');
const livroController = require('../controllers/livroController');

const router = express.Router();

// Rotas para livros
router.post('/', livroController.criar);
router.get('/', livroController.listarTodos);
router.get('/buscar', livroController.buscarPorTitulo);
router.get('/:id', livroController.buscarPorId);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);

module.exports = router;
