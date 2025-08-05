const express = require('express');
const app = express();
const usuarioRoutes = require('./src/routes/usuarioRoutes');
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.listen(PORT, ()=>{
    console.log(`aplicação rodando em: http://localhost:${PORT}`);
});
module.exports = app;
