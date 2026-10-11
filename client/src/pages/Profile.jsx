import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));

      if (avatar) {
        const avatarData = new FormData();
        avatarData.append("avatar", avatar);
        await API.post("/users/avatar", avatarData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await API.put("/users", form);
      toast.success("Profile updated!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          {user?.avatar ? (
            <img src={user.avatar} alt="" style={styles.avatar} />
          ) : (
            <div style={styles.avatarFallback}>{user?.name?.[0]}</div>
          )}
          <h1 style={styles.name}>{user?.name}</h1>
          <p style={styles.email}>{user?.email}</p>
          <span style={styles.role}>{user?.role?.toUpperCase()}</span>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label style={styles.label}>Phone</label>
          <input
            style={styles.input}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <label style={styles.label}>Location</label>
          <input
            style={styles.input}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <label style={styles.label}>Bio</label>
          <textarea
            style={styles.textarea}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3}
            maxLength={300}
          />

          <label style={styles.label}>Update Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            style={styles.file}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "600px", margin: "auto", padding: "2rem" },
  card: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "14px",
    border: "1px solid #e9ecef",
  },
  header: { textAlign: "center", marginBottom: "2rem" },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "1rem",
  },
  avatarFallback: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 auto 1rem",
  },
  name: { fontSize: "1.5rem", marginBottom: "0.3rem" },
  email: { color: "#6c757d", marginBottom: "0.5rem" },
  role: {
    display: "inline-block",
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.3rem 0.8rem",
    borderRadius: "10px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  form: { display: "flex", flexDirection: "column", gap: "0.6rem" },
  label: { fontSize: "0.9rem", color: "#495057", fontWeight: "600", marginTop: "0.3rem" },
  input: {
    padding: "0.7rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
  },
  textarea: {
    padding: "0.7rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    resize: "vertical",
    fontFamily: "inherit",
  },
  file: { fontSize: "0.9rem" },
  button: {
    marginTop: "1rem",
    padding: "0.8rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
  },
};

export default Profile;