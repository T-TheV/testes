const { Sequelize } = require('sequelize');

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? ':memory:' : 'database/feiratech.db',
  logging: false // Desabilita logs do Sequelize
});

module.exports = sequelize;