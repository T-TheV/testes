const Livro = require('../models/Livro');
const { Op } = require('sequelize');

const livroController = {
  // Criar um novo livro
  async criar(req, res) {
    try {
      const { titulo, autor, anoPublicacao, disponivel } = req.body;
      
      const livro = await Livro.create({
        titulo,
        autor,
        anoPublicacao,
        disponivel
      });
      
      res.status(201).json(livro);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ 
          error: 'Dados inválidos',
          details: error.errors.map(err => err.message)
        });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  },

  // Listar todos os livros
  async listarTodos(req, res) {
    try {
      const livros = await Livro.findAll();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Buscar livros por título
  async buscarPorTitulo(req, res) {
    try {
      const { titulo } = req.query;
      
      if (!titulo) {
        return res.status(400).json({ error: 'Parâmetro título é obrigatório' });
      }

      const livros = await Livro.findAll({
        where: {
          titulo: {
            [Op.iLike]: `%${titulo}%`
          }
        }
      });
      
      res.json(livros);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Buscar livro por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      
      const livro = await Livro.findByPk(id);
      
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      
      res.json(livro);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Atualizar um livro
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, autor, anoPublicacao, disponivel } = req.body;
      
      const livro = await Livro.findByPk(id);
      
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      
      await livro.update({
        titulo,
        autor,
        anoPublicacao,
        disponivel
      });
      
      res.json(livro);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ 
          error: 'Dados inválidos',
          details: error.errors.map(err => err.message)
        });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  },

  // Deletar um livro
  async deletar(req, res) {
    try {
      const { id } = req.params;
      
      const livro = await Livro.findByPk(id);
      
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      
      await livro.destroy();
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

module.exports = livroController;
