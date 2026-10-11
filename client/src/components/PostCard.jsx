import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`} style={styles.card}>
      <div style={styles.header}>
        {post.author?.avatar ? (
          <img src={post.author.avatar} alt="" style={styles.avatar} />
        ) : (
          <div style={styles.avatarFallback}>{post.author?.name?.[0] || "?"}</div>
        )}
        <div>
          <div style={styles.authorName}>{post.author?.name}</div>
          <div style={styles.authorRole}>
            {post.author?.role} · {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
        <span style={styles.category}>{post.category}</span>
      </div>
      <h3 style={styles.title}>{post.title}</h3>
      <p style={styles.content}>{post.content?.slice(0, 150)}...</p>
      <div style={styles.footer}>
        <span>❤️ {post.likes?.length || 0}</span>
        <span>💬 {post.commentCount || 0}</span>
      </div>
    </Link>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.2rem",
    border: "1px solid #e9ecef",
    display: "block",
    marginBottom: "1rem",
  },
  header: { display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" },
  avatarFallback: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#16a34a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },
  authorName: { fontSize: "0.9rem", fontWeight: "600", color: "#212529" },
  authorRole: { fontSize: "0.75rem", color: "#6c757d", textTransform: "capitalize" },
  category: {
    marginLeft: "auto",
    fontSize: "0.7rem",
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.2rem 0.6rem",
    borderRadius: "10px",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { fontSize: "1.05rem", marginBottom: "0.4rem", color: "#212529" },
  content: { fontSize: "0.9rem", color: "#495057", marginBottom: "0.8rem", lineHeight: "1.5" },
  footer: { display: "flex", gap: "1rem", fontSize: "0.85rem", color: "#6c757d" },
};

export default PostCard;