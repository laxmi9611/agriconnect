import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { formatPrice, formatDate } from "../utils/formatDate";
import Loader from "../components/Loader";

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await API.get(`/listings/${id}`);
        setListing(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return <Loader />;
  if (!listing) return <p style={{ padding: "2rem" }}>Listing not found</p>;

  const isOwner = user?._id === listing.farmer?._id;

  return (
    <div style={styles.container}>
      <Link to="/marketplace" style={styles.backBtn}>← Back to Marketplace</Link>

      <div style={styles.grid}>
        <div>
          <div style={styles.mainImage}>
            {listing.images?.[selectedImage] ? (
              <img
                src={listing.images[selectedImage]}
                alt={listing.title}
                style={styles.image}
              />
            ) : (
              <div style={styles.placeholder}>🌾</div>
            )}
          </div>

          {listing.images?.length > 1 && (
            <div style={styles.thumbnails}>
              {listing.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  style={{
                    ...styles.thumb,
                    border: i === selectedImage ? "2px solid #16a34a" : "1px solid #dee2e6",
                  }}
                  onClick={() => setSelectedImage(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <span style={styles.category}>
            {listing.category?.icon} {listing.category?.name}
          </span>
          <h1 style={styles.title}>{listing.title}</h1>
          <p style={styles.crop}>Crop: {listing.cropName}</p>
          <p style={styles.location}>📍 {listing.location}</p>

          <div style={styles.priceBox}>
            <div style={styles.price}>{formatPrice(listing.price)}</div>
            <div style={styles.unit}>per {listing.unit}</div>
          </div>

          <p style={styles.quantity}>
            Available: <strong>{listing.quantity} {listing.unit}</strong>
          </p>

          {listing.harvestDate && (
            <p style={styles.harvest}>
              🌾 Harvested: {formatDate(listing.harvestDate)}
            </p>
          )}

          <div style={styles.sellerCard}>
            <h3 style={styles.sellerTitle}>👨‍🌾 Farmer</h3>
            <div style={styles.sellerInfo}>
              {listing.farmer?.avatar ? (
                <img src={listing.farmer.avatar} alt="" style={styles.sellerAvatar} />
              ) : (
                <div style={styles.sellerAvatarFallback}>
                  {listing.farmer?.name?.[0] || "?"}
                </div>
              )}
              <div>
                <div style={styles.sellerName}>{listing.farmer?.name}</div>
                {listing.farmer?.location && (
                  <div style={styles.sellerLocation}>📍 {listing.farmer.location}</div>
                )}
              </div>
            </div>

            {listing.farmer?.phone && (
              <a href={`tel:${listing.farmer.phone}`} style={styles.contactBtn}>
                📞 Contact Farmer
              </a>
            )}
          </div>

          {isOwner && (
            <div style={styles.ownerNote}>
              ✅ This is your listing
            </div>
          )}
        </div>
      </div>

      <div style={styles.descriptionSection}>
        <h2 style={styles.descTitle}>Description</h2>
        <p style={styles.descText}>{listing.description}</p>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "auto", padding: "2rem" },
  backBtn: {
    display: "inline-block",
    color: "#16a34a",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    marginBottom: "3rem",
  },
  mainImage: {
    width: "100%",
    height: "400px",
    background: "#f5f7fa",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  placeholder: { fontSize: "5rem", color: "#adb5bd" },
  thumbnails: { display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" },
  thumb: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
  },
  category: {
    display: "inline-block",
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.3rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "0.8rem",
  },
  title: { fontSize: "1.8rem", marginBottom: "0.5rem", color: "#212529" },
  crop: { color: "#6c757d", marginBottom: "0.3rem" },
  location: { color: "#6c757d", marginBottom: "1.5rem" },
  priceBox: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  price: { fontSize: "2rem", fontWeight: "700", color: "#16a34a" },
  unit: { color: "#6c757d", fontSize: "0.95rem" },
  quantity: { color: "#495057", marginBottom: "0.5rem" },
  harvest: { color: "#495057", marginBottom: "1.5rem" },
  sellerCard: {
    background: "#f5f7fa",
    padding: "1.2rem",
    borderRadius: "12px",
    marginTop: "1rem",
  },
  sellerTitle: { fontSize: "1rem", marginBottom: "0.8rem" },
  sellerInfo: { display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" },
  sellerAvatar: { width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" },
  sellerAvatarFallback: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#16a34a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  sellerName: { fontWeight: "600", color: "#212529" },
  sellerLocation: { fontSize: "0.85rem", color: "#6c757d" },
  contactBtn: {
    display: "block",
    textAlign: "center",
    padding: "0.7rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
  },
  ownerNote: {
    marginTop: "1rem",
    padding: "0.8rem",
    background: "#d1fae5",
    color: "#065f46",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  descriptionSection: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
  },
  descTitle: { fontSize: "1.2rem", marginBottom: "1rem" },
  descText: { color: "#495057", lineHeight: "1.7", whiteSpace: "pre-wrap" },
};

export default ListingDetail;