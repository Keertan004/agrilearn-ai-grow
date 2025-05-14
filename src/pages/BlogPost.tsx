
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogData";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || "1");
  
  // Find the blog post with the matching ID
  const post = blogPosts.find(post => post.id === postId);
  
  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        <Badge variant="secondary" className="mb-4">
          {post.category}
        </Badge>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-8">
          <span className="mr-4">By {post.author}</span>
          <span>{post.date}</span>
        </div>

        <div className="mb-8">
          <AspectRatio ratio={16/9} className="rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="mb-4">{post.excerpt}</p>
          
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
            velit vel bibendum bibendum, nisl nisl bibendum nisl, vel bibendum nisl 
            nisl vel bibendum. Sed euismod, velit vel bibendum bibendum, nisl nisl 
            bibendum nisl, vel bibendum nisl nisl vel bibendum.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Understanding the Problem</h2>
          <p className="mb-4">
            Nulla facilisi. Sed euismod, velit vel bibendum bibendum, nisl nisl bibendum nisl, 
            vel bibendum nisl nisl vel bibendum. Sed euismod, velit vel bibendum bibendum, 
            nisl nisl bibendum nisl, vel bibendum nisl nisl vel bibendum.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Proposed Solutions</h2>
          <p className="mb-4">
            Maecenas egestas, velit vel bibendum bibendum, nisl nisl bibendum nisl, 
            vel bibendum nisl nisl vel bibendum. Sed euismod, velit vel bibendum bibendum, 
            nisl nisl bibendum nisl, vel bibendum nisl nisl vel bibendum.
          </p>
          
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-2">Implementation of sustainable farming techniques</li>
            <li className="mb-2">Regular crop rotation and diversification</li>
            <li className="mb-2">Use of natural pest control methods</li>
            <li className="mb-2">Water conservation strategies</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
          <p>
            In conclusion, sustainable farming practices are essential for the future of agriculture. 
            By implementing these practices, farmers can improve soil health, increase crop yields, 
            and protect the environment for future generations.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <Button variant="outline">Facebook</Button>
            <Button variant="outline">Twitter</Button>
            <Button variant="outline">LinkedIn</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
