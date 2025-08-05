const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Rota para buscar por título (deve vir antes da rota /:id)
router.get('/busca', livroController.buscarPorTitulo);

// Rotas CRUD
router.post('/', livroController.criar);
router.get('/', livroController.listar);
router.get('/:id', livroController.buscarPorId);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);

module.exports = router;
