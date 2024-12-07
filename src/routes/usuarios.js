import express from 'express';
import db from '../db.js';

const router = express.Router();

// Obter todos os usuários
router.get('/', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) {
      res.status(500).send('Erro ao buscar usuários');
    } else {
      res.json(rows);
    }
  });
});

export default router;
