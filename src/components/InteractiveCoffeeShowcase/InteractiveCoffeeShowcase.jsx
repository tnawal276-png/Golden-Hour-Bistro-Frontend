import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const coffees = [
  { name: 'Latte',      desc: 'Smooth espresso blended with perfectly steamed milk. Velvety, warm, and deeply satisfying.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1400&auto=format&fit=crop' },
  { name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk and thick foam. Bold and beautiful in every sip.',          image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1400&auto=format&fit=crop' },
  { name: 'Mocha',      desc: 'Rich dark chocolate meets our house espresso. A luxurious blend crafted for true lovers.',    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1400' },
  { name: 'Espresso',   desc: 'Bold, concentrated, and complex. Intense golden crema and a deep, satisfying aroma.',        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1400&auto=format&fit=crop' },
  { name: 'Cold Brew',  desc: 'Steeped 18 hours in cold water. Silky smooth, never bitter, endlessly refreshing.',          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1400&auto=format&fit=crop' },
];

export default function InteractiveCoffeeShowcase() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % coffees.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: '#0a0a0a', padding: '80px 0' }}>
      {/* Section heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>Our Coffee Selection</p>
        <h2 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400 }}>Brewed to Perfection</h2>
      </div>

      {/* Main card — contained, not full screen */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.7)', minHeight: '460px' }}>

          {/* LEFT — image stack */}
          <div style={{ position: 'relative', width: '55%', overflow: 'hidden', flexShrink: 0 }}>
            {coffees.map((c, i) => (
              <img
                key={i}
                src={c.image}
                alt={c.name}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? 'scale(1.08)' : 'scale(1)',
                  transition: 'opacity 1.4s ease, transform 8s ease',
                }}
              />
            ))}
            {/* Right-side vignette blending into dark panel */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(10,10,10,0.85))', pointerEvents: 'none' }} />
          </div>

          {/* RIGHT — info panel */}
          <div style={{ background: '#111', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 44px', position: 'relative' }}>
            {/* Gold top accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, #d4af37, transparent)' }} />

            {/* Counter */}
            <p style={{ color: '#555', fontSize: '12px', letterSpacing: '0.2em', marginBottom: '24px' }}>
              <span style={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>
                {String(current + 1).padStart(2, '0')}
              </span>
              &nbsp;/ {String(coffees.length).padStart(2, '0')}
            </p>

            {/* Coffee name — transitions via opacity */}
            <div key={current} style={{ animation: 'ghSlideUp 0.6s ease both' }}>
              <h3 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1, marginBottom: '20px' }}>
                {coffees[current].name}
              </h3>
              <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.75, maxWidth: '280px', marginBottom: '40px' }}>
                {coffees[current].desc}
              </p>
              <button
                onClick={() => navigate('/menu')}
                style={{
                  background: 'transparent', border: '1px solid #d4af37',
                  color: '#d4af37', padding: '12px 32px',
                  fontSize: '11px', letterSpacing: '0.3em',
                  textTransform: 'uppercase', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.target.style.background='#d4af37'; e.target.style.color='#000'; }}
                onMouseLeave={e => { e.target.style.background='transparent'; e.target.style.color='#d4af37'; }}
              >
                Order Now
              </button>
            </div>

            {/* Gold pill dots — bottom right */}
            <div style={{ position: 'absolute', bottom: '32px', right: '44px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              {coffees.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    border: 'none', cursor: 'pointer', padding: 0,
                    height: '6px',
                    width: i === current ? '28px' : '8px',
                    borderRadius: '9999px',
                    background: i === current ? '#d4af37' : 'rgba(212,175,55,0.25)',
                    transition: 'all 0.4s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ghSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
