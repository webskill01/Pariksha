// Frontend/src/components/ui/StatsCard.jsx - Mobile-optimized version

function StatsCard({ title, value, icon, color, description }) {
  const colorVariants = {
    blue: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30',
    green: 'from-emerald-500/20 to-green-600/20 border-emerald-500/30',
    yellow: 'from-yellow-500/20 to-amber-600/20 border-yellow-500/30',
    red: 'from-red-500/20 to-rose-600/20 border-red-500/30',
    purple: 'from-purple-500/20 to-violet-600/20 border-purple-500/30'
  }

  const iconColorVariants = {
    blue: 'text-cyan-400',
    green: 'text-emerald-400', 
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    purple: 'text-purple-400'
  }

  return (
    <div className={`
      card glass-strong p-3 sm:p-4 border bg-gradient-to-br 
      ${colorVariants[color]} 
      hover:scale-105 transform transition-all duration-300
      hover:shadow-lg hover:shadow-${color}-500/10
    `}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          {/* Title - Smaller on mobile */}
          <p className="text-slate-400 text-xs font-medium mb-1 truncate">
            {title}
          </p>
          
          {/* Value - Responsive sizing */}
          <p className="text-lg sm:text-2xl font-bold text-white mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {/* Description - Tiny text */}
          {description && (
            <p className="text-slate-500 text-xs leading-tight truncate">
              {description}
            </p>
          )}
        </div>
        
        {/* Icon - Smaller */}
        <div className={`
          p-1.5 sm:p-2 rounded-lg bg-white/5 backdrop-blur-sm flex-shrink-0 ml-2
          ${iconColorVariants[color]}
        `}>
          <div className="text-base sm:text-lg">
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
