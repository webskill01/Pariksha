// Frontend/src/components/home/HowItWorks.jsx - Mobile-optimized version

import { 
  PersonAdd, 
  Upload, 
  Search, 
  Download,
  ArrowForward 
} from '@mui/icons-material'

function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: <PersonAdd className="text-3xl" />,
      title: 'Create Account',
      description: 'Sign up with your college details to join our student community.',
      color: 'blue'
    },
    {
      step: '02', 
      icon: <Upload className="text-3xl" />,
      title: 'Share Papers',
      description: 'Upload your question papers to help fellow students prepare better.',
      color: 'green'
    },
    {
      step: '03',
      icon: <Search className="text-3xl" />,
      title: 'Discover Content', 
      description: 'Search and filter through thousands of papers by subject, class, and exam type.',
      color: 'purple'
    },
    {
      step: '04',
      icon: <Download className="text-3xl" />,
      title: 'Download & Study',
      description: 'Access high-quality PDFs instantly and ace your upcoming exams.',
      color: 'cyan'
    }
  ]

  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500 text-blue-400',
    green: 'from-green-500 to-emerald-500 text-green-400', 
    purple: 'from-purple-500 to-violet-500 text-purple-400',
    cyan: 'from-cyan-500 to-teal-500 text-cyan-400'
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-slate-900">
      <div className="container-custom px-4">
        
        {/* Compact Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            How It 
            <span className="gradient-text"> Works</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Getting started with Pariksha is simple. Follow these four easy steps 
            to join our growing community.
          </p>
        </div>

        {/* Mobile-Optimized Steps Grid */}
        <div className="relative">
          
          {/* Responsive Grid: 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                
                {/* Compact Step Container */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group-hover:bg-slate-800/50 min-h-52">
                  
                  {/* Step Number - Smaller for mobile */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-r ${colorClasses[step.color].replace('text-', 'from-').replace('-400', '-500/20')} flex items-center justify-center relative`}>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-white">
                      {step.step}
                    </span>
                  </div>

                  {/* Icon - Responsive sizing */}
                  <div className={`mb-2 sm:mb-3 ${colorClasses[step.color]} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-2xl sm:text-3xl">
                      {step.icon}
                    </div>
                  </div>

                  {/* Compact Content */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-tight line-clamp-3 lg:line-clamp-none min-h-14 ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks