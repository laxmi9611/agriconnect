import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data.post);
      setComments(data.comments);
      setLikes(data.post.likes?.length || 0);
      setLiked(data.post.likes?.includes(user?._id) || false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      const { data } = await API.post(`/posts/${id}/like`);
      setLikes(data.likes);
      setLiked(data.liked);
    } catch (err) {
      toast.error("Failed to like");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const { data } = await API.post(`/comments/post/${id}`, {
        text: newComment,
      });
      setComments([...comments, data]);
      setNewComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to comment");
    }
  };

  const handleUpvote = async (commentId) => {
    try {
      const { data } = await API.post(`/comments/${commentId}/upvote`);
      setComments(
        comments.map((c) =>
          c._id === commentId ? { ...c, upvotes: new Array(data.upvotes) } : c
        )
      );
    } catch (err) {
      toast.error("Failed to upvote");
    }
  };

  if (loading) return <Loader />;
  if (!post) return <p style={{ padding: "2rem" }}>Post not found</p>;

  return (
    <div style={styles.container}>
      <Link to="/community" style={styles.backBtn}>
        ← Back to Community
      </Link>

      <div style={styles.postCard}>
        <div style={styles.header}>
          {post.author?.avatar ? (
            <img src={post.author.avatar} alt="" style={styles.avatar} />
          ) : (
            <div style={styles.avatarFallback}>
              {post.author?.name?.[0] || "?"}
            </div>
          )}
          <div>
            <div style={styles.authorName}>{post.author?.name}</div>
            <div style={styles.meta}>
              {post.author?.role} ·{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
          <span style={styles.categoryBadge}>{post.category}</span>
        </div>

        <h1 style={styles.title}>{post.title}</h1>
        <p style={styles.content}>{post.content}</p>

        {post.images?.length > 0 && (
          <div style={styles.images}>
            {post.images.map((img, i) => (
              <img key={i} src={img} alt="" style={styles.postImage} />
            ))}
          </div>
        )}

        <div style={styles.actions}>
          <button
            onClick={handleLike}
            style={liked ? styles.likedBtn : styles.likeBtn}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </button>
          <span style={styles.commentCount}>💬 {comments.length}</span>
        </div>
      </div>

      <div style={styles.commentsSection}>
        <h2 style={styles.commentsHeading}>
          💬 Answers ({comments.length})
        </h2>

        <form onSubmit={handleComment} style={styles.commentForm}>
          <input
            style={styles.commentInput}
            placeholder="Share your knowledge or ask a question..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button type="submit" style={styles.sendBtn}>
            Post
          </button>
        </form>

        <div style={styles.commentsList}>
          {comments.length === 0 ? (
            <p style={styles.empty}>No answers yet. Be the first to help!</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} style={styles.comment}>
                <div style={styles.commentHeader}>
                  {c.author?.avatar ? (
                    <img src={c.author.avatar} alt="" style={styles.cAvatar} />
                  ) : (
                    <div style={styles.cAvatarFallback}>
                      {c.author?.name?.[0] || "?"}
                    </div>
                  )}
                  <div>
                    <div style={styles.cAuthorName}>{c.author?.name}</div>
                    <div style={styles.cDate}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p style={styles.cText}>{c.text}</p>
                <button
                  onClick={() => handleUpvote(c._id)}
                  style={styles.upvoteBtn}
                >
                  ⬆️ Upvote ({c.upvotes?.length || 0})
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "auto", padding: "2rem" },
  backBtn: {
    display: "inline-block",
    color: "#16a34a",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    fontWeight: "600",
  },
  postCard: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
    marginBottom: "2rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    marginBottom: "1.5rem",
  },
  avatar: { width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" },
  avatarFallback: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#16a34a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },
  authorName: { fontWeight: "600", color: "#212529" },
  meta: { fontSize: "0.8rem", color: "#6c757d", textTransform: "capitalize" },
  categoryBadge: {
    marginLeft: "auto",
    fontSize: "0.75rem",
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.3rem 0.8rem",
    borderRadius: "10px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  title: { fontSize: "1.6rem", marginBottom: "1rem", color: "#212529" },
  content: {
    color: "#495057",
    lineHeight: "1.7",
    marginBottom: "1.5rem",
    whiteSpace: "pre-wrap",
  },
  images: { display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" },
  postImage: {
    width: "200px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e9ecef",
    alignItems: "center",
  },
  likeBtn: {
    background: "transparent",
    color: "#6c757d",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
  },
  likedBtn: {
    background: "#fee2e2",
    color: "#dc2626",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    border: "1px solid #dc2626",
    borderRadius: "8px",
  },
  commentCount: { color: "#6c757d", fontSize: "1rem" },
  commentsSection: {},
  commentsHeading: { fontSize: "1.2rem", marginBottom: "1rem" },
  commentForm: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem" },
  commentInput: {
    flex: 1,
    padding: "0.7rem 1rem",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
  },
  sendBtn: {
    padding: "0.7rem 1.5rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
  },
  commentsList: { display: "flex", flexDirection: "column", gap: "1rem" },
  empty: { color: "#6c757d", textAlign: "center", padding: "2rem" },
  comment: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #e9ecef",
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "0.6rem",
  },
  cAvatar: { width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" },
  cAvatarFallback: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#16a34a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "0.85rem",
  },
  cAuthorName: { fontWeight: "600", fontSize: "0.9rem" },
  cDate: { fontSize: "0.75rem", color: "#6c757d" },
  cText: { color: "#495057", lineHeight: "1.5", marginBottom: "0.5rem" },
  upvoteBtn: {
    background: "#f5f7fa",
    color: "#495057",
    padding: "0.3rem 0.8rem",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
};

export default PostDetail;