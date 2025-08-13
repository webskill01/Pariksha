// Frontend/src/pages/papers/PaperDetail.jsx - Mobile-Optimized Version

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
  PictureAsPdf,
  Download,
  ArrowBack,
  Share,
  Tag as TagIcon,
  ArrowForward
} from '@mui/icons-material'

import { paperService } from '../../services/paperService'
import StatusBadge from '../../components/ui/StatusBadge'
import Breadcrumb from '../../components/ui/Breadcrumb'
import { getCleanFilename  } from '../../utils/downloadUtils'
import api from '../../services/api'

function PaperDetail() {
  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  const { id: paperId } = useParams()
  const navigate = useNavigate()

  // Enhanced fetch function with better debugging
  const fetchPaperDetails = async () => {
  if (!paperId) {
    navigate('/papers')
    return
  }

  setLoading(true)
  try {
    const response = await paperService.getPaperById(paperId)
    let paperData = null
    
    if (response?.data && response.data._id) {
      // Paper data is directly under response.data
      paperData = response.data
    } else if (response?.data?.data && response.data.data._id) {
      // Fallback: nested structure
      paperData = response.data.data
    } else if (response && response._id) {
      // Direct response structure
      paperData = response
    }
    if (!paperData || !paperData._id) {
      throw new Error('Invalid paper data received from server')
    }
    
    setPaper(paperData)
  } catch (error) {
    console.error('Failed to fetch paper details:', error)
    toast.error('Failed to load paper details')
    
    if (error.response?.status === 404) {
      navigate('/papers')
    }
  } finally {
    setLoading(false)
  }
}
const handleDownload = async () => {
  if (downloading) return

  setDownloading(true)
  try {
    const response = await api.post(`/papers/${paper._id}/download`)
    
    if (response.data?.success) {
      const { fileUrl, downloadCount } = response.data.data
      
      // 1. Download the file with clean filename
      const cleanFilename = getCleanFilename(paper.title)
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = cleanFilename
      // link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 2. Update local state with returned count
      setPaper(prev => prev ? {
        ...prev,
        downloadCount: downloadCount
      } : null)
      
      toast.success(`Downloading "${paper.title}"`)
    }
  } catch (error) {
    console.error('Download failed:', error)
    toast.error('Download failed. Please try again.')
  } finally {
    setDownloading(false)
  }
}

  const handleShare = async () => {
    const shareData = {
      title: paper?.title || 'Question Paper',
      text: `Check out this question paper: ${paper?.title}`,
      url: window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  useEffect(() => {
    fetchPaperDetails()
  }, [paperId])

  // Loading state
  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-slate-400">Loading paper details...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (!paper) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <PictureAsPdf className="text-slate-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-xl font-bold text-slate-400 mb-4">Paper Not Found</h2>
          <p className="text-slate-500 mb-6 text-sm">
            The paper you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/papers" className="btn-md btn-primary">
            Browse All Papers
          </Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Papers', link: '/papers' },
    { label: paper.subject || 'Subject' },
    { label: paper.title || 'Paper' }
  ]

  return (
    <div className="container-custom px-3 py-4 sm:px-6 sm:py-8">
      
      {/* Compact Breadcrumb - Hidden on very small screens */}
      <div className="hidden sm:block mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Compact Back Button */}
      <Link 
        to="/papers"
        className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 mb-4 transition-colors duration-200 text-sm"
      >
        <ArrowBack fontSize="small" />
        <span>Back to Browse</span>
      </Link>

      {/* Main Content - Single Card Layout for Mobile */}
      <div className="card glass-strong">
        <div className="card-body p-4 sm:p-6">
          
          {/* Header Section - Compact Layout */}
          <div className="flex items-start space-x-3 mb-4 sm:mb-6">
            <div className="p-2.5 sm:p-3 rounded-xl bg-red-500/20 flex-shrink-0">
              <PictureAsPdf className="text-red-400 text-xl sm:text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2 leading-tight">
                {paper.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400">
                <StatusBadge status={paper.status} />
                <span>•</span>
                <span>{paper.downloadCount || 0} downloads</span>
              </div>
            </div>
          </div>

          {/* Paper Details - Compact Grid */}
          <div className="bg-slate-900/40 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3 text-xs sm:text-sm">
              <div className="text-slate-500 font-medium">Subject</div>
              <div className="text-white font-semibold">{paper.subject || 'N/A'}</div>
              
              <div className="text-slate-500 font-medium">Class</div>
              <div className="text-white font-semibold">{paper.class || 'N/A'}</div>
              
              <div className="text-slate-500 font-medium">Semester</div>
              <div className="text-white font-semibold">{paper.semester || 'N/A'}</div>
              
              <div className="text-slate-500 font-medium">Year</div>
              <div className="text-white font-semibold">{paper.year || 'N/A'}</div>
              
              <div className="text-slate-500 font-medium">Exam Type</div>
              <div className="text-white font-semibold">{paper.examType || 'N/A'}</div>
              
              <div className="text-slate-500 font-medium">Uploaded By</div>
              <div className="text-white font-semibold">{paper.uploadedBy?.name || 'Anonymous'}</div>
              
              <div className="text-slate-500 font-medium">Upload Date</div>
              <div className="text-white font-semibold">
                {paper.createdAt ? new Date(paper.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>

          {/* Tags Section - Compact */}
          {paper.tags && paper.tags.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <TagIcon className="text-slate-400" fontSize="small" />
                <h3 className="text-sm sm:text-base font-semibold text-white">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {paper.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Mobile-First Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-8">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-md btn-primary flex-1 flex items-center justify-center"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download fontSize='small' />
                  <span>Download PDF</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleShare}
              className="btn-md btn-secondary flex items-center justify-center space-x-2"
            >
              <Share fontSize="small" />
              <span>Share Paper</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Card - Mobile Optimized */}
      <div className="mt-4 sm:mt-6">
        <div className="card glass bg-slate-800/30 border border-slate-700/50">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg sm:text-xl font-bold text-cyan-400">{paper.downloadCount || 0}</div>
                <div className="text-xs text-slate-400">Downloads</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-green-400">{paper.status}</div>
                <div className="text-xs text-slate-400">Status</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-purple-400">PDF</div>
                <div className="text-xs text-slate-400">Format</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Links - Mobile Optimized */}
      <div className="mt-4 sm:mt-6">
        <div className="card glass bg-slate-800/30 border border-slate-700/50">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Find More Papers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              <Link 
                to={`/papers?subject=${encodeURIComponent(paper.subject || '')}`}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm"
              >
               <span className='flex items-center'> More {paper.subject} Papers <ArrowForward fontSize='small'/></span>
              </Link>
              <Link 
                to={`/papers?class=${encodeURIComponent(paper.class || '')}`}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm"
              >
                <span className='flex items-center'> More {paper.class} Papers <ArrowForward fontSize='small'/></span>
              </Link>
              <Link 
                to={`/papers?examType=${paper.examType}`}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm"
              >
               <span className='flex items-center'> More {paper.examType} Papers <ArrowForward fontSize='small'/></span>
              </Link>
              <Link 
                to="/papers"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-xs sm:text-sm"
              >
               <span className='flex items-center'> Browse All Papers <ArrowForward fontSize='small'/></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperDetail
