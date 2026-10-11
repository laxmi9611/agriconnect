const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  updateProfile,
  uploadAvatar,
  getUserById,
  getAllFarmers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/farmers", protect, getAllFarmers);
router.put("/", protect, updateProfile);
router.post("/avatar", protect, upload.single("avatar"), uploadAvatar);
router.get("/:id", protect, getUserById);

module.exports = router;