const eprimo = require('./questao3.js');

describe('Testes da função eprimo', () => {
    // Testes para parâmetro ausente
    test('deve lançar erro quando o parâmetro é undefined', () => {
        expect(() => eprimo(undefined)).toThrow("Falta parâmetro");
    });

    test('deve lançar erro quando o parâmetro é null', () => {
        expect(() => eprimo(null)).toThrow("Falta parâmetro");
    });

    // Testes para parâmetros inválidos
    test('deve lançar erro para valores não inteiros', () => {
        expect(() => eprimo(2.5)).toThrow("Não é possível verificar se o valor é primo");
        expect(() => eprimo("5")).toThrow("Não é possível verificar se o valor é primo");
        expect(() => eprimo(true)).toThrow("Não é possível verificar se o valor é primo");
    });

    test('deve lançar erro para zero e números negativos', () => {
        expect(() => eprimo(0)).toThrow("Não é possível verificar se o valor é primo");
        expect(() => eprimo(-1)).toThrow("Não é possível verificar se o valor é primo");
        expect(() => eprimo(-10)).toThrow("Não é possível verificar se o valor é primo");
    });

    // Testes para casos especiais
    test('deve retornar false para 1', () => {
        expect(eprimo(1)).toBe(false);
    });

    test('deve retornar true para 2', () => {
        expect(eprimo(2)).toBe(true);
    });

    // Testes para números primos
    test('deve retornar true para números primos', () => {
        expect(eprimo(3)).toBe(true);
        expect(eprimo(5)).toBe(true);
        expect(eprimo(7)).toBe(true);
        expect(eprimo(11)).toBe(true);
        expect(eprimo(13)).toBe(true);
        expect(eprimo(17)).toBe(true);
        expect(eprimo(19)).toBe(true);
        expect(eprimo(23)).toBe(true);
    });

    // Testes para números não primos
    test('deve retornar false para números não primos', () => {
        expect(eprimo(4)).toBe(false);
        expect(eprimo(6)).toBe(false);
        expect(eprimo(8)).toBe(false);
        expect(eprimo(9)).toBe(false);
        expect(eprimo(10)).toBe(false);
        expect(eprimo(12)).toBe(false);
        expect(eprimo(15)).toBe(false);
        expect(eprimo(20)).toBe(false);
    });
});
