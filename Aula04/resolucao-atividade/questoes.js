function validaSenha(senha) {
    if (typeof senha !== 'string') return false;
    if (senha.length < 8) return false;
    if (!/[A-Za-z]/.test(senha)) return false;
    if (!/[0-9]/.test(senha)) return false;
    if (/\s/.test(senha)) return false;
    return true;
}
function classificaTemperatura(temp) {
    if (temp < 15) return "Frio";
    else if (temp <= 25) return "Agradável";
    else return "Quente";
}
function calculaImposto(renda) {
    if (typeof renda !== 'number' || renda < 0) return null;
    if (renda <= 2000) return 0;
    if (renda <= 5000) return renda * 0.15;
    return renda * 0.275;
}


function divideNumeros(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Entrada inválida');
    if (b === 0) throw new Error('Divisão por zero');
    return a / b;
}

function verificaIntervalo(n) {
    if (typeof n !== 'number') return false;
    return n >= 10 && n <= 20;
}

module.exports = {validaSenha, classificaTemperatura, calculaImposto, divideNumeros, verificaIntervalo}