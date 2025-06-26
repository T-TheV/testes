function volumeCubo (a) {
  if (typeof a !== 'number') {
    return ("Erro: parâmetros inválidos")
  }
  else if (a < 0) {
    return ("Erro: o valor deve ser positivo")
  }
  else if (a === 0) {
    return 0;
  }
  return a * a * a;
}

module.exports = volumeCubo;