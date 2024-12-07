// Importando o módulo sqlite3
const sqlite3 = require('sqlite3').verbose();

// Criando ou abrindo o banco de dados
let db = new sqlite3.Database('./banco_trab.db', (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// Criando uma tabela
db.run(`CREATE TABLE IF NOT EXISTS funcionarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cargo TEXT NOT NULL,
  salario REAL NOT NULL
)`, (err) => {
  if (err) {
    console.error("Erro ao criar tabela:", err.message);
  } else {
    console.log('Tabela "funcionarios" criada ou já existente.');
  }
});