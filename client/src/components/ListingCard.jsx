import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatDate";

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} style={styles.card}>
      <div style={styles.imageBox}>
        {listing.images?.[0] ? (
          <img src={listing.images[0]} alt={listing.title} style={styles.image} />
        ) : (
          <div style={styles.placeholder}>🌾</div>
        )}
      </div>
      <div style={styles.info}>
        <span style={styles.category}>
          {listing.category?.icon} {listing.category?.name}
        </span>
        <h3 style={styles.title}>{listing.title}</h3>
        <p style={styles.crop}>{listing.cropName}</p>
        <p style={styles.price}>
          {formatPrice(listing.price)} / {listing.unit}
        </p>
        <p style={styles.location}>📍 {listing.location}</p>
      </div>
    </Link>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e9ecef",
    display: "flex",
    flexDirection: "column",
  },
  imageBox: { height: "180px", background: "#f5f7fa" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    color: "#adb5bd",
  },
  info: { padding: "1rem", display: "flex", flexDirection: "column", gap: "0.3rem" },
  category: {
    fontSize: "0.75rem",
    color: "#16a34a",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  title: { fontSize: "1rem", color: "#212529" },
  crop: { fontSize: "0.85rem", color: "#6c757d" },
  price: { fontSize: "1.1rem", fontWeight: "700", color: "#212529", marginTop: "0.3rem" },
  location: { fontSize: "0.8rem", color: "#6c757d" },
};

export default ListingCard;