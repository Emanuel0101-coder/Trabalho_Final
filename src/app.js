const express = require('express');
const app = express();
const db = require('./db');
const multer = require('multer');

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

app.post('/adicionar-produto', upload.single('imagem'), function(req, res) {
  const produto = req.body;
  const imagem = req.file.filename;

  db.run(`
    INSERT INTO produtos (nome, descricao, categoria, localizacao, valor, imagem)
    VALUES (?, ?, ?, ?, ?, ?);
  `, [produto.nome, produto.descricao, produto.categoria, produto.localizacao, produto.valor, imagem], function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar produto!');
    } else {
      res.send('Produto adicionado com sucesso!');
    }
  });
});

app.listen(5500, function() {
  console.log('Servidor iniciado em http://localhost:3000');
});
