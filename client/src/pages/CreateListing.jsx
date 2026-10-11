import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const CreateListing = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    cropName: "",
    category: "",
    quantity: "",
    unit: "kg",
    price: "",
    location: "",
    harvestDate: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/listings/categories");
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };
  fetchCategories();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      images.forEach((img) => formData.append("images", img));

      const { data } = await API.post("/listings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Listing created! 🌾");
      navigate(`/listing/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Create a Listing</h1>
      <p style={styles.subtext}>Sell your produce directly to buyers</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title *</label>
        <input
          style={styles.input}
          placeholder="e.g., Fresh Organic Tomatoes"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label style={styles.label}>Crop Name *</label>
        <input
          style={styles.input}
          placeholder="e.g., Tomato"
          value={form.cropName}
          onChange={(e) => setForm({ ...form, cropName: e.target.value })}
          required
        />

        <label style={styles.label}>Description *</label>
        <textarea
          style={styles.textarea}
          placeholder="Describe your produce, quality, and any details..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          required
        />

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Category *</label>
            <select
              style={styles.input}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Location *</label>
            <input
              style={styles.input}
              placeholder="e.g., Nashik, Maharashtra"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Quantity *</label>
            <input
              style={styles.input}
              type="number"
              placeholder="100"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Unit</label>
            <select
              style={styles.input}
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            >
              <option value="kg">kg</option>
              <option value="quintal">quintal</option>
              <option value="ton">ton</option>
              <option value="dozen">dozen</option>
              <option value="piece">piece</option>
            </select>
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Price per Unit (₹) *</label>
            <input
              style={styles.input}
              type="number"
              placeholder="50"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Harvest Date</label>
            <input
              style={styles.input}
              type="date"
              value={form.harvestDate}
              onChange={(e) => setForm({ ...form, harvestDate: e.target.value })}
            />
          </div>
        </div>

        <label style={styles.label}>Images (max 5)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files).slice(0, 5))}
          style={styles.file}
        />
        <p style={styles.hint}>💡 Add clear photos of your produce</p>

        <div style={styles.btnRow}>
          <button type="submit" style={styles.saveBtn} disabled={loading}>
            {loading ? "Creating..." : "Create Listing"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "auto", padding: "2rem" },
  heading: { fontSize: "1.8rem", marginBottom: "0.3rem" },
  subtext: { color: "#6c757d", marginBottom: "2rem" },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  label: { fontSize: "0.9rem", color: "#495057", fontWeight: "600", marginTop: "0.5rem" },
  input: {
    padding: "0.7rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
  },
  textarea: {
    padding: "0.7rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    resize: "vertical",
    fontFamily: "inherit",
  },
  row: { display: "flex", gap: "1rem" },
  field: { flex: 1 },
  file: { fontSize: "0.9rem", padding: "0.5rem 0" },
  hint: { fontSize: "0.8rem", color: "#6c757d" },
  btnRow: { display: "flex", gap: "1rem", marginTop: "1rem" },
  saveBtn: {
    flex: 1,
    padding: "0.8rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
  },
  cancelBtn: {
    padding: "0.8rem 1.5rem",
    background: "#f8f9fa",
    color: "#495057",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
    fontWeight: "600",
  },
};

export default CreateListing;