const { sequelize } = require('sequelize');

beforeAll(async () => {
    await sequelize.sync({ force: true })
})
afterAll(async () => {
    await sequelize.close();
})

//TDD Post Produtos

//FALTA CONSTRUIR OS DESCRIBES E TESTES PARA O PUT, DELETE, BUSCAR

