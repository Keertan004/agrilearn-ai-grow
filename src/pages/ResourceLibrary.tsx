
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "video" | "guide" | "tool";
  thumbnail: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
};

// Mock resources data
const mockResourcesData: Resource[] = [
  {
    id: "1",
    title: "Sustainable Farming Practices for Small Farms",
    description: "Learn how small-scale farmers can implement sustainable practices to improve yield while protecting the environment.",
    category: "Sustainable Farming",
    type: "article",
    thumbnail: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Dr. Emily Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    content: "Full content here..."
  },
  {
    id: "2",
    title: "Advanced Techniques in Crop Rotation",
    description: "Maximize your farm's productivity with strategic crop rotation planning and implementation.",
    category: "Crop Management",
    type: "guide",
    thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Prof. Michael Chang",
    date: "2024-02-10",
    readTime: "12 min read",
    content: "Full content here..."
  },
  {
    id: "3",
    title: "Introduction to Precision Agriculture",
    description: "Learn how modern technology is revolutionizing farming with precision agriculture techniques.",
    category: "AgTech",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZHJvbmUlMjBmYXJtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "Tech Farming Channel",
    date: "2024-03-05",
    readTime: "22 min video",
    content: "Full content here..."
  },
  {
    id: "4",
    title: "Organic Pest Management for Vegetable Crops",
    description: "Discover effective organic methods to control pests in your vegetable garden without harmful chemicals.",
    category: "Pest Management",
    type: "guide",
    thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "Sarah Williams, IPM Specialist",
    date: "2024-02-20",
    readTime: "15 min read",
    content: "Full content here..."
  },
  {
    id: "5",
    title: "Soil Health Assessment Tools",
    description: "Essential tools and techniques for evaluating and improving your soil's health and fertility.",
    category: "Soil Management",
    type: "tool",
    thumbnail: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29pbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Dr. Robert Chen, Soil Scientist",
    date: "2024-03-15",
    readTime: "10 min read",
    content: "Full content here..."
  },
  {
    id: "6",
    title: "Water Conservation Strategies for Drought Conditions",
    description: "Practical approaches to manage water efficiently during periods of drought and water scarcity.",
    category: "Water Management",
    type: "article",
    thumbnail: "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZHJvdWdodHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Maria Rodriguez, Water Conservation Expert",
    date: "2024-01-28",
    readTime: "11 min read",
    content: "Full content here..."
  },
  {
    id: "7",
    title: "Introduction to Regenerative Agriculture",
    description: "Learn how regenerative farming practices can restore ecosystem health while improving productivity.",
    category: "Sustainable Farming",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZyUyMHByYWN0aWNlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Regenerative Farming Institute",
    date: "2024-04-05",
    readTime: "18 min video",
    content: "Full content here..."
  },
  {
    id: "8",
    title: "Financial Planning for Small Farm Operations",
    description: "Essential financial strategies to ensure the economic sustainability of your small farm business.",
    category: "Farm Business",
    type: "guide",
    thumbnail: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jaWFsJTIwcGxhbm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "Jennifer Thompson, Agricultural Economist",
    date: "2024-02-05",
    readTime: "14 min read",
    content: "Full content here..."
  },
  {
    id: "9",
    title: "Climate-Smart Agriculture Practices",
    description: "Adapting farming methods to mitigate and adapt to climate change effects on agriculture.",
    category: "Climate Adaptation",
    type: "article",
    thumbnail: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbWF0ZSUyMGNoYW5nZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Dr. James Wilson, Climate Scientist",
    date: "2024-03-21",
    readTime: "9 min read",
    content: "Full content here..."
  },
  {
    id: "10",
    title: "Livestock Management for Sustainable Grazing",
    description: "Techniques for responsible livestock management that improve land health and productivity.",
    category: "Livestock",
    type: "guide",
    thumbnail: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y293JTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Thomas Anderson, Grazing Specialist",
    date: "2024-01-12",
    readTime: "13 min read",
    content: "Full content here..."
  },
  {
    id: "11",
    title: "Farm Equipment Maintenance Guide",
    description: "Best practices for maintaining and extending the life of your essential farm equipment.",
    category: "Equipment",
    type: "tool",
    thumbnail: "https://images.unsplash.com/photo-1591638246754-77e0722c3cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Mike Johnson, Agricultural Mechanic",
    date: "2024-04-10",
    readTime: "12 min read",
    content: "Full content here..."
  },
  {
    id: "12",
    title: "Starting a CSA Program: Complete Guide",
    description: "Step-by-step instructions for establishing a successful Community Supported Agriculture program.",
    category: "Farm Business",
    type: "guide",
    thumbnail: "https://images.unsplash.com/photo-1595855759920-86582cd54904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    author: "Lisa Chen, CSA Coordinator",
    date: "2024-02-25",
    readTime: "18 min read",
    content: "Full content here..."
  }
];

// Categories available for filtering
const categories = [
  "All Categories",
  "Sustainable Farming",
  "Crop Management",
  "AgTech",
  "Pest Management",
  "Soil Management",
  "Water Management",
  "Farm Business",
  "Climate Adaptation",
  "Livestock",
  "Equipment"
];

// Resource types available for filtering
const resourceTypes = [
  "All Types",
  "article",
  "video",
  "guide",
  "tool"
];

// Mock API function to fetch resources with filters
const fetchResources = async (
  search: string = '', 
  category: string = 'All Categories', 
  type: string = 'All Types',
  page: number = 1, 
  limit: number = 6
): Promise<{ resources: Resource[], total: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter resources based on search, category, and type
  let filteredResources = [...mockResourcesData];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredResources = filteredResources.filter(resource => 
      resource.title.toLowerCase().includes(searchLower) ||
      resource.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (category && category !== 'All Categories') {
    filteredResources = filteredResources.filter(resource => 
      resource.category === category
    );
  }
  
  if (type && type !== 'All Types') {
    filteredResources = filteredResources.filter(resource => 
      resource.type === type
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);
  
  return {
    resources: paginatedResources,
    total: filteredResources.length
  };
};

const ResourceLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const resourcesPerPage = 6;
  
  // Query for resources
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['resources', searchQuery, selectedCategory, selectedType, currentPage],
    queryFn: () => fetchResources(
      isSearching ? searchQuery : '', 
      selectedCategory, 
      selectedType, 
      currentPage, 
      resourcesPerPage
    ),
    initialData: { resources: [], total: 0 }
  });
  
  const totalPages = Math.ceil(data.total / resourcesPerPage);
  
  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    setCurrentPage(1);
    refetch();
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
    refetch();
  };
  
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
    refetch();
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Agricultural Resource Library</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our comprehensive collection of resources for sustainable farming, crop management, 
          agricultural technology, and more to help improve your farming practices.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="w-full md:w-64 space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Filter className="h-5 w-5 mr-2" /> Filters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Category</label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Resource Type</label>
                <Select 
                  value={selectedType} 
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'All Types' ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Not finding what you're looking for? Our team is here to help you find the right resources.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : data.resources.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                  setSelectedType('All Types');
                  setIsSearching(false);
                  setCurrentPage(1);
                  refetch();
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Showing {data.resources.length} of {data.total} resources
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.resources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={resource.thumbnail} 
                          alt={resource.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </AspectRatio>
                      <Badge
                        className="absolute top-2 right-2 text-xs"
                        variant={
                          resource.type === 'article' ? 'default' :
                          resource.type === 'video' ? 'destructive' :
                          resource.type === 'guide' ? 'outline' : 'secondary'
                        }
                      >
                        {resource.type}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4 flex-grow">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{resource.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-2 mb-4">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" /> {resource.author}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {resource.readTime}
                        </span>
                        <span className="flex items-center">
                          <Tag className="h-3 w-3 mr-1" /> {resource.category}
                        </span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link to={`/resource/${resource.id}`} className="flex items-center justify-center">
                          View Resource <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handlePreviousPage}
                      variant="outline"
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <Button
                        key={index}
                        variant={currentPage === index + 1 ? "default" : "outline"}
                        className="w-10"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    
                    <Button 
                      onClick={handleNextPage}
                      variant="outline"
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
