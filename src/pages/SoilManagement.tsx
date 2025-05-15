
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plant, Cloud, Droplets, Thermometer, ChevronDown, ArrowRight, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

// Types
type SoilData = {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  soilType: string;
};

type CropSuggestion = {
  name: string;
  confidence: number;
  description: string;
  requirements: {
    ph: string;
    temperature: string;
    rainfall: string;
    soil: string;
  };
  marketTrend: 'up' | 'down' | 'stable';
  price: string;
  growthDuration: string;
  imageUrl: string;
};

const soilTypes = [
  'Clay',
  'Sandy',
  'Silty',
  'Loamy',
  'Chalky',
  'Peaty',
  'Black Cotton',
  'Red Soil',
  'Alluvial',
  'Laterite'
];

// Mock API function to simulate getting crop suggestions
const fetchCropSuggestions = async (soilData: SoilData): Promise<CropSuggestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is a mock response - in a real app, this would be fetched from an actual API
  return [
    {
      name: "Rice",
      confidence: 85,
      description: "Rice is a staple food for more than half the world's population. It thrives in your soil conditions.",
      requirements: {
        ph: "5.5-7.0",
        temperature: "20-27°C",
        rainfall: "100-200 cm",
        soil: "Clay or Loamy"
      },
      marketTrend: "up",
      price: "$15-18 per kg",
      growthDuration: "3-4 months",
      imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmljZSUyMGZpZWxkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    {
      name: "Wheat",
      confidence: 78,
      description: "Wheat is suitable for your soil conditions and the current market demand is high.",
      requirements: {
        ph: "6.0-7.0",
        temperature: "15-24°C",
        rainfall: "60-90 cm",
        soil: "Loamy or Clay"
      },
      marketTrend: "stable",
      price: "$12-14 per kg",
      growthDuration: "4-5 months",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1c0b24d11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hlYXQlMjBmaWVsZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    {
      name: "Maize",
      confidence: 72,
      description: "Maize can adapt well to your soil conditions and requires moderate water.",
      requirements: {
        ph: "5.8-7.0",
        temperature: "20-30°C",
        rainfall: "50-80 cm",
        soil: "Well-drained Loamy"
      },
      marketTrend: "up",
      price: "$10-13 per kg",
      growthDuration: "3-4 months",
      imageUrl: "https://images.unsplash.com/photo-1535913989690-f90e1c2d53b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29ybiUyMGZpZWxkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    {
      name: "Cotton",
      confidence: 65,
      description: "Cotton can grow well in your soil conditions, but requires careful management.",
      requirements: {
        ph: "5.5-8.0",
        temperature: "21-30°C",
        rainfall: "60-120 cm",
        soil: "Black Cotton or Loamy"
      },
      marketTrend: "down",
      price: "$20-25 per kg",
      growthDuration: "5-6 months",
      imageUrl: "https://images.unsplash.com/photo-1599507409752-b36702c6613b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y290dG9uJTIwZmllbGR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    }
  ].filter(crop => {
    // Apply some filtering based on the soil data
    // This is simplified logic - in real app, would be more sophisticated
    if (soilData.soilType === 'Clay' && crop.name === 'Rice') return true;
    if (soilData.soilType === 'Loamy' && (crop.name === 'Wheat' || crop.name === 'Maize')) return true;
    if (soilData.soilType === 'Black Cotton' && crop.name === 'Cotton') return true;
    
    // If no specific filters match, return based on soil pH compatibility
    const [minPh, maxPh] = crop.requirements.ph.split('-').map(parseFloat);
    return soilData.ph >= minPh && soilData.ph <= maxPh;
  });
};

// Mock API function to get soil analytics
const getSoilAnalytics = async (soilData: SoilData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate recommendations based on soil data
  const phRecommendation = soilData.ph < 6 
    ? "Your soil is acidic. Consider adding lime to raise pH." 
    : soilData.ph > 7.5 
    ? "Your soil is alkaline. Consider adding sulfur to lower pH."
    : "Your soil pH is optimal for most crops.";
  
  const nitrogenRecommendation = soilData.nitrogen < 50 
    ? "Nitrogen levels are low. Consider adding nitrogen-rich fertilizers like urea or ammonium nitrate." 
    : "Nitrogen levels are adequate.";
  
  const phosphorusRecommendation = soilData.phosphorus < 50 
    ? "Phosphorus levels are low. Consider adding phosphorus-rich fertilizers like superphosphate." 
    : "Phosphorus levels are adequate.";
  
  const potassiumRecommendation = soilData.potassium < 50 
    ? "Potassium levels are low. Consider adding potassium-rich fertilizers like potassium chloride." 
    : "Potassium levels are adequate.";
  
  return {
    recommendations: [
      { type: "pH", value: soilData.ph, recommendation: phRecommendation },
      { type: "Nitrogen", value: soilData.nitrogen, recommendation: nitrogenRecommendation },
      { type: "Phosphorus", value: soilData.phosphorus, recommendation: phosphorusRecommendation },
      { type: "Potassium", value: soilData.potassium, recommendation: potassiumRecommendation }
    ],
    soilHealthIndex: calculateSoilHealthIndex(soilData),
    organicMatterEstimate: estimateOrganicMatter(soilData)
  };
};

// Helper function to calculate soil health index
const calculateSoilHealthIndex = (soilData: SoilData): number => {
  // This is a simplified calculation
  const phFactor = soilData.ph >= 6 && soilData.ph <= 7.5 ? 1 : 0.7;
  const nutrientsFactor = (soilData.nitrogen + soilData.phosphorus + soilData.potassium) / 300;
  
  return Math.min(100, Math.round((phFactor * 0.4 + nutrientsFactor * 0.6) * 100));
};

// Helper function to estimate organic matter
const estimateOrganicMatter = (soilData: SoilData): string => {
  // This is a simplified estimation
  const value = (soilData.nitrogen / 100) * 2.5;
  return value.toFixed(1) + '%';
};

const SoilManagement: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 6.5,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 60,
    rainfall: 80,
    soilType: 'Loamy'
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Query for crop suggestions
  const { data: cropSuggestions, isLoading: isLoadingCrops } = useQuery({
    queryKey: ['cropSuggestions', isSubmitted ? soilData : null],
    queryFn: () => fetchCropSuggestions(soilData),
    enabled: isSubmitted,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  
  // Query for soil analytics
  const { data: soilAnalytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['soilAnalytics', isSubmitted ? soilData : null],
    queryFn: () => getSoilAnalytics(soilData),
    enabled: isSubmitted,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  
  const handleInputChange = (field: keyof SoilData, value: string | number) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    if (!soilData.soilType) {
      toast({
        title: "Missing Information",
        description: "Please select a soil type before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitted(true);
    toast({
      title: "Analysis Started",
      description: "Analyzing soil data and generating recommendations...",
    });
  };
  
  const resetForm = () => {
    setIsSubmitted(false);
    setSoilData({
      ph: 6.5,
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      temperature: 25,
      humidity: 60,
      rainfall: 80,
      soilType: 'Loamy'
    });
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Soil Management & Crop Suggestions</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Enter your soil parameters to get personalized crop recommendations and soil management advice
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plant className="mr-2 h-5 w-5 text-agri-green" />
                Soil Parameters
              </CardTitle>
              <CardDescription>
                Enter your soil characteristics to get accurate recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select
                    value={soilData.soilType}
                    onValueChange={(value) => handleInputChange('soilType', value)}
                    disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                  >
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="ph-value">pH Level</Label>
                    <span className="text-sm text-gray-500">{soilData.ph}</span>
                  </div>
                  <Slider
                    id="ph-value"
                    min={0}
                    max={14}
                    step={0.1}
                    value={[soilData.ph]}
                    onValueChange={(value) => handleInputChange('ph', value[0])}
                    disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Acidic (0)</span>
                    <span>Neutral (7)</span>
                    <span>Alkaline (14)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                    <div className="flex mt-2">
                      <Input
                        id="nitrogen"
                        type="number"
                        min="0"
                        max="100"
                        value={soilData.nitrogen}
                        onChange={(e) => handleInputChange('nitrogen', parseInt(e.target.value) || 0)}
                        disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                      />
                      <span className="ml-2 flex items-center text-gray-500">mg/kg</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                    <div className="flex mt-2">
                      <Input
                        id="phosphorus"
                        type="number"
                        min="0"
                        max="100"
                        value={soilData.phosphorus}
                        onChange={(e) => handleInputChange('phosphorus', parseInt(e.target.value) || 0)}
                        disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                      />
                      <span className="ml-2 flex items-center text-gray-500">mg/kg</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="potassium">Potassium (K)</Label>
                    <div className="flex mt-2">
                      <Input
                        id="potassium"
                        type="number"
                        min="0"
                        max="100"
                        value={soilData.potassium}
                        onChange={(e) => handleInputChange('potassium', parseInt(e.target.value) || 0)}
                        disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                      />
                      <span className="ml-2 flex items-center text-gray-500">mg/kg</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="temperature">Temperature</Label>
                      <span className="text-sm text-gray-500">{soilData.temperature}°C</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-gray-500" />
                      <Slider
                        id="temperature"
                        min={0}
                        max={50}
                        step={1}
                        value={[soilData.temperature]}
                        onValueChange={(value) => handleInputChange('temperature', value[0])}
                        disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="humidity">Humidity</Label>
                      <span className="text-sm text-gray-500">{soilData.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <Cloud className="h-4 w-4 mr-2 text-gray-500" />
                      <Slider
                        id="humidity"
                        min={0}
                        max={100}
                        step={1}
                        value={[soilData.humidity]}
                        onValueChange={(value) => handleInputChange('humidity', value[0])}
                        disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="rainfall">Rainfall</Label>
                      <span className="text-sm text-gray-500">{soilData.rainfall} cm</span>
                    </div>
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-gray-500" />
                      <Slider
                        id="rainfall"
                        min={0}
                        max={200}
                        step={1}
                        value={[soilData.rainfall]}
                        onValueChange={(value) => handleInputChange('rainfall', value[0])}
                        disabled={isSubmitted && (isLoadingCrops || isLoadingAnalytics)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {!isSubmitted ? (
                <Button 
                  className="w-full" 
                  onClick={handleSubmit}
                >
                  Analyze Soil & Get Recommendations
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={resetForm}
                  disabled={isLoadingCrops || isLoadingAnalytics}
                >
                  Reset & Start New Analysis
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        {/* Results Area */}
        <div className="lg:col-span-2">
          {!isSubmitted ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8 border border-dashed rounded-lg">
                <Leaf className="h-12 w-12 text-agri-green mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Get Personalized Recommendations</h3>
                <p className="text-gray-600 mb-6">
                  Enter your soil parameters and click 'Analyze' to receive tailored crop suggestions and soil management advice.
                </p>
                <Button onClick={handleSubmit}>Analyze Now</Button>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="crops" className="h-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="crops">Crop Recommendations</TabsTrigger>
                <TabsTrigger value="analytics">Soil Analytics</TabsTrigger>
              </TabsList>
              
              {/* Crop Recommendations Tab */}
              <TabsContent value="crops" className="h-full">
                {isLoadingCrops ? (
                  <div className="flex flex-col items-center justify-center p-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-green mb-4"></div>
                    <p className="text-gray-600">Analyzing soil data and generating crop recommendations...</p>
                  </div>
                ) : cropSuggestions && cropSuggestions.length > 0 ? (
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      Based on your soil parameters, here are the top crop recommendations:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cropSuggestions.map((crop) => (
                        <Card key={crop.name} className="overflow-hidden">
                          <div className="h-48 w-full relative">
                            <img 
                              src={crop.imageUrl} 
                              alt={crop.name} 
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge 
                                variant={
                                  crop.marketTrend === 'up' ? 'default' : 
                                  crop.marketTrend === 'down' ? 'destructive' : 'secondary'
                                }
                                className="flex items-center gap-1"
                              >
                                Market: {crop.marketTrend === 'up' ? '↑' : crop.marketTrend === 'down' ? '↓' : '→'} {crop.price}
                              </Badge>
                            </div>
                          </div>
                          
                          <CardHeader>
                            <CardTitle>{crop.name}</CardTitle>
                            <CardDescription>{crop.description}</CardDescription>
                          </CardHeader>
                          
                          <CardContent>
                            <div className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Match Confidence</span>
                                <span className="text-sm font-medium">{crop.confidence}%</span>
                              </div>
                              <Progress value={crop.confidence} className="h-2" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="text-xs">
                                <span className="font-medium block">pH Range</span>
                                {crop.requirements.ph}
                              </div>
                              <div className="text-xs">
                                <span className="font-medium block">Temperature</span>
                                {crop.requirements.temperature}
                              </div>
                              <div className="text-xs">
                                <span className="font-medium block">Rainfall</span>
                                {crop.requirements.rainfall}
                              </div>
                              <div className="text-xs">
                                <span className="font-medium block">Soil Types</span>
                                {crop.requirements.soil}
                              </div>
                            </div>
                            
                            <div className="text-sm">
                              <span className="font-medium">Growth Duration:</span> {crop.growthDuration}
                            </div>
                          </CardContent>
                          
                          <CardFooter>
                            <Button variant="outline" size="sm" className="w-full">
                              View Detailed Guide
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">No Suitable Crops Found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any suitable crops for your soil parameters. Try adjusting your inputs or consult with a local agricultural expert.
                    </p>
                    <Button variant="outline" onClick={resetForm}>Adjust Parameters</Button>
                  </div>
                )}
              </TabsContent>
              
              {/* Soil Analytics Tab */}
              <TabsContent value="analytics" className="h-full">
                {isLoadingAnalytics ? (
                  <div className="flex flex-col items-center justify-center p-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-green mb-4"></div>
                    <p className="text-gray-600">Analyzing soil health and generating recommendations...</p>
                  </div>
                ) : soilAnalytics ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Soil Health Index</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="relative h-32 w-32 mx-auto">
                              <svg viewBox="0 0 100 100" className="h-full w-full">
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke="#e2e8f0"
                                  strokeWidth="10"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke={
                                    soilAnalytics.soilHealthIndex >= 80
                                      ? "#10b981"
                                      : soilAnalytics.soilHealthIndex >= 60
                                      ? "#f59e0b"
                                      : "#ef4444"
                                  }
                                  strokeWidth="10"
                                  strokeDasharray={`${(soilAnalytics.soilHealthIndex / 100) * 251.2} 251.2`}
                                  transform="rotate(-90 50 50)"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                                {soilAnalytics.soilHealthIndex}
                              </div>
                            </div>
                            <p className="mt-2 text-sm">
                              {soilAnalytics.soilHealthIndex >= 80
                                ? "Excellent soil health"
                                : soilAnalytics.soilHealthIndex >= 60
                                ? "Good soil health"
                                : "Poor soil health - needs improvement"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Organic Matter</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center pt-4">
                            <span className="text-4xl font-bold block">{soilAnalytics.organicMatterEstimate}</span>
                            <p className="text-sm mt-4">
                              {parseFloat(soilAnalytics.organicMatterEstimate) > 3
                                ? "Good organic matter content"
                                : "Low organic matter - consider adding compost"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Selected Soil Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center pt-4">
                            <span className="text-2xl font-medium block">{soilData.soilType}</span>
                            <p className="text-sm mt-4">
                              {soilData.soilType === 'Clay' && "Heavy, nutrient-rich soil that retains water well"}
                              {soilData.soilType === 'Sandy' && "Light, well-draining soil that warms quickly"}
                              {soilData.soilType === 'Silty' && "Fertile soil with good water retention"}
                              {soilData.soilType === 'Loamy' && "Ideal balanced soil with good structure"}
                              {soilData.soilType === 'Chalky' && "Alkaline soil that drains quickly"}
                              {soilData.soilType === 'Peaty' && "Acidic soil rich in organic matter"}
                              {soilData.soilType === 'Black Cotton' && "Clay-rich soil that expands when wet"}
                              {soilData.soilType === 'Red Soil' && "Iron-rich soil that drains well"}
                              {soilData.soilType === 'Alluvial' && "Fertile soil deposited by flowing water"}
                              {soilData.soilType === 'Laterite' && "Highly weathered, nutrient-poor soil"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Soil Recommendations</CardTitle>
                        <CardDescription>
                          Based on your soil parameters, here are our recommendations for improved soil health
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {soilAnalytics.recommendations.map(rec => (
                            <div key={rec.type} className="p-4 border rounded-lg">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium">{rec.type}</h4>
                                <Badge 
                                  variant={
                                    rec.type === "pH" 
                                      ? (rec.value < 6 || rec.value > 7.5 ? "outline" : "default")
                                      : rec.value < 50 ? "outline" : "default"
                                  }
                                >
                                  {rec.type === "pH" ? rec.value : `${rec.value} mg/kg`}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-700">{rec.recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p>No soil analytics available. Please submit soil data for analysis.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilManagement;
