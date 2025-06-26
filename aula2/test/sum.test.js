const sum = require("../modules/sum");

sum("jest");
describe("Função de Soma para números positivos", () => {
    test("Soma de 1+2 deve ser = 3", () => {
        expect(sum(1, 2)).toBe(3);
    });

    test("Soma de 1 + 1 deve ser = 2", () => {
        expect(sum(1, 1)).toBe(2);
    });
});

describe("Função de Soma para números negativos", () => {
    test("Soma de -1 + -2 deve ser = -3", () => {
        expect(sum(-1, -2)).toBe(-3);
    });

    test("Soma de -1 + -1 deve ser = -2", () => {
        expect(sum(-1, -1)).toBe(-2);
    });

    
});

describe("Função de Soma para números com letras", () => {
    test("Soma de 1 + 'a' deve retornar erro", () => {
        expect(sum(1, 'a')).toBe("Erro: parâmetros inválidos");
    });
    test("Soma de 'a' + 'b' deve retornar erro", () => {
        expect(sum('a'+'b')).toBe("Erro: parâmetros inválidos")
    })
    test("Soma de 'a' + 1 deve retornar erro", () =>{
        expect(sum('a'+1)).toBe("Erro: parâmetros inválidos")
    })


});

describe("Função de soma para número com arrays", () => {
    test("Soma de 1 + [1] deve retornar erro", () => {
        expect(sum(1+[1])).toBe("Erro: parâmetros inválidos")
    })
})

