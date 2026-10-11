const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.addComment = async (req, res) => {
  try {
    const { text, isAnswer } = req.body;
    if (!text) return res.status(400).json({ message: "Text required" });

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      post: post._id,
      author: req.user._id,
      text,
      isAnswer: isAnswer || false,
    });

    post.commentCount += 1;
    await post.save();

    const populated = await Comment.findById(comment._id).populate(
      "author",
      "name avatar role"
    );

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.upvoteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    const hasUpvoted = comment.upvotes.includes(req.user._id);
    if (hasUpvoted) comment.upvotes.pull(req.user._id);
    else comment.upvotes.push(req.user._id);

    await comment.save();
    res.json({ upvotes: comment.upvotes.length, upvoted: !hasUpvoted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Post.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });
    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};