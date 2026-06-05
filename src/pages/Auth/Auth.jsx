import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './Auth.css';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setIsForgotPassword(false);
    setError('');
    setFormData({ 
      username: '', 
      email: '', 
      password: '', 
      confirmPassword: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Always enabled button requirement - validate on submit instead
    if (isSignIn) {
      if (!formData.email || !formData.password) {
        setError('Email and password are required.');
        return;
      }
    } else {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required for sign up.');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      
      if (!validatePassword(formData.password)) {
        setError('Password must be at least 8 characters, including 1 uppercase, 1 number, and 1 special character.');
        return;
      }
    }

    if (isForgotPassword) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Email and new password are required.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      let endpoint = isSignIn ? '/api/auth/login' : '/api/auth/register';
      if (isForgotPassword) endpoint = '/api/auth/reset-password';

      const body = isForgotPassword 
        ? { email: formData.email, newPassword: formData.password }
        : (isSignIn
          ? { username: formData.email, password: formData.password }
          : { username: formData.username, email: formData.email, password: formData.password });

      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Successful Auth
      const targetPath = data.user.role === 'admin' ? '/admin' : '/dashboard';

      if (!isSignIn) {
        setSuccess('Account created successfully! Welcome to the Bistro.');
        setTimeout(() => {
          login(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          navigate(targetPath);
        }, 2000);
      } else {
        login(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        navigate(targetPath);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page flex justify-center items-center min-h-screen relative z-10">
      <div className={`auth-container glass rounded-lg p-10 max-w-[450px] w-full shadow-2xl backdrop-blur-md border border-white/10 ${isSignIn ? 'signin-mode' : 'signup-mode'}`}>
        <h2 className="text-4xl font-heading text-gh-gold text-center mb-3 tracking-wide">
          {isSignIn ? 'Sign In' : 'Join the Bistro'}
        </h2>
        <p className="text-gray-300 text-center mb-10 text-sm tracking-widest uppercase">
          {isSignIn 
            ? 'Welcome back to Golden Hour Bistro.' 
            : 'Unlock exclusive rewards & updates.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignIn && (
            <div className="form-control w-full relative">
              <span className="absolute left-0 top-3 text-gh-gold text-lg"><FaUser /></span>
              <input 
                type="text" 
                name="username" 
                className="w-full bg-transparent border-b border-gray-500 focus:border-gh-gold text-white placeholder-gray-500 px-8 py-3 outline-none transition-colors" 
                placeholder="Unique username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-control w-full relative">
            <span className="absolute left-0 top-3 text-gh-gold text-lg"><FaEnvelope /></span>
            <input 
              type="text" 
              name="email" 
              className="w-full bg-transparent border-b border-gray-500 focus:border-gh-gold text-white placeholder-gray-500 px-8 py-3 outline-none transition-colors" 
              placeholder="cafe@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-control w-full relative">
            <span className="absolute left-0 top-3 text-gh-gold text-lg"><FaLock /></span>
            <input 
              type="password" 
              name="password" 
              className="w-full bg-transparent border-b border-gray-500 focus:border-gh-gold text-white placeholder-gray-500 px-8 py-3 outline-none transition-colors" 
              placeholder={isForgotPassword ? "New Password" : "Min 8 chars, 1 uppercase, 1 number"}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {(!isSignIn || isForgotPassword) && (
            <div className="form-control w-full relative">
              <span className="absolute left-0 top-3 text-gh-gold text-lg"><FaLock /></span>
              <input 
                type="password" 
                name="confirmPassword" 
                className="w-full bg-transparent border-b border-gray-500 focus:border-gh-gold text-white placeholder-gray-500 px-8 py-3 outline-none transition-colors" 
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          {isSignIn && !isForgotPassword && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => setIsForgotPassword(true)}
                className="text-xs text-gray-400 hover:text-gh-gold transition-colors bg-transparent border-none outline-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {error && (
            <div className="modern-toast error-toast">
              <div className="toast-content flex items-center gap-4">
                <div className="toast-icon-wrapper flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider">{error}</span>
              </div>
            </div>
          )}
          
          {success && (
            <div className="modern-toast success-toast">
              <div className="toast-content flex items-center gap-4">
                <div className="toast-icon-wrapper flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider">{success}</span>
              </div>
            </div>
          )}
          
          {/* Button always enabled per user request */}
          <button 
            type="submit" 
            className="w-full mt-8 py-4 bg-gh-gold text-black hover:bg-gh-gold-hover transition-colors font-bold text-sm tracking-widest uppercase rounded-sm"
          >
            {loading ? <span className="loading loading-spinner"></span> : (success ? 'Success!' : (isForgotPassword ? 'Reset Password' : (isSignIn ? 'Sign In' : 'Create Account')))}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/10">
          {isForgotPassword ? (
            <p className="text-gray-400 text-sm">Remembered it? <button type="button" className="text-gh-gold hover:text-white transition-colors bg-transparent border-none outline-none font-semibold ml-1 cursor-pointer" onClick={() => setIsForgotPassword(false)}>Sign In</button></p>
          ) : isSignIn ? (
            <p className="text-gray-400 text-sm">New to Golden Hour? <button type="button" className="text-gh-gold hover:text-white transition-colors bg-transparent border-none outline-none font-semibold ml-1 cursor-pointer" onClick={handleToggle}>Create Account</button></p>
          ) : (
            <p className="text-gray-400 text-sm">Already have an account? <button type="button" className="text-gh-gold hover:text-white transition-colors bg-transparent border-none outline-none font-semibold ml-1 cursor-pointer" onClick={handleToggle}>Sign In</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
