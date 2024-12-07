const express = require('express');
const app = express();
const db = require('./db'); // Conexão com o banco de dados
const multer = require('multer');
const path = require('path');

// Definindo o armazenamento de imagens
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para adicionar produto
app.post('/adicionar-produto', upload.single('imagem'), function(req, res) {
  const produto = req.body;
  const imagem = req.file.filename;

  // Inserção no banco de dados
  db.run(`
    INSERT INTO produtos (nome, descricao, categoria, localizacao, valor, imagem, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `, [produto.nome, produto.descricao, produto.categoria, produto.localizacao, produto.valor, imagem, produto.usuario_id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar produto!');
    }
    res.send('Produto adicionado com sucesso!');
  });
});

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// Inicia o servidor
app.listen(5500, function() {
  console.log('Servidor iniciado em http://localhost:5500');
});
