-- Criação da tabela 'usuarios'
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

-- Criação da tabela 'produtos'
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL,
  localizacao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  imagem TEXT, -- Caminho da imagem
  usuario_id INTEGER NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) -- Relacionamento com a tabela 'usuarios'
);
