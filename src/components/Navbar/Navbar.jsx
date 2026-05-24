import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FaShoppingBag } from 'react-icons/fa';
import { ShieldCheck } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <h1>Golden Hour Bistro</h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions flex items-center gap-6">
          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className="text-gh-gold hover:text-white transition-all flex items-center gap-2 group"
              title="Admin Command Center"
            >
              <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Admin</span>
            </Link>
          )}

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-white hover:text-gh-gold transition-colors p-2 bg-transparent border-none outline-none shadow-none cursor-pointer"
            style={{ background: 'transparent' }}
          >
            <FaShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-gh-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </button>
          
          {isAuthenticated ? (
            <button key="signout" onClick={logout} className="btn-login">Sign Out</button>
          ) : (
            <Link key="signin" to="/auth" className="btn-login">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
