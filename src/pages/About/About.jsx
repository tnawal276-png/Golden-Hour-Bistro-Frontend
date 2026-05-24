import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

/* ── images for the orbit ring ── */
const orbitImages = [
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=300&auto=format&fit=crop',
  'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300&auto=format&fit=crop',
];

const values = [
  {
    icon: '🌿', title: 'Artisanal Sourcing',
    desc: 'We partner directly with farmers to ensure every bean is ethically sourced and of the highest quality.',
    cta: 'Our Sourcing Story',
    modalImage: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1400',
    modalTitle: 'From Farm to Cup',
    modalBody: (
      <>
        <p>Every bean at Golden Hour Bistro begins its journey on small, family-owned farms across Colombia, Ethiopia, and Guatemala. We visit each farm personally, ensuring fair wages, sustainable practices, and the finest single-origin harvests.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px', borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '20px' }}>
          <div>
            <h4 style={{ color: '#d4af37', fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Ethical Traceability</h4>
            <p style={{ fontSize: '13px', color: '#888' }}>Direct-trade partnerships that bypass middle-men to give more to the farmers.</p>
          </div>
          <div>
            <h4 style={{ color: '#d4af37', fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Micro-Batch Roasting</h4>
            <p style={{ fontSize: '13px', color: '#888' }}>Roasted in small 5kg batches to ensure absolute flavour profile control.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    icon: '🤝', title: 'Community First',
    desc: 'Our bistro is a hub for local artists, thinkers, and dreamers to connect and share ideas.',
    cta: 'Join Our Community',
    navigate: '/community',
    modalImage: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1400',
    modalTitle: 'A Place to Belong',
    modalBody: 'Golden Hour Bistro was built as a gathering place — a third space between home and work where creativity flourishes. We host local art exhibitions, live acoustic evenings, and weekend community meetups that bring the neighbourhood together. This is where ideas are sparked and friendships are forged over the perfect brew.',
  },
  {
    icon: '✨', title: 'Sensory Experience',
    desc: 'From the sound of the roast to the golden light, every detail is designed to delight your senses.',
    cta: 'The Golden Atmosphere',
    modalImage: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1400',
    modalTitle: 'Every Detail Matters',
    modalBody: (
      <>
        <p>The warm amber lighting, the gentle hiss of the espresso machine, the scent of freshly baked croissants — every sensory element of Golden Hour Bistro is intentional. We obsess over ambiance the same way we obsess over flavour.</p>
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(212,175,55,0.05)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.1)' }}>
          <p style={{ fontStyle: 'italic', color: '#d4af37', fontSize: '14px', marginBottom: '0' }}>"The Golden Hour isn't just a time of day, it's a state of being we curate through light, sound, and scent."</p>
        </div>
      </>
    ),
  },
  {
    icon: '☕', title: 'Craft & Precision',
    desc: 'Every cup is dialed in with precision — grind size, extraction time, temperature — nothing is left to chance.',
    cta: 'The Art Behind the Cup',
    modalImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1400',
    modalTitle: 'Science Meets Passion',
    modalBody: (
      <>
        <p>Our baristas train for months before serving their first espresso. Water temperature is calibrated to exactly 93°C. Extraction is timed to the second. Grind size is adjusted hourly as humidity shifts.</p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['93°C Water', '9 Bar Pressure', '28s Extraction', 'Micro-foam Texture'].map(t => (
            <li key={t} style={{ border: '1px solid #333', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', color: '#d4af37', textTransform: 'uppercase' }}>{t}</li>
          ))}
        </ul>
      </>
    ),
  },
];

const stats = [
  { number: '12+', label: 'Years of Excellence' },
  { number: '50K+', label: 'Happy Customers' },
  { number: '30+', label: 'Signature Blends' },
  { number: '5★', label: 'Avg. Customer Rating' },
];

const About = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    // GSAP BRAND MOMENT REVEAL
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".signature-box",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Reveal "The Golden Standard" character by character
    tl.to(".char", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.04
    })
    // 2. Reveal "Quality • Passion • Art" character by character with overlap
    .to(".char-secondary", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.02
    }, "-=0.4")
    .to(".brand-shimmer", {
      x: "200%",
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 3
    });
  }, []);
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="about-page">

      {/* SECTION 1 — CINEMATIC HERO WITH ORBIT RING */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111 60%, #1a1a0d 100%)',
        display: 'flex', alignItems: 'center',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '20%', right: '15%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: '80px', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '280px' }}>
            <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '20px' }}>
              Our Journey
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.05, fontWeight: 400, marginBottom: '24px' }}>
              Where Every Cup<br /><span style={{ color: '#d4af37', fontStyle: 'italic' }}>Tells a Story</span>
            </h1>
            <p style={{ color: '#999', fontSize: '16px', lineHeight: 1.8, maxWidth: '420px', marginBottom: '48px' }}>
              Crafting the perfect atmosphere since 2012. We believe every great cafe visit begins long before the first sip — it starts the moment you walk through our doors.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '380px' }}>
              {stats.map((s, i) => (
                <div key={i} style={{ borderLeft: '2px solid #d4af37', paddingLeft: '16px' }}>
                  <p style={{ color: '#d4af37', fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 600, margin: 0 }}>{s.number}</p>
                  <p style={{ color: '#777', fontSize: '12px', letterSpacing: '0.1em', margin: 0, textTransform: 'uppercase' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '420px', height: '420px', position: 'relative' }}>
            <div style={{
              position: 'absolute', zIndex: 10,
              width: '110px', height: '110px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37, #b8962e)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15)',
            }}>
              <span style={{ fontSize: '28px' }}>☕</span>
              <span style={{ color: '#000', fontSize: '9px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>GHB</span>
            </div>
            <div style={{
              position: 'absolute', width: '340px', height: '340px', borderRadius: '50%',
              border: '1px dashed rgba(212,175,55,0.2)',
            }} />
            <div style={{
              position: 'absolute', width: '240px', height: '240px', borderRadius: '50%',
              border: '1px solid rgba(212,175,55,0.08)',
            }} />
            {orbitImages.map((src, i) => {
              const angle = (360 / orbitImages.length) * i;
              const delay = -(12 / orbitImages.length) * i;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '72px', height: '72px',
                    marginTop: '-36px', marginLeft: '-36px',
                    animation: `ghOrbit 12s linear infinite`,
                    animationDelay: `${delay}s`,
                    '--start-angle': `${angle}deg`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: '100%', height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid rgba(212,175,55,0.6)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                      animation: `ghOrbitCounter 12s linear infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                </div>
              );
            })}
            <style>{`
              @keyframes ghOrbit {
                from { transform: rotate(0deg) translateX(170px) rotate(0deg); }
                to   { transform: rotate(360deg) translateX(170px) rotate(-360deg); }
              }
              @keyframes ghOrbitCounter {
                from { transform: rotate(0deg); }
                to   { transform: rotate(-360deg); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section style={{ background: '#0d0d0d', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '280px', position: 'relative', height: '480px' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '70%', height: '85%',
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop"
                alt="Cozy Cafe Corner"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.92)' }}
              />
            </div>
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '48%', height: '52%',
              borderRadius: '16px', overflow: 'hidden',
              border: '3px solid rgba(212,175,55,0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            }}>
              <img
                src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Latte Art"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{
              position: 'absolute', top: '20px', left: '-12px',
              width: '4px', height: '80px',
              background: 'linear-gradient(to bottom, #d4af37, transparent)',
              borderRadius: '2px',
            }} />
          </div>

          <div style={{ flex: '1', minWidth: '280px' }}>
            <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>Our Story</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, fontWeight: 400, marginBottom: '24px' }}>
              Born from a<br /><span style={{ color: '#d4af37', fontStyle: 'italic' }}>Passion for Craft</span>
            </h2>
            <p style={{ color: '#999', lineHeight: 1.9, marginBottom: '24px', fontSize: '15px' }}>
              Founded on the belief that a cafe should be more than just a place to get coffee, Golden Hour Bistro was born from a passion for art, community, and the perfect roast. What started as a small corner shop has evolved into a sanctuary for those seeking a moment of peace in a busy world.
            </p>
            <p style={{ color: '#777', lineHeight: 1.9, marginBottom: '48px', fontSize: '15px' }}>
              Each morning our baristas arrive hours before dawn to prepare the day's roasts, bake the pastries, and set the stage for the golden moments that define us.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { year: '2012', label: 'The First Pour — Golden Hour opens its doors' },
                { year: '2016', label: 'Expanded to a full kitchen & dessert menu' },
                { year: '2018', label: 'Award-winning roasts recognized nationally' },
                { year: '2024', label: '50,000+ satisfied customers & counting' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    color: '#d4af37', fontFamily: "'Playfair Display', serif",
                    fontSize: '14px', fontWeight: 700, minWidth: '44px', paddingTop: '2px',
                  }}>{m.year}</div>
                  <div style={{ flex: 1, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2px' }}>
                    <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — VALUES */}
      <section style={{ background: '#080808', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>Our Values</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400 }}>
              Crafted with <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Purpose</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '40px 32px',
                  transition: 'border-color 0.3s, transform 0.3s',
                  cursor: 'pointer',
                }}
                onClick={() => v.navigate ? navigate(v.navigate) : setActiveModal(v)}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '20px' }}>{v.icon}</div>
                <h3 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '12px', fontWeight: 400 }}>{v.title}</h3>
                <p style={{ color: '#777', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                  <div style={{ width: '32px', height: '2px', background: '#d4af37', borderRadius: '1px' }} />
                  <span style={{ color: '#d4af37', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{v.cta} →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CINEMATIC MODAL OVERLAY */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            animation: 'modalIn 0.35s ease both',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111',
              borderRadius: '20px',
              overflow: 'hidden',
              maxWidth: '820px',
              width: '100%',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 60px 120px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
              <img
                src={activeModal.modalImage}
                alt={activeModal.modalTitle}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111 0%, transparent 60%)' }} />
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', width: '36px', height: '36px',
                  borderRadius: '50%', cursor: 'pointer', fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >✕</button>
              <div style={{ position: 'absolute', bottom: '24px', left: '32px' }}>
                <span style={{ fontSize: '28px' }}>{activeModal.icon}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: '8px 0 0', fontWeight: 400 }}>{activeModal.modalTitle}</h3>
              </div>
            </div>
            <div style={{ padding: '32px' }}>
              <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.85, marginBottom: '24px' }}>{activeModal.modalBody}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '2px', background: '#d4af37', borderRadius: '1px' }} />
                <span style={{ color: '#d4af37', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Golden Hour Bistro</span>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes modalIn {
              from { opacity: 0; transform: scale(0.96); }
              to   { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}

      {/* SECTION 4 — QUOTE BREAK */}
      <section className="atmosphere-break">
        <div className="break-overlay"></div>
        <div className="container">
          <div className="break-content text-center">
            <h2 className="break-title">"In every cup, we find a <span>new dawn</span>."</h2>
            <p className="break-author">— The Golden Rule</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — ESSENCE */}
      <section className="visionary-section">
        <div className="container visionary-flex">
          <div className="visionary-content">
            <span className="badge-minimal">The Essence</span>
            <h2 className="section-title">The Art of <span>Atmosphere</span></h2>
            <p className="editorial-text">
              "We didn't just want to create a cafe; we wanted to create a feeling. The golden hour is that magical moment where everything feels right, and that's precisely what we aim to deliver with every cup of coffee and every plate we serve."
            </p>
            <div className="signature-box relative">
              <div className="overflow-hidden mb-4">
                <p className="founder-name text-gh-gold text-5xl md:text-7xl font-heading flex flex-wrap justify-center gap-x-[0.2em]">
                  {"The Golden Standard".split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden">
                      {word.split("").map((char, charIdx) => (
                        <span key={charIdx} className="char inline-block opacity-0 transform translate-y-full">
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
                </p>
              </div>

              <div className="flex items-center gap-6 overflow-hidden">
                <div className="h-[1px] flex-1 bg-gh-gold/20"></div>
                <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                  {"Quality • Passion • Art".split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden">
                      {word.split("").map((char, charIdx) => (
                        <span key={charIdx} className="char-secondary inline-block opacity-0 transform translate-y-full text-white/50 text-[10px] md:text-[12px] font-black tracking-[0.6em] uppercase">
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
                <div className="h-[1px] flex-1 bg-gh-gold/20"></div>
              </div>
              
              {/* GSAP Shimmer Overlay */}
              <div className="brand-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full pointer-events-none"></div>
            </div>
          </div>
          <div className="visionary-image glass">
            <img src="https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=1200&auto=format&fit=crop" alt="Artistic Coffee Pour" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
