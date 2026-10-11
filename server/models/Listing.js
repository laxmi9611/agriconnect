const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    cropName: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: { type: Number, required: true },
    unit: { type: String, default: "kg" },
    price: { type: Number, required: true },
    images: [{ type: String }],
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: { type: String, required: true },
    harvestDate: { type: Date },
    available: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

listingSchema.index({ title: "text", description: "text", cropName: "text" });

module.exports = mongoose.model("Listing", listingSchema);