
import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1920&q=60" 
            alt="Agriculture background" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              How AgriLearnNetwork Helps Farmers
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our AI-powered platform makes farming easier, more productive, and sustainable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-sm border transform transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="text-2xl mb-4">🌿</div>
              <h3 className="text-lg font-bold mb-2">Identify Plant Diseases</h3>
              <p className="text-gray-600 mb-4">
                Take a photo of affected plants and get instant disease diagnosis with treatment recommendations.
              </p>
              <Link to="/disease-detection" className="text-agri-green font-medium hover:underline flex items-center">
                Try Disease Detection
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border transform transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="text-2xl mb-4">🌱</div>
              <h3 className="text-lg font-bold mb-2">Smart Crop Planning</h3>
              <p className="text-gray-600 mb-4">
                Get personalized crop recommendations based on your location, soil, and market trends.
              </p>
              <Link to="/soil-management" className="text-agri-green font-medium hover:underline flex items-center">
                Get Crop Suggestions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border transform transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="text-2xl mb-4">💧</div>
              <h3 className="text-lg font-bold mb-2">Monitor Weather & Soil</h3>
              <p className="text-gray-600 mb-4">
                Track weather patterns and soil health to optimize irrigation and fertilization schedules.
              </p>
              <Link to="/weather" className="text-agri-green font-medium hover:underline flex items-center">
                Check Weather Data
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZHJvbmUlMjBmYXJtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=1920&q=60" 
            alt="Technology in farming" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <div className="mt-6">
                <Link to="/resources">
                  <Button className="bg-agri-green hover:bg-agri-green-dark">
                    Browse Resource Library
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 bg-gray-300 flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Resource Library Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                  <span className="text-2xl text-white font-semibold">Resource Library Preview</span>
                </div>
              </div>
              <div className="bg-white p-6">
                <h3 className="font-bold text-xl mb-2">Agricultural Best Practices</h3>
                <p className="text-gray-600 mb-4">
                  Learn sustainable farming techniques that increase yield while protecting the environment.
                </p>
                <Link to="/resources" className="text-agri-green font-medium hover:underline">View Resources →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      <Partners />
      
      <section className="py-16 bg-agri-green text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1920&q=60" 
            alt="Call to action background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your farming?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of farmers using AgriLearnNetwork to improve crop yields, prevent diseases, and optimize their farming operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="inline-block bg-white text-agri-green px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors">
              Sign Up Now
            </Link>
            <Link to="/disease-detection" className="inline-block bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium text-lg hover:bg-white/10 transition-colors">
              Try Disease Detection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
