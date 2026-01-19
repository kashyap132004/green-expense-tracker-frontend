import "./Dashboard.css";

const Dashboard = ({ expense = [] }) => {
  const totalExpense = expense.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalCarbon = expense.reduce(
    (sum, item) => sum + item.carbonValue,
    0
  );

  const limit = Number(localStorage.getItem("expenseLimit")) || 0;
  const percentage =
    limit > 0 ? Math.min((totalExpense / limit) * 100, 100) : 0;

  const exceeded = limit > 0 && totalExpense > limit;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {exceeded && (
        <div className="limit-warning">
          ⚠ Expense limit exceeded (₹{limit})
        </div>
      )}

      {/* DASHBOARD CARDS */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h4>Total Expense</h4>
          <p>₹ {totalExpense}</p>
        </div>

        <div className="dashboard-card">
          <h4>Carbon Footprint</h4>
          <p>{totalCarbon} kg</p>
        </div>

        <div className="dashboard-card">
          <h4>Transactions</h4>
          <p>{expense.length}</p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      {limit > 0 && (
        <div className="progress-container">
          <div className="progress-title">
            Monthly Expense Usage
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${percentage}%`,
                background: exceeded
                  ? "#d32f2f"
                  : "#2e7d32",
              }}
            />
          </div>

          <div className="progress-text">
            ₹{totalExpense} of ₹{limit} used (
            {percentage.toFixed(1)}%)
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
