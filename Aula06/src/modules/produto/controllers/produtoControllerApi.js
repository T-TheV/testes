const ProdutoModel = require('../models/produtoModel');

class ProdutoControlerApi {
    static async criarProduto(req, res) {
        try {
            const { nome, preco, estoque } = req.body;
            if (!nome || preco === undefined || estoque === undefined) {
                res.status(400).json({ msg: 'Todos os campos devem ser preenchidos!' });
                return
            } else if (typeof nome !== 'string' || typeof preco !== 'number' || preco <= 0 || typeof estoque !== 'number' || estoque <=0) {
                res.status(400).json({ msg: 'Dados inválidos!' });
                return
            } else {
                const produto = await ProdutoModel.create({ nome, preco, estoque });
                res.status(201).json({ msg: 'produto criado com sucesso!', produto });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno', error: error.message });
        }

    }
    static async listarProdutos(req, res){
        try {
            const produtos = await ProdutoModel.findAll();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno', error: error.message });

        }
    }

}

module.exports = ProdutoControlerApi;