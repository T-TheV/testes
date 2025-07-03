function eprimo(num) {
    // Check if parameter is missing
    if (num === undefined || num === null) {
        throw new Error("Falta parâmetro");
    }
    
    // Check if it's not an integer or is <= 0
    if (!Number.isInteger(num) || num <= 0) {
        throw new Error("Não é possível verificar se o valor é primo");
    }
    
    let cont = 0;
    for (let i = 2; i <= num; i++) {
        if (num % i === 0) {
            cont++;
        }
    }
    
    if(cont ===1) {
        return true; // É primo
    }
    return false; // Não é primo
}

module.exports = eprimo;