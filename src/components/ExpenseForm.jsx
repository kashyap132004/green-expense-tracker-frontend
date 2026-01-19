import { useState } from "react";
import API from "../services/api";
import "./ExpenseForm.css";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/expenses", {
        title,
        category,
        amount: Number(amount),
      });

      if (onExpenseAdded) {
        onExpenseAdded(response.data);
      }

      setTitle("");
      setCategory("Food");
      setAmount("");
    } catch (err) {
      alert("Failed to add expense");
      console.error(err);
    }
  };

  return (
    // ✅ FULL WIDTH CONTAINER (KEY FIX)
    <div style={{ width: "100%" }}>
      <div className="expense-form-wrapper">
        <h2 className="expense-form-title">Add Expense</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Expense Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Electricity</option>
              <option>Shopping</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
