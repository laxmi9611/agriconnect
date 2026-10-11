const express = require("express");
const router = express.Router();
const {
  addComment,
  upvoteComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/post/:postId", protect, addComment);
router.post("/:id/upvote", protect, upvoteComment);
router.delete("/:id", protect, deleteComment);

module.exports = router;