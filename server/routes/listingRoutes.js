const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createListing,
  getListings,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");
const { protect } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getListings);
router.get("/my", protect, getMyListings);
router.post("/", protect, upload.array("images", 5), createListing);
router.get("/:id", getListingById);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

module.exports = router;