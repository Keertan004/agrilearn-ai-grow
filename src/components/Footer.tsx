
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-agri-green">AgriLearnNetwork</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Empowering farmers with AI-driven solutions for sustainable agriculture and increased productivity.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/disease-detection" className="text-sm text-gray-600 hover:text-agri-green">Disease Detection</Link></li>
              <li><Link to="/crop-suggestion" className="text-sm text-gray-600 hover:text-agri-green">Crop Suggestions</Link></li>
              <li><Link to="/soil-management" className="text-sm text-gray-600 hover:text-agri-green">Soil Management</Link></li>
              <li><Link to="/weather" className="text-sm text-gray-600 hover:text-agri-green">Weather Forecasts</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/resources" className="text-sm text-gray-600 hover:text-agri-green">Resource Library</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-agri-green">Blog</Link></li>
              <li><Link to="/faqs" className="text-sm text-gray-600 hover:text-agri-green">FAQs</Link></li>
              <li><Link to="/community" className="text-sm text-gray-600 hover:text-agri-green">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:info@agrilearnetwork.com" className="text-sm text-gray-600 hover:text-agri-green">info@agrilearnetwork.com</a></li>
              <li><a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-agri-green">+1 (234) 567-890</a></li>
            </ul>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Subscribe to our newsletter</h3>
              <div className="mt-4 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
                />
                <button className="bg-agri-green text-white px-4 py-2 rounded-r-md hover:bg-agri-green-dark">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} AgriLearnNetwork. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
