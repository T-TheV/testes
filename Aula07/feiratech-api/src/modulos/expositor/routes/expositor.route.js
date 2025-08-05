const express = require('express');
const router = express.Router();
const ExpositorController = require('../controllers/expositor.controller');
const { validateExpositor } = require('../middlewares/expositor.middleware');

// Rota para criar um novo expositor
router.post('/', ExpositorController.criarExpositor);
// Rota para obter todos os expositores
router.get('/', ExpositorController.listarExpositores);
// Rota para obter um expositor por ID
router.get('/:id',  ExpositorController.listarExpositorPorId);
// Rota para atualizar um expositor por ID
router.put('/:id',   ExpositorController.AtualizarExpositor);
// Rota para excluir um expositor por ID
router.delete('/:id', ExpositorController.deletarExpositor);

module.exports = router;