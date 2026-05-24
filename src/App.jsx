import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Auth from './pages/Auth/Auth';
import Menu from './pages/Menu/Menu';
import MenuCategory from './pages/Menu/MenuCategory';
import MenuItemDetail from './pages/Menu/MenuItemDetail';
import Chatbot from './components/Chatbot/Chatbot';
import Dashboard from './pages/Dashboard/Dashboard';
import BookTable from './pages/BookTable/BookTable';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Community from './pages/Community/Community';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './pages/Contact/Contact';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/Checkout/OrderSuccess';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <Navbar />}
      <main className={!isAdminPath ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<BookTable />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-success" 
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Menu System with Nested Routes */}
          <Route path="/menu" element={<Menu />}>
            <Route index element={<MenuCategory />} />
            <Route path=":category" element={<MenuCategory />} />
            <Route path="item/:id" element={<MenuItemDetail />} />
          </Route>
        </Routes>
      </main>
      {!isAdminPath && (
        <>
          <Footer />
          <Chatbot />
          <CartDrawer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
