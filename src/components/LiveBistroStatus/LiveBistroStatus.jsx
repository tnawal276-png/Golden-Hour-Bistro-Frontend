import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import './LiveBistroStatus.css';

const LiveBistroStatus = () => {
  const [capacity, setCapacity] = useState(65);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  // Custom Tooltip for premium feel
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#121212] border border-gh-gold/30 p-3 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-300">
          <p className="text-[10px] text-gh-gold font-black uppercase tracking-widest mb-1">{payload[0].payload.hour}</p>
          <p className="text-xl font-heading text-white">{payload[0].value}% <span className="text-[10px] text-gray-500 uppercase">Peak</span></p>
        </div>
      );
    }
    return null;
  };

  // Mock live fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCapacity(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.min(Math.max(prev + change, 40), 95);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getServiceTime = (cap) => {
    if (cap > 85) return "25 - 35 mins";
    if (cap > 60) return "15 - 20 mins";
    return "5 - 10 mins";
  };

  const busyData = [
    { hour: '8am', val: 30 },
    { hour: '10am', val: 85 },
    { hour: '12pm', val: 95 },
    { hour: '2pm', val: 60 },
    { hour: '4pm', val: 45 },
    { hour: '6pm', val: 80 },
    { hour: '8pm', val: 90 },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Live Gauge */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gh-gold/20 blur-[100px] rounded-full group-hover:bg-gh-gold/30 transition-all duration-1000"></div>
              
              <div className="relative z-10 w-80 h-80 glass rounded-full border border-white/10 flex flex-col items-center justify-center p-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="160" cy="160" r="140" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    stroke="#d4af37"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={880}
                    strokeDashoffset={880 - (880 * capacity) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-[2000ms] ease-out"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.5))' }}
                  />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-gh-gold text-[10px] font-black tracking-[0.4em] uppercase">Live Status</span>
                  </div>
                  <span className="text-7xl font-heading text-white">{capacity}%</span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Bistro Pulse</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Insight */}
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block">Efficiency</span>
              <h2 className="text-5xl font-heading text-white leading-tight">Live <span className="text-gh-gold italic">Metrics</span></h2>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                   <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Atmosphere</span>
                   <p className="text-white text-xl font-heading">{capacity > 80 ? 'Vibrant' : 'Relaxed'}</p>
                </div>
                <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                <div className="space-y-1">
                   <span className="text-gh-gold text-[9px] font-black uppercase tracking-widest">Est. Order Time</span>
                   <p className="text-white text-xl font-heading">{getServiceTime(capacity)}</p>
                </div>
              </div>
            </div>

            {/* Professional Recharts Bar Chart */}
            <div className="glass p-10 rounded-[3rem] border border-white/10 relative overflow-visible">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-white text-xs font-heading opacity-70 tracking-widest uppercase">Busy Hour Trends</h4>
              </div>
              
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={busyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity={1} />
                        <stop offset="100%" stopColor="#d4af37" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="hour" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#4b5563', fontSize: 9, fontWeight: 900 }} 
                      dy={10}
                    />
                    <Tooltip 
                      content={<CustomTooltip />} 
                      cursor={{ fill: 'rgba(212, 175, 55, 0.05)', radius: 10 }} 
                    />
                    <Bar 
                      dataKey="val" 
                      radius={[10, 10, 0, 0]}
                      onMouseEnter={(data, index) => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {busyData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === hoveredIndex ? '#d4af37' : 'url(#barGradient)'}
                          className="transition-all duration-500"
                          style={{ filter: index === hoveredIndex ? 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' : 'none' }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/book')}
              className="px-16 py-6 rounded-full bg-gh-gold text-black font-black text-[10px] uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.3)] border-none"
            >
               Book Your Spot
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiveBistroStatus;
