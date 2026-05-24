import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { menuCategories } from '../../data/menuData';
import './Menu.css';

const Menu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const cards = document.querySelectorAll('.floating-menu-card');
    
    if (cards.length > 0) {
      // 1. DISTRIBUTE CARDS IN CIRCULAR ORBIT
      cards.forEach((card, i) => {
        const angle = (i * (360 / cards.length)) * (Math.PI / 180);
        const radius = 380;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        gsap.set(card, { x, y });
      });

      // 2. AUTOMATIC ROTATION (GSAP MASTER TIMELINE)
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(".modern-orbit-ring", {
        rotation: 360,
        duration: 40,
        ease: "none"
      });

      // 3. COUNTER-ROTATION (KEEP CARDS UPRIGHT)
      tl.to(".floating-menu-card", {
        rotation: -360,
        duration: 40,
        ease: "none"
      }, 0);

      // 4. RANDOM FLOATING (LIFELIKE DEPTH)
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: "+=20",
          x: "+=15",
          rotation: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }
  }, [location.pathname]);

  // Determine the title based on the path
  const getPageTitle = () => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2) {
      if (pathParts[2] === 'item') return "Menu Details";
      return pathParts[2].replace('-', ' ');
    }
    return "Our Selections";
  };

  const isLanding = location.pathname === '/menu';

  return (
    <div className="menu-page min-h-screen bg-[#080808] text-white selection:bg-gh-gold selection:text-black">
      {/* UNIQUE MODERN SIDEBAR */}
      <aside className={`menu-sidebar border-r border-white/5 transition-all duration-700 ${isSidebarOpen ? 'w-[320px] opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
        <div className="sidebar-inner h-full flex flex-col p-10">
          <div className="flex items-center justify-between mb-20">
            <span className="text-[12px] font-black tracking-[0.5em] text-gh-gold uppercase">Collections</span>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-black hover:bg-gh-gold transition-all duration-300 shadow-lg"
            >
              <span className="text-xl font-bold">✕</span>
            </button>
          </div>
          
          <nav className="flex flex-col gap-5 flex-1 justify-center">
            {menuCategories.map((cat) => (
              <NavLink 
                key={cat} 
                to={`/menu/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) => `
                  group relative text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500
                  ${isActive ? 'text-gh-gold pl-6' : 'text-gray-300 hover:text-white hover:pl-4'}
                `}
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gh-gold opacity-0 group-[.active]:opacity-100 transition-all"></span>
                {cat}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
             <p className="font-heading text-gh-gold text-xl font-bold tracking-tight">Golden Hour <span className="text-white">Bistro.</span></p>
          </div>
        </div>
      </aside>

      {/* FLOATING TOGGLE FOR SIDEBAR */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-32 left-8 z-[110] w-14 h-14 rounded-full bg-gh-gold text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          ☰
        </button>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen relative">
        
        {/* MODERN HERO: Cinematic Backdrop & Orbit */}
        <header className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#080808]">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop" 
               className="w-full h-full object-cover opacity-20" 
               alt="Background" 
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#080808]"></div>
          </div>

            {/* MODERN GSAP ORBIT (REPAIRED STRUCTURE) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none perspective-[2000px] z-0">
              <div className="modern-orbit-ring relative w-full h-full">
                {[
                  'https://images.unsplash.com/photo-1541167760496-1628856ab772',
                  'https://images.unsplash.com/photo-1493770348161-369560ae357d',
                  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
                  'https://images.unsplash.com/photo-1551024506-0bccd828d307',
                  'https://images.unsplash.com/photo-1485856407642-7f9ba0268b51',
                  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
                ].map((img, i) => (
                  <div key={i} className="floating-menu-card absolute top-1/2 left-1/2 -mt-[65px] -ml-[55px]" style={{ '--i': i }}>
                    <div className="w-[110px] h-[130px] rounded-[2rem] overflow-hidden border-2 border-gh-gold/30 p-1 bg-black shadow-2xl">
                      <img src={`${img}?q=80&w=400&auto=format&fit=crop`} alt="Orbit" className="w-full h-full object-cover rounded-[1.8rem]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Centered Branding */}
            <div className="relative z-10 text-center flex flex-col items-center pointer-events-none">
              <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block mb-6 opacity-70">The Golden Experience</span>
              <h2 className="text-[5rem] md:text-[8rem] font-heading text-white leading-none">
                Our <br />
                <span className="text-gh-gold italic relative">
                  Selections
                  <div className="w-20 h-1 bg-gh-gold mx-auto mt-6 shadow-[0_0_20px_rgba(212,175,55,0.5)]"></div>
                </span>
              </h2>
            </div>
          
          {/* Unique CSS Floating Accents */}
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute w-[2px] h-[2px] bg-gh-gold/20 rounded-full pointer-events-none animate-pulse" style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}></div>
          ))}
        </header>

        {/* RESTORED MAIN VIEWPORT: Menu Categories & Items */}
        <div className="relative z-10 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-8">
            <Outlet />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Menu;
