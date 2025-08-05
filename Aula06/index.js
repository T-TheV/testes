const express = require('express');
const { sequelize } = require('./src/config/configDB');
require('dotenv').config();
const produtoRoutes = require('./src/modules/produto/routes/produtoRoutes');

const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use('/produtos', produtoRoutes);

//await sequelize.sync({ force: true })


app.listen(PORT, ()=>{
    console.log(`aplicação rodando em http://localhost:${PORT}`); 
})

module.exports = app;

