
type PlantDisease = {
  name: string;
  cure: string;
  prevention: string;
  confidence: number;
  id: string;
  detailedDescription?: string;
  symptoms?: string[];
  scientificName?: string;
  affectedCrops?: string[];
  images?: string[];
  severity?: 'low' | 'medium' | 'high';
  timestamp?: number;
};

// Database of plant diseases to simulate different responses
const plantDiseases = [
  {
    id: "late_blight",
    name: "Tomato Late Blight",
    scientificName: "Phytophthora infestans",
    cure: "Apply copper-based fungicides as soon as symptoms appear. Remove and destroy infected plant parts. For organic options, try copper-based sprays or bacillus subtilis.",
    prevention: "Use disease-resistant varieties. Ensure proper spacing between plants for good air circulation. Avoid overhead watering. Apply preventive fungicides during humid weather. Practice crop rotation.",
    patterns: ["dark spots", "brown lesions", "tomato", "potato", "wet", "rotting"],
    detailedDescription: "Late blight is a devastating disease caused by the oomycete pathogen Phytophthora infestans. It affects plants in the Solanaceae family, particularly tomatoes and potatoes. The disease can spread rapidly in cool, wet conditions and can destroy entire crops in a matter of days if not controlled.",
    symptoms: ["Dark brown to black lesions on leaves", "White fungal growth on leaf undersides", "Brown lesions on stems", "Firm, brown spots on fruit", "Rapid wilting and plant death"],
    affectedCrops: ["Tomatoes", "Potatoes", "Eggplants", "Peppers"],
    severity: "high",
    images: ["/late-blight1.jpg", "/late-blight2.jpg"]
  },
  {
    id: "powdery_mildew",
    name: "Powdery Mildew",
    scientificName: "Multiple fungi genera including Erysiphe, Podosphaera, and Leveillula",
    cure: "Apply fungicides containing sulfur or potassium bicarbonate. For organic treatment, use a mixture of 1 tablespoon baking soda, 1 teaspoon mild liquid soap, and 1 gallon of water as a spray.",
    prevention: "Plant resistant varieties when available. Ensure good air circulation by proper spacing. Water plants at the base rather than overhead. Clean up debris at the end of the growing season.",
    patterns: ["white powder", "dusty", "cucumber", "zucchini", "pumpkin", "white spots", "squash"],
    detailedDescription: "Powdery mildew is a fungal disease that appears as white powdery spots on the leaves, stems, and sometimes fruit of infected plants. It is one of the most commonly occurring plant diseases and affects a wide range of plants including cucurbits, roses, apples, and many ornamentals.",
    symptoms: ["White powdery spots on leaves and stems", "Yellowing leaves", "Distorted growth", "Premature leaf drop", "Reduced yield"],
    affectedCrops: ["Cucumbers", "Squash", "Pumpkins", "Melons", "Roses", "Apples", "Grapes"],
    severity: "medium",
    images: ["/powdery-mildew1.jpg", "/powdery-mildew2.jpg"]
  },
  {
    id: "aphids",
    name: "Aphid Infestation",
    scientificName: "Various species in the superfamily Aphidoidea",
    cure: "Spray affected plants with insecticidal soap or neem oil. For severe cases, consider introducing beneficial insects like ladybugs or lacewings. A strong stream of water can also dislodge aphids.",
    prevention: "Regularly inspect plants for early signs of infestation. Encourage beneficial insects in your garden. Use reflective mulch to deter aphids. Plant trap crops like nasturtiums away from your main crops.",
    patterns: ["small insects", "sticky", "curling leaves", "yellow leaves", "clusters", "tiny bugs"],
    detailedDescription: "Aphids are small sap-sucking insects that can cause significant damage to plants. They multiply rapidly and can quickly colonize plants, causing stunted growth, leaf curl, and potential transmission of plant viruses.",
    symptoms: ["Clusters of small insects on new growth", "Curling, stunted, or yellowing leaves", "Sticky honeydew on leaves", "Sooty mold growth", "Distorted plant growth"],
    affectedCrops: ["Vegetables", "Fruits", "Ornamentals", "Herbs", "Roses"],
    severity: "medium",
    images: ["/aphids1.jpg", "/aphids2.jpg"]
  },
  {
    id: "leaf_spot",
    name: "Cercospora Leaf Spot",
    scientificName: "Cercospora species",
    cure: "Remove and destroy affected leaves. Apply fungicides containing chlorothalonil or copper. Ensure proper watering techniques to prevent splash-back onto leaves.",
    prevention: "Use disease-free seeds and resistant varieties if available. Maintain good air circulation. Practice crop rotation. Avoid overhead watering and working with plants when they are wet.",
    patterns: ["circular spots", "dark border", "center spots", "beet", "spinach", "pepper", "dark spots"],
    detailedDescription: "Cercospora leaf spot is a fungal disease that causes circular lesions on plant leaves. The spots typically have tan or gray centers with dark borders. Severe infections can cause leaves to yellow and drop prematurely, reducing plant vigor and yield.",
    symptoms: ["Circular spots with light centers and dark borders", "Yellowing leaves", "Premature leaf drop", "Reduced plant vigor"],
    affectedCrops: ["Beets", "Swiss chard", "Spinach", "Peppers", "Eggplants", "Carrots"],
    severity: "medium",
    images: ["/leaf-spot1.jpg", "/leaf-spot2.jpg"]
  },
  {
    id: "rot_root",
    name: "Root Rot",
    scientificName: "Various fungi including Pythium, Phytophthora, and Fusarium species",
    cure: "Remove affected plants and avoid planting in the same spot. Improve drainage by adding organic matter to soil. For container plants, repot with fresh sterile potting mix.",
    prevention: "Ensure proper drainage in all planting areas. Avoid overwatering. Use raised beds in areas with poor drainage. Choose resistant plant varieties when possible.",
    patterns: ["wilting", "yellow leaves", "stunted growth", "soft stem", "mushy roots", "brown roots", "wet soil"],
    detailedDescription: "Root rot is a disease that attacks the roots of plants growing in wet or damp soil. This disease is often caused by fungi that thrive in moist conditions. The roots of affected plants turn brown and mushy, unable to absorb nutrients effectively, leading to plant decline and death.",
    symptoms: ["Wilting despite adequate soil moisture", "Yellowing leaves", "Stunted growth", "Brown, mushy roots", "Soft, discolored stem base", "Plant collapse"],
    affectedCrops: ["Most plants can be affected", "Particularly common in houseplants, vegetables, and ornamentals"],
    severity: "high",
    images: ["/root-rot1.jpg", "/root-rot2.jpg"]
  },
  {
    id: "bacterial_wilt",
    name: "Bacterial Wilt",
    scientificName: "Ralstonia solanacearum",
    cure: "There is no effective cure once a plant is infected. Remove and destroy affected plants immediately to prevent spread.",
    prevention: "Use resistant varieties when available. Practice crop rotation. Use clean tools and equipment. Avoid wounding plants. Control insect vectors like cucumber beetles.",
    patterns: ["wilting", "bacterial ooze", "vascular discoloration", "cucumber", "squash", "tomato", "collapse"],
    detailedDescription: "Bacterial wilt is a serious soil-borne disease caused by Ralstonia solanacearum. It affects plants in the Solanaceae and Cucurbitaceae families. The bacteria invade the plant's vascular system, blocking water transport and causing rapid wilting and death.",
    symptoms: ["Rapid wilting of plants", "No recovery at night", "Vascular tissue discoloration", "Bacterial streaming in water from cut stems", "Complete plant collapse"],
    affectedCrops: ["Tomatoes", "Potatoes", "Eggplants", "Peppers", "Bananas", "Cucumbers", "Squash"],
    severity: "high", 
    images: ["/bacterial-wilt1.jpg", "/bacterial-wilt2.jpg"]
  },
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
        id: selectedDisease.id,
        name: selectedDisease.name,
        cure: selectedDisease.cure,
        prevention: selectedDisease.prevention,
        confidence: Math.floor(60 + Math.random() * 35), // 60-95% confidence
        detailedDescription: selectedDisease.detailedDescription,
        symptoms: selectedDisease.symptoms,
        scientificName: selectedDisease.scientificName,
        affectedCrops: selectedDisease.affectedCrops,
        severity: selectedDisease.severity,
        images: selectedDisease.images,
        timestamp: Date.now()
      };
      
      resolve(result);
    }, 2000); // 2 seconds delay to simulate processing
  });
};

// History management
export const saveToHistory = (disease: PlantDisease, imageData: string): void => {
  try {
    const history = localStorage.getItem('disease-history');
    let historyArr: Array<{disease: PlantDisease, image: string}> = history ? JSON.parse(history) : [];
    
    // Add new entry to history
    historyArr.unshift({
      disease,
      image: imageData
    });
    
    // Limit history to 20 items
    if (historyArr.length > 20) {
      historyArr = historyArr.slice(0, 20);
    }
    
    localStorage.setItem('disease-history', JSON.stringify(historyArr));
  } catch (error) {
    console.error("Error saving to history:", error);
  }
};

export const getHistory = (): Array<{disease: PlantDisease, image: string}> => {
  try {
    const history = localStorage.getItem('disease-history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error retrieving history:", error);
    return [];
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem('disease-history');
};

