import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DeveloperInfo from "../components/DeveloperInfo";
import { useToast } from "../contexts/ToastContext";
import EmailVerificationModal from "../components/EmailVerificationModal";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("ইমেইল অবৈধ").required("ইমেইল প্রয়োজন"),
  password: Yup.string()
    .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
    .required("পাসওয়ার্ড প্রয়োজন"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { showToast } = useToast();
  const location = useLocation();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");

  // Get the redirect path from location state, or default to "/"
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signIn(values);
      showToast("সফলভাবে লগইন হয়েছে", "success");
      navigate("/");
    } catch (error) {
      if (error.message.includes("ইমেইল ভেরিফাই")) {
        setVerificationEmail(values.email);
        setShowVerificationModal(true);
      }
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-bengali w-full flex items-center justify-center relative overflow-hidden">
      {/* Background Effects with enhanced animations */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 animate-gradient bg-gradient-size"
          style={{
            backgroundImage: `
              linear-gradient(
                -45deg,
                #0A0A0F,
                #1a1033,
                #33194d,
                #4d1a66,
                #661a80,
                #4d1a66,
                #33194d,
                #1a1033,
                #0A0A0F
              )
            `,
          }}
        ></div>

        {/* Animated orbs with pulse effect */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float">
          <div className="absolute inset-0 animate-pulse-slow bg-purple-500/20 rounded-full"></div>
        </div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        >
          <div
            className="absolute inset-0 animate-pulse-slow bg-pink-500/20 rounded-full"
            style={{ animationDelay: "-1s" }}
          ></div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-4s" }}
        >
          <div
            className="absolute inset-0 animate-pulse-slow bg-indigo-500/20 rounded-full"
            style={{ animationDelay: "-2s" }}
          ></div>
        </div>

        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent animate-fade-in"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-transparent animate-fade-in delay-150"></div>
      </div>

      <main
        className={`w-full max-w-md mx-auto px-6 py-8 relative z-10 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-8 border border-dark-600/50 shadow-2xl">
          {/* Logo and Title with animation */}
          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full scale-150 animate-float"
              />
              <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-xl animate-pulse-slow"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent animate-gradient bg-300">
              লগইন করুন
            </h1>
          </div>

          {/* Enhanced Error Message */}
          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/50 rounded-xl p-4 mb-6 text-red-500 text-sm animate-shake">
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Enhanced Login Form with Formik */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-1 group">
                  <label className="block text-sm text-text-secondary transition-colors group-focus-within:text-accent-purple">
                    ইমেইল
                  </label>
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      className={`w-full bg-dark-700/50 rounded-xl pl-12 pr-4 py-3 text-text-primary border border-dark-600/50 outline-none transition-all hover:bg-dark-700/70 ${
                        errors.email && touched.email
                          ? "border-red-500/50 focus:border-red-500/50"
                          : "focus:border-accent-purple/50"
                      }`}
                    />
                    <svg
                      className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        errors.email && touched.email
                          ? "text-red-500"
                          : "text-text-tertiary group-focus-within:text-accent-purple"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    {errors.email && touched.email && (
                      <div className="absolute pb-3 -bottom-8 left-0 text-red-500 text-xs">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 group">
                  <label className="block text-sm text-text-secondary transition-colors group-focus-within:text-accent-purple">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`w-full bg-dark-700/50 rounded-xl pl-12 pr-12 py-3 text-text-primary border border-dark-600/50 outline-none transition-all hover:bg-dark-700/70 ${
                        errors.password && touched.password
                          ? "border-red-500/50 focus:border-red-500/50"
                          : "focus:border-accent-purple/50"
                      }`}
                    />
                    <svg
                      className="w-5 h-5 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-accent-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors focus:outline-none"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showPassword ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        )}
                      </svg>
                    </button>
                    {errors.password && touched.password && (
                      <div className="absolute pb-3 -bottom-8 left-0 text-red-500 text-xs">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-purple/90 hover:to-accent-pink/90 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isLoading || isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      লোড হচ্ছে...
                    </div>
                  ) : (
                    "লগইন"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Enhanced Register Link */}
          <p className="text-center mt-6 text-text-secondary">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              to="/register"
              className="text-accent-purple hover:text-accent-pink transition-colors relative group"
            >
              রেজিস্টার করুন
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-pink transition-all group-hover:w-full"></span>
            </Link>
          </p>
        </div>
      </main>
      <DeveloperInfo />
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={verificationEmail}
      />
    </div>
  );
};

export default Login;
