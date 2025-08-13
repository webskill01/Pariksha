// Frontend/src/services/paperService.js - Fixed to match backend

import api from './api'

export const paperService = {
  // Use the correct filtering endpoint
  getBrowsePapers: async (filters = {}) => {
    try {
      // Use the /filters endpoint for search/sort/filter functionality
      const response = await api.get('/papers/filters', { params: filters })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch papers' }
    }
  },

  // Add filter options method
  getFilterOptions: async () => {
    try {
      const response = await api.get('/papers/filter-options')
      return response.data
    } catch (error) {
      // Return fallback options if API fails
      return {
        data: {
          subjects: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
          classes: ['1st Year CSE', '2nd Year CSE', '3rd Year CSE', '4th Year CSE'],
          semesters: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
          examTypes: ['Mst-1', 'Mst-2', 'Final'],
          years: ['2022', '2023', '2024', '2025']
        }
      }
    }
  },

  // Get paper by ID
  getPaperById: async (paperId) => {
    try {
      const response = await api.get(`/papers/${paperId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch paper details' }
    }
  },

downloadPaper: async (paperId) => {
  try {
    const response = await api.post(`/papers/${paperId}/download`)
    if (response.data?.success && response.data?.data?.fileUrl) {
      const fileUrl = response.data.data.fileUrl
      const fileName = response.data.data.fileName || 'paper.pdf'
      
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName
      link.target = '_blank' 
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      return { 
        success: true, 
        message: 'Download started successfully',
        downloadCount: response.data.data.downloadCount 
      }
    } else {
      throw new Error('Invalid response from server - no file URL received')
    }
  } catch (error) {
    console.error('Download error details:', error)
  }
},



  // Upload paper (existing method)
  uploadPaper: async (formData) => {
    try {
      const response = await api.post('/papers/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
        }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Upload failed' }
    }
  },
}
