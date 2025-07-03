const mensagemdeBoasVindas = require('./questao4');

describe('Testes para a função mensagemdeBoasVindas', () => {
    test("deve retornar uma mensagem de boas-vindas com o nome fornecido", () => {
        expect(mensagemdeBoasVindas("Alice")).toContain("Alice");
    });

    test("deve retornar uma mensagem de boas-vindas com o nome 'João'", () => {
        expect(mensagemdeBoasVindas("João")).toContain("João");
    });

    test("deve retornar um erro quando o parâmetro é undefined", () => {
        expect(() => mensagemdeBoasVindas(undefined)).toThrow("Nome não pode ser undefined");
    });
    test("deve retornar um erro quando o parâmetro é null", () => {
        expect(() => mensagemdeBoasVindas(null)).toThrow("Nome não pode ser null");
    });
    test("deve retornar um erro quando o parâmetro é um número", () => {
        expect(() => mensagemdeBoasVindas(123)).toThrow("Nome deve ser uma string");
    });
    test("deve retornar um erro quando o parâmetro é um array", () => {
        expect(() => mensagemdeBoasVindas([])).toThrow("Nome deve ser uma string");
    });
    test("deve retornar um erro quando o parâmetro é um objeto", () => {
        expect(() => mensagemdeBoasVindas({})).toThrow("Nome deve ser uma string");
    });
    test("deve retornar um erro quando o parâmetro é um número zero", () => {
        expect(() => mensagemdeBoasVindas(0)).toThrow("Nome deve ser uma string");
    });
    test("deve retornar um erro quando o parâmetro é string vazia", () => {
        expect(() => mensagemdeBoasVindas("")).toThrow();
    });
    test("deve retornar um erro quando o parâmetro é boolean true", () => {
        expect(() => mensagemdeBoasVindas(true)).toThrow("Nome deve ser uma string");
    });
    test("deve retornar um erro quando o parâmetro é boolean false", () => {
        expect(() => mensagemdeBoasVindas(false)).toThrow("Nome deve ser uma string");
    });
});

describe('Testes adicionais para a função mensagemdeBoasVindas', () => {
    test("verificar se exibe corretamente a mensagem de boas-vindas", () => {
        const nome = "Maria";
        const mensagem = mensagemdeBoasVindas(nome);
        expect(mensagem).toMatch(/Olá/);
    });
});

