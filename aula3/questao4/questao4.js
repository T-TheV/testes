function mensagemdeBoasVindas(nome) {
    if (nome === undefined) {
        throw new Error("Nome não pode ser undefined");
    }
    if (nome === null) {
        throw new Error("Nome não pode ser null");
    }
    if (typeof nome !== 'string') {
        throw new Error("Nome deve ser uma string");
    }
    if( nome.trim() === '') {
        throw new Error("Nome não pode ser uma string vazia");
    }

    return `Olá ${nome} seja bem vindo!`;
}

module.exports = mensagemdeBoasVindas;