import { useState } from "react";

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Entrada");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onAdd({ description, amount: parseFloat(amount), type });
    
    setDescription("");
    setAmount("");
  };

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Entrada">Entrada</option>
        <option value="Saída">Saída</option>
      </select>
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
}

export default TransactionForm;
