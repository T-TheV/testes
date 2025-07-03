    /**
     * Calcula o valor com desconto aplicado.
     * 
     * @param {number} valor - O valor original do produto
     * @param {number} percentual - O percentual de desconto (0-100)
     * @returns {number} O valor final com desconto aplicado
     * @throws {Error} Quando os parâmetros são inválidos
     */

function calculaDesconto(valor, percentual){
    if(!valor || !percentual || valor<=0 || percentual<0 || percentual>100 ||
        typeof valor !== 'number' || typeof percentual !== 'number') {
        throw new Error('Não é possível realizar a operação');
    }
    let total = valor - valor * (percentual / 100);

    return parseFloat(total.toFixed(2));
}

module.exports = calculaDesconto;