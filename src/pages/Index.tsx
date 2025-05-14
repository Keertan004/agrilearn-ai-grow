
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              How AgriLearnNetwork Helps Farmers
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our AI-powered platform makes farming easier, more productive, and sustainable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-2xl mb-4">🌿</div>
              <h3 className="text-lg font-bold mb-2">Identify Plant Diseases</h3>
              <p className="text-gray-600">
                Take a photo of affected plants and get instant disease diagnosis with treatment recommendations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-2xl mb-4">🌱</div>
              <h3 className="text-lg font-bold mb-2">Smart Crop Planning</h3>
              <p className="text-gray-600">
                Get personalized crop recommendations based on your location, soil, and market trends.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-2xl mb-4">💧</div>
              <h3 className="text-lg font-bold mb-2">Monitor Weather & Soil</h3>
              <p className="text-gray-600">
                Track weather patterns and soil health to optimize irrigation and fertilization schedules.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Knowledge Resources for Farmers
              </h2>
              <p className="text-lg text-gray-500 mb-6">
                Access our extensive library of farming guides, videos, and educational materials to enhance your agricultural knowledge.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-agri-green rounded-full p-1 text-white mt-1">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    <strong className="font-medium text-gray-900">Expert Articles:</strong> In-depth guides on crop cultivation, pest management, and more.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-agri-green rounded-full p-1 text-white mt-1">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    <strong className="font-medium text-gray-900">Video Tutorials:</strong> Step-by-step visual guides on farming techniques and technologies.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-agri-green rounded-full p-1 text-white mt-1">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    <strong className="font-medium text-gray-900">Community Forums:</strong> Connect with other farmers to share experiences and advice.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                {/* Placeholder for resource library image */}
                <span className="text-2xl text-gray-600">Resource Library Preview</span>
              </div>
              <div className="bg-white p-6">
                <h3 className="font-bold text-xl mb-2">Agricultural Best Practices</h3>
                <p className="text-gray-600 mb-4">
                  Learn sustainable farming techniques that increase yield while protecting the environment.
                </p>
                <button className="text-agri-green font-medium hover:underline">View Resources →</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-agri-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your farming?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of farmers using AgriLearnNetwork to improve crop yields, prevent diseases, and optimize their farming operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/register" className="inline-block bg-white text-agri-green px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors">
              Sign Up Now
            </a>
            <a href="/disease-detection" className="inline-block bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium text-lg hover:bg-white/10 transition-colors">
              Try Disease Detection
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
