sqlite3 banco_trab.db
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL,
  localizacao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  imagem TEXT, -- Caminho da imagem (não armazenaremos o binário para simplificar)
  usuario_id INTEGER NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

