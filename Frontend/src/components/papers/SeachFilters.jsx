// Frontend/src/components/papers/SearchFilters.jsx - Mobile-Optimized

import { useState, useEffect } from 'react'
import { 
  Search, 
  FilterList, 
  Clear, 
  Tune,
  Close
} from '@mui/icons-material'

function SearchFilters({ 
  onFiltersChange, 
  initialFilters = {}, 
  filterOptions = {},
  loading = false 
}) {
  // State for filters
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '')
  const [filters, setFilters] = useState({
    class: initialFilters.class || '',
    semester: initialFilters.semester || '',
    subject: initialFilters.subject || '',
    examType: initialFilters.examType || '',
    year: initialFilters.year || ''
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFiltersChange()
    }, 300) // 300ms delay for search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, filters])

  // Combine search and filters and notify parent
  const handleFiltersChange = () => {
    const allFilters = {
      ...filters,
      search: searchQuery.trim()
    }
    
    // Remove empty filters
    const cleanFilters = Object.fromEntries(
      Object.entries(allFilters).filter(([_, value]) => value && value !== '')
    )
    
    onFiltersChange(cleanFilters)
  }

  // Handle individual filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('')
    setFilters({
      class: '',
      semester: '',
      subject: '',
      examType: '',
      year: ''
    })
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || Object.values(filters).some(value => value)

  return (
    <div className="space-y-3 sm:space-y-4">
      
      {/* Compact Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-slate-400" fontSize="small" />
        </div>
        <input
          type="text"
          placeholder="Search papers by title, subject, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
          className="form-input pl-10 pr-12 text-sm sm:text-base h-10 sm:h-12"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300"
          >
            <Clear fontSize="small" />
          </button>
        )}
      </div>

      {/* Mobile-Optimized Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`btn-sm flex items-center space-x-2 ${
              showAdvancedFilters ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Tune fontSize="small" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            )}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="btn-xs btn-ghost text-slate-400 hover:text-slate-300 flex items-center space-x-1"
            >
              <Clear fontSize="small" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Active filters count */}
        {hasActiveFilters && (
          <span className="text-xs sm:text-sm text-slate-400">
            {Object.values({...filters, search: searchQuery}).filter(v => v).length} filter(s) active
          </span>
        )}
      </div>

      {/* Mobile-Optimized Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="card glass bg-slate-800/50 border border-slate-700/50 p-3 sm:p-6 space-y-4 sm:space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-white">Advanced Filters</h3>
            <button
              onClick={() => setShowAdvancedFilters(false)}
              className="text-slate-400 hover:text-slate-300"
            >
              <Close fontSize="small" />
            </button>
          </div>

          {/* Mobile-Optimized Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Class Filter */}
            <div className="space-y-2">
              <label className="form-label text-sm">Class</label>
              <select
                value={filters.class}
                onChange={(e) => handleFilterChange('class', e.target.value)}
                disabled={loading}
                className="form-input text-sm"
              >
                <option value="">All Classes</option>
                {filterOptions.classes?.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Semester Filter */}
            <div className="space-y-2">
              <label className="form-label text-sm">Semester</label>
              <select
                value={filters.semester}
                onChange={(e) => handleFilterChange('semester', e.target.value)}
                disabled={loading}
                className="form-input text-sm"
              >
                <option value="">All Semesters</option>
                {filterOptions.semesters?.map(sem => (
                  <option key={sem} value={sem}>{sem} Semester</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div className="space-y-2">
              <label className="form-label text-sm">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                disabled={loading}
                className="form-input text-sm"
              >
                <option value="">All Subjects</option>
                {filterOptions.subjects?.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Exam Type Filter */}
            <div className="space-y-2">
              <label className="form-label text-sm">Exam Type</label>
              <select
                value={filters.examType}
                onChange={(e) => handleFilterChange('examType', e.target.value)}
                disabled={loading}
                className="form-input text-sm"
              >
                <option value="">All Exam Types</option>
                {filterOptions.examTypes?.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="space-y-2">
              <label className="form-label text-sm">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                disabled={loading}
                className="form-input text-sm"
              >
                <option value="">All Years</option>
                {filterOptions.years?.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilters
