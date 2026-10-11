const { crops, getRecommendations } = require("../utils/cropData");

exports.getAllCrops = async (req, res) => {
  try {
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const { season, soilType } = req.query;
    const recommendations = getRecommendations(season, soilType);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};