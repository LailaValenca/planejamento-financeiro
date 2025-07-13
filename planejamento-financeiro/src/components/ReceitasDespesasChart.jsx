import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { mes: "Jan", receita: 4000, despesa: 2400 },
  { mes: "Fev", receita: 3000, despesa: 1398 },
  { mes: "Mar", receita: 5000, despesa: 2800 },
  { mes: "Abr", receita: 7000, despesa: 3900 },
  { mes: "Mai", receita: 6000, despesa: 3000 },
];

const ReceitasDespesasChart = () => {
  return (
    <div className="chart-container">
      <h2 className="chart-title">Receitas vs Despesas</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" iconType="rect" />
          <Bar dataKey="receita" fill="#4CAF50" barSize={40} name="receita" />
          <Bar dataKey="despesa" fill="#F44336" barSize={40} name="despesa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReceitasDespesasChart;