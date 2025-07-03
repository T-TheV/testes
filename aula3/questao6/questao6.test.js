const isEmpty = require('./questao6');
describe('Testes da função isEmpty', () => {
    test('deve retornar true para um array vazio', () => {
        expect(isEmpty([])).toBeTruthy();
    });

    test('deve retornar false para um array com elementos', () => {
        expect(isEmpty([1, 2, 3])).toBeFalsy();
    });

    test('deve retornar true para uma string vazia', () => {
        expect(isEmpty("")).toBeTruthy();
    });

    test('deve retornar false para uma string não vazia', () => {
        expect(isEmpty("texto")).toBeFalsy();
    });

    test('deve retornar true para null', () => {
        expect(isEmpty(null)).toBeTruthy();
    });

    test('deve retornar true para undefined', () => {
        expect(isEmpty(undefined)).toBeTruthy();
    });
});


