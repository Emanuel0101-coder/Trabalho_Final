const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados
let db = new sqlite3.Database('./banco_trab.db', (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

module.exports = db;
