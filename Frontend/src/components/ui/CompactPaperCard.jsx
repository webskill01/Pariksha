// Optimized CompactPaperCard component for grid layout
import { DeleteOutlined, DownloadOutlined, PictureAsPdf, VisibilityOutlined } from "@mui/icons-material"
import { useState } from "react"
import StatusBadge from "./StatusBadge"
import { Link } from "react-router-dom"
export function CompactPaperCard({ paper, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isDeleting) return
    
    setIsDeleting(true)
    try {
      await onDelete(paper._id)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!paper) return null

  return (
    <div className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02] hover:border-slate-600/50 backdrop-blur-sm h-full flex flex-col min-w-[43vw]">
      
      {/* Header with Icon and Status */}
      <div className="p-3 pb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex-shrink-0 p-1.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30">
            <PictureAsPdf className="text-red-400 text-sm" />
          </div>
          <div >
            <StatusBadge status={paper.status} />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          {paper.title || 'Untitled Paper'}
        </h3>
        
        {/* Subject */}
        <p className="text-cyan-400 font-medium text-xs truncate">
          {paper.subject || 'Unknown Subject'}
        </p>
      </div>

      {/* Paper Details - Compact Grid */}
      <div className="px-3 pb-2 flex-1">
        <div className="bg-slate-900/40 rounded-md p-2 border border-slate-700/30">
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
              <span className="text-slate-300 truncate">{paper.class}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
              <span className="text-slate-300 truncate">{paper.semester}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
              <span className="text-slate-300 truncate">{paper.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0"></div>
              <span className="text-slate-300 truncate">{paper.examType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Stats and Actions */}
      <div className="p-3 pt-0 mt-auto">
        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-1">
            <DownloadOutlined style={{ fontSize: '14px' }} className="text-cyan-400" />
            <span className="font-medium">{paper.downloadCount || 0}</span>
          </div>
          <div className="text-right min-w-0">
            <span className="text-slate-500 truncate">
              {paper.uploadedBy?.name || 'Anonymous'}
              {console.log(paper)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full">
          {paper.status === 'approved' && (
            <Link
              to={`/papers/${paper._id}`}
              className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/60 hover:text-white rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 group/btn"
            >
              <VisibilityOutlined style={{ fontSize: '14px' }} />
              <span>View Paper</span>
            </Link>
          )}

          {(paper.status === 'pending' || paper.status === 'rejected') && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 text-red-300 hover:from-red-500/30 hover:to-red-600/30 hover:border-red-400/60 hover:text-white rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DeleteOutlined style={{ fontSize: '14px' }} />
              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
