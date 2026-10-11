import { useEffect, useState } from "react";
import API from "../services/api";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    location: "",
    sort: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/admin/categories").catch(() => ({ data: [] }));
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => {
          if (v) params.append(k, v);
        });
        const { data } = await API.get(`/listings?${params.toString()}`);
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchListings, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>🛒 Marketplace</h1>
        <p style={styles.subtext}>Buy fresh produce directly from farmers</p>
      </div>

      <div style={styles.filters}>
        <input
          style={styles.input}
          placeholder="Search crops..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <select
          style={styles.select}
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : listings.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>🌾</p>
          <p style={styles.emptyText}>No listings yet.</p>
          <p style={styles.emptyHint}>Be the first to post your produce!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {listings.map((l) => (
            <ListingCard key={l._id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "1200px", margin: "auto", padding: "2rem" },
  header: { marginBottom: "1.5rem" },
  heading: { fontSize: "1.8rem", marginBottom: "0.3rem" },
  subtext: { color: "#6c757d" },
  filters: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "180px",
    padding: "0.7rem 1rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
  },
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
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  empty: {
    textAlign: "center",
    padding: "4rem 2rem",
    color: "#6c757d",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
  },
  emptyIcon: { fontSize: "4rem", marginBottom: "1rem" },
  emptyText: { fontSize: "1.1rem", marginBottom: "0.5rem", color: "#212529" },
  emptyHint: { fontSize: "0.9rem" },
};

export default Marketplace;