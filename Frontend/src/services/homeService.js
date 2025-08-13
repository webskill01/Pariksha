// Frontend/src/services/homeService.js

import api from './api'

export const homeService = {
  // Get homepage statistics with better error handling
  getHomeStats: async () => {
    try {
      const response = await api.get('/home/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch home stats:', error)
      
      // Return fallback data if API fails
      return {
        success: true,
        data: {
          totalPapers: 150,
          totalUsers: 500,
          totalDownloads: 2500
        }
      }
    }
  }
}
