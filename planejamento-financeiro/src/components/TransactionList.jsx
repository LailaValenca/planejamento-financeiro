function TransactionList({ transactions, onDelete }) {
  return (
    <div className="transaction-list" aria-label="Lista de transações">
      {transactions.map((transaction, index) => (
        <div key={index} className={`transaction-item ${transaction.type.toLowerCase()}`}>
          <span>{transaction.description}</span>
          <span>R$ {transaction.amount.toFixed(2)}</span>
          <button onClick={() => onDelete(index)} aria-label="Remover transação">X</button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;