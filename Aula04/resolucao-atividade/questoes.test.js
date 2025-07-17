const {validaSenha, classificaTemperatura, calculaImposto, divideNumeros, verificaIntervalo} = require('./questoes');

describe('Testes para validar a função validaSenha', ()=>{
    test('Teste do caminho 01 - (1-2-fim) não é string', ()=>{
        expect(validaSenha(4)).toBeFalsy();
    });
    test('Teste do caminho 02 - (1-2-3-fim) é string com menos de 8 caracteres', ()=>{
        expect(validaSenha("joel")).toBeFalsy();
    });
    test('Teste do caminho 03 - (1-2-3-4-fim) é string com 8 caracteres sem letras maisculas e minusculas', ()=>{
        expect(validaSenha("12345678")).toBeFalsy();
    });
    test('Teste do caminho 04 - (1-2-3-4-5-fim) é string com 8 caracteres só letras', ()=>{
        expect(validaSenha("JoelSantos")).toBeFalsy();
    });
    test('Teste do caminho 04 - (1-2-3-4-5-fim) é string com 8 caracteres só letras', ()=>{
        expect(validaSenha("Joel Santos1234")).toBeFalsy();
    });
    test('Teste do caminho 04 - (1-2-3-4-5-6-fim) senha válida', ()=>{
        expect(validaSenha("JoelSantos123")).toBeTruthy();
    });

})

describe('Testes para validar a função classificaTemperatura', ()=>{
    test('Teste do caminho 01 - (1-2-fim) frio', ()=>{
        expect(classificaTemperatura(14)).toMatch('Frio');
    });
    test('Teste do caminho 02 - (1-2-3-fim) frio', ()=>{
        expect(classificaTemperatura(20)).toMatch('Agradável');
    });
    test('Teste do caminho 02 - (1-2-3-fim) frio', ()=>{
        expect(classificaTemperatura(26)).toMatch('Quente');
    });
});

describe('Testes para validar a função calculaImposto', ()=>{
    test('Teste do caminho 01 - (1-2-fim) null', ()=>{
        expect(calculaImposto("d")).toBeNull();
        expect(calculaImposto(-5)).toBeNull();
    });
    test('Teste do caminho 02 - (1-2-3-fim) 0', ()=>{
        expect(calculaImposto(2000)).toBe(0);
    });
    test('Teste do caminho 03 - (1-2-3-4-fim) 15%', ()=>{
        expect(calculaImposto(2005)).toBe(2005*0.15);
    });
    test('Teste do caminho 04 - (1-2-3-4-fim) 15%', ()=>{
        expect(calculaImposto(5001)).toBe(5001*0.275);
    });
})
describe('Testes para validar a função divideNumeros', ()=>{
    test('Teste do caminho 01 - (1-2-fim) Entrada inválida ', ()=>{
       expect(()=>divideNumeros('8', '2')).toThrow('Entrada inválida')
    });
    test('Teste do caminho 02 - (1-2-3-fim) Divisão por zero', ()=>{
        expect(()=>divideNumeros(8,0)).toThrow('Divisão por zero')
     });
     test('Teste do caminho 03 - (1-2-3-4-fim) Divisão ok', ()=>{
        expect(divideNumeros(8,2)).toBe(4);
     });
});

describe('Testes para validar a função verificarIntervalo', ()=>{
    test('Teste do caminho 01 - (1-2-fim) false', ()=>{
       expect(verificaIntervalo("u")).toBeFalsy();
    });
    test('Teste do caminho 02 - (1-2-3-fim) false', ()=>{
        expect(verificaIntervalo(3)).toBeFalsy();
     });
     test('Teste do caminho 03 - (1-2-3-4-fim) false', ()=>{
        expect(verificaIntervalo(15)).toBeTruthy();
     });
   
});