const volumeCubo = require('../modules/cubo');

describe("Função de encontrar o volume do cubo", () => {
    test("Volume do cubo de 3 deve ser 27", () => {
        expect(volumeCubo(3)).toBe(27);
    })
    test("Volume do cubo de 4 deve ser 64", () => {
        expect(volumeCubo(4)).toBe(64);
    })
    })

    describe("Função de encontrar o volume do cubo com letras", () => {
    test("Volume do cubo de 'a' deve retornar erro", () => {
        expect(volumeCubo('a')).toBe("Erro: parâmetros inválidos");
    })
    })