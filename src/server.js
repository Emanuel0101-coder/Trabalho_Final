const express = require("express");
const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const fs = require('fs');

const storage = multer.memoryStorage();  
const upload = multer({ storage: storage });

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

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


app.get('/form', (req, res) => {
  res.render('form');  
});


const db = new sqlite3.Database("./banco_trab.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco de dados conectado.");
  }
});

app.post("/api/produtos", upload.single("imagem"), async (req, res) => {
  console.log(req.body)
  const {produto, descricao, categoria, localizacao, valor, usuario_id} = req.body;
  const imagem = req.file? req.file.buffer : null;

  console.log(produto)
  try {
    const usuario_id = Math.floor(Math.random() * 1000); 

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
      console.log("Produto inserido com ID:", this.lastID); 
      res.status(200).json({ message: "Produto cadastrado com sucesso!", id: this.lastID });
    });
  } catch (error) {
    console.error("Erro ao inserir no banco:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});


app.get("/api/produtos", (req, res) => {
  const query = "SELECT * FROM produtos";
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

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

app.put('/api/produtos/:id', upload.single('imagem'), (req, res) => {
  const produtoId = req.params.id;
  const { nome, descricao, categoria, localizacao, valor } = req.body;
  console.log('Dados recebidos:', req.body);  


  if (!nome || !descricao || !categoria || !localizacao || !valor) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (!produtoId || produtoId === 'null') {
    return res.status(400).json({ error: 'ID do produto inválido' });
  }

  const imagem = req.file ? req.file.buffer : null;  // Se a imagem foi enviada, use o buffer

  console.log('Produto recebido:', produtoId);
  console.log('Imagem recebida:', req.file);  // A imagem estará aqui
  console.log('Dados recebidos:', {
    produtoId,
    nome,
    descricao,
    categoria,
    localizacao,
    valor,
    imagem,
  });

  db.run('UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, localizacao = ?, valor = ? WHERE id = ?',
    [nome, descricao, categoria, localizacao, valor, produtoId],
    function(err) {
      if (err) {
        console.error('Erro ao executar a query:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar o produto' });
        return;
      }
      res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    });
  })  

app.delete('/api/produtos/:id', (req, res) => {
  const produtoId = req.params.id;

  if (!produtoId || produtoId === 'null') {
    return res.status(400).json({ error: 'ID do produto inválido' });
  }

  db.run('DELETE FROM produtos WHERE id = ?', [produtoId], function(err) {
    if (err) {
      console.error('Erro ao executar a query de exclusão:', err.message);
      return res.status(500).json({ error: 'Erro ao excluir o produto' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(200).json({ message: 'Produto excluído com sucesso!' });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
