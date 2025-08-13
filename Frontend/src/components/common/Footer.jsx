// Frontend/src/components/common/Footer.jsx - Mobile-Optimized with Grid Structure

import { Link } from "react-router-dom";
import { 
  GitHub, 
  LinkedIn, 
  Favorite,
  Home,
  LibraryBooks,
  CloudUpload,
  Dashboard,
  Info,
  ContactSupport,
  Security,
  Gavel,
  Help,
  Twitter,
  Instagram,
  Facebook
} from "@mui/icons-material";
import { authService } from "../../services/authService";
import { useState } from "react";
import { useEffect } from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
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

  const isUserAdmin = () => {
    return currentUser?.role === 'admin' ||
           currentUser?.isAdmin === true ||
           currentUser?.userType === 'admin' ||
           ['nitinemailss@gmail.com'].includes(currentUser?.email);
  };
  // Quick Links - Main navigation
  const quickLinks = [
  { label: 'Home', path: '/', icon: <Home fontSize="small" /> },
  { label: 'Browse Papers', path: '/papers', icon: <LibraryBooks fontSize="small" /> },
  
  //  Only show if user is logged in
  ...(isAuthenticated ? [
    { label: 'Upload Paper', path: '/upload', icon: <CloudUpload fontSize="small" /> },
    { 
      label: isUserAdmin() ? 'Admin Panel' : 'Dashboard', 
      path: isUserAdmin() ? '/admin/dashboard' : '/dashboard', 
      icon: <Dashboard fontSize="small" /> 
    }
  ] : [])
];


  // Support Links - Help and legal pages
  const supportLinks = [
    { label: 'About Us', path: '/about', icon: <Info fontSize="small" /> },
    { label: 'Privacy Policy', path: '/privacy', icon: <Security fontSize="small" /> },
    { label: 'Terms of Service', path: '/terms', icon: <Gavel fontSize="small" /> },
    { label: 'FAQ', path: '/faq', icon: <Help fontSize="small" /> }
  ];

  // Social Media Links
  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/webskill01', icon: <GitHub /> },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nitin-kumar-1110mn/', icon: <LinkedIn /> },
     { label: 'Twitter', url: 'https://x.com/NitinKumar22655', icon: <Twitter /> },
    { label: 'Instagram', url: 'https://www.instagram.com/nitin.kumar.01?igsh=MW9vMHNyNDVieG9sOA==', icon: <Instagram /> },
    { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100014537138957', icon: <Facebook /> }
  ];
  

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 mt-auto">
      <div className="container-custom py-8 sm:py-12 ">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-20 justify-items-center ">

          {/* Quick Links Section - Mobile-Optimized Grid */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center sm:justify-start space-x-2">
              <LibraryBooks className="text-cyan-400" fontSize="small" />
              <span>Quick Links</span>
            </h3>
            
            {/* Mobile: 2-column grid, Desktop: 1-column */}
            <div className="grid grid-cols-2 justify-center pl-[22px] sm:grid-cols-1 gap-2 sm:gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300 text-sm group"
                >
                  <span className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Support Links Section - Mobile-Optimized Grid */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center sm:justify-start space-x-2">
              <ContactSupport className="text-cyan-400" fontSize="small" />
              <span>Support</span>
            </h3>
            
            {/* Mobile: 2-column grid, Desktop: 1-column */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 pl-[22px] sm:gap-3">
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300 text-sm group"
                >
                  <span className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center justify-center lg:justify-start space-x-2">
              <Favorite className="text-cyan-400" fontSize="small" />
              <span>Connect</span>
            </h3>


            {/* Social Media Links */}
            <div>
              <p className="text-slate-400 text-sm mb-3 text-center lg:text-left">Follow us on</p>
              <div className="flex justify-center  lg:justify-start space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-800 hover:bg-gradient-to-br hover:from-cyan-600 hover:to-blue-700 text-slate-400 hover:text-white rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-2 sm:my-8 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

        {/* Bottom Footer - Mobile-Optimized */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <span>© {currentYear} Pariksha.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-700"></div>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Favorite className="text-red-400 text-base" />
              <span>by Nitin Kumar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
