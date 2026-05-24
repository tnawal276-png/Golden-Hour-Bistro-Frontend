import React from 'react';
import { FaCoffee, FaStore, FaMobileAlt, FaStar } from 'react-icons/fa';

const CafeHighlights = () => {
  return (
    <section className="py-24 bg-gh-dark relative text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-20 pt-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Circular Offset Image */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-start w-full">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-[12px] border-gh-gold/20 overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80" 
                alt="Latte Art" 
                className="w-full h-full object-cover filter grayscale-[20%]"
              />
            </div>
            {/* Decorative minimalist curve box around the circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[420px] md:h-[420px] rounded-[100px] border border-gh-gold/30 -z-10 hidden sm:block"></div>
          </div>

          {/* Right Side: Structured List */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading text-gh-gold mb-4">About the Cafe</h2>
              <p className="text-gray-400 leading-relaxed">
                Where every moment glows. Experience the magic as the sun dips below the horizon, and our bistro transforms into a warm, inviting sanctuary. 
                Whether you're stopping by for your morning brew or an elegant evening meal, we ensure perfection in every detail.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gh-gold/20 flex items-center justify-center shrink-0">
                  <FaCoffee className="text-gh-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-white mb-1">Menu Highlights</h4>
                  <p className="text-sm text-gray-400">Signature lattes, savory sandwiches, and handcrafted pastries.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gh-gold/20 flex items-center justify-center shrink-0">
                  <FaMobileAlt className="text-gh-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-white mb-1">Online Ordering</h4>
                  <p className="text-sm text-gray-400">Skip the line. Order ahead seamlessly through our mobile app.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gh-gold/20 flex items-center justify-center shrink-0">
                  <FaStore className="text-gh-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-white mb-1">Dine-in Vibe</h4>
                  <p className="text-sm text-gray-400">A luxurious, dark interior designed for relaxation and connection.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gh-gold/20 flex items-center justify-center shrink-0">
                  <FaStar className="text-gh-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-white mb-1">Customer Reviews</h4>
                  <p className="text-sm text-gray-400">Highly rated by critics and locals for unparalleled quality.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CafeHighlights;
