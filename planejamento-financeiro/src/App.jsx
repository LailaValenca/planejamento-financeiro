import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import "./styles.css";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [theme, setTheme] = useState("light");

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

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <>
      <div
        className={`theme-switch ${theme}`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        title={theme === "light" ? "Ativar modo noturno" : "Ativar modo claro"}
        style={{
          position: "fixed",
          top: "24px",
          right: "32px",
          zIndex: 1000
        }}
      >
        <span className={`switch-ball`}></span>
        {theme === "light" ? (
          <span className="switch-icon sun">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFA500"><path d="M12 4V2m0 20v-2m8-8h2M2 12H4m15.07-7.07l1.41-1.41M4.93 19.07l-1.41 1.41m0-16.97l1.41 1.41M19.07 19.07l1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
          </span>
        ) : (
          <span className="switch-icon moon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700"><path d="M21 12.79A9 9 0 0112.21 3a7 7 0 100 14A9 9 0 0121 12.79z"/></svg>
          </span>
        )}
      </div>
      <h1 className="main-title">Painel Financeiro</h1>
      <div className="container">
        <div className="form-section">
          <TransactionForm onAdd={addTransaction} />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Summary transactions={transactions} />
        <a
          href="http://localhost:3001/transactions/export"
          className="download-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          📥 Baixar Planilha (.csv)
        </a>
        </div>
      </div>
      

    </>
  );
}

export default App;