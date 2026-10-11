import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! 🌾");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>🌾 AgriConnect</h1>
        <p style={styles.subtitle}>Login to your account</p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.text}>
          New here? <Link to="/register" style={styles.link}>Create account</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 130px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  form: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "14px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: { textAlign: "center", color: "#16a34a" },
  subtitle: {
    textAlign: "center",
    color: "#6c757d",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.8rem 1rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
  },
  button: {
    padding: "0.8rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  text: { textAlign: "center", color: "#6c757d", fontSize: "0.9rem" },
  link: { color: "#16a34a", fontWeight: "600" },
};

export default Login;