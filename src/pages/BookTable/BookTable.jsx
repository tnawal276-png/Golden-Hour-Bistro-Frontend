import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookTable = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user ? user.username : '',
    email: user ? user.email : '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user ? user.id : null })
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Error booking table:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gh-dark flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gh-gold/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gh-gold/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 glass rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10">
        
        {/* Left Side: Image / Vibe */}
        <div className="hidden md:block relative bg-black">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop" 
            alt="Romantic Dinner Table" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
            <h3 className="text-3xl font-heading text-gh-gold mb-2">An Evening to Remember</h3>
            <p className="text-gray-300">Reserve your spot at Golden Hour Bistro and let us treat you to an unforgettable culinary experience.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-4xl font-heading text-gh-gold mb-2">Book a Table</h2>
          <p className="text-gray-400 mb-8 uppercase tracking-widest text-sm">Secure your golden hour.</p>

          {success ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🥂</div>
              <h3 className="text-2xl text-white font-heading mb-2">Reservation Confirmed!</h3>
              <p className="text-gray-400">We look forward to hosting you, {formData.name}.</p>
              <p className="text-sm text-gh-gold mt-4">Redirecting to home...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-gray-300">Name</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input bg-transparent border-b border-gray-600 focus:border-gh-gold text-white rounded-none px-0 focus:outline-none" />
                </div>
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-gray-300">Email</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input bg-transparent border-b border-gray-600 focus:border-gh-gold text-white rounded-none px-0 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-gray-300">Date</span></label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required className="input bg-transparent border-b border-gray-600 focus:border-gh-gold text-white rounded-none px-0 focus:outline-none" />
                </div>
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-gray-300">Time</span></label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} required className="input bg-transparent border-b border-gray-600 focus:border-gh-gold text-white rounded-none px-0 focus:outline-none" />
                </div>
                <div className="form-control w-full">
                  <label className="label"><span className="label-text text-gray-300">Guests</span></label>
                  <select name="guests" value={formData.guests} onChange={handleChange} className="select bg-transparent border-b border-gray-600 focus:border-gh-gold text-white rounded-none px-0 focus:outline-none">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-gh-dark">{n} Person{n>1?'s':''}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-control w-full pt-2">
                <label className="label"><span className="label-text text-gray-300">Special Requests</span></label>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} className="textarea bg-transparent border-b border-gray-600 focus:border-gh-gold text-white rounded-none px-0 focus:outline-none resize-none h-20" placeholder="Anniversary, dietary restrictions, etc."></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full mt-8 py-4 bg-gh-gold text-black hover:bg-gh-gold-hover transition-all duration-300 font-bold text-sm tracking-widest uppercase rounded-sm hover:-translate-y-1">
                {loading ? <span className="loading loading-spinner"></span> : 'Confirm Reservation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTable;
