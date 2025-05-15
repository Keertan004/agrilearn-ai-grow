
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Clock, User, Calendar, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Define the Resource type with specific allowed values for the type property
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

// Mock data for resources
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
    content: `
      <h2>Introduction to Sustainable Farming</h2>
      <p>Sustainable farming practices are essential for the long-term health of our planet and agricultural systems. Small-scale farmers face unique challenges but also have distinct advantages when implementing sustainable methods.</p>
      
      <h2>Key Sustainable Practices</h2>
      <p>Several key practices can significantly improve sustainability on small farms:</p>
      <ul>
        <li><strong>Crop Rotation:</strong> Rotating crops helps manage soil fertility, reduce pest problems, and prevent soil erosion. Plan a 3-5 year rotation cycle for best results.</li>
        <li><strong>Cover Cropping:</strong> Planting cover crops during off-seasons protects and enriches your soil. Consider legumes like clover or vetch to add nitrogen.</li>
        <li><strong>Integrated Pest Management (IPM):</strong> IPM combines biological, cultural, physical, and chemical tools to minimize economic, health, and environmental risks.</li>
        <li><strong>Water Conservation:</strong> Implement drip irrigation, rainwater harvesting, and mulching to reduce water usage and improve efficiency.</li>
        <li><strong>Composting:</strong> Create your own nutrient-rich soil amendment by composting farm waste and reducing dependency on synthetic fertilizers.</li>
      </ul>
      
      <h2>Environmental Benefits</h2>
      <p>Implementing sustainable practices on your small farm can lead to significant environmental benefits:</p>
      <ul>
        <li>Reduced soil erosion and improved soil health</li>
        <li>Increased biodiversity and ecosystem services</li>
        <li>Lower carbon footprint and greenhouse gas emissions</li>
        <li>Better water quality in surrounding watersheds</li>
        <li>Preservation of natural resources for future generations</li>
      </ul>
      
      <h2>Economic Advantages</h2>
      <p>Sustainability isn't just good for the environment—it's good for your bottom line:</p>
      <ul>
        <li>Reduced input costs for fertilizers, pesticides, and water</li>
        <li>Premium pricing opportunities through organic or sustainable certifications</li>
        <li>Improved resilience to climate change and market fluctuations</li>
        <li>Access to niche markets and direct-to-consumer sales channels</li>
        <li>Potential eligibility for environmental incentive programs and grants</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Begin your sustainability journey by taking these steps:</p>
      <ol>
        <li>Conduct a farm assessment to understand your current impacts</li>
        <li>Start small by implementing one or two practices and expanding gradually</li>
        <li>Connect with local extension services and sustainable agriculture organizations for support</li>
        <li>Document your practices and outcomes to track improvements</li>
        <li>Share knowledge with other farmers and build a community of practice</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Sustainable farming is not just a trend but a necessary approach for the future of agriculture. By implementing these practices on your small farm, you can contribute to environmental health while building a resilient and profitable agricultural business.</p>
    `
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
    content: `
      <h2>Understanding Crop Rotation</h2>
      <p>Crop rotation is the practice of growing different types of crops in the same area across sequential seasons. It's one of the most effective techniques for sustainable agriculture.</p>
      
      <h2>Benefits of Strategic Rotation</h2>
      <p>When properly implemented, crop rotation offers numerous benefits:</p>
      <ul>
        <li>Disrupts pest and disease cycles</li>
        <li>Improves soil structure and fertility</li>
        <li>Reduces dependency on synthetic inputs</li>
        <li>Manages soil erosion</li>
        <li>Distributes workload throughout the season</li>
      </ul>
      
      <h2>Creating Your Rotation Plan</h2>
      <p>Follow these steps to develop an effective crop rotation strategy:</p>
      <ol>
        <li>Group crops by family (e.g., nightshades, brassicas, legumes)</li>
        <li>Consider nutrient needs and contributions of each crop</li>
        <li>Plan for 3-7 year rotations when possible</li>
        <li>Include cover crops in your rotation schedule</li>
        <li>Document your plan and results each season</li>
      </ol>
      
      <h2>Sample Rotation Sequences</h2>
      <p>Here are some proven rotation sequences for different agricultural contexts:</p>
      <h3>Four-Year Vegetable Rotation</h3>
      <ul>
        <li>Year 1: Legumes (peas, beans)</li>
        <li>Year 2: Leaf crops (lettuce, spinach, cabbage)</li>
        <li>Year 3: Fruiting crops (tomatoes, peppers, eggplant)</li>
        <li>Year 4: Root crops (carrots, potatoes, onions)</li>
      </ul>
      
      <h3>Field Crop Rotation</h3>
      <ul>
        <li>Year 1: Corn (heavy nitrogen feeder)</li>
        <li>Year 2: Soybeans or other legumes (nitrogen fixer)</li>
        <li>Year 3: Small grain like wheat or oats</li>
        <li>Year 4: Cover crop or forage</li>
      </ul>
      
      <h2>Advanced Considerations</h2>
      <p>Take your rotation strategy to the next level by incorporating these factors:</p>
      <ul>
        <li>Root depth diversity to access different soil layers</li>
        <li>Allelopathic effects between certain crops</li>
        <li>Market demands and economic returns</li>
        <li>Equipment and labor availability</li>
        <li>Climate change resilience</li>
      </ul>
      
      <h2>Troubleshooting Common Challenges</h2>
      <p>Address these common crop rotation challenges:</p>
      <ul>
        <li>Limited land area: Consider vertical growing and intensive plantings</li>
        <li>Specialized equipment needs: Start with crops using similar equipment</li>
        <li>Market limitations: Develop value-added products for less marketable rotation crops</li>
        <li>Transition periods: Use cover crops during difficult transition times</li>
      </ul>
      
      <h2>Measuring Success</h2>
      <p>Track these indicators to evaluate your rotation effectiveness:</p>
      <ul>
        <li>Soil organic matter increases</li>
        <li>Reduced pest and disease pressure</li>
        <li>Lower input costs over time</li>
        <li>Stable or increasing yields</li>
        <li>Improved water infiltration and retention</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Advanced crop rotation is both an art and a science. By thoughtfully planning your rotations and adapting them based on results, you'll build healthier soil, reduce pest problems, and create a more sustainable and profitable farming operation.</p>
    `
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
    content: `
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      
      <h2>What is Precision Agriculture?</h2>
      <p>Precision agriculture uses technology to optimize field-level management with regard to:</p>
      <ul>
        <li>Crop farming</li>
        <li>Soil management</li>
        <li>Seed planting</li>
        <li>Pest control</li>
        <li>Harvesting</li>
      </ul>
      
      <h2>Key Technologies</h2>
      <p>This video covers several important precision agriculture technologies:</p>
      <ul>
        <li><strong>GPS Guidance Systems:</strong> Enabling accurate navigation and field mapping</li>
        <li><strong>Sensors and IoT:</strong> Monitoring soil conditions, weather, and crop health</li>
        <li><strong>Drones and Satellite Imagery:</strong> Providing aerial field assessment</li>
        <li><strong>Variable Rate Technology:</strong> Applying inputs at variable rates across fields</li>
        <li><strong>Farm Management Software:</strong> Integrating data for decision support</li>
      </ul>
      
      <h2>Benefits Explained</h2>
      <p>The video demonstrates how precision agriculture provides:</p>
      <ul>
        <li>Reduced input costs through optimized application</li>
        <li>Increased yields through better management</li>
        <li>Improved environmental sustainability</li>
        <li>Enhanced traceability and quality control</li>
        <li>Better farm data for informed decision-making</li>
      </ul>
      
      <h2>Implementation Steps</h2>
      <p>For farmers interested in adopting precision agriculture:</p>
      <ol>
        <li>Start with soil mapping and analysis</li>
        <li>Invest in basic GPS guidance systems</li>
        <li>Gradually add sensors and monitoring tools</li>
        <li>Implement data management systems</li>
        <li>Explore advanced technologies as needs grow</li>
      </ol>
      
      <h2>Case Studies Featured</h2>
      <p>The video showcases these real-world implementations:</p>
      <ul>
        <li>Midwest corn and soybean operation using variable rate fertilization</li>
        <li>California vineyard utilizing soil moisture sensors and irrigation automation</li>
        <li>Australian wheat farm employing yield mapping and predictive analytics</li>
      </ul>
      
      <h2>Cost-Benefit Analysis</h2>
      <p>The economics of precision agriculture investments:</p>
      <ul>
        <li>Initial investment ranges from $5,000 to $50,000 depending on farm size and technology</li>
        <li>Return on investment typically occurs within 2-3 growing seasons</li>
        <li>Input savings of 10-20% are common</li>
        <li>Yield increases of 3-10% frequently reported</li>
        <li>Environmental benefits provide long-term sustainability advantages</li>
      </ul>
      
      <h2>Future Trends</h2>
      <p>The video concludes by examining emerging technologies:</p>
      <ul>
        <li>Artificial intelligence and machine learning applications</li>
        <li>Robotics and autonomous vehicles</li>
        <li>Advanced predictive analytics</li>
        <li>Integration with climate-smart agriculture</li>
        <li>Blockchain for agricultural supply chain management</li>
      </ul>
    `
  }
];

// Mock API function to fetch resource details
const fetchResourceDetail = async (id: string): Promise<Resource> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find the resource with the matching ID
  const resource = mockResourcesData.find(item => item.id === id);
  
  // If resource is not found, throw an error
  if (!resource) {
    throw new Error('Resource not found');
  }
  
  return resource;
};

// Mock API function to fetch related resources
const fetchRelatedResources = async (category: string, currentId: string): Promise<Resource[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter resources by category and exclude the current resource
  return mockResourcesData
    .filter(resource => resource.category === category && resource.id !== currentId)
    .slice(0, 3); // Limit to 3 related resources
};

const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>('');
  
  const { data: resource, isLoading, error } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => fetchResourceDetail(id || ''),
    enabled: !!id
  });
  
  const { data: relatedResources = [] } = useQuery({
    queryKey: ['relatedResources', resource?.category, id],
    queryFn: () => fetchRelatedResources(resource?.category || '', id || ''),
    enabled: !!resource?.category && !!id
  });
  
  useEffect(() => {
    if (resource?.content) {
      setContent(resource.content);
    }
  }, [resource]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }
  
  if (error || !resource) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
        <p className="mb-6">We couldn't find the resource you're looking for.</p>
        <Button asChild>
          <Link to="/resources">Return to Resource Library</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-6">
          <Link to="/resources" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Resources
          </Link>
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-3">{resource.title}</h1>
          <p className="text-gray-600 mb-4">{resource.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {resource.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(resource.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {resource.readTime}
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <Badge variant="outline">{resource.category}</Badge>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="rounded-lg overflow-hidden mb-8">
            <AspectRatio ratio={16/9}>
              <img 
                src={resource.thumbnail} 
                alt={resource.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
          
          <div 
            className="prose prose-lg max-w-none" 
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      
      {relatedResources.length > 0 && (
        <div className="border-t pt-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedResources.map((related) => (
              <Card key={related.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={related.thumbnail} 
                    alt={related.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <Badge className="mb-2">{related.type}</Badge>
                  <h3 className="font-bold mb-2 line-clamp-2">{related.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{related.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/resource/${related.id}`} className="w-full flex items-center justify-center">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;
