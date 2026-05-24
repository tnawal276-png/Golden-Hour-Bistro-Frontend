import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { menuData } from '../../data/menuData';
import { useCart } from '../../context/CartContext';

const MenuItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const item = menuData.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="item-not-found container text-center">
        <h2>Item not found</h2>
        <Link to="/menu" className="btn-return">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="item-detail-page py-24">
      <div className="container item-detail-grid grid md:grid-cols-2 gap-16 items-start">
        <div className="item-detail-media relative rounded-[4rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] border border-white/5 group">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full aspect-square object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
          />
          {/* Wishlist Icon */}
          <button className="absolute top-10 right-10 w-16 h-16 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white text-2xl hover:bg-white hover:text-red-500 transition-all duration-500">
            ❤
          </button>
        </div>

        <div className="item-detail-content space-y-10 pt-10">
          <div className="breadcrumb flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
            <Link to="/menu" className="hover:text-gh-gold transition-colors">Menu</Link>
            <span className="text-gh-gold/30">✧</span>
            <Link to={`/menu/${item.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gh-gold transition-colors">{item.category}</Link>
          </div>

          <div className="space-y-4">
            <span className="badge-minimal !text-gh-gold/80 !border-gh-gold/20">{item.vibe}</span>
            <h2 className="text-6xl font-heading text-white">{item.name}</h2>
            <p className="text-gray-400 text-xl font-light leading-relaxed">{item.description}</p>
            <div className="text-4xl font-heading text-gh-gold pt-4">${item.price.toFixed(2)}</div>
          </div>
          
          <div className="flex flex-col gap-12 pt-6">
            {/* Quantity Controls - Pure minimalist, Gold icons */}
            <div className="flex items-center gap-12">
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/80">Quantity</span>
              <div className="flex items-center gap-10">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="text-gh-gold text-4xl font-light hover:scale-125 transition-all duration-300 p-4 bg-transparent border-none outline-none"
                >
                  −
                </button>
                <span className="text-3xl font-heading text-white min-w-[1.2em] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="text-gh-gold text-4xl font-light hover:scale-125 transition-all duration-300 p-4 bg-transparent border-none outline-none"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Primary Add to Cart */}
              <button 
                className="group animate-shake-hover relative flex-1 h-20 rounded-2xl bg-gh-gold text-black text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_-10px_rgba(212,175,55,0.3)]"
                onClick={() => {
                  for(let i=0; i<quantity; i++) {
                    addToCart(item);
                  }
                }}
              >
                <span className="relative z-10">Add to Cart</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1200ms] skew-x-[-30deg]"></div>
              </button>
              
              {/* Continue Browsing - Identical to Add to Cart */}
              <button 
                className="group relative flex-1 h-20 rounded-2xl bg-gh-gold text-black text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_-10px_rgba(212,175,55,0.3)]"
                onClick={() => navigate(-1)}
              >
                <span className="relative z-10">Continue Browsing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1200ms] skew-x-[-30deg]"></div>
              </button>
            </div>
          </div>

          <div className="detail-info-box p-10 rounded-[3rem] bg-gh-gold/5 border border-gh-gold/10 space-y-4">
            <h4 className="text-gh-gold text-[10px] font-black uppercase tracking-[0.5em]">The Story Behind the Dish</h4>
            <p className="text-gray-400 font-light leading-relaxed italic">"{item.details}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
