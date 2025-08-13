// Frontend/src/components/auth/AdminRoute.jsx - Admin route protection
import { Navigate } from 'react-router-dom'
import { authService } from '../../services/authService'

function AdminRoute({ children }) {
  const user = authService.getCurrentUser()
  
  // Check if user is logged in
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  // Check if user is admin using your existing logic
  const adminEmails = ["nitinemailss@gmail.com"] 
  
  if (!adminEmails.includes(user.email)) {
    // Redirect non-admin users to regular dashboard
    return <Navigate to="/dashboard" replace />
  }

  // User is admin, render admin dashboard
  return children
}

export default AdminRoute
