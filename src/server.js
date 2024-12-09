const express = require("express");
const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const fs = require('fs');

// Configuração do multer para armazenar arquivos localmente
const storage = multer.memoryStorage();  // Usando memória para salvar a imagem em um Buffer
const upload = multer({ storage: storage });

const app = express();
const port = 3000;


// Middleware para processar JSON e dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Serve todas as páginas HTML dentro da pasta 'public/Telas'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'index.html'));
});

app.get('/desapegue.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'desapegue.html'));
});

app.get('/acessorio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'acessorio.html'));
});

app.get('/brinquedo.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'brinquedo.html'));
});

app.get('/calcado.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'calcado.html'));
});

app.get('/contato.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'contato.html'));
});

app.get('/esporte.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'esporte.html'));
});

app.get('/feminino.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'feminino.html'));
});

app.get('/jogo.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'jogo.html'));
});

app.get('/livro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'livro.html'));
});

app.get('/masculino.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'masculino.html'));
});

app.get('/sobre.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'sobre.html'));
});

app.get('/editar.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Telas', 'editar.html'));
});

// Rota GET para mostrar o formulário
app.get('/form', (req, res) => {
  res.render('form');  // Renderize o formulário na tela
});

// Banco de dados
const db = new sqlite3.Database("./banco_trab.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado.");
  }
});

// Rota para cadastrar um produto
app.post("/api/produtos", upload.single("imagem"), async (req, res) => {
  console.log(req.body)
  const {produto, descricao, categoria, localizacao, valor, usuario_id} = req.body;
  const imagem = req.file? req.file.buffer : null;

  console.log(produto)
  try {
    const usuario_id = Math.floor(Math.random() * 1000); // Apenas um exemplo de geração aleatória
    // // Validação dos dados
    // if (!nome || !email || !telefone || !produto || !valor) {
    //   return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    // }

    // Inserir os dados no banco de dados
    // Gerando um ID aleatório para o usuário, se não for passado

    const query = `
      INSERT INTO produtos (nome, descricao, categoria, localizacao, valor, imagem, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [produto, descricao, categoria, localizacao, valor,imagem, usuario_id];
    console.log(values)
    db.run(query, values, function (err) {
      if (err) {
        console.error("Erro ao inserir no banco:", err.message);
        return res.status(500).json({ error: "Erro interno do servidor." });
      }
      console.log("Produto inserido com ID:", this.lastID); // Log para verificar o ID gerado
      res.status(200).json({ message: "Produto cadastrado com sucesso!", id: this.lastID });
    });
  } catch (error) {
    console.error("Erro ao inserir no banco:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
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

// Exemplo de rota para atualizar um produto
app.put('/api/produtos/:id', (req, res) => {
  const produtoId = req.params.id;
  const { nome, descricao, categoria, localizacao, valor, imagem } = req.body;

  // Validação dos dados
  if (!nome || !descricao || !categoria || !localizacao || !valor) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Atualizar o produto no banco de dados
  const query = `UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, localizacao = ?, valor = ?, imagem = ? WHERE id = ?`;
  
  // Executar a consulta SQL para atualizar o produto
  db.run(query, [nome, descricao, categoria, localizacao, valor, imagem, produtoId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
    
    // Se tudo ocorrer bem
    res.status(200).json({ message: 'Produto atualizado com sucesso!' });
  });
});


// Rota para atualizar um produto pelo ID
app.put("/api/produtos/editar", upload.single('imagem'), (req, res) => {
  const { produto, descricao, categoria, localizacao, valor } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  const query = `
    UPDATE produtos
    SET nome = ?, descricao = ?, categoria = ?, localizacao = ?, valor = ?, imagem = ?
    WHERE id = ?  -- O id pode ser passado de alguma forma no corpo ou em uma variável do servidor
  `;
  db.run(query, [produto, descricao, categoria, localizacao, valor, imagem, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.status(200).json({ message: "Produto editado com sucesso." });
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
