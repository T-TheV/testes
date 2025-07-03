function filtrarMaiores(lista, limite){
    if(!Array.isArray(lista) || lista.length===0 || typeof limite !== 'number' ||
        lista.some(num => typeof num !== 'number'))
      throw new Error('Não é possível realizar a operação');
      
    return lista.filter(num => num > limite );
}

module.exports = filtrarMaiores