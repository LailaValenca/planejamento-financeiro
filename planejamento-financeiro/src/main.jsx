import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import Summary from "./components/Summary.jsx";
import GraficoResumo from "./components/ReceitasDespesasChart.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)