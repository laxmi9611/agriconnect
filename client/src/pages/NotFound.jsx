import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={styles.container}>
    <h1 style={styles.code}>404</h1>
    <h2 style={styles.title}>Page Not Found</h2>
    <p style={styles.text}>The page you're looking for doesn't exist.</p>
    <Link to="/" style={styles.btn}>Go Home</Link>
  </div>
);

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    textAlign: "center",
  },
  code: { fontSize: "6rem", color: "#16a34a", marginBottom: "1rem" },
  title: { fontSize: "1.8rem", marginBottom: "0.5rem" },
  text: { color: "#6c757d", marginBottom: "2rem" },
  btn: {
    padding: "0.8rem 2rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
  },
};

export default NotFound;