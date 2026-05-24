import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaTrash, FaShoppingBag, FaMinus, FaPlus } from 'react-icons/fa';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartTotal, cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const handleCheckout = () => {
    if (!user) {
      showToast("Please Sign In to checkout!", "error");
      setTimeout(() => {
        setIsCartOpen(false);
        navigate('/auth');
      }, 1500);
      return;
    }

    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Modern Toaster */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, background: toast.type === 'error' ? '#ff4b2b' : '#d4af37',
          color: toast.type === 'error' ? '#fff' : '#000',
          padding: '12px 24px', borderRadius: '50px', fontWeight: 700,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          animation: 'toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
          display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'
        }}>
          <span>{toast.type === 'error' ? '✕' : '✓'}</span>
          {toast.message}
          <style>{`
            @keyframes toastIn {
              from { opacity: 0; transform: translate(-50%, -20px) scale(0.8); }
              to { opacity: 1; transform: translate(-50%, 0) scale(1); }
            }
          `}</style>
        </div>
      )}

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity" onClick={() => setIsCartOpen(false)}></div>
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-gh-dark border-l border-white/10 z-[110] shadow-2xl flex flex-col transform transition-transform duration-500 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaShoppingBag className="text-gh-gold text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gh-gold text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-gh-dark">
                  {cartCount}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-heading text-white tracking-wide">Your Selection</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-white transition-all hover:rotate-90 duration-300">
            <FaTimes size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center mb-6">
                <FaShoppingBag className="text-4xl" />
              </div>
              <p className="text-lg font-heading text-white mb-2">Cart is empty</p>
              <p className="text-xs uppercase tracking-widest text-gray-400">Discover our menu</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex gap-4 group">
                <div className="w-24 h-24 bg-gh-card rounded-xl overflow-hidden shrink-0 border border-white/5 group-hover:border-gh-gold/30 transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1 flex flex-col py-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium text-sm leading-tight line-clamp-2 pr-4">{item.name}</h4>
                    <button 
                      onClick={() => removeFromCart(item.productId)} 
                      className="text-gh-gold hover:text-red-500 transition-colors bg-transparent border-none outline-none shadow-none p-0"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="text-gh-gold hover:text-white transition-colors bg-transparent p-0 border-none outline-none"
                      >
                        <FaMinus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm text-white font-black">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="text-gh-gold hover:text-white transition-colors bg-transparent p-0 border-none outline-none"
                      >
                        <FaPlus size={14} />
                      </button>
                    </div>
                    <span className="text-white font-bold text-base tracking-tight">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-gh-card/50 backdrop-blur-md">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Service Fee</span>
                <span className="text-green-500/80">Complementary</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-white font-heading text-xl">Total</span>
                <span className="text-gh-gold font-bold text-3xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleCheckout} 
                disabled={isCheckingOut}
                className="w-full py-5 bg-gh-gold text-black hover:bg-gh-gold-hover transition-all font-black text-[11px] tracking-[0.3em] uppercase rounded-sm relative overflow-hidden group"
              >
                <span className={isCheckingOut ? 'opacity-0' : 'opacity-100 transition-opacity'}>Checkout Experience</span>
                {isCheckingOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
              <button onClick={clearCart} className="w-full py-4 bg-transparent text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">
                Empty Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

