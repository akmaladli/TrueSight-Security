import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === "admin" && password === "admin") {
      setErrorMessage("");
      login();
      navigate("/dashboard");
      return;
    }

    setErrorMessage("Invalid username or password. Try admin / admin.");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-wrap brand-wrap-logo">
          <img src={logo} alt="TrueSight Security logo" className="brand-logo" />
        </div>

        <div className="auth-status-row">
          <span className="signal-dot" />
          <span>System online</span>
        </div>

        <div className="login-header">
          <p className="login-kicker">Secure access</p>
          <h1>Welcome back</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className={`field-group ${errorMessage ? "has-error" : ""}`}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="admin"
              required
            />
          </div>

          <div className={`field-group ${errorMessage ? "has-error" : ""}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="admin"
              required
            />
          </div>

          {errorMessage ? (
            <p className="form-error" aria-live="polite">
              {errorMessage}
            </p>
          ) : null}

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
