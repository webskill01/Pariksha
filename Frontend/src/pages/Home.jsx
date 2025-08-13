// Frontend/src/pages/Home.jsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { homeService } from '../services/homeService'
import HeroSection from '../components/home/HeroSection'
import FeaturesSection from '../components/home/FeaturesSection'
import HowItWorks from '../components/home/HowItWorks'

function Home() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch homepage data
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Only fetch stats now - remove papers fetching
        const statsResponse = await homeService.getHomeStats()
        
        setStats(statsResponse.data)
      } catch (error) {
        console.error('Failed to fetch homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection stats={stats} />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Call-to-Action Section - Smaller fonts */}
<div className="py-12 bg-gradient-to-br from-cyan-600 to-blue-800 sm:py-16 lg:py-20 ">
  <div className="container-custom text-center">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
      Ready to Excel in Your Studies?
    </h2>
    <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
      Join thousands of students who are already using Pariksha to access quality study materials 
      and improve their academic performance.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link 
        to="/auth/register" 
        className="btn-md bg-white text-blue-800 hover:bg-blue-50  font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Get Started Free
      </Link>
      <Link 
        to="/papers" 
        className="btn-md btn-outline border-white text-white hover:bg-white hover:scale-105 hover:text-blue-800"
      >
        Browse Papers
      </Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default Home
