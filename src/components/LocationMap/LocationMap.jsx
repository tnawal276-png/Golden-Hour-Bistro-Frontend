import React from 'react';

const LocationMap = () => {
  return (
    <section className="py-24 bg-gh-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Info Side */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <span className="text-gh-gold uppercase tracking-[0.2em] text-xs font-bold">Visit Us</span>
              <h2 className="text-4xl font-heading text-white mt-2 mb-4">Find Your Golden Hour</h2>
              <p className="text-gray-400">Located in the heart of the artistic district, our bistro is a sanctuary for those who appreciate fine coffee and elevated dining.</p>
            </div>
            
            <div className="space-y-4">
              <div className="glass p-4 rounded-xl border border-white/5 hover:border-gh-gold/50 transition-colors">
                <h4 className="text-gh-gold font-heading text-xl mb-1">Address</h4>
                <p className="text-gray-300 text-sm">123 Sunset Boulevard<br/>Art District, NY 10001</p>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5 hover:border-gh-gold/50 transition-colors">
                <h4 className="text-gh-gold font-heading text-xl mb-1">Hours</h4>
                <p className="text-gray-300 text-sm">Mon - Thu: 7am - 9pm<br/>Fri - Sun: 8am - 11pm</p>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5 hover:border-gh-gold/50 transition-colors">
                <h4 className="text-gh-gold font-heading text-xl mb-1">Contact</h4>
                <p className="text-gray-300 text-sm">hello@goldenhourbistro.com<br/>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:w-2/3 w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden glass p-2 border border-white/10 group shadow-[0_0_50px_rgba(212,175,55,0.05)]">
              <div 
                className="w-full h-full rounded-xl overflow-hidden relative transition-all duration-700"
                style={{
                  filter: 'brightness(1.05) contrast(1.1) sepia(0.2) saturate(1.1)'
                }}
              >
              {/* Note: Using a custom filter stack to create a premium dark-gold map theme without needing a paid API key */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Golden Hour Bistro Location"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-gh-gold/20 rounded-xl"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationMap;
