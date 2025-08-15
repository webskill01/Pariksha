// Frontend/src/components/home/HeroSection.jsx

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DismissibleAlert from '../../utils/Alert';
import { 
  Search, 
  LibraryBooks,
  ArrowForward,
  School,
  UploadFileOutlined
} from '@mui/icons-material'
import { authService } from "../../services/authService";

function HeroSection({ stats }) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/papers?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
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
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

        <DismissibleAlert message={"The DataBase Might Take 20s-30s To Load When You Open Site For the First Time"} type='info' />
      <div className="container-custom relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main heading - Reduced from text-7xl to text-5xl */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
            Your Gateway to
            <span className="block gradient-text">
              Academic Excellence
            </span>
          </h1>

          {/* Subheading - Reduced from text-3xl to text-xl */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-6 leading-relaxed">
            Access thousands of question papers shared by students, for students. 
            <span className="block text-cyan-400 font-medium mt-1">
              Study smarter, not harder.
            </span>
          </p>

          {/* Search bar - Reduced size */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search papers by subject, class, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-28 py-3 text-base bg-white/10 backdrop-blur-sm border border-slate-600 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium text-sm"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Action buttons - Smaller size */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link 
              to="/papers" 
              className="btn-md btn-primary flex items-center justify-center space-x-2 group hover:scale-105"
            >
              <LibraryBooks fontSize="small" />
              <span>Browse Papers</span>
              <ArrowForward className=" transition-transform duration-300" fontSize="small" />
            </Link>
            
            <Link 
              to={isAuthenticated?"/upload":"/auth/login"}
              className="btn-md btn-outline flex items-center justify-center space-x-2 hover:scale-105"
            >
              {isAuthenticated?<School fontSize="small" />:<UploadFileOutlined fontSize='small'/>}
              <span>{isAuthenticated?"Share Your Papers":"Log in To Share Papers"}</span>
            </Link>
          </div>

          {/* Statistics - Reduced font sizes */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stats?.totalPapers?.toLocaleString() || 'Loading'}
              </div>
              <div className="text-slate-400 font-medium text-sm">Question Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stats?.totalUsers?.toLocaleString() || 'Data'}
              </div>
              <div className="text-slate-400 font-medium text-sm">Students Joined</div>
            </div>
            <div className="text-center">
              <div className="text-3xl  sm:text-4xl font-bold gradient-text mb-1">
                {stats?.totalDownloads?.toLocaleString() || 'Base'}
              </div>
              <div className="text-slate-400 font-medium text-sm">Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
