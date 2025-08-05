const app = require('./src/app');
const { sequelize } = require('./src/config/configDB');
require('dotenv').config();

async function iniciarServidor() {
  try {
    console.log('Iniciando servidor...');
    
    // Testar conexão com banco
    console.log('Testando conexão com banco...');
    await sequelize.authenticate();
    console.log('✅ Conexão com banco estabelecida');
    
    // Sincronizar modelos
    console.log('Sincronizando modelos...');
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados');
    
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
      console.log(`🌐 Acesse: http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:');
    console.error('Tipo:', error.name);
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);
    
    if (error.name === 'SequelizeConnectionError') {
      console.error('🔗 Problema de conexão com banco de dados');
      console.error('Verifique:');
      console.error('- Se o PostgreSQL está rodando');
      console.error('- Se as credenciais estão corretas no .env');
      console.error('- Se o banco existe');
    }
    
    process.exit(1);
  }
}

// Só inicializa se não estiver em teste
if (process.env.NODE_ENV !== 'test') {
  iniciarServidor();
}

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

module.exports = app;
