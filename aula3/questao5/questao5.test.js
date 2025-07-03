const calculaDesconto = require('./questao5');

describe('Testes da função calculaDesconto', () => {
    test('deve retornar o valor com desconto aplicado', () => {
        expect(calculaDesconto(100, 10)).toBe(90);
        expect(calculaDesconto(100, 10)).toBeLessThan(100);
    
    })
    test('Testar se exibe mensagem de erro ao não passar nenhum parâmetro', () => {
        expect(() => calculaDesconto()).toThrow('Não é possível realizar a operação');
    });
    test('Testar se exibe mensagem de erro ao passar apenas um parâmetro', () => {
        expect(() => calculaDesconto(100)).toThrow('Não é possível realizar a operação');
    });
    test('Testar se exibe mensagem de erro ao passar parâmetros inválidos', () => {
        expect(() => calculaDesconto("100", 10)).toThrow('Não é possível realizar a operação');
        expect(() => calculaDesconto(100, "10")).toThrow('Não é possível realizar a operação');
        expect(() => calculaDesconto(-100, 10)).toThrow('Não é possível realizar a operação');
        expect(() => calculaDesconto(100, -10)).toThrow('Não é possível realizar a operação');
        expect(() => calculaDesconto(100, 110)).toThrow('Não é possível realizar a operação');
    });
    
});