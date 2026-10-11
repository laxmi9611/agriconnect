const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, location, bio } = req.body;
    const update = { name, phone, location, bio };

    const user = await User.findByIdAndUpdate(req.user._id, update, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "agriconnect/avatars",
          transformation: [{ width: 400, height: 400, crop: "fill" }],
        },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: result.secure_url },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "farmer" })
      .select("-password")
      .limit(20);
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};