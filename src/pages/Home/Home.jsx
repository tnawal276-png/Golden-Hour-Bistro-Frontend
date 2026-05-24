import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import InteractiveCoffeeShowcase from '../../components/InteractiveCoffeeShowcase/InteractiveCoffeeShowcase';
import InteractiveFoodShowcase from '../../components/InteractiveFoodShowcase/InteractiveFoodShowcase';
import FeaturedSelection from '../../components/FeaturedSelection/FeaturedSelection';
import CafeHighlights from '../../components/CafeHighlights/CafeHighlights';
import MobilePromo from '../../components/MobilePromo/MobilePromo';
import Reviews from '../../components/Reviews/Reviews';
import LocationMap from '../../components/LocationMap/LocationMap';
import LiveBistroStatus from '../../components/LiveBistroStatus/LiveBistroStatus';
import './Home.css';

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const marqueeRef = useRef(null);

  useEffect(() => {
    // 1. Existing Scroll Progress Logic
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);

    // 2. GSAP ELITE BRAND SHUFFLE LOGIC
    const brandSets = [
      [
        { name: "LA MARZOCCO", icon: "☕" },
        { name: "OATLY", icon: "🥛" },
        { name: "HARIO JAPAN", icon: "⚗️" },
        { name: "MONIN PARIS", icon: "🍶" },
        { name: "BORGATTI", icon: "🌾" }
      ],
      [
        { name: "ARTISANAL", icon: "🫘" },
        { name: "V60 PRECISION", icon: "🌪️" },
        { name: "ESPRESSO LAB", icon: "🧪" },
        { name: "GOLDEN BEAN", icon: "✧" },
        { name: "BREW MASTER", icon: "🫖" }
      ]
    ];

    const directions = [
      { x: -1000, y: 0 },    // Left (Far)
      { x: 0, y: -1000 },    // Up (Far)
      { x: -1000, y: 0 },    // Left (Far)
      { x: 0, y: -1000 },    // Up (Far)
      { x: 0, y: 1000 }      // Down (Far)
    ];

    let currentSetIdx = 0;

    const playShuffle = () => {
      const currentSet = brandSets[currentSetIdx];
      const tl = gsap.timeline({
        onComplete: () => {
          currentSetIdx = (currentSetIdx + 1) % brandSets.length;
          playShuffle();
        }
      });

      // 1. CLEAR & RESET PREVIOUS (Immediate)
      currentSet.forEach((brand, i) => {
        const card = document.querySelector(`.partner-card-${i}`);
        if (card) {
          card.querySelector('.partner-icon').textContent = brand.icon;
          card.querySelector('.partner-name').textContent = brand.name;
          gsap.set(card, { opacity: 0, x: 0, y: 100 }); 
        }
      });

      // 2. ENTRANCE (Staggered)
      tl.to(".partner-card", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.1
      });

      // 3. DISPLAY TIME
      tl.add(() => {}, "+=3.5"); 

      // 4. FAST DIRECTIONAL EXIT (No mixing)
      tl.to(".partner-card", {
        opacity: 0,
        x: (i) => directions[i].x,
        y: (i) => directions[i].y,
        duration: 0.5,
        ease: "expo.in",
        stagger: 0.05
      });
    };

    playShuffle();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Background Enhancements */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <div className="bg-aura-glow top-right"></div>
      <div className="bg-aura-glow bottom-left"></div>
      <div className="ambient-dust"></div>

      <div className="relative">
        {/* Original Restored Hero Slider */}
        <HeroSlider />
      </div>
      
      {/* Original Restored Editorial Welcome Section */}
      <section className="editorial-section mt-12 md:mt-24">
        <div className="container editorial-grid">
          <div className="editorial-content">
            <span className="badge-minimal">Our Story</span>
            <h2 className="editorial-title">Where Time <span>Stands Still</span></h2>
            <p className="editorial-text">
              Nestled in the heart of the city, Golden Hour Bistro is a sanctuary for those who appreciate the finer details. Our name reflects the warm, inviting light that fills our space every afternoon, creating the perfect atmosphere for relaxation.
            </p>
            <div className="editorial-features">
              <div className="edit-feature">
                <h3>01</h3>
                <p>Artisanal Roasts</p>
              </div>
              <div className="edit-feature">
                <h3>02</h3>
                <p>Hand-Crafted Pastries</p>
              </div>
            </div>
          </div>
          <div className="editorial-image-stack">
            <div className="main-image">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" alt="Cafe Interior" />
            </div>
            <div className="floating-image">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" alt="Coffee Pour" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand New Interactive Coffee Showcase (replaces old videos) */}
      <InteractiveCoffeeShowcase />

      {/* Brand New Interactive Food Showcase (replaces old videos) */}
      <InteractiveFoodShowcase />

      {/* Original Restored Signature Grid */}
      <section className="signature-showcase">
        <div className="container">
          <div className="center-header">
            <span className="badge-minimal">The Selection</span>
            <h2 className="section-title">Signature <span>Craft</span></h2>
          </div>
          
          <div className="modern-grid">
            <div className="modern-card">
              <div className="card-media">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop" alt="Golden Latte" />
              </div>
              <div className="card-info">
                <span className="card-cat">Signature Brew</span>
                <h3>Velvet Gold Latte</h3>
                <p>Pure espresso infused with turmeric, ginger, and wild honey.</p>
                <span className="card-price">$6.50</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-media">
                <img src="https://plus.unsplash.com/premium_photo-1663840225558-03ac41c68873?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlbmNoJTIwdG9hc3R8ZW58MHx8MHx8fDA%3D" alt="Maple French Toast" />
              </div>
              <div className="card-info">
                <span className="card-cat">Specialty Eat</span>
                <h3>Maple French Toast</h3>
                <p>Brioche soaked in vanilla bean custard with pure maple syrup.</p>
                <span className="card-price">$16.00</span>
              </div>
            </div>

            <div className="modern-card">
              <div className="card-media">
                <img src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1000&auto=format&fit=crop" alt="Pastry" />
              </div>
              <div className="card-info">
                <span className="card-cat">Bakery</span>
                <h3>Honey Glaze Cloud</h3>
                <p>Airy croissant with local wildflower honey.</p>
                <span className="card-price">$5.25</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Earthy/Beige Featured Selection (Added safely to enhance menu presentation) */}
      <FeaturedSelection />

      {/* Mood Parallax Section */}
      <section className="mood-parallax-section">
        <div className="parallax-bg-overlay"></div>
        <div className="container">
          <div className="mood-content-wrapper">
            <div className="glass-card-mood">
              <span className="badge-minimal">The Experience</span>
              <h2 className="mood-title">Where Every Moment <span>Glows</span></h2>
              <p className="mood-description">
                Experience the magic as the sun dips below the horizon, and our bistro transforms into a golden sanctuary.
              </p>
              <div className="mood-cta">
                <span className="cta-icon">✧</span>
                <span className="cta-text">Unmatched Atmosphere</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator-line"></div>
      </section>

      {/* New Aesthetic Highlights Section */}
      <CafeHighlights />

      {/* Other Original Sections */}
      <MobilePromo />
      {/* GSAP ELITE BRAND SHUFFLE */}
      <section className="brand-shuffle-section py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        <div className="container text-center mb-16">
          <span className="badge-minimal !text-gh-gold/80 !border-gh-gold/20">The Partnership</span>
        </div>

        <div className="brand-showcase-container container h-[120px] relative">
          <div className="brand-grid flex justify-between items-center w-full h-full gap-4 px-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`partner-card partner-card-${i} opacity-0 flex items-center gap-3 whitespace-nowrap`}>
                <span className="partner-icon text-white text-2xl md:text-3xl opacity-80">
                  {/* Dynamic Icon */}
                </span>
                <span className="partner-name text-white text-2xl md:text-3xl font-bold tracking-tight hover:text-gh-gold transition-colors duration-500 cursor-default">
                  {/* Dynamic Name */}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      <LiveBistroStatus />
      <LocationMap />

      {/* Floating Attention Grabber */}
      <div className="floating-badge cursor-pointer" onClick={() => navigate('/book')}>
        <div className="badge-inner">
          <span className="badge-text">Book Your Moment</span>
          <div className="badge-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
