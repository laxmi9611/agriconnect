const WeatherWidget = ({ weather }) => {
  if (!weather) return null;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.city}>📍 {weather.city}, {weather.country}</h3>
          <p style={styles.desc}>{weather.description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt=""
          style={styles.icon}
        />
      </div>
      <div style={styles.temp}>{weather.temperature}°C</div>
      <div style={styles.details}>
        <span>Feels like: {weather.feelsLike}°C</span>
        <span>💧 Humidity: {weather.humidity}%</span>
        <span>💨 Wind: {weather.windSpeed} m/s</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "14px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  city: { fontSize: "1.1rem", marginBottom: "0.2rem" },
  desc: { fontSize: "0.85rem", opacity: 0.9, textTransform: "capitalize" },
  icon: { width: "64px", height: "64px" },
  temp: { fontSize: "3rem", fontWeight: "700", margin: "0.5rem 0" },
  details: { display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.85rem", opacity: 0.95 },
};

export default WeatherWidget;