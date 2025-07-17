
function determinarTriangulo(lado1, lado2, lado3) {
    let saida = "";
    // Verifica se é um triângulo válido
    if (lado1 <= 0 || lado2 <= 0 || lado3 <= 0) {
        saida = "Não é um triângulo válido";
    }
    // Verifica se é um triângulo equilátero (todos os lados iguais)
    else if (lado1 === lado2 && lado2 === lado3) {
        saida = "Triângulo equilátero";
    }
    // Verifica se é um triângulo isósceles (dois lados iguais)
    else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
        saida = "Triângulo isósceles";
    }
    // Se não for nenhum dos acima, é um triângulo escaleno (todos os lados diferentes)
    else{
        saida = "Triângulo escaleno";
    }
    return saida;
}

module.exports = determinarTriangulo;