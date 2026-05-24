import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './HeroSlider.css';

const cinematicItems = [
  {
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1400&auto=format&fit=crop',
    title: 'GOLDEN HOUR BISTRO',
    subtitle: 'Welcome to Sanctuary',
    isCafe: true
  },
  {
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    title: 'NATURE\'S BOWL',
    subtitle: '#1 Healthy Choice'
  },
  {
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    title: 'ARTISAN PIE',
    subtitle: '#2 Most Loved'
  },
  {
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
    title: 'VELVET LAVA',
    subtitle: '#3 Sweetest Sin'
  },
  {
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop',
    title: 'GOLDEN TOAST',
    subtitle: '#4 Breakfast Bliss'
  },
  {
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    title: 'SILK BREW',
    subtitle: '#5 Barista Selection'
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const plateRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === cinematicItems.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Smooth Entrance
    tl.fromTo(plateRef.current, 
      { x: 500, y: 100, rotation: 90, opacity: 0, scale: 0.5 },
      { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
    );

    tl.fromTo(textRef.current.querySelectorAll('.animate-text'),
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=1"
    );

    // Smooth Exit
    tl.to(plateRef.current, {
      x: -500, y: -100, rotation: -90, opacity: 0, scale: 0.5, duration: 1.2, delay: 2, ease: "power4.in"
    });
    
    tl.to(textRef.current.querySelectorAll('.animate-text'), {
      x: -100, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.in"
    }, "-=1");

  }, [current]);

  return (
    <section className="hero-slider" ref={containerRef}>
      <div className="slide active cinematic-slide bg-gh-dark">
        <div className="cinematic-container container flex items-center">
          {/* Curved Plate Section */}
          <div className="plate-section flex-1 relative flex justify-center items-center">
            <div ref={plateRef} className="plate-wrapper">
              <img 
                src={cinematicItems[current].image} 
                alt={cinematicItems[current].title} 
                className={`main-plate-img shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${cinematicItems[current].isCafe ? 'rounded-2xl' : 'rounded-full'}`} 
              />
            </div>
          </div>

          {/* Text Section */}
          <div ref={textRef} className="text-section flex-1 text-left space-y-4">
            <span className="animate-text text-gh-gold text-xs font-black tracking-widest uppercase block">
              {cinematicItems[current].subtitle}
            </span>
            <h2 className="animate-text cinematic-title text-6xl md:text-8xl font-heading leading-tight text-white">
              {cinematicItems[current].title.split(' ')[0]} <br />
              <span className="text-gh-gold italic">
                {cinematicItems[current].title.split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <div className="animate-text flex items-center gap-8 pt-6">
              <button 
                onClick={() => navigate(cinematicItems[current].isCafe ? '/about' : '/menu')} 
                className="btn-cinematic-order"
              >
                {cinematicItems[current].isCafe ? 'Explore Bistro' : 'Order Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-dots">
        {cinematicItems.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

