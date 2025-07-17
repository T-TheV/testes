const Produto = require('../models/produtoModel');
const ProdutoControler = require('../controllers/produtoController');
const { sequelize } = require('../../../config/configDB');

beforeAll(async () => {
    await sequelize.sync({ force: true })
})
afterAll(async () => {
    await sequelize.close();
})

afterEach(async ()=>{
   // Truncate the table
    await Produto.truncate();
})


describe('Testes do Produto Controller - Criar Produto', () => {
    test('Deve criar um produto corretamente no banco de dados', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: { nome: 'Feijão', preco: 4.90, estoque: 500 } }
        const produto = await ProdutoControler.criarProduto(req);
        // Analisamos a const produto para verificar os dados retornados
        expect(produto).toHaveProperty('cod_prod');
        expect(produto.nome).toBe('Feijão');
        expect(produto.preco).toBe(4.90);
    });

    test('Deve retornar erro caso não seja passado parametros no body', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: {} }
        //const produto = await ProdutoControler.criarProduto(req);
        //console.log(produto)
        // Analisamos a const produto para verificar os dados retornados
        await expect(ProdutoControler.criarProduto(req)).rejects.toThrow('Todos os campos devem ser preenchidos');
    });
    test('Deve retornar erro caso não seja passado o parametro estoque', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: { nome: 'Feijão', preco: 4.90 } }
        //const produto = await ProdutoControler.criarProduto(req);
        // Analisamos a const produto para verificar os dados retornados
        await expect(ProdutoControler.criarProduto(req)).rejects.toThrow('Todos os campos devem ser preenchidos');
    });
    test('Deve retornar erro caso não seja passado valor em nome', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: { nome: '', preco: 4.90, estoque: 30 } }
        await expect(ProdutoControler.criarProduto(req)).rejects.toThrow('Todos os campos devem ser preenchidos');
    });
    test('Deve retornar erro caso não seja passado um tipo string em nome', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: { nome: 7, preco: 4.90, estoque: 30 } }
        await expect(ProdutoControler.criarProduto(req)).rejects.toThrow('Nome inválido');
    });

    test('Deve retornar erro caso não seja passado um tipo númerico ou menor igual a 0 em preço', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: { nome: 'Macarrão', preco: '4.90', estoque: 30 } }
        await expect(ProdutoControler.criarProduto(req)).rejects.toThrow('Preço inválido');
    });
    test('Deve retornar erro caso não seja passado um tipo númerico maior que zero em estoque', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: { nome: 'Macarrão', preco: 4.90, estoque: -6 } }
        const req2 = { body: { nome: 'Macarrão', preco: 4.90, estoque: -644 } }
        await expect(ProdutoControler.criarProduto(req)).rejects.toThrow('Estoque inválido');
        await expect(ProdutoControler.criarProduto(req2)).rejects.toThrow('Estoque inválido');
    });
    test('Deve retornar erro caso não seja passado um tipo númerico maior que zero em preco', async () => {
        //Aqui estamos realizando uma requisição para a criação de produto
        const req = { body: { nome: 'Macarrão', preco: -4.90, estoque: 6 } }
        const req2 = { body: { nome: 'Macarrão 4', preco: -1.90, estoque: 644 } }
        await expect(ProdutoControler.criarProduto(req)).rejects.toThrow('Preço inválido');
        await expect(ProdutoControler.criarProduto(req2)).rejects.toThrow('Preço inválido');
    });

})

describe('Testes do Produto Controller - Listar Produtos', () => {
    test('Deve retornar um Array vazio quando não tem produtos no banco', async ()=>{
        const produtos = await ProdutoControler.listarProdutos();
        expect(Array.isArray(produtos)).toBeTruthy();
        expect(produtos.length).toBe(0);
    });
    test('Deve retornar a lista dos produtos', async()=>{
        const req = { body: { nome: 'Feijão', preco: 4.90, estoque: 500 } }
       await ProdutoControler.criarProduto(req);
       const produtos = await ProdutoControler.listarProdutos();
       expect(Array.isArray(produtos)).toBeTruthy();
       expect(produtos.length).toBeGreaterThan(0);
       expect(produtos[0]).toHaveProperty('nome');

    })
    test('Deve retornar a lista dos produtos 2', async()=>{
        const req = { body: { nome: 'Feijão', preco: 4.90, estoque: 500 } }
       await ProdutoControler.criarProduto(req);
       const produtos = await ProdutoControler.listarProdutos();
    //    expect(Array.isArray(produtos)).toBeTruthy();
    //    expect(produtos.length).toBeGreatherThan(0);
       expect(produtos[0]).toHaveProperty('nome');
    })
})

describe('Testes do Produto Controller - Listar Produtos', () => {

