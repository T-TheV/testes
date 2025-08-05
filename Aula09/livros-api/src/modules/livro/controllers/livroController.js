const Livro = require('../models/livroModel');
const { Op } = require('sequelize');

// Validação de segurança contra SQL injection
const validarCampos = (dados) => {
  const { titulo, autor, ano_publicacao, genero, preco } = dados;
  
  // Verificar se todos os campos estão presentes
  if (!titulo || !autor || !ano_publicacao || !genero || preco === undefined) {
    return { valido: false, msg: 'Todos os campos são obrigatórios' };
  }

  // Validar título
  if (typeof titulo !== 'string' || titulo.length < 2) {
    return { valido: false, msg: 'Título deve ter pelo menos 2 caracteres' };
  }
  
  // Verificar SQL injection no título
  if (/['";\\]|DROP|DELETE|INSERT|UPDATE|SELECT/i.test(titulo)) {
    return { valido: false, msg: 'Título inválido' };
  }

  // Validar autor
  if (typeof autor !== 'string' || autor.length < 2) {
    return { valido: false, msg: 'Autor deve ter pelo menos 2 caracteres' };
  }
  
  // Verificar SQL injection no autor
  if (/['";\\]|DROP|DELETE|INSERT|UPDATE|SELECT/i.test(autor)) {
    return { valido: false, msg: 'Autor inválido' };
  }

  // Validar ano
  if (isNaN(ano_publicacao) || !Number.isInteger(Number(ano_publicacao))) {
    return { valido: false, msg: 'Ano de publicação deve ser um número' };
  }

  // Validar gênero
  const generosValidos = ['Ficção', 'Drama', 'Romance', 'Fantasia', 'Aventura', 'Terror', 'Biografia', 'História', 'Ciência', 'Autoajuda'];
  if (!generosValidos.includes(genero)) {
    return { valido: false, msg: 'Gênero inválido' };
  }
  
  // Verificar SQL injection no gênero
  if (/['";\\]|DROP|DELETE|INSERT|UPDATE|SELECT/i.test(genero)) {
    return { valido: false, msg: 'Gênero inválido' };
  }

  // Validar preço
  if (isNaN(preco) || Number(preco) <= 0) {
    return { valido: false, msg: Number(preco) < 0 ? 'Preço deve ser maior que zero' : 'Preço deve ser um número' };
  }

  return { valido: true };
};

const livroController = {
  // Criar livro
  async criar(req, res) {
    try {
      const validacao = validarCampos(req.body);
      if (!validacao.valido) {
        return res.status(400).json({ msg: validacao.msg });
      }

      const livro = await Livro.create(req.body);
      res.status(201).json({
        ...livro.toJSON(),
        msg: 'Livro criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      res.status(400).json({ 
        msg: 'Erro ao criar livro',
        error: error.message 
      });
    }
  },

  // Listar todos
  async listar(req, res) {
    try {
      const livros = await Livro.findAll({
        order: [['id', 'ASC']]
      });
      res.json(livros);
    } catch (error) {
      console.error('Erro ao listar livros:', error);
      res.status(500).json({ 
        msg: 'Erro ao listar livros',
        error: error.message 
      });
    }
  },

  // Buscar por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const livro = await Livro.findByPk(id);
      
      if (!livro) {
        return res.status(404).json({ msg: 'Livro não encontrado' });
      }
      
      res.json({
        ...livro.toJSON(),
        msg: 'Livro encontrado'
      });
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      res.status(500).json({ 
        msg: 'Erro ao buscar livro',
        error: error.message 
      });
    }
  },

  // Buscar por título
  async buscarPorTitulo(req, res) {
    try {
      const { titulo } = req.query;
      
      if (!titulo) {
        return res.status(400).json({ msg: 'Parâmetro título é obrigatório' });
      }

      const livros = await Livro.findAll({
        where: {
          titulo: {
            [Op.like]: `%${titulo}%`
          }
        }
      });
      
      if (livros.length === 0) {
        return res.status(404).json({ msg: 'Livro não encontrado' });
      }
      
      const livrosComMsg = livros.map(livro => ({
        ...livro.toJSON(),
        msg: 'Livro encontrado'
      }));
      
      res.json(livrosComMsg);
    } catch (error) {
      console.error('Erro ao buscar livro por título:', error);
      res.status(500).json({ 
        msg: 'Erro ao buscar livro',
        error: error.message 
      });
    }
  },

  // Atualizar
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      
      const validacao = validarCampos(req.body);
      if (!validacao.valido) {
        return res.status(400).json({ msg: 'Dados inválidos para atualização' });
      }

      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ msg: 'Livro não encontrado' });
      }

      await livro.update(req.body);
      res.json({
        ...livro.toJSON(),
        msg: 'Livro atualizado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      res.status(400).json({ 
        msg: 'Erro ao atualizar livro',
        error: error.message 
      });
    }
  },

  // Deletar
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const livro = await Livro.findByPk(id);
      
      if (!livro) {
        return res.status(404).json({ msg: 'Livro não encontrado' });
      }

      await livro.destroy();
      res.status(204).json({ msg: 'Livro deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      res.status(500).json({ 
        msg: 'Erro ao deletar livro',
        error: error.message 
      });
    }
  }
};

module.exports = livroController;
