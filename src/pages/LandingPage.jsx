import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <h2 className="brand">Green Expense Tracker</h2>

        <button
          className="nav-btn"
          onClick={() => navigate("/app/dashboard")}
        >
          Open Dashboard
        </button>
      </nav>

      <div className="hero">
        <h1>Track Smarter. Live Greener.</h1>
        <p>
          Monitor expenses, analyze carbon footprint, and build
          sustainable financial habits.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/app/dashboard")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
