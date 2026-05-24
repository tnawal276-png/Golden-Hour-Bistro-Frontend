import React from 'react';

const CraftVideos = () => {
  return (
    <section className="py-24 bg-[#121212] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">Behind the Scenes</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-2 mb-4">Our Craft in Motion</h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Coffee Video */}
          <div className="glass p-4 rounded-3xl border border-white/5 hover:border-[#d4af37]/30 transition-colors group">
            <div className="w-full h-80 rounded-2xl overflow-hidden relative shadow-2xl">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
              >
                <source src="https://media.giphy.com/media/3o85xHktyE0coUN1x6/giphy.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors"></div>
            </div>
            <div className="mt-8 text-center px-4 pb-4">
              <h3 className="text-2xl font-heading text-white mb-2">The Art of Coffee</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Watch our master baristas carefully brew perfection, extracting every ounce of flavor from our premium organic beans.</p>
            </div>
          </div>

          {/* Food Video */}
          <div className="glass p-4 rounded-3xl border border-white/5 hover:border-[#d4af37]/30 transition-colors group md:translate-y-12">
            <div className="w-full h-80 rounded-2xl overflow-hidden relative shadow-2xl">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
              >
                <source src="https://media.giphy.com/media/l41JRsph73VokN6ik/giphy.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors"></div>
            </div>
            <div className="mt-8 text-center px-4 pb-4">
              <h3 className="text-2xl font-heading text-white mb-2">Culinary Perfection</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Every dish is prepared with passion and precision. We believe that exceptional food is an art form.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default CraftVideos;
