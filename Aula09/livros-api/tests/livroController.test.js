const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/config/configDB');
const Livro = require('../src/models/Livro');

describe('Livro Controller', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Livro.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /livros', () => {
    it('deve criar um livro com dados válidos', async () => {
      const livroData = {
        titulo: 'O Senhor dos Anéis',
        autor: 'J.R.R. Tolkien',
        anoPublicacao: 1954,
        disponivel: true
      };

      const response = await request(app)
        .post('/livros')
        .send(livroData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.titulo).toBe(livroData.titulo);
      expect(response.body.autor).toBe(livroData.autor);
      expect(response.body.anoPublicacao).toBe(livroData.anoPublicacao);
      expect(response.body.disponivel).toBe(livroData.disponivel);
    });

    it('deve retornar erro 400 para dados inválidos', async () => {
      const livroData = {
        titulo: 'AB', // muito curto
        autor: '',    // vazio
        anoPublicacao: -1, // negativo
        disponivel: true
      };

      await request(app)
        .post('/livros')
        .send(livroData)
        .expect(400);
    });
  });

  describe('GET /livros', () => {
    it('deve retornar lista vazia quando não há livros', async () => {
      const response = await request(app)
        .get('/livros')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('deve retornar todos os livros', async () => {
      await Livro.bulkCreate([
        {
          titulo: 'Livro 1',
          autor: 'Autor 1',
          anoPublicacao: 2020,
          disponivel: true
        },
        {
          titulo: 'Livro 2',
          autor: 'Autor 2',
          anoPublicacao: 2021,
          disponivel: false
        }
      ]);

      const response = await request(app)
        .get('/livros')
        .expect(200);

      expect(response.body).toHaveLength(2);
    });
  });

  describe('GET /livros/buscar', () => {
    beforeEach(async () => {
      await Livro.bulkCreate([
        {
          titulo: 'Harry Potter e a Pedra Filosofal',
          autor: 'J.K. Rowling',
          anoPublicacao: 1997,
          disponivel: true
        },
        {
          titulo: 'O Senhor dos Anéis',
          autor: 'J.R.R. Tolkien',
          anoPublicacao: 1954,
          disponivel: true
        }
      ]);
    });

    it('deve buscar livros por título parcial', async () => {
      const response = await request(app)
        .get('/livros/buscar?titulo=Harry')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].titulo).toContain('Harry Potter');
    });

    it('deve retornar erro 400 se título não for fornecido', async () => {
      await request(app)
        .get('/livros/buscar')
        .expect(400);
    });
  });

  describe('GET /livros/:id', () => {
    it('deve retornar um livro específico', async () => {
      const livro = await Livro.create({
        titulo: 'Teste',
        autor: 'Autor Teste',
        anoPublicacao: 2023,
        disponivel: true
      });

      const response = await request(app)
        .get(`/livros/${livro.id}`)
        .expect(200);

      expect(response.body.id).toBe(livro.id);
      expect(response.body.titulo).toBe('Teste');
    });

    it('deve retornar 404 para livro inexistente', async () => {
      await request(app)
        .get('/livros/999')
        .expect(404);
    });
  });

  describe('PUT /livros/:id', () => {
    it('deve atualizar um livro existente', async () => {
      const livro = await Livro.create({
        titulo: 'Título Original',
        autor: 'Autor Original',
        anoPublicacao: 2020,
        disponivel: true
      });

      const dadosAtualizados = {
        titulo: 'Título Atualizado',
        autor: 'Autor Atualizado',
        anoPublicacao: 2021,
        disponivel: false
      };

      const response = await request(app)
        .put(`/livros/${livro.id}`)
        .send(dadosAtualizados)
        .expect(200);

      expect(response.body.titulo).toBe('Título Atualizado');
      expect(response.body.disponivel).toBe(false);
    });

    it('deve retornar 404 para livro inexistente', async () => {
      await request(app)
        .put('/livros/999')
        .send({
          titulo: 'Novo Título',
          autor: 'Novo Autor',
          anoPublicacao: 2023,
          disponivel: true
        })
        .expect(404);
    });
  });

  describe('DELETE /livros/:id', () => {
    it('deve deletar um livro existente', async () => {
      const livro = await Livro.create({
        titulo: 'Livro para Deletar',
        autor: 'Autor',
        anoPublicacao: 2023,
        disponivel: true
      });

      await request(app)
        .delete(`/livros/${livro.id}`)
        .expect(204);

      const livroExiste = await Livro.findByPk(livro.id);
      expect(livroExiste).toBeNull();
    });

    it('deve retornar 404 para livro inexistente', async () => {
      await request(app)
        .delete('/livros/999')
        .expect(404);
    });
  });
});
