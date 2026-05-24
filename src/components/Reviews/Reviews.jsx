import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const staticReviews = [
  {
    id: 1,
    name: 'Eleanor Vance',
    role: 'Food Critic',
    text: 'The Sunrise Signature toast is an absolute revelation. Golden Hour Bistro has mastered the art of balancing ambiance with unforgettable flavors.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'James Harrison',
    role: 'Local Artisan',
    text: 'There is no better place in the city to watch the sunset. Their handcrafted lattes and the dark, luxurious interior make it my daily escape.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Regular Guest',
    text: 'I booked a table for my anniversary and the experience was flawless. The Evening Indulgence burger is a must-try. 10/10 service.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  }
];

const Reviews = () => {
  const { user } = useAuth();
  const [liveReviews, setLiveReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/reviews');
        const data = await res.json();
        setLiveReviews(data);
      } catch (err) {
        console.warn('Live reviews not available.');
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
          rating: newReview.rating,
          comment: newReview.comment
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const allReviews = [...staticReviews, ...liveReviews.map(r => ({
    id: r._id,
    name: r.username,
    role: 'Guest',
    text: r.comment,
    rating: r.rating,
    image: `https://ui-avatars.com/api/?name=${r.username}&background=d4af37&color=000`
  }))];

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gh-gold uppercase tracking-[0.2em] text-xs font-bold">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-2 mb-4">What Our Guests Say</h2>
          <div className="w-16 h-1 bg-gh-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {allReviews.map((review, index) => (
            <div 
              key={review.id} 
              className="glass p-8 rounded-2xl border border-white/5 hover:border-gh-gold/30 transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="flex text-gh-gold mb-4 gap-1">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-gray-300 mb-8 italic leading-relaxed group-hover:text-white transition-colors duration-300">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div>
                  <h4 className="text-white font-semibold font-heading">{review.name}</h4>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Review Submission Form */}
        {user && (
          <div className="max-w-2xl mx-auto glass p-12 rounded-[3rem] border border-white/10">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-2">
                   <h3 className="text-2xl font-heading text-white">Share Your Ritual</h3>
                   <p className="text-gray-500 text-sm">How was your Golden Hour experience?</p>
                </div>
                <div className="flex justify-center gap-4 py-4">
                   {[1,2,3,4,5].map(star => (
                     <button 
                       key={star}
                       type="button"
                       onClick={() => setNewReview({...newReview, rating: star})}
                       className={`text-2xl transition-all bg-transparent border-none outline-none p-0 shadow-none ${newReview.rating >= star ? 'text-gh-gold scale-125' : 'text-white/20 hover:text-gh-gold/50'}`}
                     >
                       ★
                     </button>
                   ))}
                </div>
                <textarea 
                  required
                  placeholder="Tell us about your coffee, the vibe, or the service..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:border-gh-gold focus:outline-none min-h-[120px]"
                />
                <button type="submit" className="w-full py-5 rounded-full bg-gh-gold text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                   Post My Review
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-700">
                 <div className="w-16 h-16 bg-gh-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gh-gold text-2xl">✓</span>
                 </div>
                 <h3 className="text-2xl font-heading text-white">Ritual Recorded</h3>
                 <p className="text-gray-500 italic">"Your review is awaiting a touch of gold from our moderation team."</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
