const app = require('./src/app');
const { sequelize } = require('./src/config/configDB');
require('dotenv').config();

// Inicializar banco apenas se não estiver em teste
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ force: false }).then(() => {
    console.log('Banco sincronizado');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse: http://localhost:${PORT}`);
    });
  }).catch(error => {
    console.error('Erro ao conectar com banco:', error);
  });
}

module.exports = app;
