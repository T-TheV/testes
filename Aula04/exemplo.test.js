const determinarTriangulo = require('./exemplo');

describe('criação dos testes de caixa branca', ()=>{
    test('Caminho 01 (1 - 2 - FIM)', ()=>{
        expect(determinarTriangulo(0,0,1)).toBe('Não é um triângulo válido');
    });
    test('Caminho 02 (1 - 2 - 3 - FIM)', ()=>{
        expect(determinarTriangulo(1,1,1)).toBe('Triângulo equilátero');
    });
    test('Caminho 03 (1 - 2 - 3 - 4 - FIM)', ()=>{
        expect(determinarTriangulo(1,1,8)).toBe('Triângulo isósceles');
    });
    test('Caminho 04 (1 - 2 - 3 - 4 -5 - FIM)', ()=>{
        expect(determinarTriangulo(7,1,8)).toBe('Triângulo escaleno');
    });
});