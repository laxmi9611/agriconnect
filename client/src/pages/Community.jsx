import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "general",
  });

  const fetchPosts = async () => {
    try {
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));

      await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post created! 🌾");
      setForm({ title: "", content: "", category: "general" });
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      toast.error("Failed to create post");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>💬 Community</h1>
          <p style={styles.subtext}>Ask questions and share knowledge</p>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} style={styles.newBtn}>
            {showForm ? "Cancel" : "+ New Post"}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            style={styles.input}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="general">General</option>
            <option value="pests">Pests</option>
            <option value="irrigation">Irrigation</option>
            <option value="seeds">Seeds</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="weather">Weather</option>
          </select>
          <textarea
            style={styles.textarea}
            placeholder="Share your question or knowledge..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={4}
            required
          />
          <button type="submit" style={styles.postBtn}>Post</button>
        </form>
      )}

      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>💬</p>
          <p style={styles.emptyText}>No posts yet.</p>
          <p style={styles.emptyHint}>Start a conversation!</p>
        </div>
      ) : (
        <div style={styles.list}>
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "auto", padding: "2rem" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  heading: { fontSize: "1.8rem", marginBottom: "0.3rem" },
  subtext: { color: "#6c757d" },
  newBtn: {
    padding: "0.7rem 1.3rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
  },
  form: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
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
  postBtn: {
    padding: "0.7rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
  },
  list: { display: "flex", flexDirection: "column", gap: "1rem" },
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

export default Community;