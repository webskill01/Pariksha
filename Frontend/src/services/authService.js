// Frontend/src/services/authService.js - Complete Fixed Version

import api from './api'

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  // Login user with proper state management
 login: async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Less strict checking
    if (response.data && response.status === 200) {
      const responseData = response.data;
      
      // Extract token and user from wherever they are in the response
      const token = responseData.token || responseData.data?.token || responseData.accessToken;
      const user = responseData.user || responseData.data?.user || responseData.userData;
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
        
        return {
          success: true,
          data: { token, user }
        };
      }
    }
    
    throw new Error('Login failed - invalid credentials or server error');
  } catch (error) {
    throw error.response?.data || { message: error.message || 'Login failed' };
  }
},

  // Logout with storage event
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Trigger storage event for UI updates
    window.dispatchEvent(new Event('storage'));
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return !!(token && user)
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getCurrentUser()
    const adminEmails = ["nitinemailss@gmail.com"]
    return user && adminEmails.includes(user.email)
  },

  // Get user dashboard data
  getDashboard: async () => {
    try {
      const response = await api.get('/users/me/dashboard')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard data' }
    }
  },

  // Delete user's own paper (only pending or rejected)
  deleteMyPaper: async (paperId) => {
    try {
      const response = await api.delete(`/users/me/papers/${paperId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete paper' }
    }
  }
}
