const produtoModel = require('../models/produtoModel');

class ProdutoController {

    static async criarProduto(dados) {
        const { nome, preco, estoque } = dados.body;
        if (!nome || !preco || !estoque) {
            throw new Error('Todos os campos devem ser preenchidos');
        }
        if (typeof nome !== 'string') {
            throw new Error('Nome inválido');
        }
        if (typeof preco !== 'number' || preco<=0) {
            throw new Error('Preço inválido');
        }
        return await produtoModel.create({ nome, preco, estoque });
    }


}

module.exports = ProdutoController;