// Frontend/src/components/forms/FileUploadZone.jsx

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload, CheckCircle, Cancel, PictureAsPdf } from '@mui/icons-material'

function FileUploadZone({ onFileSelect, error, disabled = false, selectedFile }) {
  const [dragError, setDragError] = useState('')

  // Handle file drop and selection
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setDragError('')
    
    // Handle rejected files
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0]
      if (rejection.errors[0]?.code === 'file-too-large') {
        setDragError('File is too large. Maximum size is 8MB.')
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setDragError('Only PDF files are allowed.')
      } else {
        setDragError('File upload failed. Please try again.')
      }
      return
    }

    // Handle accepted files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onFileSelect(file)
    }
  }, [onFileSelect])

  // Configure dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 8 * 1024 * 1024, // 8MB
    disabled
  })

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-4 sm:p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive && !isDragReject 
            ? 'border-cyan-500 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 scale-105' 
            : ''}
          ${isDragReject 
            ? 'border-red-500 bg-gradient-to-br from-red-500/10 to-rose-500/10' 
            : ''}
          ${!isDragActive && !selectedFile 
            ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/30' 
            : ''}
          ${selectedFile 
            ? 'border-green-500 bg-gradient-to-br from-emerald-500/10 to-green-500/10' 
            : ''}
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : ''}
        `}
        aria-label="File upload area"
      >
        <input {...getInputProps()} />
        
        {/* Upload Icon */}
        <div className="mb-4">
          {selectedFile ? (
            <CheckCircle className="mx-auto text-6xl text-green-400" />
          ) : isDragReject ? (
            <Cancel className="mx-auto text-6xl text-red-400" />
          ) : (
            <CloudUpload 
              className={`mx-auto text-6xl transition-colors duration-300 ${
                isDragActive ? 'text-cyan-400' : 'text-slate-500'
              }`} 
            />
          )}
        </div>

        {/* Upload Text */}
        <div>
          {selectedFile ? (
            <div>
              <p className="text-lg font-semibold text-green-400 mb-2">
                File selected successfully!
              </p>
              <p className="text-slate-400">
                Click to select a different file
              </p>
            </div>
          ) : isDragActive ? (
            <div>
              <p className="text-lg font-semibold text-cyan-400 mb-2">
                Drop your PDF file here
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold text-slate-300 mb-2">
                Drag & drop your PDF file here
              </p>
              <p className="text-slate-400 mb-4">
                or click to browse files
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                <span>• Maximum size: 8MB</span>
                <span>• PDF files only</span>
              </div>
            </div>
          )}
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-800/20 to-slate-900/20 pointer-events-none"></div>
      </div>

      {/* Selected File Info */}
      {selectedFile && (
        <div className="card glass bg-slate-800/30 border border-slate-700/50 p-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-red-500/20">
              <PictureAsPdf className="text-red-400 text-2xl" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className='flex items-center justify-center'>
                <h3 className="font-semibold text-white truncate">
                  {selectedFile.name}
                </h3>
                <div className="flex-shrink-0 ">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-400" fontSize="small" />
              </div>
            </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-4 text-xs font-normal text-slate-400">
                <span>{formatFileSize(selectedFile.size)}</span>
                <span>•</span>
                <span>PDF Document</span>
                <span>•</span>
                <span>{new Date(selectedFile.lastModified).toLocaleDateString()}</span>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Error Messages */}
      {(error || dragError) && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
          <p className="text-red-400 text-sm flex items-center space-x-2">
            <Cancel fontSize="small" />
            <span>{error || dragError}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default FileUploadZone
