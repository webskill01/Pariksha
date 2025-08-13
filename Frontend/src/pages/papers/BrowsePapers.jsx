// Frontend/src/pages/papers/BrowsePapers.jsx - Fixed & Mobile-Optimized

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
  LibraryBooks,
  Refresh,
  Clear,
  FilterList
} from '@mui/icons-material'

import { paperService } from '../../services/paperService'
import PaperCard from '../../components/papers/PaperCard'

function BrowsePapers() {
  // State management
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState({})
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    subject: '',
    class: '',
    semester: '',
    examType: '',
    year: ''
  })

  const [searchParams, setSearchParams] = useSearchParams()

  // Get filters from URL on load
  const getFiltersFromURL = () => {
    const urlFilters = {
      search: searchParams.get('search') || '',
      subject: searchParams.get('subject') || '',
      class: searchParams.get('class') || '',
      semester: searchParams.get('semester') || '',
      examType: searchParams.get('examType') || '',
      year: searchParams.get('year') || ''
    }
    
    setSearchQuery(urlFilters.search)
    setFilters({
      subject: urlFilters.subject,
      class: urlFilters.class,
      semester: urlFilters.semester,
      examType: urlFilters.examType,
      year: urlFilters.year
    })
    
    return urlFilters
  }

  // ✅ FIXED: Fetch papers with proper filtering and sorting
  const fetchPapers = async (filterParams = {}) => {
    setLoading(true)
    try {
      const response = await paperService.getBrowsePapers(filterParams)
      // Handle response structure
      let papersData = []
      if (response?.data?.papers) {
        papersData = response.data.papers
      } else if (response?.papers) {
        papersData = response.papers
      } else if (Array.isArray(response?.data)) {
        papersData = response.data
      } else if (Array.isArray(response)) {
        papersData = response
      }
      setPapers(Array.isArray(papersData) ? papersData : [])
    } catch (error) {
      console.error('Failed to fetch papers:', error)
      toast.error('Failed to load papers. Please try again.')
      setPapers([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const response = await paperService.getFilterOptions()
      setFilterOptions(response?.data || {
        subjects: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
        classes: ['1st Year CSE', '2nd Year CSE', '3rd Year CSE', '4th Year CSE'],
        semesters: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
        examTypes: ['Mst-1', 'Mst-2', 'Final'],
        years: ['2022', '2023', '2024', '2025']
      })
    } catch (error) {
      console.error('Failed to fetch filter options:', error)
    }
  }

  const applyFilters = () => {
    const allFilters = {
      search: searchQuery.trim(),
      ...filters,
      sortBy: sortBy
    }

    // Remove empty filters
    const cleanFilters = Object.fromEntries(
      Object.entries(allFilters).filter(([_, value]) => value && value !== '')
    )
    // Update URL
    setSearchParams(cleanFilters)
    
    // Fetch papers
    fetchPapers(cleanFilters)
  }

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    // Trigger filter application with new sort
    setTimeout(() => {
      applyFilters()
    }, 100)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('')
    setFilters({
      subject: '',
      class: '',
      semester: '',
      examType: '',
      year: ''
    })
    setSortBy('newest')
    setSearchParams({})
    fetchPapers({ sortBy: 'newest' })
  }

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters()
    }, 500) // 500ms delay for search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, filters, sortBy])

  // Initial load
  useEffect(() => {
    fetchFilterOptions()
    const initialFilters = getFiltersFromURL()
    fetchPapers(initialFilters)
  }, [])

  // Check if any filters are active
  const hasActiveFilters = searchQuery || Object.values(filters).some(value => value) || sortBy !== 'newest'

  return (
    <div className="container-custom py-4 sm:py-8">
      
      {/* Compact Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <LibraryBooks className="text-white text-xl" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Browse Papers</h1>
        <p className="text-slate-400 text-sm">Discover question papers shared by students</p>
      </div>

      {/* Mobile-Optimized Search & Filters */}
      <div className="card glass-strong mb-4">
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search papers by title, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                <Clear fontSize="small" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-sm flex items-center space-x-2 ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
            >
              <FilterList fontSize="small" />
              <span>Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>}
            </button>

            <div className="flex items-center space-x-3">
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="btn-xs btn-ghost text-slate-400">
                  <Clear fontSize="small" />
                  <span>Clear</span>
                </button>
              )}
              
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-xs bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Downloaded</option>
                <option value="title">A-Z</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="border-t border-slate-700 pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <select
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="">All Subjects</option>
                  {filterOptions.subjects?.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>

                <select
                  value={filters.class}
                  onChange={(e) => handleFilterChange('class', e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="">All Classes</option>
                  {filterOptions.classes?.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>

                <select
                  value={filters.semester}
                  onChange={(e) => handleFilterChange('semester', e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="">All Semesters</option>
                  {filterOptions.semesters?.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>

                <select
                  value={filters.examType}
                  onChange={(e) => handleFilterChange('examType', e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="">All Exam Types</option>
                  {filterOptions.examTypes?.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="">All Years</option>
                  {filterOptions.years?.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="text-slate-400">
          {loading ? 'Loading...' : `${papers.length} papers found`}
        </span>
        {!loading && (
          <button
            onClick={() => applyFilters()}
            className="text-slate-400 hover:text-slate-300 flex items-center space-x-1"
          >
            <Refresh fontSize="small" />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {/* Papers Grid - Mobile-Optimized */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm">Loading papers...</p>
          </div>
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center py-12">
          <LibraryBooks className="text-slate-600 text-4xl mb-3 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">No papers found</h3>
          <p className="text-slate-500 mb-4 text-sm">Try adjusting your search criteria</p>
          <button onClick={clearAllFilters} className="btn-md btn-primary">
            Show All Papers
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {papers.map((paper) => (
            <PaperCard key={paper._id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BrowsePapers