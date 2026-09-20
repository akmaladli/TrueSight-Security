import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "admin") {
      login();
      navigate("/dashboard");
      return;
    }

    alert("Invalid username or password");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-wrap">
          <div className="brand-badge">TS</div>
          <div>
            <p className="eyebrow">Smart Security Platform</p>
            <h1>TrueSight Security</h1>
          </div>
        </div>

        <div className="auth-status-row">
          <span className="signal-dot" />
          <span>System online</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Login
          </button>

          <p className="demo-note">Demo access: admin / admin</p>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
