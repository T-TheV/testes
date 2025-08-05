const express = require('express');
const produtoControllerApi = require('../controllers/produtoControllerApi');
const router = express.Router();

router.post('/', produtoControllerApi.criarProduto);
router.get('/', produtoControllerApi.listarProdutos);






module.exports = router;