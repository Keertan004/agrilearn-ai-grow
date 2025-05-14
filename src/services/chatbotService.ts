
// Types for the chatbot service
type ChatIntent = {
  pattern: RegExp;
  responses: string[];
  needsFollowUp?: boolean;
  followUpQuestion?: string;
};

// Define various farming-related intents and responses
const chatIntents: ChatIntent[] = [
  {
    pattern: /disease|sick|plant|infected|spots|wilting|yellowing/i,
    responses: [
      "Could you upload a photo of the affected plant? I can help identify the disease.",
      "I'd need to see the plant to give an accurate diagnosis. Can you share an image?",
      "Plant diseases are easier to identify visually. Would you like to upload a photo?",
      "Based on your description, it could be several diseases. A photo would help narrow it down."
    ],
    needsFollowUp: true,
    followUpQuestion: "Have you noticed any specific symptoms like spots, wilting, or color changes?"
  },
  {
    pattern: /soil|fertilizer|nutrient|compost|manure/i,
    responses: [
      "Healthy soil is key to plant growth. What's your current soil type - clay, sandy, or loamy?",
      "For better soil health, consider adding organic matter like compost or well-rotted manure.",
      "Regular soil testing can help determine what nutrients your soil might be lacking.",
      "The pH of your soil affects nutrient availability. Most plants prefer a pH between 6.0-7.0."
    ],
    needsFollowUp: true,
    followUpQuestion: "Have you tested your soil recently?"
  },
  {
    pattern: /weather|rain|drought|temperature|forecast|climate/i,
    responses: [
      "Weather conditions greatly affect crop health. Have you checked our weather forecast tool?",
      "Planning around weather patterns can improve crop success. Our 7-day forecast might help.",
      "Different crops have different temperature and rainfall needs. What are you growing?",
      "Climate-smart farming practices can help mitigate weather-related risks."
    ]
  },
  {
    pattern: /crop|plant|grow|sow|seed|harvest|yield/i,
    responses: [
      "Crop selection should be based on your soil type, climate, and market demand.",
      "Consider crop rotation to prevent soil depletion and reduce pest problems.",
      "Timing is crucial for planting. What's your local growing zone?",
      "Companion planting can help maximize space and reduce pest issues."
    ],
    needsFollowUp: true,
    followUpQuestion: "What crops are you currently growing or planning to grow?"
  },
  {
    pattern: /pest|insect|bug|caterpillar|beetle|aphid|mite/i,
    responses: [
      "Integrated Pest Management (IPM) combines different strategies to control pests effectively.",
      "Beneficial insects like ladybugs and lacewings can help control harmful pests naturally.",
      "Could you describe the pests or upload a photo? Different pests require different approaches.",
      "Crop rotation and polyculture can help break pest cycles naturally."
    ]
  },
  {
    pattern: /water|irrigation|dry|wet|moisture/i,
    responses: [
      "Most plants need consistent moisture. Drip irrigation is water-efficient and reduces disease.",
      "Overwatering can be as harmful as underwatering. Soil should be moist, not soggy.",
      "Mulching helps retain soil moisture and suppress weeds.",
      "Consider rainwater harvesting to supplement irrigation during dry periods."
    ]
  },
  {
    pattern: /organic|natural|chemical|pesticide|herbicide/i,
    responses: [
      "Organic farming focuses on natural inputs and processes. Are you interested in certification?",
      "Many pests and diseases can be controlled with natural methods before resorting to chemicals.",
      "Crop rotation, companion planting, and beneficial insects are key organic strategies.",
      "Even in organic farming, some approved substances can be used for pest and disease control."
    ]
  },
  {
    pattern: /market|sell|price|profit|business|customer/i,
    responses: [
      "Direct-to-consumer selling through farmers markets can increase profit margins.",
      "Value-added products can help diversify income streams from your farm.",
      "Consider niche crops or specialty varieties that may command higher prices.",
      "Building relationships with local restaurants or schools can provide stable markets."
    ]
  },
  {
    pattern: /hello|hi|hey|greetings|start/i,
    responses: [
      "Hello! I'm your AgriLearnNetwork assistant. How can I help with your farming questions today?",
      "Hi there! I'm here to help with farming advice and information. What would you like to know?",
      "Greetings! I'm your agricultural assistant. What farming topics can I help you with?",
      "Welcome to AgriLearnNetwork! I'm here to assist with your agricultural questions."
    ]
  }
];

// Default responses when no intent is matched
const defaultResponses = [
  "I'm here to help with farming questions. Could you tell me more about what you need?",
  "I can assist with plant diseases, crop selection, soil health, and more. What are you interested in?",
  "Feel free to ask about specific farming topics or upload a photo of plants you're concerned about.",
  "I'm still learning, but I can help with many agricultural questions. What would you like to know?"
];

export const generateChatbotResponse = (userMessage: string): string => {
  // Find matching intents based on user message
  const matchingIntents = chatIntents.filter(intent => 
    intent.pattern.test(userMessage.toLowerCase())
  );
  
  if (matchingIntents.length > 0) {
    // Select a random intent from matching ones (prioritizing the first match)
    const selectedIntent = matchingIntents[Math.floor(Math.random() * Math.min(2, matchingIntents.length))];
    
    // Select a random response for that intent
    const responseIndex = Math.floor(Math.random() * selectedIntent.responses.length);
    let response = selectedIntent.responses[responseIndex];
    
    // Add follow-up question if needed
    if (selectedIntent.needsFollowUp && Math.random() > 0.5 && selectedIntent.followUpQuestion) {
      response += " " + selectedIntent.followUpQuestion;
    }
    
    return response;
  } else {
    // Use default response if no intent matches
    const responseIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[responseIndex];
  }
};
