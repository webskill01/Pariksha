// Frontend/src/pages/admin/AdminDashboard.jsx - With Download Button in Paper Cards

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  Dashboard as DashboardIcon,
  Description,
  Schedule,
  CheckCircle,
  Cancel,
  Download,
  FilterList,
  Search,
  PictureAsPdf,
  DeleteOutlined,
} from '@mui/icons-material'

import api from '../../services/api'
import { getCleanFilename  } from '../../utils/downloadUtils'

function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [papers, setPapers] = useState([])
  const [filteredPapers, setFilteredPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [papersPerPage] = useState(12) // Better for 2-column grid

  // Fetch data on component mount
  useEffect(() => {
    fetchAdminData()
  }, [])

  // Filter papers when search term or status filter changes
  useEffect(() => {
    filterPapers()
  }, [papers, searchTerm, statusFilter])

  const fetchAdminData = async () => {
    try {
      const [statsRes, papersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/papers')
      ])

      if (statsRes.data?.success) {
        setStats(statsRes.data.data.stats || {})
      }

      if (papersRes.data?.success) {
        setPapers(papersRes.data.data.papers || [])
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      toast.error('Failed to load admin dashboard')
    } finally {
      setLoading(false)
    }
  }

  const filterPapers = () => {
    let filtered = papers

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(paper => paper.status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(paper =>
        paper.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.uploadedBy?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPapers(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleApprove = async (paperId) => {
    try {
      await api.put(`/admin/papers/${paperId}/approve`)
      toast.success('Paper approved successfully!')
      fetchAdminData()
    } catch (error) {
      toast.error('Failed to approve paper')
    }
  }

  const handleReject = async (paperId) => {
    const reason = prompt('Enter rejection reason:')
    if (!reason?.trim()) return

    try {
      await api.put(`/admin/papers/${paperId}/reject`, { reason: reason.trim() })
      toast.success('Paper rejected successfully!')
      fetchAdminData()
    } catch (error) {
      toast.error('Failed to reject paper')
    }
  }

  const handleDelete = async (paperId) => {
  if (!window.confirm('Are you sure you want to permanently delete this paper? This will remove it from both the database and cloud storage.')) return

  try {
    const response = await api.delete(`/admin/papers/${paperId}`)
    
    if (response.data?.success) {
      const details = response.data.details
      
      if (details?.r2Deleted) {
        toast.success('Paper and file deleted successfully!')
      } else if (details?.databaseDeleted) {
        toast.success('Paper deleted from database (cloud file cleanup may have failed)')
      } else {
        toast.success('Paper deleted successfully!')
      }
    } else {
      toast.error('Failed to delete paper')
    }
    
    fetchAdminData()
  } catch (error) {
    console.error('Delete error:', error)
    toast.error(error.response?.data?.message || 'Failed to delete paper')
  }
}

  // Pagination logic
  const indexOfLastPaper = currentPage * papersPerPage
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage
  const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper)
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-slate-400">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  
  const updatePaperDownloadCount = (paperId, newDownloadCount) => {
  // Update main papers array
  setPapers(prevPapers => 
    prevPapers.map(paper => 
      paper._id === paperId 
        ? { ...paper, downloadCount: newDownloadCount }
        : paper
    )
  )
  
  // Update filtered papers array 
  setFilteredPapers(prevFiltered => 
    prevFiltered.map(paper => 
      paper._id === paperId 
        ? { ...paper, downloadCount: newDownloadCount }
        : paper
    )
  )
}

  return (
    
    <div className="container-custom py-4 sm:py-8">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold gradient-text mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg">
          Manage papers and monitor platform activity
        </p>
      </div>

      {/* Stats Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6">
        <StatsCard
          icon={<Description className="text-cyan-400" />}
          title="Total Papers"
          value={stats.totalPapers || 0}
          bgColor="bg-cyan-500/10"
          borderColor="border-cyan-500/20"
        />
        <StatsCard
          icon={<Schedule className="text-yellow-400" />}
          title="Pending"
          value={stats.pendingPapers || 0}
          bgColor="bg-yellow-500/10"
          borderColor="border-yellow-500/20"
        />
        <StatsCard
          icon={<CheckCircle className="text-green-400" />}
          title="Approved"
          value={stats.approvedPapers || 0}
          bgColor="bg-green-500/10"
          borderColor="border-green-500/20"
        />
        <StatsCard
          icon={<Cancel className="text-red-400" />}
          title="Rejected"
          value={stats.rejectedPapers || 0}
          bgColor="bg-red-500/10"
          borderColor="border-red-500/20"
        />
      </div>

      {/* Paper Management Section */}
      <div className="card glass-strong">
        <div className="p-4 sm:p-6">
          
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Paper Management</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fontSize="small" />
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <FilterList className="text-slate-400" fontSize="small" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Status ({papers.length})</option>
                  <option value="pending">Pending ({stats.pendingPapers || 0})</option>
                  <option value="approved">Approved ({stats.approvedPapers || 0})</option>
                  <option value="rejected">Rejected ({stats.rejectedPapers || 0})</option>
                </select>
              </div>
            </div>
          </div>

          {/* ✅ UPDATED: 2-Column Grid Layout for All Screen Sizes */}
          {currentPapers.length === 0 ? (
            <div className="text-center py-12">
              <Description className="text-slate-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-400 mb-2">No papers found</h3>
              <p className="text-slate-500 text-sm">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'No papers have been uploaded yet'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {currentPapers.map((paper) => (
                <AdminCompactPaperCard
                  key={paper._id}
                  paper={paper}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onDelete={handleDelete}
                  onDownloadCountUpdate={updatePaperDownloadCount} 
                />
              ))}
            </div>
          )}

          {/* Pagination - Mobile Optimized */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-slate-700/50">
              <div className="text-slate-400 text-sm mb-3 sm:mb-0">
                Showing {indexOfFirstPaper + 1}-{Math.min(indexOfLastPaper, filteredPapers.length)} of {filteredPapers.length} papers
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i
                  if (pageNum > totalPages) return null
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        currentPage === pageNum
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ✅ UPDATED: Admin-specific Compact Paper Card Component with Download Button
function AdminCompactPaperCard({ paper, onApprove, onReject, onDelete , onDownloadCountUpdate  }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false) // ✅ NEW: Download state

  // Frontend/src/pages/admin/AdminDashboard.jsx - Simplified admin download

// In AdminDashboard.jsx - Updated download handler with state update
const handleDownload = async (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (isDownloading) return

  setIsDownloading(true)
  try {
    // ✅ Make API call and get response with updated count
    const response = await api.post(`/papers/${paper._id}/download`)
    
    if (response.data?.success) {
      const { fileUrl, downloadCount } = response.data.data
      
      // Download the file
      const cleanFilename = getCleanFilename(paper.title)
      const link = document.createElement('a')
      link.href = fileUrl || paper.fileUrl
      link.download = cleanFilename
      // link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // ✅ CRITICAL: Update parent component state with new count
      if (onDownloadCountUpdate) {
        onDownloadCountUpdate(paper._id, downloadCount)
      }
      
      toast.success(`Downloaded "${paper.title}"`)
    }
  } catch (error) {
    console.error('Admin download failed:', error)
    toast.error('Download failed. Please try again.')
  } finally {
    setIsDownloading(false)
  }
}


  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isDeleting) return

    if (!window.confirm('Are you sure you want to permanently delete this paper?')) return

    setIsDeleting(true)
    try {
      await onDelete(paper._id)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleApprove = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isApproving) return

    setIsApproving(true)
    try {
      await onApprove(paper._id)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isRejecting) return

    setIsRejecting(true)
    try {
      await onReject(paper._id)
    } finally {
      setIsRejecting(false)
    }
  }

  if (!paper) return null

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-500/10 border-green-500/20'
      case 'pending': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'rejected': return 'text-red-400 bg-red-500/10 border-red-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }


  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-3 sm:p-4 hover:border-slate-600/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group">
      
      {/* Header with PDF Icon and Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300">
          <PictureAsPdf className="text-red-400 text-lg" />
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(paper.status)}`}>
          {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
        </span>
      </div>

      {/* Paper Title - Main Focus */}
      <h3 className="text-sm sm:text-base font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
        {paper.title || 'Untitled Paper'}
      </h3>

      {/* Essential Details - Compact Grid */}
      <div className="space-y-1.5 mb-3 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="font-medium text-cyan-400 truncate">{paper.subject || 'N/A'}</span>
          <span>{paper.year || 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span className="truncate">{paper.uploadedBy?.name || 'Anonymous'}</span>
          <span>{paper.examType || 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span className="truncate">{paper.class || 'N/A'}</span>
          <span className="flex items-center space-x-1">
            <Download fontSize="inherit" />
            <span>{paper.downloadCount || 0}</span>
          </span>
        </div>
      </div>

      {/* Rejection Reason (if applicable) */}
      {paper.rejectionReason && (
        <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
          <strong>Reason:</strong> {paper.rejectionReason}
        </div>
      )}

      {/* ✅ UPDATED: Action Buttons with Download Button */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-3 ">
        
        {/* ✅ NEW: Download Button - Primary action for review */}
        <button
          onClick={handleDownload}
          disabled={isDownloading || !paper.fileUrl}
          className="flex-1 min-w-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/60 hover:text-white rounded-md px-2 py-1.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-1 disabled:opacity-50"
        >
          {isDownloading ? (
            <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
              <div>
                <Download fontSize="small" />
                <span>Download</span>
              </div>
          )}
        </button>

        {/* Approve/Reject buttons for pending papers */}
        {paper.status === 'pending' && (
          <>
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="flex-1 min-w-0 bg-green-600/80 hover:bg-green-600 text-white rounded-md px-2 py-1.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-1 disabled:opacity-50"
            >
              {isApproving ? (
                <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <div>
                  <CheckCircle fontSize="small" />
                  <span>Approve</span>
                </div>
              )}
            </button>
            
            <button
              onClick={handleReject}
              disabled={isRejecting}
              className="flex-1 min-w-0 bg-yellow-600/80 hover:bg-yellow-600 text-white rounded-md px-2 py-1.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-1 disabled:opacity-50"
            >
              {isRejecting ? (
                <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <div>
                  <Cancel fontSize="small" />
                  <span>Reject</span>
                </div>
              )}
            </button>
          </>
        )}

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-600/80 hover:bg-red-600 text-white rounded-md px-2 py-1.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-1 disabled:opacity-50"
        >
          {isDeleting ? (
            <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <div>
              <DeleteOutlined fontSize="small" />
              <span>Delete</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ icon, title, value, bgColor, borderColor }) {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="text-xl sm:text-2xl">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs sm:text-sm text-slate-400 font-medium truncate">{title}</div>
          <div className="text-lg sm:text-2xl font-bold text-white">{value.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard