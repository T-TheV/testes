const validaEmail = require('./questao7');

describe('Testes da função validaEmail', () => {
    test('deve retornar true para um email válido', () => {
    expect(validaEmail('joel@email.com')).toBeTruthy();
    });
    test('deve retornar false para um email sem arroba', () => {
        expect(validaEmail('joelemail.com')).toBeFalsy();
    });
    test('dever etornar false para um email com arroba sem o ponto .com', () => {
        expect(validaEmail('joel@emailcom')).toBeFalsy();
    });
    test('deve retornar false para um email sem arroba e sem ponto', () => {
        expect(validaEmail('joelemailcom')).toBeFalsy();
    });
    test('testar se retorna erro para entradas inválidas', () => {
        expect(() => validaEmail()).toThrow('Não é possível realizar a operação');
        expect(() => validaEmail(null)).toThrow('Não é possível realizar a operação');
        expect(() => validaEmail(123)).toThrow('Não é possível realizar a operação');
        expect(() => validaEmail(true)).toThrow('Não é possível realizar a operação');
        expect(() => validaEmail([])).toThrow('Não é possível realizar a operação');
    });
});