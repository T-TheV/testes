function assertEquals(actual, expect, message = ''){
	if (actual !== expect) {
        //throw new Error(`FALHOU: ${message} esperava ${expect} E atual é ${actual}`);
        console.error(`FALHOU: ${message} esperava ${expect} E atual é ${actual}`);
        return
	}
    console.log(`Passou: ${message}`);
}
function soma(a, b){
return a + b;
}
console.log('=============== Testes de Soma ================');
assertEquals(soma(1, 2), 3, "Soma de 1 e 2 deve ser 3");
assertEquals(soma(5, 7), 12, "Soma de 5 e 7 deve ser 12");
assertEquals(soma(10, 20), 20, "Soma de 10 e 20 deve ser 30");
assertEquals(soma(3,3), 6, "Soma de 3 e 3 deve ser 6");
console.log('=============== Fim de teste de Soma ================');
function multiplicar(a, b){
    return a * b;
    }
console.log('=============== Testes de Multiplicação ================');
assertEquals(multiplicar(2, 3), 6, "Multiplicação de 2 e 3 deve ser 6");
assertEquals(multiplicar(2, 4), 9, "Multiplicação de 2 e 4 deve ser 8");
assertEquals(multiplicar(2, 6), 12, "Multiplicação de 2 e 6 deve ser 12");
console.log('=============== Fim de teste de Multiplicação ================');
function dividir(a, b){
    return a / b;
}
console.log('=============== Testes de Divisão ================');
assertEquals(dividir(6, 3), 2, "Divisão de 6 por 3 deve ser 2");
assertEquals(dividir(10, 2), 1, "Divisão de 10 por 2 deve ser 5");
assertEquals(dividir(10, 5), 2, "Divisão de 10 por 5 deve ser 2");
console.log('=============== Fim de teste de Divisão ================');
function subtrair(a, b){
    return a - b;
}
console.log('=============== Testes de Subtração ================');
assertEquals(subtrair(5, 3), 2, "Subtração de 5 por 3 deve ser 2");
assertEquals(subtrair(10, 2), 7, "Subtração de 10 por 2 deve ser 8");
assertEquals(subtrair(10, 5), 5, "Subtração de 10 por 5 deve ser 5");
console.log('=============== Fim de teste de Subtração ================');
function par(a){
    return a % 2 === 0;
}
console.log('=============== Testes de Paridade ================');
assertEquals(par(2), true, "2 é par");
assertEquals(par(3), true, "3 não é par");
assertEquals(par(4), true, "4 é par");
console.log('=============== Fim de teste de Paridade ================');
 
function palavra(str){
    return str.split('').reverse().join('');
}
console.log('=============== Testes de Reversão de Palavras ================');
assertEquals(palavra('teste'), 'etset', "A palavra 'teste' deve ser revertida para 'etset'");
assertEquals(palavra('javascript'), 'tpircsavaj', "A palavra 'javascript' deve ser revertida para 'tpircsavaj'");
assertEquals(palavra('ola'), 'a2o', "A palavra 'ola' deve ser revertida para 'alo'");
console.log('=============== Fim de teste de Reversão de Palavras ================');
 
function vogal(str){
    return str.split('').filter(char => 'aeiouAEIOU'.includes(char)).length;
 
}
console.log('=============== Testes de Vogais ================');
assertEquals(vogal('teste'), 2, "A palavra 'teste' deve ter 2 vogais");
assertEquals(vogal('javascript'), 3, "A palavra 'javascript' deve ter 3 vogais");
assertEquals(vogal('ola'), 3, "A palavra 'ola' deve ter 2 vogais");
console.log('=============== Fim de teste de Vogais ================');