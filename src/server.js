const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Banco de dados
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado.");
  }
});

// Criação da tabela de produtos
db.run(
  `CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    localizacao TEXT,
    valor REAL
  )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela produtos:", err.message);
    } else {
      console.log("Tabela de produtos criada ou já existe.");
    }
  }
);

// Rota para cadastrar um produto
app.post("/api/produtos", (req, res) => {
  const { nome, descricao, categoria, localizacao, valor } = req.body;

  const query = `INSERT INTO produtos (nome, descricao, categoria, localizacao, valor) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [nome, descricao, categoria, localizacao, valor], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, nome, descricao, categoria, localizacao, valor });
  });
});

// Rota para listar todos os produtos
app.get("/api/produtos", (req, res) => {
  const query = "SELECT * FROM produtos";
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// Rota para buscar um produto pelo ID
app.get("/api/produtos/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM produtos WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json(row);
  });
});

// Rota para atualizar um produto pelo ID
app.put("/api/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, localizacao, valor } = req.body;

  const query = `UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, localizacao = ?, valor = ? WHERE id = ?`;
  db.run(query, [nome, descricao, categoria, localizacao, valor, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json({ id, nome, descricao, categoria, localizacao, valor });
  });
});

// Rota para excluir um produto pelo ID
app.delete("/api/produtos/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM produtos WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json({ message: "Produto excluído com sucesso.", id });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

