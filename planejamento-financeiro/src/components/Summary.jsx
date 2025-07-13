import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Summary({ transactions }) {
  const [isVisible, setIsVisible] = useState(true);

  const totalIncome = transactions
    .filter((t) => t.type === "Entrada")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Saída")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const data = [
    { name: "Ganhos", value: totalIncome, color: "#2ecc71" },
    { name: "Gastos", value: totalExpense, color: "#e74c3c" },
  ];

  if (totalIncome === 0 && totalExpense === 0) {
    return <div className="summary-card">Nenhum dado disponível.</div>;
  }

  return (
    isVisible && (
      <div className="summary-card">
        
        <h2>Resumo Financeiro</h2>
        <div className="summary-values">
          <div>Saldo: R$ {balance.toFixed(2)}</div>
          <div>Ganhos: R$ {totalIncome.toFixed(2)}</div>
          <div>Gastos: R$ {totalExpense.toFixed(2)}</div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `R$ ${value.toFixed(2)}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  );
}

export default Summary;