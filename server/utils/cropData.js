const crops = [
  {
    name: "Rice (Paddy)",
    seasons: ["Kharif"],
    soilTypes: ["Clay", "Loamy"],
    waterNeeds: "High",
    duration: "120-150 days",
    tip: "Requires standing water. Best planted June-July.",
  },
  {
    name: "Wheat",
    seasons: ["Rabi"],
    soilTypes: ["Loamy", "Clay"],
    waterNeeds: "Medium",
    duration: "100-120 days",
    tip: "Best planted Oct-Nov. Requires cool growing season.",
  },
  {
    name: "Maize (Corn)",
    seasons: ["Kharif", "Rabi"],
    soilTypes: ["Loamy", "Sandy"],
    waterNeeds: "Medium",
    duration: "80-100 days",
    tip: "Versatile crop. Well-drained soil is essential.",
  },
  {
    name: "Cotton",
    seasons: ["Kharif"],
    soilTypes: ["Black", "Loamy"],
    waterNeeds: "Medium",
    duration: "150-180 days",
    tip: "Requires black soil. Major cash crop.",
  },
  {
    name: "Sugarcane",
    seasons: ["Kharif", "Annual"],
    soilTypes: ["Loamy", "Clay"],
    waterNeeds: "Very High",
    duration: "10-12 months",
    tip: "Long-duration crop. Requires irrigation.",
  },
  {
    name: "Tomato",
    seasons: ["Rabi", "Kharif"],
    soilTypes: ["Loamy", "Sandy"],
    waterNeeds: "Medium",
    duration: "90-120 days",
    tip: "Needs well-drained soil. Prone to pests.",
  },
  {
    name: "Potato",
    seasons: ["Rabi"],
    soilTypes: ["Sandy", "Loamy"],
    waterNeeds: "Medium",
    duration: "70-90 days",
    tip: "Cool weather crop. Plant Oct-Nov.",
  },
  {
    name: "Onion",
    seasons: ["Rabi", "Kharif"],
    soilTypes: ["Loamy", "Sandy"],
    waterNeeds: "Low",
    duration: "100-120 days",
    tip: "Well-drained soil essential. Avoid waterlogging.",
  },
  {
    name: "Groundnut",
    seasons: ["Kharif"],
    soilTypes: ["Sandy", "Loamy"],
    waterNeeds: "Medium",
    duration: "100-130 days",
    tip: "Requires sandy loam. Major oilseed crop.",
  },
  {
    name: "Soybean",
    seasons: ["Kharif"],
    soilTypes: ["Loamy", "Clay"],
    waterNeeds: "Medium",
    duration: "90-120 days",
    tip: "Nitrogen-fixing crop. Good for soil health.",
  },
];

const getRecommendations = (season, soilType) => {
  if (!season && !soilType) return crops.slice(0, 6);

  return crops.filter((crop) => {
    const seasonMatch = !season || crop.seasons.some((s) =>
      s.toLowerCase().includes(season.toLowerCase())
    );
    const soilMatch = !soilType || crop.soilTypes.some((s) =>
      s.toLowerCase().includes(soilType.toLowerCase())
    );
    return seasonMatch && soilMatch;
  });
};

module.exports = { crops, getRecommendations };