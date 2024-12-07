const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5500;

// Middleware
app.use(express.json({ limit: "10mb" })); // Permite enviar imagens em base64 como parte do JSON

// Banco de dados
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado.");
  }
});

// Criação da tabela de produtos com campo para imagem
db.run(
  `CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    localizacao TEXT,
    valor REAL,
    imagem TEXT, -- Armazenando a imagem como base64
    usuario_id INTEGER
  )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela produtos:", err.message);
    } else {
      console.log("Tabela de produtos criada ou já existe.");
    }
  }
);

// Rota para cadastrar produto (com imagem em base64)
app.post("/api/produtos", (req, res) => {
  const { nome, descricao, categoria, localizacao, valor, imagem, usuario_id } = req.body;

  const sql = `
    INSERT INTO produtos (nome, descricao, categoria, localizacao, valor, imagem, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [nome, descricao, categoria, localizacao, valor, imagem, usuario_id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Erro ao adicionar produto:", err.message);
      res.status(500).send("Erro ao adicionar produto");
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Rota para listar produtos (incluindo a imagem em base64)
app.get("/api/produtos", (req, res) => {
  const sql = "SELECT * FROM produtos";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao listar produtos");
    } else {
      res.status(200).json(rows);
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


