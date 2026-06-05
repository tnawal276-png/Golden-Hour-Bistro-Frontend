import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();

  // Load cart from backend if authenticated, else from local storage
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // Clear cart on logout to prevent session bleed
      setCart([]);
      localStorage.removeItem('cart');
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (item) => {
    if (user) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image
          })
        });
        if (response.ok) {
          const data = await response.json();
          setCart(data.items);
          setIsCartOpen(true);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      const existingItem = cart.find(i => i.productId === item.id);
      let newCart;
      if (existingItem) {
        newCart = cart.map(i => i.productId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        newCart = [...cart, { productId: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }];
      }
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setIsCartOpen(true);
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCart(data.items);
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      const newCart = cart.filter(i => i.productId !== productId);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    if (user) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ quantity: newQuantity })
        });
        if (response.ok) {
          const data = await response.json();
          setCart(data.items);
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      const newCart = cart.map(i => i.productId === productId ? { ...i, quantity: newQuantity } : i);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    if (!user) localStorage.removeItem('cart');
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
