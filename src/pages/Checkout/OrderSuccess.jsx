import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Package, MapPin, CreditCard, ChevronRight, Home, Truck } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state || {};

  // Live Timer: Starting from 30 minutes (1800 seconds)
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!location.state) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-24 text-white">
        <h2 className="text-4xl font-heading mb-6">Access Denied</h2>
        <button onClick={() => navigate('/')} className="bg-gh-gold text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Success Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-500 mb-4">
            <CheckCircle size={48} />
          </div>
          <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block">Order Confirmed</span>
          <h1 className="text-5xl md:text-6xl font-heading">Thank You, <span className="text-gh-gold italic">{(orderData.details?.fullName || 'Valued Guest').split(' ')[0]}!</span></h1>
          <p className="text-gray-400 uppercase text-[10px] tracking-[0.3em] font-black">Your GHB Experience has officially begun.</p>
        </div>

        {/* Live Tracking Card */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gh-gold/10 blur-[100px] -z-10"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left space-y-4">
              <h3 className="text-2xl font-heading flex items-center justify-center md:justify-start gap-3">
                <Clock className="text-gh-gold" /> Estimated Delivery
              </h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-black">Your Artisanal Roast is in preparation</p>
              <div className="text-7xl md:text-8xl font-heading text-white tracking-tighter tabular-nums">
                {formatTime(timeLeft)}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 text-[10px] font-black uppercase tracking-widest">Live Tracking Active</span>
              </div>
            </div>

            <div className="flex-1 max-w-xs space-y-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10"></div>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 relative">
                    <div className="w-8 h-8 rounded-full bg-gh-gold text-black flex items-center justify-center relative z-10">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider">Order Received</h4>
                      <p className="text-[10px] text-gray-500">GHB Central Processing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 relative">
                    <div className="w-8 h-8 rounded-full bg-gh-gold text-black flex items-center justify-center relative z-10 animate-pulse">
                      <Package size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider">Crafting Menu</h4>
                      <p className="text-[10px] text-gh-gold">Chef is preparing your delights</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 relative opacity-30">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center relative z-10">
                      <Truck size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider">Out for Delivery</h4>
                      <p className="text-[10px] text-gray-500">Bistro Courier En-route</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-6">
            <h3 className="text-xl font-heading border-b border-white/5 pb-4">Order Summary</h3>
            <div className="space-y-4 max-h-[200px] overflow-y-auto scrollbar-hide">
              {orderData.items?.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{item.quantity} x {item.name}</span>
                  <span className="text-white font-bold">${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-end">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Paid via {orderData.paymentMethod?.toUpperCase()}</span>
              <span className="text-2xl font-heading text-gh-gold">${orderData.total?.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-6">
            <h3 className="text-xl font-heading border-b border-white/5 pb-4">Delivery To</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-gh-gold shrink-0" size={20} />
                <div>
                  <p className="text-sm font-bold text-white">{orderData.details?.fullName}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">{orderData.details?.address}, {orderData.details?.city}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CreditCard className="text-gh-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Transaction Reference</p>
                  <p className="text-sm font-bold text-white mt-1">{orderData.orderNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full transition-all flex items-center gap-4"
          >
            <Home size={16} /> Return Home
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-5 bg-gh-gold text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all flex items-center gap-4"
          >
            View My Orders <ChevronRight size={16} />
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-black">
            An automated receipt has been dispatched to {orderData.details?.email}
          </p>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
