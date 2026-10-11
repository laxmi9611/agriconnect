import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Welcome to AgriConnect! 🌾");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Join AgriConnect</h1>
        <p style={styles.subtitle}>Connect with farmers across India</p>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          minLength={6}
          required
        />
        <select
          style={styles.input}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="farmer">🌾 Farmer</option>
          <option value="buyer">🛒 Buyer</option>
        </select>
        <input
          style={styles.input}
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Location (optional)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
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
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
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
    background: "#fff",
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

export default Register;