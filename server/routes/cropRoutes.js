const express = require("express");
const router = express.Router();
const {
  getAllCrops,
  getRecommendations,
} = require("../controllers/cropController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllCrops);
router.get("/recommendations", protect, getRecommendations);

module.exports = router;