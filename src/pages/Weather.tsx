
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type WeatherData = {
  city: string;
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    icon: string;
    rainProb: number;
  }>;
  farmingTips: string[];
};

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate getting user's location on component mount
  useEffect(() => {
    // Default to a sample location
    setTimeout(() => {
      handleWeatherSearch('New Delhi');
    }, 500);
  }, []);

  const handleWeatherSearch = (searchLocation: string) => {
    setLoading(true);
    toast.info(`Fetching weather data for ${searchLocation}...`);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate mock weather data
      const mockWeatherData: WeatherData = {
        city: searchLocation,
        current: {
          temp: Math.round(15 + Math.random() * 20), // 15-35°C
          humidity: Math.round(50 + Math.random() * 40), // 50-90%
          windSpeed: Math.round(5 + Math.random() * 15), // 5-20 km/h
          condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'][Math.floor(Math.random() * 5)],
          icon: '01d' // Default icon
        },
        forecast: Array.from({ length: 7 }, (_, i) => {
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const date = new Date();
          date.setDate(date.getDate() + i);
          const day = dayNames[date.getDay()];
          
          return {
            day,
            temp: Math.round(15 + Math.random() * 20), // 15-35°C
            condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'][Math.floor(Math.random() * 5)],
            icon: ['01d', '02d', '03d', '10d', '01d'][Math.floor(Math.random() * 5)],
            rainProb: Math.round(Math.random() * 100) // 0-100%
          };
        }),
        farmingTips: [
          "Consider applying fertilizer before the forecasted light rain for better absorption.",
          "High temperatures expected later this week - ensure crops have adequate irrigation.",
          "Cloudy conditions are ideal for transplanting seedlings.",
          "Strong winds forecasted - secure any structures or young plants.",
          "Morning dew conditions are favorable for natural pollination."
        ].sort(() => Math.random() - 0.5).slice(0, 3)
      };
      
      setWeatherData(mockWeatherData);
      setLoading(false);
      toast.success(`Weather data for ${searchLocation} loaded`);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      handleWeatherSearch(location);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Weather Forecast</h1>
        <p className="mt-4 text-lg text-gray-600">
          Get weather forecasts and farming advice based on weather conditions
        </p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Enter location (city, region)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green"></div>
        </div>
      ) : weatherData ? (
        <div className="space-y-8">
          {/* Current Weather */}
          <Card className="bg-gradient-to-r from-agri-green/20 to-blue-50 border-agri-green/30">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Current Weather in {weatherData.city}</span>
                <div className="text-3xl">
                  {getWeatherEmoji(weatherData.current.condition)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-4xl font-bold text-agri-green mb-2">{weatherData.current.temp}°C</div>
                  <div className="text-gray-600">{weatherData.current.condition}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-500 mb-2">{weatherData.current.humidity}%</div>
                  <div className="text-gray-600">Humidity</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-gray-700 mb-2">{weatherData.current.windSpeed} km/h</div>
                  <div className="text-gray-600">Wind Speed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Forecast</CardTitle>
              <CardDescription>Plan your farming activities for the week ahead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 md:gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{day.day}</div>
                    <div className="text-xl my-1">{getWeatherEmoji(day.condition)}</div>
                    <div className="font-bold">{day.temp}°C</div>
                    <div className="text-xs mt-1 text-blue-600">{day.rainProb}% rain</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Farming Tips */}
          <Card className="bg-agri-green/5 border-agri-green/30">
            <CardHeader>
              <CardTitle>Farming Recommendations</CardTitle>
              <CardDescription>Weather-based tips for your farming activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 pl-5 list-disc">
                {weatherData.farmingTips.map((tip, index) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
              These recommendations are generated based on weather patterns. Adjust according to your specific crop and soil conditions.
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Enter a location to view weather data and farming recommendations
        </div>
      )}
    </div>
  );
};

// Helper function to get weather emoji
function getWeatherEmoji(condition: string): string {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return '☀️';
  if (conditionLower.includes('cloud')) return '⛅';
  if (conditionLower.includes('rain')) return '🌧️';
  if (conditionLower.includes('storm')) return '⛈️';
  if (conditionLower.includes('snow')) return '❄️';
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
  return '🌤️';
}

export default Weather;
