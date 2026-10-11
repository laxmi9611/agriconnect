const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/Category");

dotenv.config();

const categories = [
  { name: "Vegetables", slug: "vegetables", icon: "🥬" },
  { name: "Fruits", slug: "fruits", icon: "🍎" },
  { name: "Grains", slug: "grains", icon: "🌾" },
  { name: "Pulses", slug: "pulses", icon: "🫘" },
  { name: "Spices", slug: "spices", icon: "🌶️" },
  { name: "Dairy", slug: "dairy", icon: "🥛" },
  { name: "Seeds", slug: "seeds", icon: "🌱" },
  { name: "Fertilizers", slug: "fertilizers", icon: "🧪" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    for (const cat of categories) {
      await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
    }

    console.log(`✅ Seeded ${categories.length} categories`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedDB();