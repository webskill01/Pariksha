import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Visibility,
  VisibilityOff,
  PersonAdd,
  Person,
  Email,
  School,
  Lock,
  ArrowForward,
  CalendarToday,
} from "@mui/icons-material";

import { registerSchema } from "../../schemas/authSchemas.js";
import { authService } from "../../services/authService.js";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      rollNumber: "",
      class: "",
      semester: "",
      year: "", // Added year field
      password: "",
      confirmPassword: "",
    },
  });

  // Watch form fields to clear errors on input
  const watchedFields = watch();

  useEffect(() => {
    // Clear errors when user starts typing
    Object.keys(watchedFields).forEach((field) => {
      if (watchedFields[field] && errors[field]) {
        clearErrors(field);
      }
    });
  }, [watchedFields, errors, clearErrors]);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;

      await authService.register(userData);
      toast.success("Registration successful! You can now login.");
      navigate("/auth/login");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      // Handle field-specific errors
      if (errorMessage.toLowerCase().includes("email")) {
        setError("email", {
          type: "server",
          message: "This email is already registered",
        });
      } else if (errorMessage.toLowerCase().includes("roll number")) {
        setError("rollNumber", {
          type: "server",
          message: "This roll number is already registered",
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-bg overflow-hidden">
      {/* Background decoration - Fixed to prevent horizontal scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10 mx-auto">
        {/* Register Card - Fixed with proper constraints */}
        <div className="card glass-strong shadow-2xl backdrop-blur-xl mx-4 sm:mx-0">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3 tracking-tight">
                Join Pariksha
              </h1>
              <p className="text-slate-400 text-base sm:text-lg">
                Create your account to access question papers
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4"></div>
            </div>
            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="form-label flex items-center space-x-2">
                    <Person className="text-slate-400" fontSize="small" />
                    <span>Full Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className={`
                        form-input
                        ${errors.name ? "form-input-error" : ""}
                      `}
                      {...register("name")}
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.name && (
                    <div className="form-error">
                      <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="break-words">{errors.name.message}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="form-label flex items-center space-x-2">
                    <Email className="text-slate-400" fontSize="small" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`
                        form-input
                        ${errors.email ? "form-input-error" : ""}
                      `}
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.email && (
                    <div className="form-error">
                      <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="break-words">
                        {errors.email.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Roll Number */}
              <div className="space-y-2">
                <label className="form-label flex items-center space-x-2">
                  <School className="text-slate-400" fontSize="small" />
                  <span>Roll Number</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 13485"
                    className={`
                      form-input
                      ${errors.rollNumber ? "form-input-error" : ""}
                    `}
                    {...register("rollNumber")}
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.rollNumber && (
                  <div className="form-error">
                    <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                    <span className="break-words">
                      {errors.rollNumber.message}
                    </span>
                  </div>
                )}
                {!errors.rollNumber && (
                  <div className="flex items-center space-x-2 text-slate-500 text-xs">
                    <div className="w-1 h-1 bg-slate-500 rounded-full flex-shrink-0"></div>
                    <span>Your official college roll number</span>
                  </div>
                )}
              </div>

              {/* Class, Semester and Year Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Class Field */}
                <div className="space-y-2">
                  <label className="form-label flex items-center space-x-2">
                    <School className="text-slate-400" fontSize="small" />
                    <span>Class</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. BCA or B.Com"
                      className={`
                        form-input
                        ${errors.class ? "form-input-error" : ""}
                      `}
                      {...register("class")}
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.class && (
                    <div className="form-error">
                      <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="break-words">
                        {errors.class.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Semester Field */}
                <div className="space-y-2">
                  <label className="form-label flex items-center space-x-2">
                    <School className="text-slate-400" fontSize="small" />
                    <span>Semester</span>
                  </label>
                  <div className="relative">
                    <select
                      className={`
                        form-input appearance-none
                        ${errors.semester ? "form-input-error" : ""}
                      `}
                      {...register("semester")}
                      disabled={isSubmitting}
                    >
                      <option value="" className="bg-slate-800">
                        Select semester
                      </option>
                      <option value="1st" className="bg-slate-800">
                        1st Semester
                      </option>
                      <option value="2nd" className="bg-slate-800">
                        2nd Semester
                      </option>
                      <option value="3rd" className="bg-slate-800">
                        3rd Semester
                      </option>
                      <option value="4th" className="bg-slate-800">
                        4th Semester
                      </option>
                      <option value="5th" className="bg-slate-800">
                        5th Semester
                      </option>
                      <option value="6th" className="bg-slate-800">
                        6th Semester
                      </option>
                    </select>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.semester && (
                    <div className="form-error">
                      <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="break-words">
                        {errors.semester.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Year Field */}
                <div className="space-y-2">
                  <label className="form-label flex items-center space-x-2">
                    <CalendarToday
                      className="text-slate-400"
                      fontSize="small"
                    />
                    <span>Year</span>
                  </label>
                  <div className="relative">
                    <select
                      className={`
                        form-input appearance-none
                        ${errors.year ? "form-input-error" : ""}
                      `}
                      {...register("year")}
                      disabled={isSubmitting}
                    >
                      <option value="" className="bg-slate-800">
                        Select year
                      </option>
                      <option value="1st" className="bg-slate-800">
                        1st Year
                      </option>
                      <option value="2nd" className="bg-slate-800">
                        2nd Year
                      </option>
                      <option value="3rd" className="bg-slate-800">
                        3rd Year
                      </option>
                    </select>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.year && (
                    <div className="form-error">
                      <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="break-words">{errors.year.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Field */}
                <div className="space-y-2">
                  <label className="form-label flex items-center space-x-2">
                    <Lock className="text-slate-400" fontSize="small" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className={`
                        form-input pr-12
                        ${errors.password ? "form-input-error" : ""}
                      `}
                      {...register("password")}
                      disabled={isSubmitting}
                    />
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
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.password && (
                    <div className="form-error">
                      <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="break-words">
                        {errors.password.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="form-label flex items-center space-x-2">
                    <Lock className="text-slate-400" fontSize="small" />
                    <span>Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className={`
                        form-input pr-12
                        ${errors.confirmPassword ? "form-input-error" : ""}
                      `}
                      {...register("confirmPassword")}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-all duration-300 p-1 rounded-full hover:bg-slate-700/50"
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.confirmPassword && (
                    <div className="form-error">
                      <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="break-words">
                        {errors.confirmPassword.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                {...register("agreeToTerms")}
                className="mt-1 w-4 h-4 text-cyan-500 border border-slate-600 rounded focus:ring-cyan-500 focus:border-cyan-500"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-slate-300">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
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
                    <span className="font-medium text-sm sm:text-base">
                      Creating Account...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3 relative z-10 transition-transform duration-300 group-hover:scale-105">
                    <PersonAdd className="transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium text-sm sm:text-base">
                      Create Account
                    </span>
                    <ArrowForward
                      className={`transition-all duration-300 ${
                        isHovered
                          ? "translate-x-0.5 opacity-100"
                          : "translate-x-0 opacity-70"
                      }`}
                      fontSize="small"
                    />
                  </div>
                )}
              </button>
            </form>
            
            {/* Footer Link */}
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
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 relative group"
                >
                  Sign in here
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

export default Register;
