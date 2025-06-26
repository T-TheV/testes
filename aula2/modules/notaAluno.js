function notaAluno(n1, n2, n3, n4) {
    if (n4 === undefined) {
        let notaNecessaria = (7 * 4) - (n1 + n2 + n3);
        if (notaNecessaria > 10) {
            return `Impossível passar. Nota necessária: ${notaNecessaria}`;
        } else if (notaNecessaria < 0) {
            return `Já está aprovado! Pode tirar qualquer nota.`;
        } else {
            return `Precisa tirar ${notaNecessaria} na última prova para passar.`;
        }
    }

    let media = (n1 + n2 + n3 + n4) / 4;
    
    if (media < 0) {
        return "Erro: o valor deve ser positivo ou igual a zero";
    } else if (media < 7) {
        return `Média: ${media} - Reprovado`;
    } else {
        return `Média: ${media} - Aprovado`;
    }
}

module.exports = notaAluno;
