
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="relative h-48 bg-agri-green">
          <img
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=60"
            alt="Farm field"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-2">404</h1>
              <div className="text-xl">Page Not Found</div>
            </div>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-600 mb-2">
              We couldn't find the page you were looking for.
            </p>
            <p className="text-sm text-gray-500">
              The link might be broken, or the page may have been removed.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/">
              <Button className="w-full bg-agri-green hover:bg-agri-green-dark">
                Go to Home
              </Button>
            </Link>
            
            <Link to="/resources">
              <Button variant="outline" className="w-full">
                <GalleryHorizontal className="mr-2 h-4 w-4" />
                Browse Resources
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>
              Need help? <Link to="/faqs" className="text-agri-green hover:underline">Visit our FAQ page</Link> or{" "}
              <Link to="/blog" className="text-agri-green hover:underline">check our blog</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
