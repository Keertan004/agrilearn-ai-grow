
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Wheat, TrendingUp, Soil, CloudSun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Form schema for crop suggestion
const formSchema = z.object({
  soilType: z.string({
    required_error: "Please select soil type",
  }),
  region: z.string().min(2, {
    message: "Region must be at least 2 characters.",
  }),
  rainfall: z.string().min(1, {
    message: "Please enter average rainfall.",
  }),
  temperature: z.string().min(1, {
    message: "Please enter average temperature.",
  }),
  season: z.string({
    required_error: "Please select a season",
  }),
});

interface CropSuggestion {
  cropName: string;
  suitabilityScore: number;
  waterRequirement: string;
  growthPeriod: string;
  marketTrend: 'up' | 'down' | 'stable';
  expectedYield: string;
  idealConditions: string;
}

interface MarketTrend {
  cropName: string;
  currentPrice: number;
  priceChange: number;
  demand: 'High' | 'Medium' | 'Low';
  supplyStatus: string;
  forecast: string;
}

const soilTypes = [
  { value: 'clay', label: 'Clay' },
  { value: 'sandy', label: 'Sandy' },
  { value: 'loamy', label: 'Loamy' },
  { value: 'silty', label: 'Silty' },
  { value: 'peaty', label: 'Peaty' },
  { value: 'chalky', label: 'Chalky' },
  { value: 'black', label: 'Black Cotton' },
  { value: 'alluvial', label: 'Alluvial' },
];

const seasons = [
  { value: 'winter', label: 'Winter' },
  { value: 'summer', label: 'Summer' },
  { value: 'monsoon', label: 'Monsoon' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'spring', label: 'Spring' },
];

// Mock API function for crop suggestions
const fetchCropSuggestions = async (formData: z.infer<typeof formSchema>): Promise<CropSuggestion[]> => {
  // In a real implementation, this would make an API call
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data based on input
  const suggestions: CropSuggestion[] = [];
  
  // Logic for suggestions based on soil type and other inputs
  if (formData.soilType === 'loamy') {
    suggestions.push(
      {
        cropName: 'Wheat',
        suitabilityScore: 92,
        waterRequirement: 'Moderate (450-650mm)',
        growthPeriod: '120-150 days',
        marketTrend: 'up',
        expectedYield: '3.5-4.5 tonnes/hectare',
        idealConditions: 'Temp: 15-24°C, Well-drained loamy soil'
      },
      {
        cropName: 'Maize',
        suitabilityScore: 88,
        waterRequirement: 'Moderate to High (500-800mm)',
        growthPeriod: '90-120 days',
        marketTrend: 'stable',
        expectedYield: '4.5-6.5 tonnes/hectare',
        idealConditions: 'Temp: 21-27°C, Well-drained, fertile soil'
      },
      {
        cropName: 'Potato',
        suitabilityScore: 85,
        waterRequirement: 'Moderate (400-600mm)',
        growthPeriod: '75-135 days',
        marketTrend: 'up',
        expectedYield: '25-35 tonnes/hectare',
        idealConditions: 'Temp: 15-20°C, Well-drained, loose soil'
      }
    );
  } else if (formData.soilType === 'sandy') {
    suggestions.push(
      {
        cropName: 'Groundnut',
        suitabilityScore: 90,
        waterRequirement: 'Moderate (500-700mm)',
        growthPeriod: '90-150 days',
        marketTrend: 'up',
        expectedYield: '1.5-2.5 tonnes/hectare',
        idealConditions: 'Temp: 25-30°C, Well-drained sandy or sandy loam soil'
      },
      {
        cropName: 'Watermelon',
        suitabilityScore: 86,
        waterRequirement: 'Moderate (400-600mm)',
        growthPeriod: '80-110 days',
        marketTrend: 'stable',
        expectedYield: '20-30 tonnes/hectare',
        idealConditions: 'Temp: 22-30°C, Sandy loam with good drainage'
      }
    );
  } else if (formData.soilType === 'clay') {
    suggestions.push(
      {
        cropName: 'Rice',
        suitabilityScore: 94,
        waterRequirement: 'High (1000-1500mm)',
        growthPeriod: '120-180 days',
        marketTrend: 'stable',
        expectedYield: '4-6 tonnes/hectare',
        idealConditions: 'Temp: 20-35°C, Heavy clay soil with good water retention'
      },
      {
        cropName: 'Cotton',
        suitabilityScore: 87,
        waterRequirement: 'Moderate (700-1200mm)',
        growthPeriod: '150-180 days',
        marketTrend: 'down',
        expectedYield: '2-3 tonnes/hectare',
        idealConditions: 'Temp: 21-30°C, Deep clay or loam soil'
      }
    );
  } else {
    // Default suggestions for other soil types
    suggestions.push(
      {
        cropName: 'Sorghum',
        suitabilityScore: 82,
        waterRequirement: 'Low to Moderate (350-600mm)',
        growthPeriod: '90-120 days',
        marketTrend: 'stable',
        expectedYield: '2.5-4 tonnes/hectare',
        idealConditions: 'Temp: 25-31°C, Adaptable to most soil types'
      },
      {
        cropName: 'Millet',
        suitabilityScore: 79,
        waterRequirement: 'Low (300-500mm)',
        growthPeriod: '60-90 days',
        marketTrend: 'up',
        expectedYield: '1.5-3 tonnes/hectare',
        idealConditions: 'Temp: 27-30°C, Adaptable to poor soil conditions'
      }
    );
  }
  
  return suggestions;
};

