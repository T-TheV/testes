const request = require('supertest');
const usuarioModel = require('../src/models/usuarioModel');
const app = require('../index');

//Primeiro devemos preparar o mock em Model
jest.mock('../src/models/usuarioModel', () => ({
    salvarUsuario: jest.fn(),
    listarUsuarios: jest.fn(),
    removerUsuario: jest.fn()
}));

describe('Testes para o rota de POST /usuarios', () => {
    test('Deve cadastrar corretamente um usuario', async () => {
        const userMoco = { id: 1, nome: 'Joel', senha: 9090 };
        usuarioModel.salvarUsuario.mockResolvedValue(userMoco); //Tipo de retorno --> sempre ser a const userMoco
        const res = await request(app).post('/usuarios').send({ nome: 'Joel', senha: 9090 });
        expect(res.status).toBe(201);
        expect(res.body.usuario).toEqual(userMoco);
        expect(usuarioModel.salvarUsuario).toHaveBeenCalledWith({ nome: 'Joel', senha: 9090 });
    })
})
describe('Testes para a rota de GET /usuarios', () => {
    test('Deve listar corretamente os usuarios', async () => {
        const usersMock = [{ id: 1, nome: 'Joel', senha: 9090 }, { id: 2, nome: 'Valtemir', senha: 8080 }];
        usuarioModel.listarUsuarios.mockResolvedValue(usersMock);
        const res = await request(app).get('/usuarios');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(1);
        expect(usuarioModel.listarUsuarios).toHaveBeenCalledWith();
    })
})
describe('Testes para a rota DELETE /usuarios/:id', () => {
    test('Deve deletar corretamente um usuario', async () => {
        usuarioModel.removerUsuario.mockResolvedValue({msg: 'deletado com sucesso'});
        const res = await request(app).delete('/usuarios/1');
        expect(res.status).toBe(200);
        expect(usuarioModel.removerUsuario).toHaveBeenCalledWith("1");
    })
})





