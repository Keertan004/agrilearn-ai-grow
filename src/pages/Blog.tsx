
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { blogPosts } from "@/data/blogData";

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  // Get current posts based on pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(0, visiblePosts);

  const handleLoadMore = () => {
    // Load 6 more posts, up to the maximum number of posts
    setVisiblePosts(prevValue => Math.min(prevValue + 6, blogPosts.length));
    // Update current page
    setCurrentPage(prevValue => Math.min(prevValue + 1, totalPages));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setVisiblePosts(page * postsPerPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AgriLearn Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest farming techniques, agricultural innovations, and expert advice to improve your farming practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative">
              <AspectRatio ratio={16/9}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="object-cover w-full h-full"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&auto=format&fit=crop';
                  }}
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

      {visiblePosts < blogPosts.length ? (
        <div className="text-center mt-12">
          <Button className="px-8" onClick={handleLoadMore}>Load More Articles</Button>
        </div>
      ) : (
        <Pagination className="mt-12">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Blog;
