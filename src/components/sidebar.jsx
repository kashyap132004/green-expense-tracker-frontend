import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>CarbonIQ</h2>

      <NavLink to="/app/dashboard">Dashboard</NavLink>
      <NavLink to="/app/add-expense">Add Expense</NavLink>
      <NavLink to="/app/analytics">Analytics</NavLink>
      <NavLink to="/">Logout</NavLink>
      <NavLink to="/app/set-limit">Set Limit</NavLink>

    </div>
  );
};

export default Sidebar;
