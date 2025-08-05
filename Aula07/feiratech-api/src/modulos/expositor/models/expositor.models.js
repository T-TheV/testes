// src/modulos/expositor/models/expositor.models.js
const {sequelize} = require('../../../config/configDB.js')
const { DataTypes } = require('sequelize');

const ExpositorModel = sequelize.define('Expositor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    instituicao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'expositores',
    timestamps: true,
})

module.exports = ExpositorModel;