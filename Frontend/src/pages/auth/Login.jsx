// Frontend/src/pages/auth/Login.jsx - Complete corrected version with fixes

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Person,
  Lock,
  ArrowForward,
} from "@mui/icons-material";

import { loginSchema } from "../../schemas/authSchemas";
import { authService } from "../../services/authService";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      rollNumber: "",
      password: "",
    },
  });

  // Watch form fields to clear errors on input
  const watchedFields = watch();

  useEffect(() => {
    // Clear roll number error when user starts typing
    if (watchedFields.rollNumber && errors.rollNumber) {
      clearErrors("rollNumber");
    }
  }, [watchedFields.rollNumber, errors.rollNumber, clearErrors]);

  useEffect(() => {
    // Clear password error when user starts typing
    if (watchedFields.password && errors.password) {
      clearErrors("password");
    }
  }, [watchedFields.password, errors.password, clearErrors]);

  // ✅ FIXED: Form submission handler with proper error handling and delay
  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      
      if (response.success) {
        const user = response.data.user;
        const adminEmails = ["nitinemailss@gmail.com"]; // Same as your backend middleware
        
        toast.success('Login successful!');
        
        // ✅ CRITICAL: Small delay ensures localStorage is fully updated before redirect
        setTimeout(() => {
          if (adminEmails.includes(user.email)) {
            navigate('/admin/dashboard', { replace: true }); // Admin users go to admin dashboard
          } else {
            navigate('/dashboard', { replace: true }); // Regular users go to user dashboard
          }
        }, 100); // 100ms delay ensures state synchronization
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // ✅ IMPROVED: Better error handling
      if (error.message?.includes("roll number")) {
        setError("rollNumber", {
          type: "server",
          message: error.message,
        });
      } else if (error.message?.includes("password")) {
        setError("password", {
          type: "server",
          message: error.message,
        });
      } else {
        toast.error(error.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-bg overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 mx-auto">
        {/* Login Card */}
        <div className="card glass-strong shadow-2xl backdrop-blur-xl mx-4 sm:mx-0">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-slate-400 text-base sm:text-lg">
                Log in to upload papers and access your dashboard
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Roll Number Field */}
              <div className="space-y-2">
                <label className="form-label flex items-center space-x-2">
                  <Person className="text-slate-400" fontSize="small" />
                  <span>Roll Number</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 16347"
                    className={`
                      form-input
                      ${errors.rollNumber ? "form-input-error" : ""}
                    `}
                    {...register("rollNumber")}
                    disabled={isSubmitting}
                  />
                  {/* Focus glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Error message */}
                {errors.rollNumber && (
                  <div className="form-error">
                    <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                    <span className="break-words">{errors.rollNumber.message}</span>
                  </div>
                )}

                {/* Helper text - only show when no error */}
                {!errors.rollNumber && (
                  <div className="flex items-center space-x-2 text-slate-500 text-xs">
                    <div className="w-1 h-1 bg-slate-500 rounded-full flex-shrink-0"></div>
                    <span>Enter your college roll number</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="form-label flex items-center space-x-2">
                  <Lock className="text-slate-400" fontSize="small" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`
                      form-input pr-12
                      ${errors.password ? "form-input-error" : ""}
                    `}
                    {...register("password")}
                    disabled={isSubmitting}
                  />

                  {/* Password toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-all duration-300 p-1 rounded-full hover:bg-slate-700/50"
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </button>

                  {/* Focus glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Error message */}
                {errors.password && (
                  <div className="form-error">
                    <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                    <span className="break-words">{errors.password.message}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="btn-primary btn-lg w-full mt-8 relative overflow-hidden group min-h-[3.5rem]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="font-medium text-sm sm:text-base">Logging In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3 relative z-10 transition-transform duration-300 group-hover:scale-105">
                    <span className="font-medium text-sm sm:text-base">Log In</span>
                    <ArrowForward fontSize="small" />
                  </div>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-slate-500">or</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm sm:text-base px-4">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 relative group"
                >
                  Create one here
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
