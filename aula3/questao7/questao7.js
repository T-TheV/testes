function validaEmail (email) {
    if (typeof email !== 'string') {
        throw new Error('Não é possível realizar a operação');	
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
module.exports = validaEmail;