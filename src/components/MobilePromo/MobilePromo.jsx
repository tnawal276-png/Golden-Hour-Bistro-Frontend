import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const MobilePromo = () => {
  return (
    <section className="bg-gh-dark py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gh-gold/5 rounded-full blur-3xl transform -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <span className="text-gh-gold tracking-[0.2em] uppercase text-sm font-semibold">The Golden Hour Experience</span>
          <h2 className="text-5xl md:text-6xl font-heading text-white leading-tight">
            Order. Reserve. <br className="hidden lg:block"/>
            <span className="text-gh-gold italic">Savor.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Download the official Golden Hour Bistro app to get priority table bookings, access exclusive mobile-only menu items, and earn rewards on every sip.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl hover:bg-gray-200 transition-transform hover:scale-105 duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full sm:w-auto">
              <FaApple className="text-3xl" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-semibold leading-none">Download on the</p>
                <p className="text-lg font-bold leading-none mt-1">App Store</p>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-transparent border border-gray-600 text-white px-8 py-4 rounded-xl hover:border-gh-gold transition-all hover:scale-105 duration-300 w-full sm:w-auto">
              <FaGooglePlay className="text-3xl text-gh-gold" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-semibold text-gray-400 leading-none">GET IT ON</p>
                <p className="text-lg font-bold leading-none mt-1">Google Play</p>
              </div>
            </button>
          </div>
        </div>

        {/* Right Side: Mockup with Slow Mo Float Animation */}
        <div className="lg:w-1/2 relative flex justify-center mt-12 lg:mt-0 perspective-1000">
          <div className="relative w-64 h-[500px] md:w-80 md:h-[600px] rounded-[3rem] border-[8px] border-gray-800 bg-black overflow-hidden shadow-2xl animate-float transition-all duration-1000 hover:rotate-2 hover:scale-105 shadow-[0_20px_50px_rgba(212,175,55,0.15)]">
            {/* Dynamic island / Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
              <div className="w-1/3 h-5 bg-gray-800 rounded-b-2xl"></div>
            </div>
            
            {/* Mockup Screen Content */}
            <div className="absolute inset-0 bg-gh-dark">
              {/* Fake App Header */}
              <div className="bg-black/50 backdrop-blur-md pt-12 pb-4 px-6 flex justify-between items-center border-b border-white/5">
                <div className="w-8 h-8 rounded-full bg-gh-gold/20 flex items-center justify-center">
                  <span className="text-gh-gold font-serif text-sm">GH</span>
                </div>
                <span className="text-white font-heading text-lg">Bistro App</span>
                <div className="w-8 h-8"></div>
              </div>
              
              {/* Fake App Content */}
              <div className="p-4 space-y-4">
                <div className="h-32 rounded-xl bg-gradient-to-br from-gh-gold/40 to-black relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop" alt="Coffee" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
                  <div className="absolute bottom-3 left-3 text-white font-bold">Featured Blend</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-24 rounded-xl bg-gray-900 border border-white/5 flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl">☕</span>
                    <span className="text-xs text-gray-400">Order Now</span>
                  </div>
                  <div className="h-24 rounded-xl bg-gray-900 border border-white/5 flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl">📅</span>
                    <span className="text-xs text-gray-400">Reserve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle Glow Behind Phone */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gh-gold/20 rounded-full blur-[80px] -z-10"></div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default MobilePromo;
