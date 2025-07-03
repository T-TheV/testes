// Retorna os números maiores que o limite informado.
// Entrada: [10, 20, 30], limite 15
// Saída esperada: [20, 30] (tipo: array<number>)
// O array resultante deve conter o número 30

const filtrarMaiores = require('./questao2.js');


describe('Testes para a função FiltrarMaiores', ()=>{
    test('Testar se retorna o resultado corretamente', ()=>{
        expect(filtrarMaiores([10,30,80,70], 20)).toEqual([30,80,70]); //sempre usado com retornos de objeto e arrays
        expect(filtrarMaiores([10,30,80,70], 20)).toContain(30); 
    });
    test('Testar se retorna o resultado corretamente com parametro numero real', ()=>{
        expect(filtrarMaiores([10,30,80,70], 20.6)).toEqual([30,80,70]); //sempre usado com retornos de objeto e arrays
        expect(filtrarMaiores([10,30,80,70], 20.6)).toContain(30); 
    });
    test('Testar se retorna erro em relação aos parametros', ()=>{
        expect(() => filtrarMaiores()).toThrow('Não é possível realizar a operação');
        expect(() => filtrarMaiores([], 5)).toThrow('Não é possível realizar a operação');
        expect(() => filtrarMaiores([10,30,80,70], "teste")).toThrow('Não é possível realizar a operação');  
        expect(() => filtrarMaiores([10,30,80,"70"], 30)).toThrow('Não é possível realizar a operação');      
    });

});