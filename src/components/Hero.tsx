
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section bg-agri-green relative overflow-hidden">
      {/* Use the actual background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwbmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1920&q=60" 
          alt="Agricultural landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-agri-green/70"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Empowering Farmers with</span>
            <span className="block text-agri-green-light">AI & Technology</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get instant plant disease diagnosis, crop suggestions, and farming insights powered by advanced AI technology.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow animate-[fade-in_0.5s_ease-out_0.2s_both]">
              <Link to="/disease-detection">
                <Button size="lg" className="w-full bg-agri-green hover:bg-agri-green-dark">
                  Upload Plant Image
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 animate-[fade-in_0.5s_ease-out_0.4s_both]">
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="w-full bg-white text-agri-green hover:bg-gray-50">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
