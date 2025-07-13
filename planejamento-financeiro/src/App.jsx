import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import "./styles.css";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Carregar transações do backend ao iniciar
  useEffect(() => {
    axios.get("http://localhost:3001/transactions")
      .then(res => setTransactions(res.data))
      .catch(() => setTransactions([]));
  }, []);

  // Adicionar transação no backend e atualizar lista
  const addTransaction = (transaction) => {
    axios.post("http://localhost:3001/transactions", transaction)
      .then(res => setTransactions([...transactions, res.data]));
  };

  // Remover transação no backend e atualizar lista
  const deleteTransaction = (id) => {
    axios.delete(`http://localhost:3001/transactions/${id}`)
      .then(() => setTransactions(transactions.filter(t => t.id !== id)));
  };

  return (
    <>
      <h1 className="main-title">Painel Financeiro</h1>
      <div className="container">
        <div className="form-section">
          <TransactionForm onAdd={addTransaction} />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Summary transactions={transactions} />
        </div>
      </div>
    </>
  );
}

export default App;