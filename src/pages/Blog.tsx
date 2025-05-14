
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Sustainable Farming Practices for Modern Agriculture",
      excerpt: "Discover how sustainable farming practices can improve soil health, increase crop yields, and protect the environment for future generations.",
      category: "Sustainability",
      date: "May 10, 2025",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&auto=format&fit=crop",
      author: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "The Benefits of Crop Rotation and Diversification",
      excerpt: "Learn how crop rotation and diversification can help manage pests, improve soil fertility, and increase farm resilience against climate change.",
      category: "Farming Techniques",
      date: "May 5, 2025",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=500&auto=format&fit=crop",
      author: "Michael Rodriguez"
    },
    {
      id: 3,
      title: "AI in Agriculture: Transforming the Future of Farming",
      excerpt: "Explore how artificial intelligence and machine learning are revolutionizing farming practices, from automated harvesting to precision agriculture.",
      category: "Technology",
      date: "April 28, 2025",
      image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=800&h=500&auto=format&fit=crop",
      author: "Dr. Emily Chen"
    },
    {
      id: 4,
      title: "Water Conservation Strategies for Small-Scale Farmers",
      excerpt: "Discover practical water conservation techniques that small-scale farmers can implement to reduce water usage while maintaining crop health.",
      category: "Water Management",
      date: "April 20, 2025",
      image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=800&h=500&auto=format&fit=crop",
      author: "James Wilson"
    },
    {
      id: 5,
      title: "Understanding Soil Health: Key Indicators and Improvement Methods",
      excerpt: "Learn about the essential indicators of soil health and practical methods to improve soil quality for better crop production.",
      category: "Soil Management",
      date: "April 15, 2025",
      image: "https://images.unsplash.com/photo-1621456354270-2c9085a5e459?w=800&h=500&auto=format&fit=crop",
      author: "Dr. Lisa Thompson"
    },
    {
      id: 6,
      title: "Integrated Pest Management: Effective Control with Minimal Environmental Impact",
      excerpt: "Explore the principles of integrated pest management and how it can help control pests while minimizing the use of chemical pesticides.",
      category: "Pest Management",
      date: "April 8, 2025",
      image: "https://images.unsplash.com/photo-1620912909703-18484291de48?w=800&h=500&auto=format&fit=crop",
      author: "Robert Garcia"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AgriLearn Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest farming techniques, agricultural innovations, and expert advice to improve your farming practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative">
              <AspectRatio ratio={16/9}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-800">
                  {post.category}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2 hover:text-agri-green transition-colors duration-300">
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/blog/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button className="px-8">Load More Articles</Button>
      </div>
    </div>
  );
};

export default Blog;
