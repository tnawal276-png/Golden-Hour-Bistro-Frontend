import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ChevronRight, MapPin, Phone, User, Mail } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    fullName: user?.username || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          items: cart, 
          totalPrice: cartTotal,
          shippingDetails: formData,
          paymentMethod
        })
      });

      if (response.ok) {
        const orderData = await response.json();
        // Generate a random order number for the UI GHB-XXXXXX
        const orderNum = `GHB-${Math.floor(100000 + Math.random() * 900000)}`;
        
        // Navigate to success page with details
        navigate('/order-success', { 
          state: { 
            orderId: orderData._id,
            orderNumber: orderNum,
            details: formData,
            items: cart,
            total: cartTotal,
            paymentMethod
          } 
        });
        clearCart();
      }
    } catch (error) {
      console.error("Order failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-24">
        <h2 className="text-4xl font-heading text-white mb-6">Your cart is empty</h2>
        <button onClick={() => navigate('/menu')} className="text-gh-gold uppercase tracking-[0.3em] text-xs font-bold hover:underline">Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Side: Forms */}
          <div className="lg:w-2/3 space-y-12">
            <div>
              <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block mb-4">Secure Checkout</span>
              <h1 className="text-5xl font-heading mb-4">Finalize Your <span className="text-gh-gold italic">Order</span></h1>
              <p className="text-gray-500 text-sm">Please provide your delivery details below to complete the experience.</p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-12">
              {/* Delivery Details */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <MapPin className="text-gh-gold" size={20} />
                  <h3 className="text-xl font-heading">Delivery Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <input 
                      type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-gh-gold outline-none transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Mail size={12} /> Email
                    </label>
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-gh-gold outline-none transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Phone size={12} /> Phone Number
                    </label>
                    <input 
                      type="tel" name="phone" required placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-gh-gold outline-none transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Address</label>
                    <input 
                      type="text" name="address" required placeholder="Street Address" value={formData.address} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-gh-gold outline-none transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">City</label>
                    <input 
                      type="text" name="city" required placeholder="City" value={formData.city} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-gh-gold outline-none transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Postal Code</label>
                    <input 
                      type="text" name="zip" required placeholder="Postal Code" value={formData.zip} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-gh-gold outline-none transition-all text-white placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <CreditCard className="text-gh-gold" size={20} />
                  <h3 className="text-xl font-heading">Payment Method</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center gap-6 ${paymentMethod === 'cod' ? 'bg-gh-gold/10 border-gh-gold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-gh-gold' : 'border-gray-600'}`}>
                      {paymentMethod === 'cod' && <div className="w-3 h-3 bg-gh-gold rounded-full"></div>}
                    </div>
                    <div>
                      <h4 className="font-heading text-lg">Cash on Delivery</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pay when you receive</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center gap-6 ${paymentMethod === 'card' ? 'bg-gh-gold/10 border-gh-gold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-gh-gold' : 'border-gray-600'}`}>
                      {paymentMethod === 'card' && <div className="w-3 h-3 bg-gh-gold rounded-full"></div>}
                    </div>
                    <div>
                      <h4 className="font-heading text-lg">Credit / Debit Card</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Secure Online Payment</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full py-6 bg-gh-gold text-black font-black text-[11px] uppercase tracking-[0.6em] rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {isProcessing ? "Processing Luxury Order..." : "Complete Order Experience"}
                <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] sticky top-32">
              <h3 className="text-2xl font-heading mb-8">Order <span className="text-gh-gold">Summary</span></h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 mb-8 scrollbar-hide">
                {cart.map(item => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/5 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white line-clamp-1 uppercase tracking-wider">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase mt-1">{item.quantity} x ${item.price.toFixed(2)}</p>
                    </div>
                    <span className="text-sm font-bold text-white">${(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between text-sm text-gray-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 uppercase tracking-widest">
                  <span>Delivery</span>
                  <span className="text-gh-gold">Free</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xl font-heading">Total</span>
                  <span className="text-3xl font-heading text-gh-gold">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-4">
                <ShieldCheck className="text-gh-gold shrink-0" size={20} />
                <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest">
                  Your transaction is protected with military-grade encryption.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
