// Frontend/src/components/papers/PaperCard.jsx - Lightweight Mobile-Optimized

import { Link } from 'react-router-dom'
import { 
  PictureAsPdf, 
  VisibilityOutlined
} from '@mui/icons-material'
import StatusBadge from '../ui/StatusBadge'

function PaperCard({ paper }) {
  if (!paper) return null

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group h-full flex flex-col">
      
      {/* Header with Icon and Status */}
      <div className="flex items-center justify-center mb-3 gap-[7px] ">
        <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300">
          <PictureAsPdf className="text-red-400 text-lg" />
        </div>
        <StatusBadge status={paper.status} />
      </div>

      {/* Paper Title - Main Focus */}
      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
        {paper.title || 'Untitled Paper'}
      </h3>

      {/* Essential Details Only */}
      <div className="space-y-1.5 mb-3 flex-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-cyan-400">{paper.subject || 'N/A'}</span>
          <span>{paper.year || 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{paper.class || 'N/A'}</span>
          <span>{paper.examType || 'N/A'}</span>
        </div>
      </div>

      {/* Single Action Button - Now at Bottom */}
      <div className="mt-auto">
        <Link
          to={`/papers/${paper._id}`}
          className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/60 hover:text-white rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-1 group/btn"
        >
          <VisibilityOutlined fontSize="small" className="group-hover/btn:scale-110 transition-transform duration-300" />
          <span>View Details</span>
        </Link>
      </div>
    </div>
  )
}

export default PaperCard
