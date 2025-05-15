
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getHistory, clearHistory } from "@/services/plantDiseaseService";
import { toast } from "@/components/ui/use-toast";
import { 
  Clock,
  Trash2,
  History as HistoryIcon,
  ArrowRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const History = () => {
  const navigate = useNavigate();
  const historyItems = getHistory();
  
  const handleClearHistory = () => {
    clearHistory();
    toast({
      title: "History cleared",
      description: "All your disease detection history has been removed",
    });
    navigate(0); // Refresh page
  };
  
  const handleViewDetails = (id: string) => {
    navigate(`/disease-details/${id}`);
  };
  
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Unknown';
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <HistoryIcon className="mr-2 h-8 w-8" />
            Analysis History
          </h1>
          <p className="text-gray-600 mt-2">
            Review your previous plant disease detection results
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate('/disease-detection')}
          >
            New Analysis
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your entire disease detection history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearHistory}>
                  Yes, delete everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {historyItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={item.image}
                  alt={item.disease.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.disease.severity === 'high' ? 'bg-red-100 text-red-800' :
                    item.disease.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.disease.severity ? 
                      item.disease.severity.charAt(0).toUpperCase() + item.disease.severity.slice(1) : 
                      'Unknown'} Severity
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{item.disease.name}</CardTitle>
                    <CardDescription>
                      Confidence: {item.disease.confidence}%
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatDate(item.disease.timestamp)}
                </div>
                <p className="text-gray-700 line-clamp-3 mb-4">
                  {item.disease.detailedDescription || 'No detailed description available.'}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewDetails(item.disease.id)}
                >
                  View Details 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No History Found</CardTitle>
            <CardDescription>
              You haven't analyzed any plant images yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Upload a plant image to get started with disease detection.
            </p>
            <Button onClick={() => navigate('/disease-detection')}>
              Go to Disease Detection
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default History;
