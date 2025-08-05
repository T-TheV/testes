const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255]
    }
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255]
    }
  },
  ano_publicacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1000,
      max: new Date().getFullYear()
    }
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['Ficção', 'Drama', 'Romance', 'Fantasia', 'Aventura', 'Terror', 'Biografia', 'História', 'Ciência', 'Autoajuda']]
    }
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01
    }
  }
}, {
  tableName: 'livros',
  timestamps: true
});

module.exports = Livro;
