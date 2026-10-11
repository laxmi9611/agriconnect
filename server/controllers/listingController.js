const Listing = require("../models/Listing");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

exports.createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      cropName,
      category,
      quantity,
      unit,
      price,
      location,
      harvestDate,
    } = req.body;

    if (!title || !description || !cropName || !category || !quantity || !price) {
      return res.status(400).json({ message: "All required fields needed" });
    }

    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "agriconnect/listings",
              transformation: [{ width: 800, quality: "auto" }],
            },
            (err, result) => (err ? reject(err) : resolve(result))
          );
          stream.end(file.buffer);
        });
        images.push(result.secure_url);
      }
    }

    const listing = await Listing.create({
      title,
      description,
      cropName,
      category,
      quantity,
      unit: unit || "kg",
      price,
      images,
      farmer: req.user._id,
      location,
      harvestDate: harvestDate || null,
    });

    const populated = await Listing.findById(listing._id)
      .populate("farmer", "name email avatar phone location")
      .populate("category", "name slug icon");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, location, sort } = req.query;
    const query = { available: true };

    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    if (location) query.location = { $regex: location, $options: "i" };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortBy = {};
    if (sort === "price_asc") sortBy.price = 1;
    else if (sort === "price_desc") sortBy.price = -1;
    else sortBy.createdAt = -1;

    const listings = await Listing.find(query)
      .populate("farmer", "name email avatar location")
      .populate("category", "name slug icon")
      .sort(sortBy)
      .limit(100);

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("farmer", "name email avatar phone location bio")
      .populate("category", "name slug icon");

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ farmer: req.user._id })
      .populate("category", "name slug icon")
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });

    if (listing.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(listing, req.body);
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });

    if (
      listing.farmer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCategories = async (req, res) => {
  try {
    const Category = require("../models/Category");
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};