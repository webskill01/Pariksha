// Frontend/src/components/home/FeaturesSection.jsx - Updated for 2 columns on mobile

import { 
  CloudDownload, 
  Security, 
  Speed, 
  People, 
  FilterList,
  PhoneIphoneOutlined
} from '@mui/icons-material'

function FeaturesSection() {
  const features = [
    {
      icon: <CloudDownload className="text-4xl" />,
      title: 'Instant Downloads',
      description: 'Download papers instantly in high-quality PDF format. No waiting, no complications.',
      color: 'blue'
    },
    {
      icon: <FilterList className="text-4xl" />,
      title: 'Smart Filtering',
      description: 'Find exactly what you need with advanced filters by subject, class, semester, and exam type.',
      color: 'green'
    },
    {
      icon: <People className="text-4xl" />,
      title: 'Community Driven',
      description: 'Papers shared by students, for students. Join a thriving academic community.',
      color: 'purple'
    },
    {
      icon: <Security className="text-4xl" />,
      title: 'Quality Assured',
      description: 'All papers are reviewed and verified before being made available to the community.',
      color: 'yellow'
    },
    {
      icon: <Speed className="text-4xl" />,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant search results and blazing-fast downloads.',
      color: 'red'
    },
    {
      icon: <PhoneIphoneOutlined className="text-4xl" />,
      title: 'Mobile Friendly',
      description: 'Access papers anywhere, anytime. Fully responsive design works on all devices.',
      color: 'cyan'
    }
  ]

  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
    purple: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400',
    yellow: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400',
    red: 'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400',
    cyan: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400'
  }

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-slate-900">
      <div className="container-custom">
        
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Students Choose 
            <span className="block gradient-text">Pariksha?</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We've built the ultimate platform for academic resource sharing with features 
            designed by students, for students.
          </p>
        </div>

        {/* Features grid - UPDATED: 2 columns on mobile, 3 on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card glass border bg-gradient-to-br ${colorClasses[feature.color]} p-4 sm:p-6 hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-center">
                <div className={`mb-3 sm:mb-4 ${colorClasses[feature.color].split(' ').pop()}`}>
                  <div className="text-2xl sm:text-3xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
