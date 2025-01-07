import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../contexts/ToastContext";
import "../styles/animations.css";

const EmailVerificationModal = ({ isOpen, onClose, email }) => {
  const { resendVerificationEmail } = useAuth();
  const { showToast } = useToast();
  const [isResending, setIsResending] = React.useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimatingOut(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      await resendVerificationEmail();
      showToast("ভেরিফিকেশন ইমেইল পাঠানো হয়েছে", "success");
      onClose();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${
          isAnimatingOut
            ? "animate-modal-backdrop-fade-out"
            : "animate-modal-backdrop-fade-in"
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative bg-dark-800/90 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 shadow-xl max-w-md w-full mx-4 ${
          isAnimatingOut ? "animate-modal-fade-out" : "animate-modal-fade-in"
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-purple/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-accent-purple"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            ইমেইল ভেরিফিকেশন প্রয়োজন
          </h3>
          <p className="text-text-secondary mb-6">
            আমরা {email} এ একটি ভেরিফিকেশন লিংক পাঠিয়েছি। অনুগ্রহ করে আপনার
            ইমেইল চেক করুন।
          </p>
          <div className="space-y-3">
            <button
              onClick={handleResend}
              disabled={isResending}
              className="w-full bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isResending ? "পাঠানো হচ্ছে..." : "আবার লিংক পাঠান"}
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-dark-700/50 hover:bg-dark-700 text-text-secondary py-3 rounded-xl font-medium transition-all"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
