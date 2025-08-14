// Frontend/src/components/ui/StatusBadge.jsx

import { CheckCircle, Schedule, Cancel, Visibility } from '@mui/icons-material'

function StatusBadge({ status }) {
  // Status configurations with colors and icons
  const statusConfig = {
    approved: {
      label: 'Approved',
      color: 'badge-success',
      icon: <CheckCircle fontSize="small" />
    },
    pending: {
      label: 'Pending Review',
      color: 'badge-warning',
      icon: <Schedule fontSize="small" />
    },
    rejected: {
      label: 'Rejected',
      color: 'badge-error',
      icon: <Cancel fontSize="small" />
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <div className={`badge ${config.color} flex gap-1 items-center justify-center w-[95px]`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  )
}

export default StatusBadge
