const notaAluno = require("../modules/notaAluno");

describe("Função de calcular a nota do aluno", () => {
    test("Nota do aluno deve ter a média maior que 7 e deve informar o valor de nota 4 pra passar", () => {
        expect(notaAluno(7, 7, 7, 7)).toBe("Média: 7 - Aprovado");
    })
    test("Nota do aluno deve ter a média maior que 7.0 e deve informar o valor de nota 4 pra passar", () => {
        expect(notaAluno(6.4, 7, 6.4, 6.8)).toBe("Média: 6.65 - Reprovado");
    })
    test("Deve calcular a nota necessária quando apenas 3 notas são fornecidas", () => {
        expect(notaAluno(7, 7, 7)).toBe("Precisa tirar 7 na última prova para passar.");
    })
    test("Deve informar quando já está aprovado", () => {
        expect(notaAluno(8, 8, 8)).toBe("Precisa tirar 4 na última prova para passar.");
    })
    test("Deve informar quando é impossível passar", () => {
        expect(notaAluno(3, 3, 3)).toBe("Impossível passar. Nota necessária: 19");
    })
})