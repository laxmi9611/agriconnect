import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🌾 AgriConnect</Link>

      <div style={styles.center}>
        {user && (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/marketplace" style={styles.link}>Marketplace</Link>
            <Link to="/community" style={styles.link}>Community</Link>
            {user.role === "admin" && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}
          </>
        )}
      </div>

      <div style={styles.right}>
        {user ? (
          <>
            <Link to="/profile" style={styles.avatar}>
              {user.avatar ? (
                <img src={user.avatar} alt="" style={styles.avatarImg} />
              ) : (
                <div style={styles.avatarInitial}>{user.name[0].toUpperCase()}</div>
              )}
            </Link>
            <button onClick={handleLogout} style={styles.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.8rem 2rem",
    background: "#fff",
    borderBottom: "1px solid #e9ecef",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: { fontSize: "1.3rem", fontWeight: "bold", color: "#16a34a" },
  center: { display: "flex", gap: "1.5rem" },
  right: { display: "flex", alignItems: "center", gap: "1rem" },
  link: { color: "#495057", fontSize: "0.95rem" },
  registerBtn: {
    padding: "0.5rem 1rem",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  logout: {
    padding: "0.4rem 0.9rem",
    background: "#e63946",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "0.8rem",
  },
  avatar: { display: "flex" },
  avatarImg: { width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" },
  avatarInitial: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },
};

export default Navbar;