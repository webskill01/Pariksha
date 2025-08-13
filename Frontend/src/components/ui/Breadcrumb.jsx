// Frontend/src/components/ui/Breadcrumb.jsx

import { Link } from 'react-router-dom'
import { Home, NavigateNext } from '@mui/icons-material'

function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-6">
      {/* Home Link */}
      <Link 
        to="/" 
        className="flex items-center hover:text-cyan-400 transition-colors duration-200"
      >
        <Home fontSize="small" />
        <span className="ml-1">Home</span>
      </Link>
      
      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <NavigateNext fontSize="small" className="text-slate-600" />
          {item.link && index < items.length - 1 ? (
            <Link 
              to={item.link} 
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-300 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
