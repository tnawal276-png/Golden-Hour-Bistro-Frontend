import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gh-dark py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-heading text-gh-gold mb-2">My Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user.username}!</p>
          </div>
        </div>

        <div className="bg-gh-card rounded-2xl p-8 shadow-xl border border-gray-800">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading text-white">Your Orders</h2>
            {orders.length > 0 && (
              <span className="text-sm text-gh-gold bg-gh-gold/10 px-4 py-1 rounded-full border border-gh-gold/20">
                {orders.length} total orders
              </span>
            )}
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-gh-gold mb-4"></span>
              <p className="text-gray-500 animate-pulse">Syncing with kitchen...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-white font-medium mb-1">Unable to load orders</p>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-sm btn-ghost text-gh-gold border border-gh-gold/30">Try Again</button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl text-white font-medium mb-2">No orders right now</h3>
              <p className="text-gray-500 mb-8 max-w-sm">When you place your first order from our menu, your details and tracking will appear right here.</p>
              <button 
                onClick={() => navigate('/menu')} 
                className="btn bg-gh-gold text-black hover:bg-gh-gold-hover border-none px-8 py-3 rounded-md font-bold tracking-widest text-xs uppercase"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="font-medium pb-4 uppercase text-xs tracking-wider">Order Details</th>
                    <th className="font-medium pb-4 uppercase text-xs tracking-wider">Date</th>
                    <th className="font-medium pb-4 uppercase text-xs tracking-wider">Status</th>
                    <th className="font-medium pb-4 uppercase text-xs tracking-wider text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-800 hover:bg-white/5 transition-all group">
                      <td className="py-6">
                        <div className="font-semibold text-gh-gold group-hover:text-white transition-colors">{order.orderName}</div>
                        <div className="text-xs text-gray-500 mt-1 uppercase tracking-tighter">
                          Order ID: {order._id.substring(0, 8)} • {order.items.length} item(s)
                        </div>
                      </td>
                      <td className="py-6 text-gray-300 text-sm">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-6 text-right font-bold text-white">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
