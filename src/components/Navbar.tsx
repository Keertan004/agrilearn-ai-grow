
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, History } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Disease Detection', path: '/disease-detection' },
    { name: 'History', path: '/history' },
    { name: 'Crop Suggestion', path: '/crop-suggestion' },
    { name: 'Resource Library', path: '/resources' },
    { name: 'Weather', path: '/weather' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQs', path: '/faqs' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-agri-green">AgriLearnNetwork</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="nav-link px-3 py-2 rounded-md text-sm"
              >
                {item.name === 'History' ? (
                  <span className="flex items-center">
                    <History className="h-4 w-4 mr-1" />
                    {item.name}
                  </span>
                ) : item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center">
            <Link to="/login">
              <Button variant="outline" className="mr-2">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-lg font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name === 'History' ? (
                        <span className="flex items-center">
                          <History className="h-4 w-4 mr-2" />
                          {item.name}
                        </span>
                      ) : item.name}
                    </Link>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
