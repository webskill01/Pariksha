// Frontend/src/pages/Privacy.jsx - Mobile-optimized privacy policy
import { 
    Shield, 
    Lock, 
    Storage,
    Visibility
} from "@mui/icons-material";

function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container-custom px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6">
            <Shield className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-400">How we protect and handle your data</p>
        </div>

        {/* Privacy Cards - Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <Visibility className="text-cyan-400 text-xl mr-3" />
              <h2 className="text-lg font-bold text-white">Data Collection</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              We collect minimal data: name, email, roll number, and uploaded
              files. No sensitive personal information is stored.
            </p>
          </div>

          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <Storage className="text-green-400 text-xl mr-3" />
              <h2 className="text-lg font-bold text-white">Data Usage</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your data is used only for platform functionality: user
              authentication, paper management, and improving service quality.
            </p>
          </div>

          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <Lock className="text-blue-400 text-xl mr-3" />
              <h2 className="text-lg font-bold text-white">Data Security</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              We use encryption, secure cloud storage, and regular security
              audits to protect your information.
            </p>
          </div>

          <div className="card glass-strong p-6">
            <div className="flex items-center mb-4">
              <Shield className="text-purple-400 text-xl mr-3" />
              <h2 className="text-lg font-bold text-white">Your Rights</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              You can access, modify, or delete your data anytime. Contact us
              for data removal requests.
            </p>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="card glass-strong p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-3">In Short</h3>
          <p className="text-slate-300 leading-relaxed">
            Pariksha respects your privacy. We collect only necessary data,
            never sell your information, and provide full control over your
            data. Questions?{" "}
            <span className="text-cyan-400">Contact us anytime.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
