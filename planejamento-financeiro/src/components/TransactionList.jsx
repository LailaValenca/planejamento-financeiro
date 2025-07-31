function TransactionList({ transactions, onDelete }) {
  console.log('Transações recebidas:', transactions); // Debug

  // Se não há transações, exibe mensagem
  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-list" aria-label="Lista de transações">
        <div className="no-transactions">
          Nenhuma transação encontrada
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list" aria-label="Lista de transações">
      {transactions.map((transaction) => {
        console.log('Renderizando transação:', transaction); // Debug
        return (
          <div key={transaction.id} className={`transaction-item ${transaction.type.toLowerCase()}`}>
            <span className="transaction-description">{transaction.description}</span>
            <span className="transaction-amount">R$ {transaction.amount.toFixed(2)}</span>
            <button 
              onClick={() => {
                console.log('Clicou para deletar ID:', transaction.id); // Debug
                onDelete(transaction.id);
              }} 
              aria-label="Remover transação"
              title="Remover transação"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 3v1H4v2h16V4h-5V3H9zm-4 6v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9H5zm2 2h2v8H7v-8zm4 0h2v8h-2v-8z"/>
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionList;