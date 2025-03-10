import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import "./styles.css";


function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Painel Financeiro</h1>
      <div className="container">
        <TransactionForm onAdd={addTransaction} />
        <Summary transactions={transactions} />
      </div>
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}

export default App;
