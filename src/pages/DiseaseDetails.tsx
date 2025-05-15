
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import { getHistory } from "@/services/plantDiseaseService";
import { Separator } from "@/components/ui/separator";

const DiseaseDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get the disease from location state first (direct navigation)
  let disease = location.state?.disease;
  let imageUrl = location.state?.image;
  
  // If not available in location state, try to get from history
  if (!disease && id) {
    const history = getHistory();
    const historyItem = history.find(item => item.disease.id === id);
    if (historyItem) {
      disease = historyItem.disease;
      imageUrl = historyItem.image;
    }
  }
  
  if (!disease) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Disease Not Found</CardTitle>
            <CardDescription>The requested disease information could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/disease-detection')}>
              Back to Disease Detection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const getSeverityColor = (severity?: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{disease.name}</h1>
        {disease.scientificName && (
          <p className="text-gray-500 italic mt-1">{disease.scientificName}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Disease Information</span>
                {disease.severity && (
                  <span className={`text-sm px-3 py-1 rounded ${getSeverityColor(disease.severity)}`}>
                    {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Severity
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700">{disease.detailedDescription || "No detailed description available."}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Symptoms</h3>
                {disease.symptoms && disease.symptoms.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {disease.symptoms.map((symptom, index) => (
                      <li key={index} className="text-gray-700">{symptom}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No symptom information available.</p>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Affected Crops</h3>
                {disease.affectedCrops && disease.affectedCrops.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {disease.affectedCrops.map((crop, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                        {crop}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No affected crop information available.</p>
                )}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Treatment</h3>
                <p className="text-gray-700">{disease.cure}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Prevention</h3>
                <p className="text-gray-700">{disease.prevention}</p>
              </div>
              
              <div className="mt-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Detection Confidence</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-agri-green h-2.5 rounded-full" 
                            style={{ width: `${disease.confidence || 0}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 mt-1 block">
                          {disease.confidence || 0}%
                        </span>
                      </TableCell>
                    </TableRow>
                    {disease.timestamp && (
                      <TableRow>
                        <TableCell className="font-medium">Analyzed On</TableCell>
                        <TableCell>
                          {new Date(disease.timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Agricultural Expert Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For severe cases or persistent plant disease issues, we recommend consulting with an agricultural expert or extension service in your area. 
                They can provide personalized advice based on your specific growing conditions and local disease pressures.
              </p>
              <Button variant="outline" className="w-full sm:w-auto">
                Find Local Agricultural Experts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Image</CardTitle>
            </CardHeader>
            <CardContent>
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={disease.name} 
                  className="w-full rounded-md object-cover"
                />
              ) : (
                <div className="bg-gray-100 rounded-md h-48 flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => navigate('/disease-detection')}>
                New Analysis
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/history')}>
                View History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetails;
