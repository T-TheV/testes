const produtoModel = require('../models/produtoModel');

class ProdutoController {

    static async criarProduto(dados) {
        const { nome, preco, estoque } = dados.body;
     
        if (!nome || !preco || preco===0 || !estoque || estoque===0) {
            throw new Error('Todos os campos devem ser preenchidos');
        }
        if (typeof nome !== 'string') {
            throw new Error('Nome inválido');
        }
        if (typeof preco !== 'number' || preco<0) {
            throw new Error('Preço inválido');
        }
        if (typeof estoque !== 'number' || estoque<0) {
            throw new Error('Estoque inválido');
        }
        if (typeof preco !== 'number' || preco<0) {
            throw new Error('Preço inválido');
        }
        return await produtoModel.create({ nome, preco, estoque });
    }

    static async listarProdutos(){
        const produtos = await produtoModel.findAll();
        return produtos;
    }

    static async buscarProduto(dado){
        
        const produto = await produtoModel.findByPk(dado);
        return produto;
    }

}

module.exports = ProdutoController;



 