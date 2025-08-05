const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { route } = require('../..');

router.post('/', usuarioController.cadastrar);
router.get('/', usuarioController.listarUsuarios);
router.delete('/:id', usuarioController.removerUsuario);

module.exports = router;