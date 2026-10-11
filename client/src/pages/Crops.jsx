import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ season: "", soilType: "" });

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const { data } = await API.get("/crops");
        setCrops(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const params = new URLSearchParams();
      if (filters.season) params.append("season", filters.season);
      if (filters.soilType) params.append("soilType", filters.soilType);

      try {
        const { data } = await API.get(`/crops/recommendations?${params}`);
        setRecommendations(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecommendations();
  }, [filters]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌱 Crop Recommendations</h1>
      <p style={styles.subtext}>Find the best crops for your farm</p>

      <div style={styles.filters}>
        <select
          style={styles.select}
          value={filters.season}
          onChange={(e) => setFilters({ ...filters, season: e.target.value })}
        >
          <option value="">All Seasons</option>
          <option value="Kharif">Kharif (Monsoon)</option>
          <option value="Rabi">Rabi (Winter)</option>
          <option value="Annual">Annual</option>
        </select>

        <select
          style={styles.select}
          value={filters.soilType}
          onChange={(e) => setFilters({ ...filters, soilType: e.target.value })}
        >
          <option value="">All Soil Types</option>
          <option value="Clay">Clay</option>
          <option value="Loamy">Loamy</option>
          <option value="Sandy">Sandy</option>
          <option value="Black">Black</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div style={styles.grid}>
          {recommendations.map((crop, i) => (
            <div key={i} style={styles.card}>
              <h3 style={styles.cropName}>🌾 {crop.name}</h3>
              <div style={styles.tags}>
                {crop.seasons.map((s) => (
                  <span key={s} style={styles.tag}>{s}</span>
                ))}
              </div>
              <p style={styles.detail}><strong>Soil:</strong> {crop.soilTypes.join(", ")}</p>
              <p style={styles.detail}><strong>Water:</strong> {crop.waterNeeds}</p>
              <p style={styles.detail}><strong>Duration:</strong> {crop.duration}</p>
              <p style={styles.tip}>💡 {crop.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "auto", padding: "2rem" },
  heading: { fontSize: "1.8rem", marginBottom: "0.3rem" },
  subtext: { color: "#6c757d", marginBottom: "1.5rem" },
  filters: { display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" },
  select: {
    padding: "0.7rem 1rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    background: "#fff",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  cropName: { fontSize: "1.15rem", marginBottom: "0.3rem", color: "#16a34a" },
  tags: { display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" },
  tag: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.2rem 0.6rem",
    borderRadius: "10px",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  detail: { fontSize: "0.9rem", color: "#495057" },
  tip: {
    background: "#fffbeb",
    color: "#92400e",
    padding: "0.6rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginTop: "0.5rem",
  },
};

export default Crops;