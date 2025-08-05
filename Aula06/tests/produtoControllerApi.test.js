const Produto = require('../src/modules/produto/models/produtoModel');
const { sequelize } = require('../src/config/configDB');
const app = require('../index');
const request = require('supertest');

beforeAll(async () => {
    await sequelize.sync({ force: true })
})
afterAll(async () => {
    await sequelize.close();
})

afterEach(async () => {
    // Truncate the table
    await Produto.truncate();
})

//TDD Post Produtos
describe('Testes de integração - Produto POST', () => {
    test('POST /produtos', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão', preco: 3.70, estoque: 30 })
        expect(res.status).toBe(201);
        expect(res.body.produto).toHaveProperty('cod_prod');
        expect(res.body.produto.nome).toBe('Feijão');
        expect(res.body.msg).toBe('produto criado com sucesso!');
    })
    test('POST /produtos - Deve falhar ao criar um produto sem nome ', async () => {
        const res = await request(app).post('/produtos').send({ preco: 3.70, estoque: 30 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Todos os campos devem ser preenchidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto sem preço ', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão', estoque: 30 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Todos os campos devem ser preenchidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto sem estoque ', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão' });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Todos os campos devem ser preenchidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto sem dados ', async () => {
        const res = await request(app).post('/produtos').send({});
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Todos os campos devem ser preenchidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto com preço negativo ', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão', preco: -5.50, estoque: 30 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Dados inválidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto com estoque negativo ', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão', preco: 5.50, estoque: -30 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Dados inválidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto com nome diferente de String', async () => {
        const res = await request(app).post('/produtos').send({ nome: 8, preco: 5.50, estoque: 30 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Dados inválidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto com preço diferente de number', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão', preco: '5.50', estoque: 30 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Dados inválidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto com estoque diferente de number', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão', preco: 0, estoque: 30 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Dados inválidos!');
    })
    test('POST /produtos - Deve falhar ao criar um produto com estoque igual a 0', async () => {
        const res = await request(app).post('/produtos').send({ nome: 'Feijão', preco: 5.50, estoque: 0 });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Dados inválidos!');
    })

})

//TDD Listar Produtos
describe('Testes de integração - Produto Listar', () => {
    //verificar se a rota está funcionando - status 200
    test('Deve retornar um Array vazio quando não tem produtos no banco', async () => {
        const res = await request(app).get('/produtos')
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(0);
    });
    test('Deve retornar a lista dos produtos', async () => {
        await request(app).post('/produtos').send({ nome: 'Feijão', preco: 10, estoque: 30 });
        const res = await request(app).get('/produtos');
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('nome');
        expect(res.body[0].nome).toBe('Feijão');

    })
})

//FALTA CONSTRUIR OS DESCRIBES E TESTES PARA O PUT, DELETE, BUSCAR

