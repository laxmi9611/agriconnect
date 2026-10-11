import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>🌾 AgriConnect</h1>
          <p style={styles.heroText}>
            Empowering Indian farmers with weather insights, crop recommendations,
            and a thriving marketplace.
          </p>
          {user ? (
            <Link to="/dashboard" style={styles.heroBtn}>Go to Dashboard →</Link>
          ) : (
            <Link to="/register" style={styles.heroBtn}>Get Started →</Link>
          )}
        </div>
      </section>

      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Everything farmers need 🌱</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.icon}>🌤️</div>
            <h3 style={styles.cardTitle}>Live Weather</h3>
            <p style={styles.cardText}>
              Real-time weather forecasts for your location with 7-day outlook.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.icon}>🌱</div>
            <h3 style={styles.cardTitle}>Crop Recommendations</h3>
            <p style={styles.cardText}>
              Get the right crop suggestions based on season and soil type.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.icon}>🛒</div>
            <h3 style={styles.cardTitle}>Marketplace</h3>
            <p style={styles.cardText}>
              Sell your produce directly to buyers at fair prices.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.icon}>💬</div>
            <h3 style={styles.cardTitle}>Community</h3>
            <p style={styles.cardText}>
              Ask questions and learn from experienced farmers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    padding: "5rem 2rem",
    textAlign: "center",
  },
  heroContent: { maxWidth: "700px", margin: "auto" },
  heroTitle: { fontSize: "3rem", marginBottom: "1rem" },
  heroText: { fontSize: "1.15rem", marginBottom: "2rem", opacity: 0.95, lineHeight: "1.6" },
  heroBtn: {
    display: "inline-block",
    padding: "1rem 2.5rem",
    background: "#fff",
    color: "#16a34a",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "1rem",
  },
  features: { maxWidth: "1100px", margin: "auto", padding: "4rem 2rem" },
  sectionTitle: { fontSize: "1.8rem", textAlign: "center", marginBottom: "3rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "2rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "14px",
    border: "1px solid #e9ecef",
    textAlign: "center",
  },
  icon: { fontSize: "3rem", marginBottom: "1rem" },
  cardTitle: { fontSize: "1.1rem", marginBottom: "0.5rem" },
  cardText: { color: "#6c757d", lineHeight: "1.6", fontSize: "0.9rem" },
};

export default Home;