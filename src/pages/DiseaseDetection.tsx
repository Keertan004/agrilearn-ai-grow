
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type DiseaseResult = {
  name: string;
  cure: string;
  prevention: string;
};

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file (jpg, png, etc.)');
      return;
    }
    
    setSelectedImage(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, we would upload the image to a backend
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      
      // Simulate AI response
      setResult({
        name: 'Tomato Late Blight',
        cure: 'Apply copper-based fungicides as soon as symptoms appear. Remove and destroy infected plant parts. For organic options, try copper-based sprays or bacillus subtilis.',
        prevention: 'Use disease-resistant varieties. Ensure proper spacing between plants for good air circulation. Avoid overhead watering. Apply preventive fungicides during humid weather. Practice crop rotation.'
      });
      
      setError(null);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Plant Disease Detection</h1>
        <p className="mt-4 text-lg text-gray-600">
          Upload an image of your diseased plant and get AI-powered diagnosis, cure recommendations, and prevention tips.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Plant Image</CardTitle>
            <CardDescription>
              Take a clear photo of the affected plant part (leaf, stem, fruit) and upload it here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
                      imagePreview ? 'border-agri-green bg-agri-green/5' : 'border-gray-300 bg-gray-50'
                    } hover:bg-gray-100`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected plant"
                        className="h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 10MB)</p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm mb-4">
                  {error}
                </div>
              )}
              
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Analyzing Image...' : 'Analyze for Disease'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className={`${result ? 'border-agri-green' : 'border-gray-200'}`}>
          <CardHeader>
            <CardTitle>Disease Detection Results</CardTitle>
            <CardDescription>
              {result 
                ? 'Here are the results of the AI analysis' 
                : 'Upload an image to see the results here'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green"></div>
                <p className="mt-4 text-gray-600">Analyzing your plant image...</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Detected Disease</h3>
                  <p className="text-red-600 font-medium">{result.name}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Recommended Treatment</h3>
                  <p className="text-gray-700">{result.cure}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Prevention Tips</h3>
                  <p className="text-gray-700">{result.prevention}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <p>No results yet. Upload an image to get started.</p>
              </div>
            )}
          </CardContent>
          {result && (
            <CardFooter className="border-t bg-gray-50 p-4">
              <div className="w-full text-sm text-gray-500">
                <p>This analysis is provided as a guide only. For severe cases, please consult with a local agricultural expert.</p>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;
