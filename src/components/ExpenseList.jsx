import "./ExpenseList.css";

const ExpenseList = ({ expense }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Expense List</h2>

      {expense.length === 0 ? (
        <p>No expense found.</p>
      ) : (
        <ul className="expense-list">
          {expense.map((item) => (
            <li key={item._id}>
              <span>
                <strong>{item.title}</strong> ({item.category})
              </span>
              <span>
                ₹{item.amount} | CO₂: {item.carbonValue}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
