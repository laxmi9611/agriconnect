const express = require("express");
const router = express.Router();
const {
  getDashboard,
  getAllUsers,
  verifyFarmer,
  deleteUser,
  createCategory,
  seedCategories,
  getAllListings,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.use(protect, admin);

router.get("/dashboard", getDashboard);
router.get("/users", getAllUsers);
router.put("/users/:id/verify", verifyFarmer);
router.delete("/users/:id", deleteUser);
router.post("/categories", createCategory);
router.post("/seed-categories", seedCategories);
router.get("/listings", getAllListings);

module.exports = router;