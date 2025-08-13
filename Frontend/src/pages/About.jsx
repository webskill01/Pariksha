// Frontend/src/pages/About.jsx - Mobile-first, minimal scroll design
import { Link } from 'react-router-dom'
import {
  School,
  CloudUpload,
  People,
  ArrowForward,
  Verified
} from '@mui/icons-material'

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Hero Section - Above the fold */}
      <div className="container-custom pt-8 pb-6">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
            <span className="text-white font-bold text-2xl">📚</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold gradient-text mb-4">
            About Pariksha
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            Empowering students through **collaborative learning** and easy access to quality exam resources
          </p>
        </div>
      </div>

      {/* Main Content - Compact Grid Layout */}
      <div className="container-custom pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
          
          {/* Mission Card */}
          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mr-4">
                <School className="text-cyan-400 text-xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              To democratize education by creating a platform where students can easily access, share, and benefit from past exam papers and study materials.
            </p>
          </div>

          {/* Why Pariksha Card */}
          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <Verified className="text-green-400 text-xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Why Pariksha?</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              We ensure quality through admin verification, maintain an organized repository, and provide mobile-optimized access to help students study efficiently.
            </p>
          </div>

          {/* How It Works Card */}
          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <CloudUpload className="text-blue-400 text-xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">How It Works</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold">1</div>
                <span>Students upload past exam papers</span>
              </div>
              <div className="flex items-center text-slate-300">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold">2</div>
                <span>Admin reviews and verifies quality</span>
              </div>
              <div className="flex items-center text-slate-300">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold">3</div>
                <span>Approved papers become available to all</span>
              </div>
            </div>
          </div>

          {/* Join Community Card */}
          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <People className="text-purple-400 text-xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Join Our Community</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              Be part of a growing platform that helps thousands of students achieve academic success through resource sharing.
            </p>
            
            <Link 
              to="/auth/register"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium"
            >
              <span>Get Started Today</span>
              <ArrowForward fontSize="small" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Section - Optional */}
      <div className="border-t border-slate-700/50 py-8">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">1000+</div>
              <div className="text-slate-400 text-sm">Papers</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">500+</div>
              <div className="text-slate-400 text-sm">Students</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">50+</div>
              <div className="text-slate-400 text-sm">Subjects</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">24/7</div>
              <div className="text-slate-400 text-sm">Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
