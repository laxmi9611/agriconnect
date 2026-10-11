const User = require("../models/User");
const Listing = require("../models/Listing");
const Post = require("../models/Post");
const Category = require("../models/Category");

exports.getDashboard = async (req, res) => {
  try {
    const [totalUsers, totalFarmers, totalListings, totalPosts] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: "farmer" }),
        Listing.countDocuments(),
        Post.countDocuments(),
      ]);

    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentListings = await Listing.find()
      .populate("farmer", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalFarmers,
      totalListings,
      totalPosts,
      recentUsers,
      recentListings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyFarmer = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const category = await Category.create({ name, slug, icon, description });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedCategories = async (req, res) => {
  try {
    const defaults = [
      { name: "Vegetables", slug: "vegetables", icon: "🥬" },
      { name: "Fruits", slug: "fruits", icon: "🍎" },
      { name: "Grains", slug: "grains", icon: "🌾" },
      { name: "Pulses", slug: "pulses", icon: "🫘" },
      { name: "Spices", slug: "spices", icon: "🌶️" },
      { name: "Dairy", slug: "dairy", icon: "🥛" },
      { name: "Seeds", slug: "seeds", icon: "🌱" },
      { name: "Fertilizers", slug: "fertilizers", icon: "🧪" },
    ];

    for (const cat of defaults) {
      await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
    }

    res.json({ message: "Categories seeded" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("farmer", "name email")
      .populate("category", "name icon")
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};