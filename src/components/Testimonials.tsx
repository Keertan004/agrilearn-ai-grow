
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TestimonialProps = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
};

const testimonials: TestimonialProps[] = [
  {
    quote: "AgriLearnNetwork has revolutionized our farming practices. The crop suggestions have increased our yield by 30% in just one season!",
    name: "Sarah Johnson",
    role: "Owner",
    company: "Green Valley Farms",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=150&q=60"
  },
  {
    quote: "The soil management tools are game-changing. We've been able to optimize our fertilizer use and improve soil health significantly.",
    name: "Michael Chen",
    role: "Agricultural Engineer",
    company: "Future Farming Co-op",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=150&q=60"
  },
  {
    quote: "As a small-scale farmer, I was skeptical at first, but the platform's disease detection saved my entire tomato crop last year.",
    name: "Emily Rodriguez",
    role: "Farmer",
    company: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=60"
  },
  {
    quote: "The resource library has been invaluable for training our team on sustainable farming practices. Highly recommended.",
    name: "David Wilson",
    role: "Operations Director",
    company: "Harvest Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=150&q=60"
  },
];

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, company, image }) => {
  // Get initials from name for avatar fallback
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="relative mb-4">
          <span className="absolute -top-6 left-0 text-6xl text-agri-green/20">"</span>
          <p className="text-gray-700 relative z-10">{quote}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            {image ? <AvatarImage src={image} alt={name} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-gray-500">{role}, {company}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Farmers Are Saying</h2>
          <p className="mx-auto text-xl text-gray-500 max-w-2xl">
            Hear from farmers who have transformed their agricultural practices with AgriLearnNetwork
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
