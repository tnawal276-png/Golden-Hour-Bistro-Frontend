import React from 'react';
import { useNavigate } from 'react-router-dom';

const featuredItems = [
  {
    id: 1,
    title: 'Espresso Masterpiece',
    subtitle: 'Robust & Dark',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Iced Favorites',
    subtitle: 'Refreshing & Sweet',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    title: 'Savory Croissants',
    subtitle: 'Flaky & Buttery',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    title: 'Organic Beans',
    subtitle: 'Locally Sourced',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400',
  }
];

const FeaturedSelection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">Featured Drinks & Delights</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm tracking-wider uppercase font-semibold">
            Our menu includes world-class coffee, freshly baked artisanal pastries, and savory meals for every palate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => navigate('/menu')}
            >
              {/* Rounded Image Container */}
              <div className="w-full h-64 rounded-[40px] overflow-hidden mb-6 shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-heading text-white mb-2">{item.title}</h3>
              <p className="text-gh-gold text-sm mb-4 tracking-widest uppercase">{item.subtitle}</p>
              <button 
                className="bg-[#d4af37] text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#b8962e] hover:shadow-lg w-full max-w-[200px] border-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/menu');
                }}
              >
                View Menu
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSelection;
