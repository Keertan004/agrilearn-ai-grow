
import React from 'react';

type Partner = {
  name: string;
  logo: string;
  website?: string;
};

const partners: Partner[] = [
  {
    name: "AgroTech Innovations",
    logo: "https://via.placeholder.com/150x80?text=AgroTech",
    website: "#"
  },
  {
    name: "Farm Solutions Inc.",
    logo: "https://via.placeholder.com/150x80?text=FarmSolutions",
    website: "#"
  },
  {
    name: "GreenGrow Foundation",
    logo: "https://via.placeholder.com/150x80?text=GreenGrow",
    website: "#"
  },
  {
    name: "Soil Science Institute",
    logo: "https://via.placeholder.com/150x80?text=SoilScience",
    website: "#"
  },
  {
    name: "PlantHealth Co",
    logo: "https://via.placeholder.com/150x80?text=PlantHealth",
    website: "#"
  },
  {
    name: "AgriData Systems",
    logo: "https://via.placeholder.com/150x80?text=AgriData",
    website: "#"
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
