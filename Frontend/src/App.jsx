import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import {ThemeProvider} from "@mui/material/styles"
import {CssBaseline} from "@mui/material"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import muiTheme from "./theme/muiTheme"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import Header from "./components/common/Header"
import Footer from "./components/common/Footer"

import Home from "./pages/Home"
import Dashboard from "./pages/user/Dashboard"
import UploadPaper from "./pages/papers/UploadPaper"
import BrowsePapers from "./pages/papers/BrowsePapers"
import PaperDetail from "./pages/papers/PaperDetail"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminRoute from "./components/auth/AdminRoute"
import About from "./pages/About"
import Privacy from "./pages/Privacy"
import FAQ from "./pages/Faqs"
import Terms from "./pages/Terms"
import ScrollToTop from "./utils/ScrollToTop"

const App = () => {
  return (
    <div>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline/>
        <Router>
          <div className=" min-h-screen gradient-bg flex flex-col">
            <Header/>
            <main className="flex-1 ">
        <ScrollToTop/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/auth/login" element={<Login/>}/>
              <Route path="/auth/register" element={<Register/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/upload" element={<UploadPaper/>}/>
              <Route path="/papers" element={<BrowsePapers/>}/>
              <Route path="/papers/:id" element={<PaperDetail/>}/>
              <Route path="/admin/*" element={
                <AdminRoute>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  {/* Add more admin routes here later */}
                </Routes>
              </AdminRoute>
            } />
            <Route path="/about" element={<About/>}/>
            <Route path="/privacy" element={<Privacy/>}/>
            <Route path="/terms" element={<Terms/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            </Routes>
            </main>
            <Footer/>
             {/* Toast Notifications Container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            draggable
            theme="dark"
          />
          </div>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
