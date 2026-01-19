import React, { useState } from "react";
import "./Limit.css";

const Limit = () => {
  // ✅ Initialize directly from localStorage
  const [savedLimit, setSavedLimit] = useState(
    localStorage.getItem("expenseLimit") || ""
  );
  const [limit, setLimit] = useState("");

  const handleSave = () => {
    if (!limit || Number(limit) <= 0) {
      alert("Please enter a valid limit");
      return;
    }

    localStorage.setItem("expenseLimit", limit);
    setSavedLimit(limit);
    setLimit("");
  };

  return (
    <div className="limit-wrapper">
      <h2 className="limit-title">Set Monthly Limit</h2>

      <p className="limit-subtitle">
        Control your monthly spending by setting a limit.
      </p>

      <div className="limit-group">
        <label>Monthly Expense Limit (₹)</label>
        <input
          type="number"
          placeholder="Enter limit amount"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <button className="limit-btn" onClick={handleSave}>
        Save Limit
      </button>

      {savedLimit && (
        <div className="current-limit">
          Current Limit: ₹ {savedLimit}
        </div>
      )}
    </div>
  );
};

export default Limit;
