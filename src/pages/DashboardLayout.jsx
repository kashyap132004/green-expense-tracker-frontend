import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseList from "../components/ExpenseList";
import Limit from "../components/Limit";

import API from "../services/api";

const DashboardLayout = () => {
  const [expense, setExpense] = useState([]);

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await API.get("/expenses");
        setExpense(res.data);
      } catch (error) {
        console.error("Failed to fetch expenses", error);
      }
    };

    fetchExpenses();
  }, []);

  // Refresh after adding expense
  const refreshExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpense(res.data);
    } catch (error) {
      console.error("Failed to refresh expenses", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#f4f7f5",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          width: "100%",
          padding: "32px 40px",
          overflowY: "auto",
          background: "linear-gradient(135deg, #f4f7f5, #e8f5e9)",
        }}
      >
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<Dashboard expense={expense} />}
          />

          {/* Add Expense */}
          <Route
  path="add-expense"
  element={
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "60px",
        pointerEvents: "auto",   // 🔥 IMPORTANT
      }}
    >
      <ExpenseForm onExpenseAdded={refreshExpenses} />
    </div>
  }
/>


          {/* Analytics */}
          <Route
            path="analytics"
            element={<ExpenseChart expense={expense} />}
          />

          {/* Expense List */}
          <Route
            path="list"
            element={<ExpenseList expense={expense} />}
          />

          {/* Set Limit */}
          <Route
            path="set-limit"
            element={<Limit expense={expense} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
