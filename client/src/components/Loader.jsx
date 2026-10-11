const Loader = () => (
  <div style={styles.container}>
    <div style={styles.spinner}></div>
  </div>
);

const styles = {
  container: { display: "flex", justifyContent: "center", padding: "3rem" },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e9ecef",
    borderTop: "4px solid #16a34a",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Loader;