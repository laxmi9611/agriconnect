import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(user?.location || "Mumbai");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/weather/current?city=${city}`);
        setWeather(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome back, {user?.name}! 🌾</h1>
      <p style={styles.subtext}>Here's what's happening on your farm today</p>

      <div style={styles.cityInput}>
        <input
          style={styles.input}
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {loading ? <Loader /> : <WeatherWidget weather={weather} />}

      <div style={styles.quickActions}>
        <h2 style={styles.subHeading}>Quick Actions</h2>
        <div style={styles.grid}>
          <Link to="/crops" style={styles.actionCard}>
            <div style={styles.icon}>🌱</div>
            <div style={styles.actionTitle}>Crop Recommendations</div>
            <div style={styles.actionText}>Find the best crops for your soil</div>
          </Link>
          <Link to="/marketplace" style={styles.actionCard}>
            <div style={styles.icon}>🛒</div>
            <div style={styles.actionTitle}>Marketplace</div>
            <div style={styles.actionText}>Buy or sell produce</div>
          </Link>
          <Link to="/community" style={styles.actionCard}>
            <div style={styles.icon}>💬</div>
            <div style={styles.actionTitle}>Community</div>
            <div style={styles.actionText}>Ask and answer questions</div>
          </Link>
          <Link to="/create-listing" style={styles.actionCard}>
            <div style={styles.icon}>➕</div>
            <div style={styles.actionTitle}>Post a Listing</div>
            <div style={styles.actionText}>List your produce for sale</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "auto", padding: "2rem" },
  heading: { fontSize: "1.8rem", marginBottom: "0.3rem" },
  subtext: { color: "#6c757d", marginBottom: "1.5rem" },
  cityInput: { marginBottom: "1rem" },
  input: {
    padding: "0.7rem 1rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    width: "100%",
    maxWidth: "300px",
    outline: "none",
  },
  quickActions: { marginTop: "3rem" },
  subHeading: { fontSize: "1.3rem", marginBottom: "1.5rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  actionCard: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  icon: { fontSize: "2rem" },
  actionTitle: { fontSize: "1rem", fontWeight: "600", color: "#212529" },
  actionText: { fontSize: "0.85rem", color: "#6c757d" },
};

export default Dashboard;