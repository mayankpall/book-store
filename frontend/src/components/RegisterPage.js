import React, { useState } from 'react';
import { Book } from 'lucide-react';

const RegisterPage = ({ handleRegister, setCurrentPage, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    
    console.log('📝 Submitting registration with data:', formData);
    
    try {
      const response = await handleRegister(formData);
      console.log('📥 Registration response:', response);
      
      if (response && response.success) {
        setSuccess('Registration successful! Please login.');
        setTimeout(() => setCurrentPage('login'), 2000);
      } else {
        // Show the specific error message from backend
        const errorMessage = response?.message || 'Registration failed. Please try again.';
        console.log('❌ Registration failed:', errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error('💥 Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="auth-container" style={{background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'}}>
      <div className="auth-card">
        <div className="auth-header">
          <Book className="auth-icon" size={48} style={{color: '#059669'}} />
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join our bookstore community</p>
        </div>

        <form onSubmit={onSubmit}>
          {/* First Name and Last Name Row */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
            <div>
              <label className="form-label">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="form-input"
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="form-input"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-input"
              placeholder="Enter your email (e.g., john@example.com)"
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="form-input"
              placeholder="Enter your phone number (e.g., 1234567890)"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="form-input"
              placeholder="Create a password (min 6 characters)"
              required
              minLength="6"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error">
              <strong>Registration Error:</strong> {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success"
            style={{
              width: '100%', 
              padding: '14px', 
              fontSize: '16px',
              marginTop: '8px'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="auth-link">
          <span style={{color: '#6b7280'}}>Already have an account? </span>
          <button
            onClick={() => setCurrentPage('login')}
            style={{
              background: 'none', 
              border: 'none', 
              color: '#059669', 
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;