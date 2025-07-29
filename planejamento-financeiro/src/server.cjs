const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3001;

// Configuração do CORS para permitir requisições do seu frontend
app.use(cors());
app.use(express.json()); // Para parsear corpos de requisição JSON

// Configuração do banco de dados SQLite
// O banco de dados será criado se não existir
const dbPath = path.resolve(__dirname, 'transactions.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    // Cria a tabela de transações se ela não existir
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL
    )`);
  }
});

// Rota para obter todas as transações
app.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para adicionar uma nova transação
app.post('/transactions', (req, res) => {
  const { description, amount, type } = req.body;
  if (!description || !amount || !type) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  db.run(`INSERT INTO transactions (description, amount, type) VALUES (?, ?, ?)`,
    [description, amount, type],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID, description, amount, type });
    }
  );
});

// Rota para deletar uma transação
app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM transactions WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Transação não encontrada.' });
    } else {
      res.status(204).send(); // No Content
    }
  });
});

// Exportar transações como CSV (Sua implementação fornecida)
function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

app.get('/transactions/export', (req, res) => {
  db.all('SELECT description, amount, type FROM transactions', [], (err, rows) => { // Seleciona apenas as colunas necessárias
    if (err) return res.status(500).send('Erro ao exportar');

    let csv = '\uFEFF'; // <- BOM para Excel abrir corretamente com UTF-8
    csv += 'Descricao,Valor,Tipo\n';

    rows.forEach(row => {
      const descricao = removerAcentos(row.description);
      const tipo = removerAcentos(row.type);
      // Garante que o valor numérico seja formatado com duas casas decimais
      const valor = typeof row.amount === 'number' ? row.amount.toFixed(2) : row.amount;
      csv += `"${descricao}",${valor},"${tipo}"\n`;
    });

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment('transacoes.csv');
    res.send(csv);
  });
});


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});