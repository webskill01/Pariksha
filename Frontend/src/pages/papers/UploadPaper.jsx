// Frontend/src/pages/papers/UploadPaper.jsx - Mobile-Optimized Version

import { useState , useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
  Upload, 
  Subject, 
  School, 
  Schedule, 
  DateRange,
  Quiz,
  Tag,
  CloudUpload,
  CheckCircle,
  ArrowForward
} from '@mui/icons-material'

import { paperUploadSchema } from '../../schemas/authSchemas'
import { paperService } from '../../services/paperService'
import { authService } from '../../services/authService'
import FileUploadZone from '../../components/forms/FileUploadZone'

function UploadPaper() {
  // State management
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  
  const navigate = useNavigate()
  const user = authService.getCurrentUser()

  // Reactive authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  // Function to update auth state
  const updateAuthState = () => {
    const newIsAuthenticated = authService.isAuthenticated();
    const newCurrentUser = authService.getCurrentUser();
    
    setIsAuthenticated(newIsAuthenticated);
    setCurrentUser(newCurrentUser);
  };

  // Listen for authentication changes
  useEffect(() => {
    // Create a custom event listener for auth changes
    const handleAuthChange = () => {
      updateAuthState();
    };

    // Listen for storage changes (works for different tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        updateAuthState();
      }
    };

    // Add event listeners
    window.addEventListener('authStateChanged', handleAuthChange);
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for focus events to catch same-tab changes
    window.addEventListener('focus', updateAuthState);
    
    //  Set up interval to periodically check auth state (fallback)
    const authCheckInterval = setInterval(updateAuthState, 1000);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', updateAuthState);
      clearInterval(authCheckInterval);
    };
  }, []);

  

  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset
  } = useForm({
    resolver: yupResolver(paperUploadSchema),
    defaultValues: {
      title: '',
      subject: '',
      class: user?.class || '',
      semester: user?.semester || '',
      year: new Date().getFullYear().toString(),
      examType: '',
      tags: [],
      file: null
    }
  })
