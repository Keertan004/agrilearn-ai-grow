
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, User, Clock, BookOpen, List, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Resource type (same as in ResourceLibrary.tsx)
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

// Function to fetch a resource by ID (using the same function from ResourceLibrary)
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
        <h2 class="text-2xl font-bold mt-6 mb-4">Introduction to Sustainable Agriculture</h2>
        <p class="mb-4">Sustainable agriculture is a holistic approach to farming that considers the long-term health of the environment, economic viability, and social well-being. For small farmers, implementing sustainable practices can not only reduce environmental impact but also increase resilience and profitability in the long run.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Key Sustainable Practices for Small Farms</h2>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">1. Crop Rotation and Diversification</h3>
        <p class="mb-3">One of the foundational practices in sustainable agriculture is crop rotation—the systematic planting of different crops in sequence on the same land. This practice helps manage soil fertility, reduce pest pressure, and optimize nutrient use.</p>
        <p class="mb-2">Benefits include:</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Improved soil structure and fertility</li>
          <li>Reduced dependency on synthetic fertilizers</li>
          <li>Better pest and disease management</li>
          <li>Increased biodiversity</li>
          <li>Risk mitigation through diversified income streams</li>
        </ul>
        
        <div class="my-6 p-4 bg-gray-50 border rounded-md">
          <p class="italic text-gray-700">"Rotating crops is one of the most powerful tools available to organic farmers. It's not just about preventing pests—it's about building a healthy, resilient farming system from the ground up."</p>
          <p class="text-right mt-2">— Organic Farming Research Foundation</p>
        </div>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">2. Cover Cropping</h3>
        <p class="mb-3">Cover crops are planted to cover the soil rather than for harvest. They play a crucial role in sustainable farming by protecting and improving soil health during off-seasons.</p>
        <p class="mb-2">Cover crops can:</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Prevent soil erosion</li>
          <li>Suppress weeds naturally</li>
          <li>Add organic matter to soil</li>
          <li>Fix nitrogen (leguminous cover crops)</li>
          <li>Break pest cycles</li>
        </ul>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">3. Integrated Pest Management (IPM)</h3>
        <p class="mb-3">IPM is an ecosystem-based approach that combines different pest management techniques to minimize economic, health, and environmental risks.</p>
        <p class="mb-2">Key components include:</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Regular monitoring of crops for pests</li>
          <li>Setting action thresholds</li>
          <li>Preventive cultural practices</li>
          <li>Biological controls</li>
          <li>Targeted use of pesticides only when necessary</li>
        </ul>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">4. Water Conservation</h3>
        <p class="mb-3">Efficient water management is increasingly important as climate change affects rainfall patterns and water availability.</p>
        <p class="mb-2">Effective strategies include:</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Drip irrigation systems</li>
          <li>Rainwater harvesting</li>
          <li>Mulching to retain soil moisture</li>
          <li>Planting drought-resistant varieties</li>
          <li>Scheduled irrigation based on crop needs</li>
        </ul>
        
        <img src="https://images.unsplash.com/photo-1589634749017-1c6918f04b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Water conservation techniques" class="my-6 rounded-lg w-full" />
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Economic Considerations</h2>
        
        <p class="mb-4">While transitioning to sustainable practices may require initial investment, many farmers report long-term cost savings and premium pricing opportunities:</p>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">Cost-Benefit Analysis</h3>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Reduced input costs (fertilizers, pesticides)</li>
          <li>Lower irrigation expenses</li>
          <li>Improved crop resilience reduces losses</li>
          <li>Access to premium markets and certification programs</li>
          <li>Diversified income streams reduce financial risk</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Getting Started with Sustainable Practices</h2>
        
        <p class="mb-3">For small farmers looking to transition to more sustainable methods, consider these steps:</p>
        
        <ol class="list-decimal pl-6 mb-6 space-y-1">
          <li>Start small with one or two practices</li>
          <li>Document and measure outcomes</li>
          <li>Connect with local extension services for guidance</li>
          <li>Join farmer networks to share knowledge</li>
          <li>Explore certification options as your practices develop</li>
        </ol>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Conclusion</h2>
        
        <p class="mb-4">Sustainable agriculture offers small farmers a path to long-term viability while contributing to environmental health and community well-being. By implementing practices like crop rotation, cover cropping, IPM, and water conservation, small farms can build resilience against climate change and market fluctuations while potentially accessing premium markets for their products.</p>
      `,
    };
  }
  
  if (id === '2') {
    return {
      id: '2',
      title: 'Water Conservation Techniques in Crop Production',
      description: 'Modern approaches to optimize water usage while maintaining optimal crop yields.',
      category: 'water',
      type: 'guide',
      thumbnail: 'https://images.unsplash.com/photo-1589634749017-1c6918f04b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      author: 'Prof. Rajesh Kumar',
      date: '2023-07-22',
      readTime: '12 min read',
      content: `
        <h2 class="text-2xl font-bold mt-6 mb-4">Water Conservation: A Critical Challenge in Modern Agriculture</h2>
        <p class="mb-4">As climate change affects rainfall patterns and water availability worldwide, efficient water management has become one of the most critical aspects of sustainable agriculture. This guide explores practical water conservation techniques that can help farmers reduce water usage while maintaining or even improving crop yields.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Precision Irrigation Systems</h2>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">1. Drip Irrigation</h3>
        <p class="mb-3">Drip irrigation delivers water directly to the plant's root zone, minimizing evaporation and runoff. This method can achieve water use efficiency of up to 95% compared to conventional flood irrigation methods.</p>
        <p class="mb-2">Key benefits include:</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Water savings of 30-70% compared to conventional methods</li>
          <li>Reduced weed growth between rows</li>
          <li>Lower energy costs for pumping</li>
          <li>Ability to fertigate (apply fertilizers through irrigation)</li>
          <li>Reduced disease pressure from decreased leaf wetness</li>
        </ul>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">2. Micro-Sprinklers</h3>
        <p class="mb-3">Micro-sprinkler systems offer a middle ground between drip and conventional sprinkler irrigation, providing water over a slightly larger area than drip emitters but with better efficiency than traditional sprinklers.</p>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">3. Sensor-Based Irrigation</h3>
        <p class="mb-4">Modern soil moisture sensors, weather stations, and evapotranspiration models can help determine precisely when and how much to irrigate. These technologies can be integrated into automated systems that deliver water only when needed.</p>
        
        <div class="my-6 p-4 bg-gray-50 border rounded-md">
          <p class="italic text-gray-700">"A 20% improvement in water use efficiency across global agriculture would make more water available for other sectors and the environment."</p>
          <p class="text-right mt-2">— International Water Management Institute</p>
        </div>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Soil Management for Water Conservation</h2>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">1. Mulching</h3>
        <p class="mb-3">Applying organic or synthetic mulch around crops can significantly reduce soil water evaporation, moderate soil temperature, and suppress weeds that compete for moisture.</p>
        <p class="mb-2">Types of mulch and their benefits:</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Straw mulch: Inexpensive, adds organic matter as it breaks down</li>
          <li>Plastic mulch: Excellent water retention, warms soil for early crops</li>
          <li>Living mulch: Cover crops that suppress weeds and add organic matter</li>
          <li>Wood chip mulch: Long-lasting, excellent for perennial crops</li>
        </ul>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">2. Minimum Tillage</h3>
        <p class="mb-3">Reduced tillage practices help maintain soil structure, increase organic matter, and improve water infiltration and retention capabilities.</p>
        
        <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Minimum tillage field" class="my-6 rounded-lg w-full" />
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Water Harvesting and Storage</h2>
        
        <p class="mb-4">Capturing and storing rainwater during periods of abundance can provide critical irrigation supplies during dry periods.</p>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">1. Farm Ponds</h3>
        <p class="mb-3">Properly designed farm ponds can capture significant amounts of runoff water from fields and rooftops. This stored water can then be used for irrigation during dry periods.</p>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">2. Contour Bunding and Trenching</h3>
        <p class="mb-3">These landscape modifications slow water movement across land, increasing infiltration and reducing erosion.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Crop Selection and Management</h2>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">1. Drought-Tolerant Varieties</h3>
        <p class="mb-4">Many crop varieties have been specifically bred for drought tolerance. These varieties can maintain reasonable yields with less water, making them valuable in water-scarce regions.</p>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">2. Deficit Irrigation Strategies</h3>
        <p class="mb-4">Strategic application of less-than-optimal water during crop development stages when the plant is less sensitive to water stress can significantly improve water use efficiency while minimizing yield impacts.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Implementation Considerations</h2>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">Economic Analysis</h3>
        <p class="mb-3">While many water conservation technologies require initial investment, their long-term benefits often outweigh costs through:</p>
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Reduced water expenses</li>
          <li>Lower pumping and energy costs</li>
          <li>Improved yields due to optimal water management</li>
          <li>Reduced fertilizer leaching and improved nutrient use efficiency</li>
        </ul>
        
        <h3 class="text-xl font-semibold mt-5 mb-3">Support Programs</h3>
        <p class="mb-4">Many regions offer financial and technical assistance for implementing water conservation practices through agricultural extension services and government programs.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Conclusion</h2>
        
        <p class="mb-4">Water conservation in agriculture is no longer optional but essential for sustainable food production. By implementing a combination of efficient irrigation technologies, improved soil management practices, and appropriate crop selection, farmers can significantly reduce water usage while maintaining productive and profitable operations.</p>
      `,
    };
  }
  
  // Generic content for other resources
  const genericResources = [
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
      content: `
        <h2 class="text-2xl font-bold mt-6 mb-4">Soil Health Assessment</h2>
        <p class="mb-4">This comprehensive video guide explores the key indicators of soil health and how to interpret them for better farm management.</p>
        
        <div class="my-6 aspect-w-16 aspect-h-9">
          <iframe class="rounded-lg shadow-lg" width="100%" height="500" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Key Topics Covered</h2>
        
        <ul class="list-disc pl-6 mb-4 space-y-1">
          <li>Physical soil properties and their importance</li>
          <li>Chemical indicators and testing methods</li>
          <li>Biological activity assessment</li>
          <li>Simple field tests you can do yourself</li>
          <li>Interpreting soil test results</li>
          <li>Developing a soil improvement plan</li>
        </ul>
        
        <p class="mb-4">The video includes demonstrations of various field tests and interviews with soil scientists and successful farmers who have improved their soil health.</p>
      `,
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
      content: `
        <h2 class="text-2xl font-bold mt-6 mb-4">Introduction to Natural Pest Management</h2>
        <p class="mb-4">This guide provides practical approaches to managing agricultural pests using natural methods that minimize environmental impact while maintaining crop health and productivity.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Biological Control Methods</h2>
        <p class="mb-4">Learn about beneficial insects, microorganisms, and other natural predators that can help keep pest populations in check.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Cultural Practices</h2>
        <p class="mb-4">Explore how crop rotation, intercropping, and timing of planting can disrupt pest life cycles.</p>
        
        <h2 class="text-2xl font-bold mt-6 mb-4">Physical Barriers and Traps</h2>
        <p class="mb-4">Discover effective physical methods to prevent pest damage, from simple row covers to sophisticated trapping systems.</p>
      `,
    }
  ];
  
  const resource = genericResources.find(r => r.id === id);
  return resource || null;
};

// Resource type icons
const resourceTypeIcons = {
  article: <BookOpen className="h-4 w-4" />,
  video: <BookOpen className="h-4 w-4" />,
  guide: <List className="h-4 w-4" />,
  tool: <Folder className="h-4 w-4" />,
};

const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: resource, isLoading, isError } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => fetchResourceById(id || ''),
    enabled: !!id,
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-60 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !resource) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
          <p className="mb-6">The resource you're looking for doesn't exist or has been removed.</p>
          <Link to="/resources">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resource Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const { title, description, thumbnail, author, date, readTime, content, type } = resource;
  
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Back button */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link to="/resources">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Resource header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-6">{description}</p>
          
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 mb-6">
            <span className="flex items-center">
              {resourceTypeIcons[type]}
              <span className="ml-1 capitalize">{type}</span>
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" /> 
              {author}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {date}
            </span>
            {readTime && (
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" /> 
                {readTime}
              </span>
            )}
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-8">
          <AspectRatio ratio={16/9}>
            <img 
              src={thumbnail} 
              alt={title} 
              className="rounded-lg object-cover w-full h-full" 
            />
          </AspectRatio>
        </div>
        
        {/* Content */}
        <Card>
          <CardContent className="p-6 md:p-8">
            {type === 'video' ? (
              <div dangerouslySetInnerHTML={{ __html: content || '' }} />
            ) : (
              <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: content || '' }} />
            )}
          </CardContent>
        </Card>
        
        {/* Related resources section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Related resource" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1 line-clamp-2">Organic Certification Process Explained</h3>
                <p className="text-sm text-gray-600 line-clamp-2">Step-by-step guide to obtaining organic certification for your farm products.</p>
                <Link to="/resource/7" className="text-sm font-medium text-agri-green hover:underline flex items-center mt-2">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Related resource" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1 line-clamp-2">Sustainable Agriculture Practices for Small Farms</h3>
                <p className="text-sm text-gray-600 line-clamp-2">Learn how small-scale farmers can implement sustainable practices while maintaining profitability.</p>
                <Link to="/resource/1" className="text-sm font-medium text-agri-green hover:underline flex items-center mt-2">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Related resource" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1 line-clamp-2">Understanding Soil Health Indicators</h3>
                <p className="text-sm text-gray-600 line-clamp-2">How to assess and improve the health of your farm soil using simple tests.</p>
                <Link to="/resource/3" className="text-sm font-medium text-agri-green hover:underline flex items-center mt-2">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
