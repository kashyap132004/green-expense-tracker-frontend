import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import "./ExpenseChart.css";

const ExpenseChart = ({ expense = [] }) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [category, setCategory] = useState("All");

  // Filter expense by month + category
  const filteredExpense = expense.filter((item) => {
    const itemMonth = new Date(item.date).getMonth();
    const monthMatch = itemMonth === month;
    const categoryMatch =
      category === "All" || item.category === category;
    return monthMatch && categoryMatch;
  });

  // Group by category
  const chartData = Object.values(
    filteredExpense.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          amount: 0,
        };
      }
      acc[item.category].amount += item.amount;
      return acc;
    }, {})
  );

  const totalExpense = filteredExpense.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const highestCategory =
    chartData.length > 0
      ? chartData.reduce((max, item) =>
          item.amount > max.amount ? item : max
        ).category
      : "N/A";

  const exportCSV = () => {
    const rows = [
      ["Title", "Category", "Amount", "Date"],
      ...filteredExpense.map((e) => [
        e.title,
        e.category,
        e.amount,
        new Date(e.date).toLocaleDateString(),
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics.csv";
    a.click();
  };

  return (
    <div className="analytics-wrapper">
      <h2 className="analytics-title">Analytics</h2>

      {/* FILTER BAR */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginBottom: "28px",
          flexWrap: "wrap",
        }}
      >
        {/* Month Selector */}
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={{
            padding: "10px 14px",
            borderRadius: "14px",
            border: "1.5px solid #c8e6c9",
            background: "#ffffff",
            color: "#2e7d32",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        {/* Category Selector */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "14px",
            border: "1.5px solid #c8e6c9",
            background: "#ffffff",
            color: "#2e7d32",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <option>All</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Electricity</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        {/* Export Button */}
        <button
          onClick={exportCSV}
          style={{
            padding: "10px 16px",
            borderRadius: "14px",
            background: "#f1f8e9",
            color: "#2e7d32",
            border: "1.5px solid #c8e6c9",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      {/* SUMMARY */}
      <div className="analytics-summary">
        <div className="summary-card">
          <h4>Total Expense</h4>
          <p>₹ {totalExpense}</p>
        </div>

        <div className="summary-card">
          <h4>Categories Used</h4>
          <p>{chartData.length}</p>
        </div>

        <div className="summary-card">
          <h4>Top Category</h4>
          <p>{highestCategory}</p>
        </div>
      </div>

      {/* CHART */}
      <div className="chart-card">
        <h4 style={{ marginBottom: "18px", color: "#5f6f68" }}>
          Expense by Category
        </h4>

        <div style={{ height: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2e7d32" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
