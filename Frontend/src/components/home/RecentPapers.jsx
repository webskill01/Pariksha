// Frontend/src/components/home/RecentPapers.jsx

import { Link } from 'react-router-dom'
import { ArrowForward, TrendingUp } from '@mui/icons-material'
import PaperCard from '../papers/PaperCard'

function RecentPapers({ papers, loading }) {
  if (loading) {
    return (
      <div className="py-16 sm:py-20 lg:py-24 bg-slate-800/50">
        <div className="container-custom">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading recent papers...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-slate-800/50">
      <div className="container-custom">
        
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <div className="text-center sm:text-left mb-8 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              <TrendingUp className="inline-block text-cyan-400 mr-4" />
              Recent Papers
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl">
              Fresh papers uploaded by your fellow students. Get the latest study materials!
            </p>
          </div>
          
          <Link 
            to="/papers" 
            className="btn-lg btn-outline flex items-center space-x-3 group"
          >
            <span>View All Papers</span>
            <ArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Papers grid */}
        {papers && papers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {papers.slice(0, 6).map((paper) => (
              <PaperCard
                key={paper._id}
                paper={paper}
                onDownload={() => {
                  // Handle download from homepage
                  console.log('Download paper:', paper._id)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No recent papers available. Be the first to share!
            </p>
            <Link to="/upload" className="btn-md btn-primary mt-4">
              Upload First Paper
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentPapers
