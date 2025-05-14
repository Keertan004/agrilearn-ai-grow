
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BookOpen, Search, List, ArrowRight, Folder } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Resource types
interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'video' | 'guide' | 'tool';
  thumbnail: string;
  author: string;
  date: string;
  content?: string;
  url?: string;
  readTime?: string;
}

// Mock API function for fetching resources
const fetchResources = async (page: number, category: string, search: string): Promise<{
  resources: Resource[];
  totalPages: number;
}> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // All resources
  const allResources: Resource[] = [
    {
      id: '1',
      title: 'Sustainable Agriculture Practices for Small Farms',
      description: 'Learn how small-scale farmers can implement sustainable practices while maintaining profitability.',
      category: 'sustainable',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Anita Sharma',
      date: '2023-08-15',
      readTime: '8 min read',
    },
    {
      id: '2',
      title: 'Water Conservation Techniques in Crop Production',
      description: 'Modern approaches to optimize water usage while maintaining optimal crop yields.',
      category: 'water',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1589634749017-1c6918f04b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Prof. Rajesh Kumar',
      date: '2023-07-22',
      readTime: '12 min read',
    },
    {
      id: '3',
      title: 'Understanding Soil Health Indicators',
      description: 'How to assess and improve the health of your farm soil using simple tests and observations.',
      category: 'soil',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Soil Science Institute',
      date: '2023-09-05',
      readTime: '15 min video',
    },
    {
      id: '4',
      title: 'Natural Pest Management Solutions',
      description: 'Effective techniques for managing pests without heavy reliance on chemical pesticides.',
      category: 'pests',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1626253925458-c6eb158eb7d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Integrated Pest Management Center',
      date: '2023-06-30',
      readTime: '10 min read',
    },
    {
      id: '5',
      title: 'Climate-Resilient Farming Strategies',
      description: 'Preparing your farm for climate change with adaptive agricultural practices.',
      category: 'climate',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Climate Adaptation Research Center',
      date: '2023-08-28',
      readTime: '7 min read',
    },
    {
      id: '6',
      title: 'Precision Agriculture Technologies for Small Holders',
      description: 'Affordable tech solutions that can help small farmers improve efficiency and yields.',
      category: 'technology',
      type: 'tool',
      thumbnail: 'https://images.unsplash.com/photo-1586169407707-cb29f4c22c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'AgTech Innovation Hub',
      date: '2023-09-12',
      readTime: '9 min read',
    },
    {
      id: '7',
      title: 'Organic Certification Process Explained',
      description: 'Step-by-step guide to obtaining organic certification for your farm products.',
      category: 'organic',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Organic Farming Association',
      date: '2023-07-05',
      readTime: '14 min read',
    },
    {
      id: '8',
      title: 'Value-Added Farm Products: From Field to Market',
      description: 'How to increase farm income through product diversification and value addition.',
      category: 'business',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1595272568891-123402d0fb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Agricultural Economics Department',
      date: '2023-08-10',
      readTime: '11 min read',
    },
    {
      id: '9',
      title: 'Livestock Management Best Practices',
      description: 'Comprehensive guide to raising healthy livestock with sustainable practices.',
      category: 'livestock',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Veterinary Science Institute',
      date: '2023-06-18',
      readTime: '15 min read',
    },
    {
      id: '10',
      title: 'Agricultural Finance and Grant Opportunities',
      description: 'Information on loans, grants, and financial programs available to farmers.',
      category: 'finance',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1626266063048-38c15931ba3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Agricultural Finance Center',
      date: '2023-09-20',
      readTime: '13 min read',
    },
    {
      id: '11',
      title: 'Cover Cropping Strategies for Soil Improvement',
      description: 'How to use cover crops to enhance soil health, prevent erosion, and reduce input costs.',
      category: 'soil',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1530585575527-51cb2f95b552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Sustainable Agriculture Research Center',
      date: '2023-08-05',
      readTime: '8 min read',
    },
    {
      id: '12',
      title: 'Market Access Strategies for Small Farmers',
      description: 'Finding and accessing profitable markets for your agricultural products.',
      category: 'business',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Agricultural Marketing Institute',
      date: '2023-07-15',
      readTime: '9 min read',
    },
    {
      id: '13',
      title: 'Greenhouse Management and High-Value Crops',
      description: 'Techniques for successful greenhouse farming and selecting profitable specialty crops.',
      category: 'technology',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1562578881-9e80a80180a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Horticultural Science Department',
      date: '2023-09-08',
      readTime: '18 min video',
    },
    {
      id: '14',
      title: 'Agricultural Waste Management Solutions',
      description: 'Converting farm waste into valuable resources through composting and other methods.',
      category: 'sustainable',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1533626904905-cc52fd99591d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Environmental Management Systems',
      date: '2023-06-25',
      readTime: '11 min read',
    },
    {
      id: '15',
      title: 'Weather Monitoring Tools for Farm Management',
      description: 'Using weather data and forecasts to optimize farm operations and reduce risks.',
      category: 'technology',
      type: 'tool',
      thumbnail: 'https://images.unsplash.com/photo-1504870444519-3c678061c754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Agricultural Meteorology Department',
      date: '2023-08-22',
      readTime: '7 min read',
    },
  ];
  
  // Filter by category if specified
  let filteredResources = allResources;
  if (category && category !== 'all') {
    filteredResources = filteredResources.filter(resource => resource.category === category);
  }
  
  // Filter by search term if specified
  if (search) {
    const searchLower = search.toLowerCase();
    filteredResources = filteredResources.filter(
      resource =>
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.category.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);
  
  return {
    resources: paginatedResources,
    totalPages,
  };
};

// Resource categories
const categories = [
  { id: 'all', name: 'All Resources' },
  { id: 'sustainable', name: 'Sustainable Farming' },
  { id: 'soil', name: 'Soil Management' },
  { id: 'water', name: 'Water Conservation' },
  { id: 'pests', name: 'Pest Management' },
  { id: 'technology', name: 'AgTech & Innovation' },
  { id: 'business', name: 'Farm Business' },
  { id: 'climate', name: 'Climate Resilience' },
  { id: 'organic', name: 'Organic Farming' },
];

// Resource type icons
const resourceTypeIcons = {
  article: <BookOpen className="h-4 w-4" />,
  video: <BookOpen className="h-4 w-4" />,
  guide: <List className="h-4 w-4" />,
  tool: <Folder className="h-4 w-4" />,
};

// Function to fetch a resource by ID
const fetchResourceById = async (id: string): Promise<Resource | null> => {
  // In a real application, this would make an API call
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data for specific resource
  if (id === '1') {
    return {
      id: '1',
      title: 'Sustainable Agriculture Practices for Small Farms',
      description: 'Learn how small-scale farmers can implement sustainable practices while maintaining profitability.',
      category: 'sustainable',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Anita Sharma',
      date: '2023-08-15',
      readTime: '8 min read',
      content: `
        <h2>Introduction to Sustainable Agriculture</h2>
        <p>Sustainable agriculture is a holistic approach to farming that considers the long-term health of the environment, economic viability, and social well-being. For small farmers, implementing sustainable practices can not only reduce environmental impact but also increase resilience and profitability in the long run.</p>
        
        <h2>Key Sustainable Practices for Small Farms</h2>
        
        <h3>1. Crop Rotation and Diversification</h3>
        <p>One of the foundational practices in sustainable agriculture is crop rotation—the systematic planting of different crops in sequence on the same land. This practice helps manage soil fertility, reduce pest pressure, and optimize nutrient use.</p>
        <p>Benefits include:</p>
        <ul>
          <li>Improved soil structure and fertility</li>
          <li>Reduced dependency on synthetic fertilizers</li>
          <li>Better pest and disease management</li>
          <li>Increased biodiversity</li>
          <li>Risk mitigation through diversified income streams</li>
        </ul>
        
        <h3>2. Cover Cropping</h3>
        <p>Cover crops are planted to cover the soil rather than for harvest. They play a crucial role in sustainable farming by protecting and improving soil health during off-seasons.</p>
        <p>Cover crops can:</p>
        <ul>
          <li>Prevent soil erosion</li>
          <li>Suppress weeds naturally</li>
          <li>Add organic matter to soil</li>
          <li>Fix nitrogen (leguminous cover crops)</li>
          <li>Break pest cycles</li>
        </ul>
        
        <h3>3. Integrated Pest Management (IPM)</h3>
        <p>IPM is an ecosystem-based approach that combines different pest management techniques to minimize economic, health, and environmental risks.</p>
        <p>Key components include:</p>
        <ul>
          <li>Regular monitoring of crops for pests</li>
          <li>Setting action thresholds</li>
          <li>Preventive cultural practices</li>
          <li>Biological controls</li>
          <li>Targeted use of pesticides only when necessary</li>
        </ul>
        
        <h3>4. Water Conservation</h3>
        <p>Efficient water management is increasingly important as climate change affects rainfall patterns and water availability.</p>
        <p>Effective strategies include:</p>
        <ul>
          <li>Drip irrigation systems</li>
          <li>Rainwater harvesting</li>
          <li>Mulching to retain soil moisture</li>
          <li>Planting drought-resistant varieties</li>
          <li>Scheduled irrigation based on crop needs</li>
        </ul>
        
        <h2>Economic Considerations</h2>
        
        <p>While transitioning to sustainable practices may require initial investment, many farmers report long-term cost savings and premium pricing opportunities:</p>
        
        <h3>Cost-Benefit Analysis</h3>
        <ul>
          <li>Reduced input costs (fertilizers, pesticides)</li>
          <li>Lower irrigation expenses</li>
          <li>Improved crop resilience reduces losses</li>
          <li>Access to premium markets and certification programs</li>
          <li>Diversified income streams reduce financial risk</li>
        </ul>
        
        <h2>Getting Started with Sustainable Practices</h2>
        
        <p>For small farmers looking to transition to more sustainable methods, consider these steps:</p>
        
        <ol>
          <li>Start small with one or two practices</li>
          <li>Document and measure outcomes</li>
          <li>Connect with local extension services for guidance</li>
          <li>Join farmer networks to share knowledge</li>
          <li>Explore certification options as your practices develop</li>
        </ol>
        
        <h2>Conclusion</h2>
        
        <p>Sustainable agriculture offers small farmers a path to long-term viability while contributing to environmental health and community well-being. By implementing practices like crop rotation, cover cropping, IPM, and water conservation, small farms can build resilience against climate change and market fluctuations while potentially accessing premium markets for their products.</p>
      `,
    };
  }
  
  // Return null if resource not found
  return null;
};

const ResourceLibrary: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');
  
  // Query for resources
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['resources', currentPage, selectedCategory, searchTerm],
    queryFn: () => fetchResources(currentPage, selectedCategory, searchTerm),
  });
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  const handleLoadMore = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Agricultural Resource Library</h1>
      
      <div className="mb-8">
        <p className="text-gray-600 mb-4 text-center max-w-3xl mx-auto">
          Explore our extensive collection of agricultural resources, including guides, articles, videos, and tools to improve your farming practices.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="browse">Browse Resources</TabsTrigger>
          <TabsTrigger value="featured">Featured Collections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="space-y-8">
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search resources..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Resource grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden h-full">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardHeader className="pb-2">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          ) : data?.resources && data.resources.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.resources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden h-full flex flex-col">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title} 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="flex items-center text-xs bg-gray-100 rounded-full px-2 py-1">
                          {resourceTypeIcons[resource.type]}
                          <span className="ml-1 capitalize">{resource.type}</span>
                        </span>
                        <span className="text-xs text-gray-500">{resource.date}</span>
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-1">{resource.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-gray-600 line-clamp-2">{resource.description}</p>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between border-t">
                      <span className="text-xs text-gray-500">{resource.readTime}</span>
                      <Link to={`/resource/${resource.id}`} className="text-sm font-medium text-agri-green hover:underline flex items-center">
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                {data.totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {/* First page */}
                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                        </PaginationItem>
                      )}
                      
                      {/* Ellipsis */}
                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      {/* Page before current */}
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                            {currentPage - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      {/* Current page */}
                      <PaginationItem>
                        <PaginationLink isActive>{currentPage}</PaginationLink>
                      </PaginationItem>
                      
                      {/* Page after current */}
                      {currentPage < data.totalPages && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                            {currentPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      {/* Ellipsis */}
                      {currentPage < data.totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      {/* Last page */}
                      {currentPage < data.totalPages - 1 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(data.totalPages)}>
                            {data.totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, data.totalPages))}
                          disabled={currentPage >= data.totalPages}
                          className={currentPage >= data.totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Resources Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any resources matching your search criteria. Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="featured" className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Soil Health Guide" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardHeader>
                <CardTitle>Soil Health Management</CardTitle>
                <CardDescription>A comprehensive collection of resources to understand and improve your soil health.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This curated collection includes 12 resources covering soil testing, organic matter management, 
                  erosion control, and biological activity in soils.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 rounded-full px-3 py-1">Soil Testing</span>
                  <span className="text-xs bg-gray-100 rounded-full px-3 py-1">Organic Matter</span>
                  <span className="text-xs bg-gray-100 rounded-full px-3 py-1">Erosion Control</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/resources/collection/soil-health">
                  <Button>
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Climate-Smart Agriculture" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardHeader>
                <CardTitle>Climate-Smart Agriculture</CardTitle>
                <CardDescription>Practical techniques to adapt farming operations to changing climate conditions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Access 8 essential resources on drought management, flood mitigation, heat-resistant crops, 
                  and weather monitoring for resilient farming.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 rounded-full px-3 py-1">Drought Management</span>
                  <span className="text-xs bg-gray-100 rounded-full px-3 py-1">Resilient Crops</span>
                  <span className="text-xs bg-gray-100 rounded-full px-3 py-1">Weather Planning</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/resources/collection/climate-smart">
                  <Button>
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Beginner's Guide to Organic Farming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Start your organic farming journey with this essential collection of 6 beginner-friendly guides.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/resources/collection/organic-basics" className="text-agri-green hover:underline flex items-center text-sm font-medium">
                  View Collection <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Water Conservation Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Learn efficient irrigation systems and water management strategies for sustainable farming.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/resources/collection/water-conservation" className="text-agri-green hover:underline flex items-center text-sm font-medium">
                  View Collection <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Farm Business Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Resources on financial planning, marketing, and business strategies for agricultural enterprises.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/resources/collection/farm-business" className="text-agri-green hover:underline flex items-center text-sm font-medium">
                  View Collection <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceLibrary;
