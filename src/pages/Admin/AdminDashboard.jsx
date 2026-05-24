import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Bell, Search, ChevronDown, User as UserIcon, CreditCard, MoreVertical, HelpCircle, Settings } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New States for interactivity
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New reservation from John Doe", time: "5m ago", unread: true },
    { id: 2, text: "Stock alert: Artisanal Coffee Beans low", time: "2h ago", unread: true },
    { id: 3, text: "New 5-star review published", time: "1d ago", unread: false }
  ]);

  // Realistic data based on the golden hour theme
  const revenueData = [
    { name: '01', current: 4000, last: 2400 },
    { name: '02', current: 3000, last: 1398 },
    { name: '03', current: 5000, last: 9800 },
    { name: '04', current: 2780, last: 3908 },
    { name: '05', current: 1890, last: 4800 },
    { name: '06', current: 2390, last: 3800 },
    { name: '07', current: 3490, last: 4300 },
    { name: '08', current: 4000, last: 2400 },
    { name: '09', current: 3000, last: 1398 },
    { name: '10', current: 2000, last: 9800 },
    { name: '11', current: 2780, last: 3908 },
    { name: '12', current: 3890, last: 4800 },
  ];

  const orderTimeData = [
    { name: 'Morning', value: 400 },
    { name: 'Afternoon', value: 1112 },
    { name: 'Evening', value: 300 },
  ];
  const COLORS = ['#f1d592', '#d4af37', '#b8860b'];

  const orderLineData = [
    { name: '1', current: 400, last: 600 },
    { name: '2', current: 1000, last: 800 },
    { name: '3', current: 700, last: 1200 },
    { name: '4', current: 2000, last: 1500 },
    { name: '5', current: 1500, last: 1000 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes, resRes, menuRes, reviewsRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/stats'),
          fetch('http://localhost:5000/api/admin/orders'),
          fetch('http://localhost:5000/api/admin/reservations'),
          fetch('http://localhost:5000/api/menu'),
          fetch('http://localhost:5000/api/reviews/admin')
        ]);

        setStats(await statsRes.json());
        setOrders(await ordersRes.json());
        setReservations(await resRes.json());
        const menuData = await menuRes.json();
        setMenuItems(menuData);
        setReviews(await reviewsRes.json());
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // CSV Export Function
  const exportReport = () => {
    const headers = ['Order ID', 'Date', 'Price', 'Status'];
    const csvRows = [headers.join(',')];
    
    orders.forEach(order => {
      const row = [
        order._id,
        new Date(order.date).toLocaleDateString(),
        order.totalPrice,
        order.status || 'Paid'
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `GoldenHour_Report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'All Day Breakfast', image: '' });

  const addMenuItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newItem,
          price: parseFloat(newItem.price),
          vibe: 'Chef\'s Special',
          details: 'Newly added from Admin Command Center.'
        })
      });
      const data = await res.json();
      setMenuItems([...menuItems, data]);
      setNewItem({ name: '', price: '', category: 'All Day Breakfast', image: '' });
      alert('Dish Pushed to Live Menu Successfully!');
    } catch (err) {
      console.error('Error adding menu item:', err);
    }
  };

  const removeMenuItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/menu/${id}`, { method: 'DELETE' });
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error removing menu item:', err);
    }
  };

  const approveReview = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/reviews/approve/${id}`, { method: 'PUT' });
      setReviews(reviews.map(r => r._id === id ? { ...r, isApproved: true } : r));
    } catch (err) {
      console.error('Error approving review:', err);
    }
  };

  const handleSupportTicket = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: user?.email,
          adminName: user?.username,
          timestamp: Date.now()
        })
      });
      setTicketSent(true);
    } catch (err) {
      console.error('Error sending support ticket:', err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gh-gold"></div>
    </div>
  );

  return (
    <div className="admin-dashboard-container font-sans" onClick={() => { setShowDropdown(false); setShowNotifications(false); }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="admin-main-content">
        <header className="admin-header">
          <div className="flex items-center gap-4">
             <h1 className="text-white text-2xl font-bold tracking-tight">
               {activeTab === 'stats' ? 'Dashboard' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}
             </h1>
          </div>
          
          <div className="header-actions">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gh-gold transition-colors" size={16} />
              <input type="text" placeholder="Search orders, menu..." className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-gh-gold transition-all w-64" />
            </div>
            
            <div className="relative">
              <div 
                className="notification-bell" 
                onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setShowDropdown(false); }}
              >
                <Bell size={18} />
                {notifications.some(n => n.unread) && <div className="notification-dot"></div>}
              </div>
              
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-[1000] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" onClick={e => e.stopPropagation()}>
                  <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h5 className="text-white font-bold text-sm">Notifications</h5>
                    <button className="text-[10px] text-gh-gold hover:underline uppercase font-bold bg-transparent border-none cursor-pointer" onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))}>Mark all read</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${n.unread ? 'bg-gh-gold/5' : ''}`}>
                        <p className="text-xs text-white mb-1">{n.text}</p>
                        <span className="text-[9px] text-gray-500 uppercase font-bold">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div 
                className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); setShowNotifications(false); }}
              >
                <div className="w-10 h-10 rounded-full bg-gh-gold flex items-center justify-center text-black font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-white leading-none">{user?.username || 'Admin'}</p>
                  <span className="text-[10px] text-gh-gold font-bold uppercase tracking-widest">Golden Hour Bistro</span>
                </div>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-4 w-56 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-[1000] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" onClick={e => e.stopPropagation()}>
                   <div className="p-4 border-b border-white/10">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user?.email || 'admin@goldenhour.com'}</p>
                   </div>
                   <div className="p-2">
                      <button className="w-full text-left p-3 text-xs text-gray-300 hover:bg-white/5 rounded-xl transition-all flex items-center gap-3 bg-transparent border-none cursor-pointer">
                         <UserIcon size={14} /> Profile Settings
                      </button>
                      <button onClick={handleLogout} className="w-full text-left p-3 text-xs text-red-400 hover:bg-red-400/10 rounded-xl transition-all flex items-center gap-3 font-bold bg-transparent border-none cursor-pointer">
                         Sign Out
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {activeTab === 'stats' && stats && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="stats-grid">
              <div className="admin-card">
                <div className="card-header">
                  <div className="card-title-group">
                    <h4>Revenue</h4>
                    <h2>${stats.revenue.toLocaleString()}</h2>
                    <span className="text-[11px] text-green-400 font-bold">↑ 2.14% vs last week</span>
                  </div>
                  <button onClick={exportReport} className="view-report-btn">View Report</button>
                </div>
                <div className="mt-2 mb-4">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Sales from {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - {new Date(Date.now() + 604800000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <Bar dataKey="current" fill="#d4af37" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="last" fill="rgba(212, 175, 55, 0.1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="admin-card">
                <div className="card-header">
                  <div className="card-title-group">
                    <h4>Order Time</h4>
                    <p className="text-[10px] text-gray-500">From 12-18 Dec, 2021</p>
                  </div>
                  <button className="view-report-btn">View Report</button>
                </div>
                <div className="chart-container relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderTimeData}
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {orderTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-white">1112</span>
                    <span className="text-[9px] text-gh-gold uppercase font-bold tracking-widest">Orders</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-layout-grid">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="admin-card">
                    <h4>Your Rating</h4>
                    <p className="text-[11px] text-gray-500 mb-6">What people feel and comment</p>
                    <div className="rating-bubbles">
                      <div className="bubble bubble-medium"><span>92%</span><span>Packaging</span></div>
                      <div className="bubble bubble-large"><span>85%</span><span>Hygiene</span></div>
                      <div className="bubble bubble-small"><span>85%</span><span>Food Taste</span></div>
                    </div>
                  </div>

                  <div className="admin-card">
                    <div className="card-header">
                      <div className="card-title-group">
                        <h4>Order</h4>
                        <h2>{stats.totalOrders}</h2>
                        <span className="text-[11px] text-red-400 font-bold">↓ 2.14% vs last week</span>
                      </div>
                      <button className="view-report-btn">View Report</button>
                    </div>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={orderLineData}>
                          <Line type="monotone" dataKey="current" stroke="#d4af37" strokeWidth={3} dot={false} />
                          <Line type="monotone" dataKey="last" stroke="rgba(255,255,255,0.05)" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-card">
                <div className="mb-6">
                   <h4 className="mb-1">Food with the most requests</h4>
                   <p className="text-[10px] text-gray-500">Real-time trending signature dishes</p>
                </div>
                <div className="top-products-list">
                  {(menuItems.length > 0 ? menuItems.slice(0, 4) : [
                    { name: 'Maple French Toast', price: 12, image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { name: 'Artisanal Latte', price: 6, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { name: 'Avocado Tartine', price: 14, image: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { name: 'Sunset Omelette', price: 11, image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=400' }
                  ]).map((item, i) => (
                    <div key={i} className="product-item">
                      <img src={item.image} alt={item.name} className="product-img object-cover" />
                      <div className="product-info">
                        <h5 className="text-white font-bold">{item.name}</h5>
                        <span className="text-[10px] text-gray-500">Popularity: High</span>
                      </div>
                      <span className="product-price text-gh-gold font-bold">${typeof item.price === 'number' ? item.price.toFixed(0) : item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
           <div className="dashboard-layout-grid animate-in fade-in duration-500">
              <div className="admin-card h-fit">
                 <h3 className="text-xl font-bold mb-6 text-white">Add New <span className="text-gh-gold">Dish</span></h3>
                 <form className="space-y-4" onSubmit={addMenuItem}>
                    <div className="space-y-1">
                       <label className="text-[10px] text-gh-gold font-bold uppercase tracking-widest">Dish Name</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Maple French Toast" 
                         required
                         value={newItem.name}
                         onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-gh-gold" 
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] text-gh-gold font-bold uppercase tracking-widest">Price ($)</label>
                       <input 
                         type="number" 
                         placeholder="Price" 
                         required
                         value={newItem.price}
                         onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-gh-gold" 
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] text-gh-gold font-bold uppercase tracking-widest">Image URL</label>
                       <input 
                         type="text" 
                         placeholder="Unsplash URL" 
                         value={newItem.image}
                         onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-gh-gold" 
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] text-gh-gold font-bold uppercase tracking-widest">Category</label>
                       <select 
                         value={newItem.category}
                         onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-gray-400 text-sm focus:outline-none focus:border-gh-gold"
                       >
                          <option>All Day Breakfast</option>
                          <option>Freshly Baked</option>
                          <option>Signature Lunch</option>
                          <option>Artisanal Starters</option>
                          <option>Sunset Refreshers</option>
                          <option>Bistro Brews & Silks</option>
                          <option>Sweet Finales</option>
                       </select>
                    </div>
                    <button type="submit" className="w-full py-4 bg-gh-gold text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all mt-4 border-none">
                       Push to Live Menu
                    </button>
                 </form>
              </div>

              <div className="admin-card">
                 <h3 className="text-xl font-bold mb-6 text-white">Live Registry ({menuItems.length})</h3>
                 <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                   {menuItems.map(item => (
                     <div key={item._id} className="flex justify-between items-center p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all group">
                        <div className="flex items-center gap-4">
                           <img src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} className="w-12 h-12 rounded-lg object-cover border border-gh-gold/20" alt={item.name} />
                           <div>
                              <p className="font-bold text-sm text-white">{item.name}</p>
                              <p className="text-[10px] text-gh-gold uppercase tracking-widest font-bold">{item.category}</p>
                           </div>
                        </div>
                        <button onClick={() => removeMenuItem(item._id)} className="text-red-500/40 group-hover:text-red-500 text-[10px] font-bold uppercase hover:underline transition-colors bg-transparent border-none">Remove</button>
                     </div>
                   ))}
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'orders' && (
           <div className="space-y-4 animate-in fade-in duration-500">
             {orders.length === 0 ? (
               <div className="admin-card text-center py-20">
                 <p className="text-gray-500 italic">No orders received yet.</p>
               </div>
             ) : orders.map(order => (
                <div key={order._id} className="admin-card flex justify-between items-center hover:border-gh-gold/30 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-gh-gold/10 flex items-center justify-center text-gh-gold font-bold">
                        #{order._id.slice(-4).toUpperCase()}
                      </div>
                      <div>
                         <p className="font-bold text-lg text-white">Food Order</p>
                         <p className="text-xs text-gray-500">{new Date(order.date).toLocaleString()} • {order.items?.length || 0} items</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-black text-xl text-gh-gold">${order.totalPrice.toFixed(2)}</p>
                      <span className="text-[10px] font-bold uppercase text-green-400 bg-green-400/10 px-3 py-1 rounded-full">Completed</span>
                   </div>
                </div>
             ))}
           </div>
        )}

        {activeTab === 'reservations' && (
           <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
             {reservations.map(res => (
               <div key={res._id} className="admin-card space-y-4 hover:border-gh-gold/30 transition-all border border-white/5">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="text-xl font-bold text-white">{res.name}</h3>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{res.date} at {res.time}</p>
                   </div>
                   <span className="bg-gh-gold text-black px-4 py-2 rounded-lg font-bold text-xs shadow-lg shadow-gh-gold/10">
                     {res.guests} Guests
                   </span>
                 </div>
               </div>
             ))}
           </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {reviews.map(review => (
              <div key={review._id} className="admin-card flex justify-between items-center group border border-white/5">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gh-gold flex items-center justify-center text-black font-bold">
                      {review.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{review.username}</h4>
                      <div className="text-gh-gold text-xs">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm italic pl-14">"{review.comment}"</p>
                </div>
                <div className="flex items-center gap-4">
                  {!review.isApproved && (
                    <button 
                      onClick={() => approveReview(review._id)}
                      className="px-6 py-2 rounded-xl bg-gh-gold text-black font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="animate-in fade-in duration-500 space-y-8">
              <div className="admin-card">
                 <h3 className="text-xl font-bold text-white mb-6">General <span className="text-gh-gold">Settings</span></h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                          <div>
                             <p className="text-sm font-bold text-white">Accepting Orders</p>
                             <p className="text-[10px] text-gray-500">Toggle online ordering availability</p>
                          </div>
                          <div className="w-12 h-6 bg-gh-gold rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'payment' && (
           <div className="animate-in fade-in duration-500 space-y-8">
              <div className="admin-card">
                 <h3 className="text-xl font-bold text-white mb-6">Payment <span className="text-gh-gold">Gateways</span></h3>
                 <div className="space-y-4">
                    {['Stripe', 'PayPal', 'Manual Bank Transfer'].map(p => (
                       <div key={p} className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/10 group hover:border-gh-gold/30 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gh-gold/10 rounded-xl flex items-center justify-center text-gh-gold"><CreditCard size={24} /></div>
                             <div>
                                <p className="text-lg font-bold text-white">{p}</p>
                                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Active & Verified</p>
                             </div>
                          </div>
                          <button className="text-[10px] font-bold text-gh-gold uppercase hover:underline bg-transparent border-none cursor-pointer">Configure</button>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'accounts' && (
           <div className="animate-in fade-in duration-500 space-y-8">
              <div className="admin-card">
                 <h3 className="text-xl font-bold text-white mb-6">Staff <span className="text-gh-gold">Accounts</span></h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-white/10">
                             <th className="pb-4 text-[10px] text-gh-gold font-bold uppercase tracking-widest">Staff Name</th>
                             <th className="pb-4 text-[10px] text-gh-gold font-bold uppercase tracking-widest">Role</th>
                             <th className="pb-4 text-[10px] text-gh-gold font-bold uppercase tracking-widest text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr className="border-b border-white/5 group hover:bg-white/5 transition-all">
                             <td className="py-4 text-white font-bold">Admin One</td>
                             <td className="py-4 text-gray-400">Super Admin</td>
                             <td className="py-4 text-right text-gray-500 hover:text-white cursor-pointer"><MoreVertical size={14} /></td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'help' && (
           <div className="animate-in fade-in duration-500 grid md:grid-cols-2 gap-8">
              <div className="admin-card space-y-6">
                 <h3 className="text-xl font-bold text-white">System <span className="text-gh-gold">Guide</span></h3>
                 <div className="space-y-4">
                    <details className="group border-b border-white/10 pb-4">
                       <summary className="text-sm font-bold text-white cursor-pointer list-none flex justify-between items-center group-open:text-gh-gold transition-colors">
                          How to add new menu items? <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                       </summary>
                       <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Go to 'Manage Menu', fill the form with dish name, price, and category, then hit 'Push to Live Menu'.</p>
                    </details>
                 </div>
              </div>
              <div className="admin-card flex flex-col items-center justify-center text-center space-y-6">
                 <div className="w-16 h-16 rounded-full bg-gh-gold/10 flex items-center justify-center text-gh-gold"><HelpCircle size={32} /></div>
                 <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-widest">Need Technical Support 24/7</h4>
                    <div className="flex items-center justify-center gap-2 mb-2">
                       <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                       <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Support Online</span>
                    </div>
                    <p className="text-[11px] text-gray-500">Need an urgent fix or custom feature? Reach out to our specialized bistro team.</p>
                 </div>
                 
                 {!ticketSent ? (
                    <button 
                      onClick={handleSupportTicket}
                      className="px-8 py-3 bg-gh-gold text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all border-none cursor-pointer focus:text-black active:text-black"
                    >
                       Contact Developer
                    </button>
                 ) : (
                    <div className="bg-green-400/10 border border-green-400/20 p-3 rounded-xl animate-in zoom-in duration-300">
                       <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Support Ticket Opened!</p>
                       <p className="text-[9px] text-gray-500 mt-1">We will contact you shortly.</p>
                    </div>
                 )}
                 <p className="text-[9px] text-gray-600">Average response time: &lt; 2 hours</p>
              </div>
           </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