const isUserAdmin = () => {
    return currentUser?.role === 'admin' ||
           currentUser?.isAdmin === true ||
           currentUser?.userType === 'admin' ||
           ['nitinemailss@gmail.com'].includes(currentUser?.email);
  };

  // Handle file selection from FileUploadZone
  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setValue('file', file)
    clearErrors('file')
  }

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  const addTag = () => {
    const newTag = tagInput.trim()
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      const updatedTags = [...tags, newTag]
      setTags(updatedTags)
      setValue('tags', updatedTags)
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    setValue('tags', updatedTags)
  }

  // Form submission handler
  const onSubmit = async (data) => {
    if (!selectedFile) {
      setError('file', { 
        type: 'manual', 
        message: 'Please select a PDF file to upload' 
      })
      return
    }

    setIsUploading(true)
    try {
      // Prepare FormData for multipart upload
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('subject', data.subject)
      formData.append('class', data.class)
      formData.append('semester', data.semester)
      formData.append('year', data.year)
      formData.append('examType', data.examType)
      formData.append('file', selectedFile)
      
      // Append tags as JSON string
      if (tags.length > 0) {
        formData.append('tags', JSON.stringify(tags))
      }

      // Upload with progress tracking
      await paperService.uploadPaper(formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
        }
      })

      // Success feedback
      toast.success('Paper uploaded successfully! It will be reviewed by admins.')
      
      // Reset form and redirect
      reset()
      setSelectedFile(null)
      setTags([])
      setTagInput('')
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        if (isUserAdmin()) {
    navigate('/admin/dashboard')
  } else {
    navigate('/dashboard')
  }
      }, 2000)

    } catch (error) {
      console.error('Upload error:', error)
      
      // Handle specific error cases
      if (error.message?.includes('title')) {
        setError('title', { type: 'server', message: error.message })
      } else if (error.message?.includes('file')) {
        setError('file', { type: 'server', message: error.message })
      } else {
        toast.error(error.message || 'Upload failed. Please try again.')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container-custom py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Compact Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CloudUpload className="text-white text-2xl sm:text-3xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2 sm:mb-3">
            Upload Question Paper
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto">
            Share your question papers with the community. All uploads are reviewed by admins before being published.
          </p>
          <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-3 sm:mt-4"></div>
        </div>

        {/* Upload Form - Mobile-Optimized */}
        <div className="card glass-strong">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
              
              {/* File Upload Section */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center space-x-2">
                  <Upload className="text-cyan-400" />
                  <span>Select PDF File</span>
                </h2>
                
                <Controller
                  name="file"
                  control={control}
                  render={() => (
                    <FileUploadZone 
                      onFileSelect={handleFileSelect}
                      error={errors.file?.message}
                      selectedFile={selectedFile}
                      disabled={isUploading}
                    />
                  )}
                />
              </div>

              {/* Paper Information Section - Mobile-Optimized Grid */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center space-x-2">
                  <Subject className="text-cyan-400" />
                  <span>Paper Information</span>
                </h2>

                  
                  {/* Title Field - Full width on all screens */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="form-label flex items-center space-x-2">
                      <Subject className="text-slate-400" fontSize="small" />
                      <span>Paper Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Python Final Exam 2024"
                      className={`form-input ${errors.title ? 'form-input-error' : ''}`}
                      {...register('title')}
                      disabled={isUploading}
                    />
                    {errors.title && (
                      <p className="form-error">{errors.title.message}</p>
                    )}
                    <p className="text-xs text-slate-500">
                      Enter a descriptive title that clearly identifies the paper (Fill Combined if the pdf contains more than one paper)
                    </p>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label className="form-label flex items-center space-x-2">
                      <School className="text-slate-400" fontSize="small" />
                      <span>Subject</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Python Programming "
                      className={`form-input ${errors.subject ? 'form-input-error' : ''}`}
                      {...register('subject')}
                      disabled={isUploading}
                    />
                    {errors.subject && (
                      <p className="form-error">{errors.subject.message}</p>
                    )}
                  </div>

                {/* Form Fields Grid - 2 columns on mobile, responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Class Field */}
                  <div className="space-y-2">
                    <label className="form-label flex items-center space-x-2">
                      <School className="text-slate-400" fontSize="small" />
                      <span>Class</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., BCA"
                      className={`form-input ${errors.class ? 'form-input-error' : ''}`}
                      {...register('class')}
                      disabled={isUploading}
                    />
                    {errors.class && (
                      <p className="form-error">{errors.class.message}</p>
                    )}
                  </div>

                  {/* Semester Field */}
                  <div className="space-y-2">
                    <label className="form-label flex items-center space-x-2">
                      <Schedule className="text-slate-400" fontSize="small" />
                      <span>Semester</span>
                    </label>
                    <select
                      className={`form-input ${errors.semester ? 'form-input-error' : ''}`}
                      {...register('semester')}
                      disabled={isUploading}
                    >
                      <option value="">Select semester</option>
                      <option value="1st">1st Semester</option>
                      <option value="2nd">2nd Semester</option>
                      <option value="3rd">3rd Semester</option>
                      <option value="4th">4th Semester</option>
                      <option value="5th">5th Semester</option>
                      <option value="6th">6th Semester</option>
                    </select>
                    {errors.semester && (
                      <p className="form-error">{errors.semester.message}</p>
                    )}
                  </div>

                  {/* Year Field */}
                  <div className="space-y-2">
                    <label className="form-label flex items-center space-x-2">
                      <DateRange className="text-slate-400" fontSize="small" />
                      <span>Academic Year</span>
                    </label>
                    <select
                      className={`form-input ${errors.year ? 'form-input-error' : ''}`}
                      {...register('year')}
                      disabled={isUploading}
                    >
                      <option value="" defaultValue={"Select year"}>Select year</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                    {errors.year && (
                      <p className="form-error">{errors.year.message}</p>
                    )}
                  </div>

                  {/* Exam Type Field */}
                  <div className="space-y-2">
                    <label className="form-label flex items-center space-x-2">
                      <Quiz className="text-slate-400" fontSize="small" />
                      <span>Exam Type</span>
                    </label>
                    <select
                      className={`form-input ${errors.examType ? 'form-input-error' : ''}`}
                      {...register('examType')}
                      disabled={isUploading}
                    >
                      <option value="" defaultValue={"Select exam type"}>Select exam type</option>
                      <option value="Mst-1">MST-1 (Mid Semester Test 1)</option>
                      <option value="Mst-2">MST-2 (Mid Semester Test 2)</option>
                      <option value="Final">Final Exam</option>
                    </select>
                    {errors.examType && (
                      <p className="form-error">{errors.examType.message}</p>
                    )}
                  </div>
                </div>

                {/* Tags Section - Full width */}
                <div className="space-y-3 sm:space-y-4">
                  <label className="form-label flex items-center space-x-2">
                    <Tag className="text-slate-400" fontSize="small" />
                    <span>Tags (Optional)</span>
                  </label>
                  
                  {/* Tag Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Tags to improve searchability"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagInput}
                      className="form-input flex-1"
                      disabled={isUploading || tags.length >= 5}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!tagInput.trim() || tags.length >= 5 || isUploading}
                      className="btn-sm btn-secondary"
                    >
                      Add
                    </button>
                  </div>

                  {/* Display Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            disabled={isUploading}
                            className="text-cyan-300 hover:text-red-400 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-500">
                    Add up to 5 tags to help others find your paper (e.g., "algorithms", "data structures")
                  </p>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="btn-lg btn-primary w-full sm:w-auto min-w-60 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-3 relative z-10">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3 relative z-10">
                      <CheckCircle />
                      <span>Upload Paper</span>
                      <ArrowForward className="group-hover:translate-x-1 transition-transform duration-300" fontSize="small" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Compact Help Section */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="card glass bg-slate-800/30 border border-slate-700/50 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
              📋 Upload Guidelines
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 text-xs  sm:text-sm text-slate-400">
              <div className=''>
                • Only PDF files are accepted<br/>
                • Maximum file size: 8MB<br/>
                • Clear, readable scans only
              </div>
              <div>
                • Original question papers only<br/>
                • No copyrighted material<br/>
                • Papers will be reviewed before publishing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPaper