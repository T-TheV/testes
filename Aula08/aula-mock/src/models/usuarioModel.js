class usuarioModel{

    static async salvarUsuario(usuario){
        console.log('Salvando user no banco de dados...');
        return {id: 1, ...usuario}; 
    }

    static async listarUsuarios(){
        return [
            {id: 1, nome: "Joel", senha:9090},
            {id:2, nome: "Valtemir", senha:8080}
        ];
    }

    static async removerUsuario(id){
        return {msg: 'deletado com sucesso'};
    }

}

module.exports = usuarioModel;