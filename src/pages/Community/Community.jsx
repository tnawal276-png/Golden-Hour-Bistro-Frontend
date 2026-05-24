import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Community() {
  const [idea, setIdea] = useState('');
  const [name, setName] = useState('');
  const [posted, setPosted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/community');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setLoading(false);
    }
  };

  useEffect(() => { 
    window.scrollTo(0, 0); 
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!idea.trim() || !name.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, idea }),
      });

      if (response.ok) {
        setPosted(true);
        setIdea('');
        setName('');
        fetchPosts(); // Refresh list
        
        // Auto-scroll to the ideas board to show the new post
        const board = document.getElementById('ideas-board');
        if (board) {
          board.scrollIntoView({ behavior: 'smooth' });
        }
        
        setTimeout(() => setPosted(false), 5000);
      }
    } catch (err) {
      console.error('Error posting idea:', err);
    }
  };

  const events = [
    { date: 'MAY 10', title: 'Live Acoustic Evening', desc: 'An intimate evening of original music by local artists. Enjoy your favourite brew as melodies fill the air.', time: '7:00 PM – 10:00 PM', tag: 'Music' },
    { date: 'MAY 17', title: 'Open Mic Night', desc: 'Share your poetry, your stories, or your song. Every voice has a place at Golden Hour.', time: '6:30 PM – 9:30 PM', tag: 'Art & Expression' },
    { date: 'MAY 24', title: 'Barista Masterclass', desc: 'Learn the craft behind the perfect pour. Our head barista walks you through the science and art of espresso.', time: '11:00 AM – 1:00 PM', tag: 'Workshop' },
    { date: 'JUN 01', title: 'Local Art Exhibition', desc: 'A curated showcase of paintings, photography, and digital art from our neighbourhood community.', time: '12:00 PM – 8:00 PM', tag: 'Exhibition' },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111 60%, #1a1600 100%)',
        padding: '140px 0 80px',
      }}>
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>Our Community</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1.05, marginBottom: '24px' }}>
            A Place to <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Connect & Create</span>
          </h1>
          <p style={{ color: '#888', fontSize: '17px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 40px' }}>
            Golden Hour Bistro is more than a cafe — it's a living, breathing creative hub where local artists, thinkers, dreamers, and storytellers come together.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#share" style={{ background: '#d4af37', color: '#000', padding: '14px 32px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '4px', transition: 'all 0.3s' }}>Share Your Idea</a>
            <a href="#events" style={{ background: 'transparent', color: '#d4af37', padding: '14px 32px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #d4af37', borderRadius: '4px' }}>Upcoming Events</a>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY STATS ── */}
      <section style={{ background: '#0d0d0d', padding: '60px 0', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { n: '2,400+', l: 'Community Members' },
            { n: '48', l: 'Events This Year' },
            { n: posts.length > 0 ? `${posts.length}+` : '120+', l: 'Ideas Shared' },
            { n: '15+', l: 'Local Artists Featured' },
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: '#d4af37', fontSize: '2.4rem', fontWeight: 600, margin: 0 }}>{s.n}</p>
              <p style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '6px 0 0' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IDEAS BOARD ── */}
      <section id="ideas-board" style={{ padding: '100px 0', background: '#080808' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>Community Voice</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
              Ideas from Our <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Regulars</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            {loading ? (
              <p style={{ color: '#777', textAlign: 'center', gridColumn: '1/-1' }}>Loading ideas...</p>
            ) : posts.length === 0 ? (
              <p style={{ color: '#777', textAlign: 'center', gridColumn: '1/-1' }}>No ideas yet. Be the first to share one!</p>
            ) : posts.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '28px',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ color: '#d4af37', fontSize: '40px', lineHeight: 1, marginBottom: '12px', fontFamily: 'Georgia, serif', opacity: 0.6 }}>"</div>
                <p style={{ color: '#bbb', fontSize: '14px', lineHeight: 1.75, marginBottom: '20px' }}>{item.idea}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', 
                    background: `hsl(${i * 45}, 70%, 60%)`, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '12px', fontWeight: 700, color: '#000', flexShrink: 0 
                  }}>{item.initials}</div>
                  <div>
                    <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600, margin: 0 }}>{item.name}</p>
                    <p style={{ color: '#555', fontSize: '11px', margin: '2px 0 0' }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── SHARE YOUR IDEA FORM ── */}
          <div id="share" style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '20px', padding: '56px 48px', maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>Have an Idea?</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', textAlign: 'center', fontWeight: 400, marginBottom: '36px' }}>
              Share it with our <span style={{ color: '#d4af37', fontStyle: 'italic' }}>community</span>
            </h3>

            {posted && (
              <div style={{ 
                position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)',
                background: '#d4af37', color: '#000', padding: '16px 32px', 
                borderRadius: '50px', fontWeight: 700, fontSize: '14px',
                boxShadow: '0 10px 30px rgba(212,175,55,0.3)',
                zIndex: 1000,
                animation: 'slideDown 0.5s ease both'
              }}>
                ✨ Idea shared successfully! Scroll down to see it on the board.
              </div>
            )}

            <style>{`
              @keyframes slideDown {
                from { opacity: 0; transform: translate(-50%, -20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
              }
            `}</style>

            <form onSubmit={handlePost} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '14px 18px', color: '#fff', fontSize: '14px',
                  outline: 'none', transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <textarea
                rows={4}
                placeholder="Your idea, suggestion, or thought for the Golden Hour community..."
                value={idea}
                onChange={e => setIdea(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '14px 18px', color: '#fff', fontSize: '14px',
                  outline: 'none', resize: 'vertical', transition: 'border-color 0.3s', fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button
                type="submit"
                style={{
                  background: '#d4af37', color: '#000', padding: '16px',
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
                  border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.3s',
                }}
                onMouseEnter={e => e.target.style.background = '#b8962e'}
                onMouseLeave={e => e.target.style.background = '#d4af37'}
              >
                Post to Community Board
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section id="events" style={{ padding: '100px 0', background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>What's On</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
              Upcoming <span style={{ color: '#d4af37', fontStyle: 'italic' }}>Events</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {events.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '28px',
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px', padding: '28px 32px',
                  transition: 'border-color 0.3s, background 0.3s',
                  flexWrap: 'wrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              >
                <div style={{ textAlign: 'center', minWidth: '64px' }}>
                  <p style={{ color: '#d4af37', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{ev.date.split(' ')[0]}</p>
                  <p style={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '2px 0 0' }}>{ev.date.split(' ')[1]}</p>
                </div>
                <div style={{ width: '1px', height: '48px', background: 'rgba(212,175,55,0.2)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <h3 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 400, margin: 0 }}>{ev.title}</h3>
                    <span style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '99px' }}>{ev.tag}</span>
                  </div>
                  <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>{ev.desc}</p>
                </div>
                <p style={{ color: '#555', fontSize: '12px', flexShrink: 0 }}>{ev.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0', background: '#080808', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 32px' }}>
          <p style={{ color: '#d4af37', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>Come Be Part of It</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, marginBottom: '24px' }}>
            Your table is waiting
          </h2>
          <p style={{ color: '#777', fontSize: '15px', marginBottom: '40px', lineHeight: 1.8 }}>Whether you're here for the coffee, the conversation, or the community — you belong at Golden Hour Bistro.</p>
          <button
            onClick={() => navigate('/book')}
            style={{ background: '#d4af37', color: '#000', padding: '16px 40px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s' }}
            onMouseEnter={e => e.target.style.background = '#b8962e'}
            onMouseLeave={e => e.target.style.background = '#d4af37'}
          >
            Book a Table
          </button>
        </div>
      </section>

    </div>
  );
}
