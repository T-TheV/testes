const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const ProdutoModel = sequelize.define('Produto', {

    cod_prod:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        tableName: 'produto',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    },

)

module.exports = ProdutoModel;