// Mock API function for market trends
const fetchMarketTrends = async (): Promise<MarketTrend[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      cropName: 'Wheat',
      currentPrice: 2180.50,
      priceChange: 3.2,
      demand: 'High',
      supplyStatus: 'Moderate',
      forecast: 'Expected to increase due to export demand'
    },
    {
      cropName: 'Rice',
      currentPrice: 2850.75,
      priceChange: 1.8,
      demand: 'High',
      supplyStatus: 'Adequate',
      forecast: 'Stable with slight increases expected'
    },
    {
      cropName: 'Maize',
      currentPrice: 1950.25,
      priceChange: -2.1,
      demand: 'Medium',
      supplyStatus: 'Surplus',
      forecast: 'Prices may decrease further due to good harvest'
    },
    {
      cropName: 'Cotton',
      currentPrice: 6540.00,
      priceChange: -4.5,
      demand: 'Low',
      supplyStatus: 'Surplus',
      forecast: 'Downward trend expected to continue'
    },
    {
      cropName: 'Sugarcane',
      currentPrice: 3250.50,
      priceChange: 5.7,
      demand: 'High',
      supplyStatus: 'Limited',
      forecast: 'Prices expected to rise due to high demand'
    }
  ];
};

const CropSuggestion: React.FC = () => {
  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([]);
  const [activeTab, setActiveTab] = useState('suggestion');
  
  const { data: marketTrends, isLoading: isMarketLoading } = useQuery({
    queryKey: ['marketTrends'],
    queryFn: fetchMarketTrends,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soilType: '',
      region: '',
      rainfall: '',
      temperature: '',
      season: '',
    },
  });
  
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      toast.loading("Analyzing agricultural data...");
      const results = await fetchCropSuggestions(formData);
      setSuggestions(results);
      toast.dismiss();
      toast.success("Crop suggestions are ready!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to get crop suggestions. Please try again.");
    }
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Crop Suggestion System</h1>
      
      <div className="mb-8">
        <p className="text-gray-600 mb-4 text-center max-w-3xl mx-auto">
          Get personalized crop recommendations based on your soil type, regional conditions, and current market trends.
          Our advanced system analyzes multiple factors to suggest the most suitable and profitable crops for your farm.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="suggestion">Crop Suggestion</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggestion" className="space-y-8">
          <div className="grid md:grid-cols-8 gap-6">
            <div className="md:col-span-3 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Soil className="h-5 w-5 text-agri-green" />
                    Farm Parameters
                  </CardTitle>
                  <CardDescription>
                    Enter your farm's details for accurate recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="soilType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Soil Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select soil type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {soilTypes.map(soil => (
                                  <SelectItem key={soil.value} value={soil.value}>
                                    {soil.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region/Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Punjab, Gujarat" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="rainfall"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Rainfall (mm)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 750" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="temperature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Temperature (°C)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 28" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="season"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Growing Season</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select season" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {seasons.map(season => (
                                  <SelectItem key={season.value} value={season.value}>
                                    {season.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        <Wheat className="mr-2 h-4 w-4" />
                        Get Crop Suggestions
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-5 lg:col-span-6">
              {suggestions.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium mb-4">Recommended Crops</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestions.map((crop, index) => (
                      <Card key={index} className="h-full">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle>{crop.cropName}</CardTitle>
                            <span 
                              className={`text-sm font-semibold px-2 py-1 rounded ${
                                crop.suitabilityScore >= 85 
                                  ? 'bg-green-100 text-green-800' 
                                  : crop.suitabilityScore >= 70 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {crop.suitabilityScore}% Match
                            </span>
                          </div>
                          <CardDescription className="flex items-center mt-1">
                            <CloudSun className="h-4 w-4 mr-1" />
                            {crop.growthPeriod}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Water Need:</span>
                              <span>{crop.waterRequirement}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Expected Yield:</span>
                              <span>{crop.expectedYield}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Market Trend:</span>
                              <span className="flex items-center">
                                {crop.marketTrend === 'up' ? (
                                  <><TrendingUp className="h-4 w-4 text-green-600 mr-1" /> Rising</>
                                ) : crop.marketTrend === 'down' ? (
                                  <><TrendingUp className="h-4 w-4 text-red-600 mr-1 rotate-180" /> Falling</>
                                ) : (
                                  <>Stable</>
                                )}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <p className="text-xs text-muted-foreground">{crop.idealConditions}</p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
                  <Wheat className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Crop Suggestions Yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    Fill out the form with your farm's information to get personalized crop suggestions 
                    based on your soil type, climate, and current market trends.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="market" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-agri-green" />
                Current Market Trends
              </CardTitle>
              <CardDescription>
                Latest price trends and market forecasts for major crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isMarketLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse text-center">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-3 mx-auto"></div>
                    <div className="h-2 w-48 bg-gray-200 rounded mx-auto"></div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Crop</th>
                        <th className="text-right py-3 px-4">Price (₹/quintal)</th>
                        <th className="text-right py-3 px-4">Change</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Demand</th>
                        <th className="text-left py-3 px-4 hidden lg:table-cell">Supply</th>
                        <th className="text-left py-3 px-4 hidden lg:table-cell">Forecast</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketTrends?.map((trend, index) => (
                        <tr key={index} className={index < marketTrends.length - 1 ? "border-b" : ""}>
                          <td className="py-3 px-4 font-medium">{trend.cropName}</td>
                          <td className="text-right py-3 px-4">₹{trend.currentPrice.toFixed(2)}</td>
                          <td className={`text-right py-3 px-4 ${
                            trend.priceChange > 0 
                              ? 'text-green-600' 
                              : trend.priceChange < 0 
                              ? 'text-red-600' 
                              : ''
                          }`}>
                            {trend.priceChange > 0 ? '+' : ''}{trend.priceChange.toFixed(1)}%
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              trend.demand === 'High' 
                                ? 'bg-green-100 text-green-800' 
                                : trend.demand === 'Medium' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {trend.demand}
                            </span>
                          </td>
                          <td className="py-3 px-4 hidden lg:table-cell">{trend.supplyStatus}</td>
                          <td className="py-3 px-4 hidden lg:table-cell">{trend.forecast}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-xs text-muted-foreground">
                Market data updated as of {new Date().toLocaleDateString()}. Prices may vary based on quality and location.
              </p>
            </CardFooter>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Price Patterns</CardTitle>
                <CardDescription>
                  Understanding seasonal variations to optimize planting and selling decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Agricultural commodities often follow predictable seasonal price patterns. Understanding these patterns can help farmers 
                    make informed decisions about when to plant and when to sell their produce.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Key factors affecting seasonal prices:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Harvest periods and supply fluctuations</li>
                      <li>Storage capacity and costs</li>
                      <li>Export and import policies</li>
                      <li>Weather events and climate change</li>
                      <li>Government policies and minimum support prices</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Market Advisory</CardTitle>
                <CardDescription>
                  Expert recommendations for current market conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h4 className="font-medium text-yellow-800 mb-1">Short-Term Outlook (1-3 months)</h4>
                    <p className="text-sm text-yellow-700">
                      Consider wheat and pulses for immediate planting as prices are expected to remain strong 
                      due to limited stock and consistent export demand.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-1">Long-Term Outlook (4-12 months)</h4>
                    <p className="text-sm text-blue-700">
                      Oilseed crops like mustard and groundnut show promising long-term potential due to 
                      increasing domestic consumption and favorable government policies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropSuggestion;
