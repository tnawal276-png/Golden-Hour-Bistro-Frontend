import React from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  BookOpen, 
  Star, 
  CalendarCheck,
  Settings,
  CreditCard,
  Users,
  HelpCircle,
  Bell
} from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'stats', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Food Order', icon: UtensilsCrossed },
    { id: 'menu', label: 'Manage Menu', icon: BookOpen },
    { id: 'reviews', label: 'Customer Review', icon: Star },
    { id: 'reservations', label: 'Reservations', icon: CalendarCheck },
  ];

  const otherItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'accounts', label: 'Accounts', icon: Users },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">✨</div>
        <div className="brand-info">
          <h3>Golden Hour</h3>
          <span>Bistro Portal</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="section-label">MENU</p>
        <div className="section-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-btn ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <p className="section-label">OTHERS</p>
        <div className="section-items">
          {otherItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-btn ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
