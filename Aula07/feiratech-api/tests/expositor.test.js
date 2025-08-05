const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../database/config');

// Configurar ambiente de teste
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de Expositor', () => {
  
  describe('POST /expositores', () => {
    test('Deve criar expositor com sucesso', async () => {
      const expositor = {
        nome: 'João Silva',
        email: 'joao@teste.com',
        instituicao: 'IFPE'
      };

      const response = await request(app)
        .post('/expositores')
        .send(expositor);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Expositor cadastrado com sucesso');
      expect(response.body.expositor).toHaveProperty('id');
      expect(response.body.expositor.nome).toBe(expositor.nome);
      expect(response.body.expositor.email).toBe(expositor.email);
    });

    test('Deve retornar erro para email duplicado', async () => {
      const expositor = {
        nome: 'Maria Santos',
        email: 'joao@teste.com', // Email já usado no teste anterior
        instituicao: 'UFPE'
      };

      const response = await request(app)
        .post('/expositores')
        .send(expositor);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email já cadastrado');
    });

    test('Deve retornar erro para campos obrigatórios ausentes', async () => {
      const expositor = {
        nome: 'Pedro Lima'
        // email e instituicao ausentes
      };

      const response = await request(app)
        .post('/expositores')
        .send(expositor);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Campos obrigatórios não informados');
    });
  });

  describe('GET /expositores', () => {
    test('Deve listar expositores', async () => {
      const response = await request(app)
        .get('/expositores');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /expositores/:id', () => {
    test('Deve buscar expositor por ID existente', async () => {
      // Primeiro criar um expositor
      const expositor = {
        nome: 'Ana Costa',
        email: 'ana@teste.com',
        instituicao: 'UFRPE'
      };

      const createResponse = await request(app)
        .post('/expositores')
        .send(expositor);

      const expositorId = createResponse.body.expositor.id;

      // Agora buscar por ID
      const response = await request(app)
        .get(`/expositores/${expositorId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(expositorId);
      expect(response.body.nome).toBe(expositor.nome);
    });

    test('Deve retornar erro para ID inexistente', async () => {
      const response = await request(app)
        .get('/expositores/999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Expositor não encontrado');
    });
  });

  describe('DELETE /expositores/:id', () => {
    test('Deve deletar expositor existente', async () => {
      // Primeiro criar um expositor
      const expositor = {
        nome: 'Carlos Oliveira',
        email: 'carlos@teste.com',
        instituicao: 'UPE'
      };

      const createResponse = await request(app)
        .post('/expositores')
        .send(expositor);

      const expositorId = createResponse.body.expositor.id;

      // Agora deletar
      const response = await request(app)
        .delete(`/expositores/${expositorId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Expositor removido com sucesso');
    });
  });
});
