import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const ornamentRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // 1. Autonomous "Golden Flow" Master Animations
    const ctx = gsap.context(() => {
      // Ornament Animation
      gsap.to(".floating-ornament", {
        y: "+=30",
        rotation: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Text Stagger Reveal
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
      });

      gsap.from(".reveal-subtext", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.2
      });

      // Decorative Bars Elastic Stagger
      gsap.from(".deco-bar", {
        scaleX: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "elastic.out(1, 0.5)",
        delay: 1.5
      });

      // SVG Wave Motion
      gsap.to("#flow-wave", {
        attr: { d: "M0 250 Q 250 350 500 250 T 1000 250" },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Icon Container Pulse
      gsap.to(".icon-container", {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Particle Fluid Motion
      gsap.utils.toArray(".golden-particle").forEach((particle, i) => {
        gsap.to(particle, {
          x: "random(-150, 150)",
          y: "random(-150, 150)",
          duration: "random(10, 25)",
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: i * 0.1
        });
      });
    }, ornamentRef);

    // 2. Mouse Parallax & Particle Attraction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5);
      const yPos = (clientY / window.innerHeight - 0.5);

      // Ornament Parallax
      gsap.to(".floating-ornament", {
        rotationY: xPos * 40,
        rotationX: -yPos * 40,
        x: xPos * 20,
        y: yPos * 20,
        duration: 1.2,
        ease: "power2.out"
      });

      // Particle "Magnetic" Attraction
      gsap.to(".golden-particle", {
        x: (i) => xPos * (100 + i * 5),
        y: (i) => yPos * (100 + i * 5),
        duration: 2,
        ease: "power1.out",
        stagger: 0.01
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="container mx-auto px-6">
        {/* Header Grid */}
        <div className="grid lg:grid-cols-2 items-center gap-10 mb-20">
          <div className="max-w-3xl">
            <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block mb-4">Connect With Us</span>
            <h1 className="text-6xl md:text-7xl font-heading mb-8">Let's Start a <span className="text-gh-gold italic">Conversation</span></h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Whether you have a question about our menu, want to book a private event, or simply want to say hello, we're here to listen.
            </p>
          </div>

          {/* NEW GSAP INTERACTIVE ORNAMENT */}
          <div className="hidden lg:flex justify-center items-center perspective-[1000px]" ref={ornamentRef}>
            <div className="floating-ornament relative w-64 h-64 flex items-center justify-center">
              {/* Abstract Gold Sculpture (Bistro Motif) */}
              <div className="absolute inset-0 border-[3px] border-gh-gold/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 border border-gh-gold/30 rounded-full rotate-45"></div>
              <div className="absolute inset-8 border-[2px] border-gh-gold/40 rounded-full -rotate-12"></div>
              
              <div className="relative z-10 w-32 h-32 bg-gh-gold rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.4)]">
                 <Mail size={48} className="text-black" />
                 <div className="ornament-glow absolute inset-0 bg-gh-gold blur-2xl opacity-40 -z-10 rounded-full"></div>
              </div>

              {/* Orbiting particles */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`absolute w-3 h-3 bg-gh-gold rounded-full opacity-60 shadow-[0_0_15px_rgba(212,175,55,0.8)] orbit-particle-${i}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gh-gold/10 flex items-center justify-center text-gh-gold mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-heading">Our Location</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  123 Golden Hour Way<br />
                  Sunset District, CA 94122
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gh-gold/10 flex items-center justify-center text-gh-gold mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-heading">Phone & Email</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  +1 (555) 123-4567<br />
                  hello@goldenhourbistro.com
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gh-gold/10 flex items-center justify-center text-gh-gold mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-heading">Bistro Hours</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mon - Fri: 7am - 10pm<br />
                  Sat - Sun: 8am - 11pm
                </p>
              </div>
            </div>

            {/* NEW GSAP "GOLDEN FLOW" VISUALIZATION (REPLACES GALLERY) */}
            <div className="relative w-full h-[450px] md:h-[550px] bg-white/5 rounded-[50px] border border-gh-gold/20 overflow-hidden backdrop-blur-3xl group">
              {/* Particle Container */}
              <div className="absolute inset-0 z-0 opacity-40">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={i} 
                    className="golden-particle absolute w-1 h-1 bg-gh-gold rounded-full blur-[1px]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Dynamic SVG Wave Line (GSAP Animated) */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <path 
                  id="flow-wave"
                  d="M0 250 Q 250 150 500 250 T 1000 250" 
                  fill="none" 
                  stroke="#D4AF37" 
                  strokeWidth="2"
                />
              </svg>

              {/* Glassmorphic Content Overlay */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-8 relative icon-container">
                   <div className="w-24 h-24 rounded-full border border-gh-gold/30 flex items-center justify-center relative overflow-hidden group-hover:border-gh-gold transition-colors duration-700">
                      <div className="absolute inset-0 bg-gh-gold/10 animate-pulse"></div>
                      <Clock size={32} className="text-gh-gold" />
                   </div>
                   {/* GSAP Pulse Indicator */}
                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-black animate-ping"></div>
                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-black"></div>
                </div>

                <div className="overflow-hidden mb-4">
                  <h3 className="text-3xl md:text-4xl font-heading text-white tracking-tight reveal-text">
                    Always Online for You
                  </h3>
                </div>
                
                <p className="text-gray-400 text-sm uppercase tracking-[0.3em] font-black leading-relaxed max-w-xs reveal-subtext">
                  Our specialized concierge team is ready to assist you during bistro hours.
                </p>

                <div className="mt-12 flex gap-4">
                   <div className="w-12 h-1 bg-gh-gold/20 rounded-full deco-bar"></div>
                   <div className="w-12 h-1 bg-gh-gold rounded-full deco-bar"></div>
                   <div className="w-12 h-1 bg-gh-gold/20 rounded-full deco-bar"></div>
                </div>
              </div>

              {/* Interactive Hover Glow */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-gh-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </div>
          </div>

          {/* Contact Form - Restricted to Registered Users */}
          <div className="bg-white/5 border border-gh-gold/30 p-12 rounded-[50px] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gh-gold/5 blur-[100px] -z-10"></div>
            
            {isAuthenticated ? (
              <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-700">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-white/20 py-4 focus:border-gh-gold outline-none transition-colors text-white placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-b border-white/20 py-4 focus:border-gh-gold outline-none transition-colors text-white placeholder:text-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="How can we help?"
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-gh-gold outline-none transition-colors text-white placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Message</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us more..."
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-gh-gold outline-none transition-colors text-white placeholder:text-white/10 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-6 bg-gh-gold text-black font-black text-[10px] uppercase tracking-[0.5em] rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                >
                  {sent ? "Message Sent Successfully" : "Send Inquiry"}
                  <Send size={16} className={`transition-transform duration-500 ${sent ? 'translate-x-2 -translate-y-2' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                </button>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10">
                <div className="w-20 h-20 rounded-full bg-gh-gold/10 flex items-center justify-center text-gh-gold animate-pulse">
                  <Lock size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-heading text-white mb-2">Exclusive Inquiry Access</h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto uppercase tracking-widest font-black leading-relaxed">
                    Please sign in to send a direct message to our specialized bistro team.
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/auth')}
                  className="px-10 py-4 bg-gh-gold text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all"
                >
                  Sign In Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
