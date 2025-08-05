const express = require('express');
const sequelize = require('../database/config');
const Expositor = require('./modules/expositor/models/Expositor');
const Prototipo = require('./modules/prototipo/models/Prototipo');
const expositorRoutes = require('./modules/expositor/routes/expositorRoutes');
const prototipoRoutes = require('./modules/prototipo/routes/prototipoRoutes');
const prototipoController = require('./modules/prototipo/controllers/prototipoController');

const app = express();

// Middleware para JSON
app.use(express.json());

// Middleware para CORS (se necessário)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Definir relacionamentos
Expositor.hasMany(Prototipo, { foreignKey: 'expositorId' });
Prototipo.belongsTo(Expositor, { foreignKey: 'expositorId' });

// Rotas
app.use('/expositores', expositorRoutes);
app.use('/prototipos', prototipoRoutes);

// Rota especial para protótipos de um expositor
app.get('/expositores/:id/prototipos', prototipoController.listarPrototiposExpositor);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API FeiraTech funcionando!',
    version: '1.0.0',
    endpoints: {
      expositores: '/expositores',
      prototipos: '/prototipos',
      prototipos_por_expositor: '/expositores/:id/prototipos'
    }
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware para tratamento de erros global
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Inicializar banco de dados
async function inicializarBanco() {
  try {
    await sequelize.sync({ force: true }); // force: true recria as tabelas
    console.log('Banco de dados sincronizado');
  } catch (error) {
    console.error('Erro ao sincronizar banco:', error);
  }
}

// Só inicializa o banco se não estiver em teste
if (process.env.NODE_ENV !== 'test') {
  inicializarBanco();
}

const PORT = process.env.PORT || 3000;

// Só inicia o servidor se não estiver em teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
  });
}

module.exports = app;
