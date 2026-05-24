import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const foods = [
  { name: 'Maple French Toast',       tag: 'Breakfast Favourite',  image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1400' },
  { name: 'Honey Glazed Croissant',   tag: 'Freshly Baked Daily',  image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1400&auto=format&fit=crop' },
  { name: 'Grilled Chicken Sandwich', tag: "Chef's Signature",     image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1400&auto=format&fit=crop' },
  { name: 'Chocolate Lava Cake',      tag: 'Dessert Perfection',   image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1400&auto=format&fit=crop' },
  { name: 'Avocado Toast',            tag: 'Healthy & Vibrant',    image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=1400' },
];

export default function InteractiveFoodShowcase() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % foods.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: '#060606', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Section heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>Golden Hour Kitchen</p>
        <h2 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400 }}>Culinary Masterpieces</h2>
      </div>

      {/* Main container — contained, not full-width */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.8)', position: 'relative', height: '480px' }}>

          {/* Stacked Images — each absolutely positioned, only active one shows */}
          {foods.map((f, i) => (
            <img
              key={i}
              src={f.image}
              alt={f.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: i === current ? 1 : 0,
                /* Active image: slowly pans across (Ken Burns style) */
                transform: i === current ? 'scale(1.10) translateX(-10px)' : 'scale(1.04) translateX(10px)',
                transition: 'opacity 1.6s ease, transform 9s ease',
              }}
            />
          ))}

          {/* Dark gradient overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)', pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Content overlay */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '48px 52px' }}>

            {/* Animated text content per slide */}
            <div key={current} style={{ animation: 'ghFoodSlide 0.7s ease both' }}>
              <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>
                {foods[current].tag}
              </p>
              <h3 style={{
                color: '#fff',
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                lineHeight: 1.05,
                fontWeight: 400,
                marginBottom: '28px',
                textShadow: '0 4px 24px rgba(0,0,0,0.8)',
                maxWidth: '600px',
              }}>
                {foods[current].name}
              </h3>

              <button
                onClick={() => navigate('/menu')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '11px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: 0,
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4af37'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'currentColor' }} />
                Explore Menu
              </button>
            </div>

            {/* Dot indicators — bottom right */}
            <div style={{ position: 'absolute', bottom: '44px', right: '52px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              {foods.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    border: 'none', cursor: 'pointer', padding: 0,
                    height: '6px',
                    width: i === current ? '28px' : '8px',
                    borderRadius: '9999px',
                    background: i === current ? '#d4af37' : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.4s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ghFoodSlide {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
