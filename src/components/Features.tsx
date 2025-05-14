
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featureItems = [
  {
    title: 'Plant Disease Detection',
    description: 'Upload an image of a diseased plant and get instant AI-powered diagnosis with treatment recommendations.',
    link: '/disease-detection',
    linkText: 'Upload Image',
    icon: '🌱'
  },
  {
    title: 'Crop Suggestion',
    description: 'Get personalized crop suggestions based on your location, season, and market forecasts.',
    link: '/crop-suggestion',
    linkText: 'Get Suggestions',
    icon: '🌾'
  },
  {
    title: 'Soil Management',
    description: 'Enter your soil data and receive customized advice on soil improvement and fertilization.',
    link: '/soil-management',
    linkText: 'Analyze Soil',
    icon: '🧪'
  },
  {
    title: 'Weather Forecasts',
    description: 'Access 7-day weather forecasts with farming recommendations for your specific location.',
    link: '/weather',
    linkText: 'Check Weather',
    icon: '☁️'
  },
  {
    title: 'Resource Library',
    description: 'Browse our extensive collection of farming guides, videos, and educational materials.',
    link: '/resources',
    linkText: 'Explore Resources',
    icon: '📚'
  },
  {
    title: 'Farmer Dashboard',
    description: 'Track all your farming insights, history and recommendations in one centralized location.',
    link: '/dashboard',
    linkText: 'View Dashboard',
    icon: '📊'
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            AI-powered farming solutions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our platform offers advanced tools to help farmers make data-driven decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, idx) => (
            <Card key={idx} className="feature-card border border-gray-200 hover:border-agri-green">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={feature.link} className="w-full">
                  <Button className="w-full">{feature.linkText}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
