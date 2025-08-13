// Frontend/src/pages/user/Dashboard.jsx - Complete Mobile-Optimized Dashboard

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Upload,
  CheckCircleOutline,
  ScheduleOutlined,
  CancelOutlined,
  DownloadOutlined,
  VisibilityOutlined,
  Add,
  Description,
} from "@mui/icons-material";

import { authService } from "../../services/authService";
import { CompactPaperCard } from "../../components/ui/CompactPaperCard";

// Compact Stats Card Component
function StatsCard({ title, value, icon, color, description }) {
  const colorVariants = {
    blue: "from-cyan-500/20 to-blue-600/20 border-cyan-500/30",
    green: "from-emerald-500/20 to-green-600/20 border-emerald-500/30",
    yellow: "from-yellow-500/20 to-amber-600/20 border-yellow-500/30",
    red: "from-red-500/20 to-rose-600/20 border-red-500/30",
    purple: "from-purple-500/20 to-violet-600/20 border-purple-500/30",
  };

  const iconColorVariants = {
    blue: "text-cyan-400",
    green: "text-emerald-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    purple: "text-purple-400",
  };

  return (
    <div
      className={`
      card glass-strong p-3 sm:p-4 border bg-gradient-to-br 
      ${colorVariants[color]} 
      hover:scale-105 transform transition-all duration-300
      hover:shadow-lg hover:shadow-${color}-500/10
    `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium mb-1 truncate">
            {title}
          </p>
          <p className="text-lg sm:text-2xl font-bold text-white mb-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {description && (
            <p className="text-slate-500 text-xs leading-tight truncate">
              {description}
            </p>
          )}
        </div>
        <div
          className={`
          p-1.5 sm:p-2 rounded-lg bg-white/5 backdrop-blur-sm flex-shrink-0 ml-2
          ${iconColorVariants[color]}
        `}
        >
          <div className="text-base sm:text-lg">{icon}</div>
        </div>
      </div>
    </div>
  );
}


// Main Dashboard Component
function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredPapers, setFilteredPapers] = useState([]);

  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter papers when filter changes
  useEffect(() => {
    if (dashboardData?.data?.papers) {
      if (selectedFilter === "all") {
        setFilteredPapers(dashboardData.data.papers);
      } else {
        setFilteredPapers(
          dashboardData.data.papers.filter(
            (paper) => paper.status === selectedFilter
          )
        );
      }
    }
  }, [selectedFilter, dashboardData]);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      const response = await authService.getDashboard();
      setDashboardData(response);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load dashboard data");

      if (
        error.message?.includes("unauthorized") ||
        error.message?.includes("token")
      ) {
        navigate("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle paper deletion
  const handleDeletePaper = async (paperId) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) {
      return;
    }

    try {
      await authService.deleteMyPaper(paperId);
      toast.success("Paper deleted successfully");

      // Refresh dashboard data
      fetchDashboardData();
    } catch (error) {
      toast.error(error.message || "Failed to delete paper");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container-custom py-16">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-slate-400">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!dashboardData) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Failed to load dashboard</p>
          <button onClick={fetchDashboardData} className="btn-md btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { stats, papers } = dashboardData.data;

  return (
    <div className="container-custom py-3 sm:py-8">
      {/* Welcome Header - Mobile Optimized */}
      <div className="mb-4 sm:mb-8">
        <div className="flex flex-col space-y-3 mb-4 sm:mb-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold gradient-text mb-2">
              Welcome back, {user?.name?.split(" ")[0] || "Student"}!
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg">
              {user?.class} • {user?.semester} Semester • Roll #
              {user?.rollNumber}
            </p>
          </div>

          {/* Quick Actions - Stack on mobile */}
          <div className="flex flex-row sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">
            <Link
              to="/upload"
              className="btn-sm btn-primary flex items-center justify-center space-x-2"
            >
              <Add fontSize="small" />
              <span>Upload Paper</span>
            </Link>
            <Link
              to="/papers"
              className="btn-sm btn-secondary flex items-center justify-center space-x-2"
            >
              <VisibilityOutlined fontSize="small" />
              <span>Browse Papers</span>
            </Link>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>

      {/* Statistics Cards - Mobile-Optimized Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-6 mb-6 sm:mb-8">
        <StatsCard
          title="Total Papers"
          value={stats.total}
          icon={<Description />}
          color="blue"
          description="Uploaded"
        />

        <StatsCard
          title="Approved"
          value={stats.approved}
          icon={<CheckCircleOutline />}
          color="green"
          description="Live"
        />

        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={<ScheduleOutlined />}
          color="yellow"
          description="Review"
        />

        <StatsCard
          title="Rejected"
          value={stats.rejected}
          icon={<CancelOutlined />}
          color="red"
          description="Revision"
        />

        {/* Downloads card spans 2 columns on mobile */}
        <div className="col-span-2 sm:col-span-1">
          <StatsCard
            title="Downloads"
            value={stats.totalDownloads}
            icon={<DownloadOutlined />}
            color="purple"
            description="Total"
          />
        </div>
      </div>

      {/* My Papers Section - Mobile Optimized */}
      <div className="card glass-strong">
        <div className="p-4 sm:p-6 border-b border-slate-700/50 bg-slate-800/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-0">
              My Papers
            </h2>

            {/* Filter Buttons - Mobile Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {[
                { key: "all", label: "All", count: stats.total },
                { key: "approved", label: "Approved", count: stats.approved },
                { key: "pending", label: "Pending", count: stats.pending },
                { key: "rejected", label: "Rejected", count: stats.rejected },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`
                    btn-sm transition-all duration-200 text-xs
                    ${
                      selectedFilter === filter.key
                        ? "btn-primary"
                        : "btn-ghost border border-slate-600 hover:border-slate-500"
                    }
                  `}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 sm:p-6">
          {filteredPapers.length === 0 ? (
            /* Empty State - Compact */
            <div className="text-center py-8">
              <Upload className="text-slate-600 text-4xl sm:text-6xl mb-4 mx-auto" />
              <h3 className="text-base sm:text-xl font-semibold text-slate-400 mb-2">
                {selectedFilter === "all"
                  ? "No papers uploaded yet"
                  : `No ${selectedFilter} papers`}
              </h3>
              <p className="text-slate-500 mb-4 sm:mb-6 text-sm sm:text-base">
                {selectedFilter === "all"
                  ? "Upload your first question paper to get started!"
                  : `You don't have any ${selectedFilter} papers yet.`}
              </p>
              <Link to="/upload" className="btn-md btn-primary">
                Upload Your First Paper
              </Link>
            </div>
          ) : (
            // {/* Papers Grid - Enhanced Layout */}
            <div className="papers-grid-enhanced">
              {filteredPapers.map((paper) => (
                <CompactPaperCard
                  key={paper._id}
                  paper={paper}
                  onDelete={handleDeletePaper}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
