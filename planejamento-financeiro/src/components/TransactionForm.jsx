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
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrição"
        aria-label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        aria-label="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
        step="0.01"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="Tipo"
      >
        <option value="Entrada">Entrada</option>
        <option value="Saída">Saída</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TransactionForm;