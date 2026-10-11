const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createPost,
  getPosts,
  getPostById,
  likePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", protect, getPosts);
router.post("/", protect, upload.array("images", 3), createPost);
router.get("/:id", protect, getPostById);
router.post("/:id/like", protect, likePost);
router.delete("/:id", protect, deletePost);

module.exports = router;