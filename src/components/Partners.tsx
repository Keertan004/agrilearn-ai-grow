
import React from 'react';

type Partner = {
  name: string;
  logo: string;
  website?: string;
};

const partners: Partner[] = [
  {
    name: "AgroTech Innovations",
    logo: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=150&q=80",
    website: "https://example.com/agrotech"
  },
  {
    name: "Farm Solutions Inc.",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=150&q=80",
    website: "https://example.com/farmsolutions"
  },
  {
    name: "GreenGrow Foundation",
    logo: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=150&q=80",
    website: "https://example.com/greengrow"
  },
  {
    name: "Soil Science Institute",
    logo: "https://images.unsplash.com/photo-1560452992-e3c28ffc7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=150&q=80",
    website: "https://example.com/soilscience"
  },
  {
    name: "PlantHealth Co",
    logo: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=150&q=80",
    website: "https://example.com/planthealth"
  },
  {
    name: "AgriData Systems",
    logo: "https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=150&q=80",
    website: "https://example.com/agridata"
  }
];

const Partners: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="mx-auto text-xl text-gray-500 max-w-2xl">
            Working together with industry leaders to transform agricultural practices
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center">
              <a 
                href={partner.website || "#"} 
                className="transition-opacity hover:opacity-80"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
              <p className="mt-3 text-center text-sm text-gray-600">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
