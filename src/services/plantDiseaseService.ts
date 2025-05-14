
type PlantDisease = {
  name: string;
  cure: string;
  prevention: string;
  confidence: number;
};

// Database of plant diseases to simulate different responses
const plantDiseases = [
  {
    id: "late_blight",
    name: "Tomato Late Blight",
    cure: "Apply copper-based fungicides as soon as symptoms appear. Remove and destroy infected plant parts. For organic options, try copper-based sprays or bacillus subtilis.",
    prevention: "Use disease-resistant varieties. Ensure proper spacing between plants for good air circulation. Avoid overhead watering. Apply preventive fungicides during humid weather. Practice crop rotation.",
    patterns: ["dark spots", "brown lesions", "tomato", "potato", "wet", "rotting"]
  },
  {
    id: "powdery_mildew",
    name: "Powdery Mildew",
    cure: "Apply fungicides containing sulfur or potassium bicarbonate. For organic treatment, use a mixture of 1 tablespoon baking soda, 1 teaspoon mild liquid soap, and 1 gallon of water as a spray.",
    prevention: "Plant resistant varieties when available. Ensure good air circulation by proper spacing. Water plants at the base rather than overhead. Clean up debris at the end of the growing season.",
    patterns: ["white powder", "dusty", "cucumber", "zucchini", "pumpkin", "white spots", "squash"]
  },
  {
    id: "aphids",
    name: "Aphid Infestation",
    cure: "Spray affected plants with insecticidal soap or neem oil. For severe cases, consider introducing beneficial insects like ladybugs or lacewings. A strong stream of water can also dislodge aphids.",
    prevention: "Regularly inspect plants for early signs of infestation. Encourage beneficial insects in your garden. Use reflective mulch to deter aphids. Plant trap crops like nasturtiums away from your main crops.",
    patterns: ["small insects", "sticky", "curling leaves", "yellow leaves", "clusters", "tiny bugs"]
  },
  {
    id: "leaf_spot",
    name: "Cercospora Leaf Spot",
    cure: "Remove and destroy affected leaves. Apply fungicides containing chlorothalonil or copper. Ensure proper watering techniques to prevent splash-back onto leaves.",
    prevention: "Use disease-free seeds and resistant varieties if available. Maintain good air circulation. Practice crop rotation. Avoid overhead watering and working with plants when they are wet.",
    patterns: ["circular spots", "dark border", "center spots", "beet", "spinach", "pepper", "dark spots"]
  },
  {
    id: "rot_root",
    name: "Root Rot",
    cure: "Remove affected plants and avoid planting in the same spot. Improve drainage by adding organic matter to soil. For container plants, repot with fresh sterile potting mix.",
    prevention: "Ensure proper drainage in all planting areas. Avoid overwatering. Use raised beds in areas with poor drainage. Choose resistant plant varieties when possible.",
    patterns: ["wilting", "yellow leaves", "stunted growth", "soft stem", "mushy roots", "brown roots", "wet soil"]
  }
];

// Function to analyze image and return disease information
export const analyzePlantDisease = (imageData: string): Promise<PlantDisease> => {
  // In a real app, this would call an AI service
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Use image data to generate a pseudorandom seed
      const imageHash = Array.from(imageData)
        .reduce((hash, char) => hash + char.charCodeAt(0), 0);
      
      // Select a disease based on the image hash
      const diseaseIndex = imageHash % plantDiseases.length;
      const selectedDisease = plantDiseases[diseaseIndex];
      
      // Create a result with confidence level
      const result: PlantDisease = {
        name: selectedDisease.name,
        cure: selectedDisease.cure,
        prevention: selectedDisease.prevention,
        confidence: Math.floor(60 + Math.random() * 35) // 60-95% confidence
      };
      
      resolve(result);
    }, 2000); // 2 seconds delay to simulate processing
  });
};
