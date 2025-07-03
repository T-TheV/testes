    /**
 * Verifica se um valor está vazio.
 * 
 * @param {*} valor - O valor a ser verificado
 * @returns {boolean} true se vazio, false caso contrário
 */

function isEmpty(valor) {


    if (valor === null || valor === undefined) {
        return true;
    }
    if (valor === '' || (Array.isArray(valor) && valor.length === 0)) {
        return true; // string vazia, array vazio
    }
    if (valor instanceof Object) {
        return Object.keys(valor).length === 0;
    }
    return false;
}
module.exports = isEmpty;