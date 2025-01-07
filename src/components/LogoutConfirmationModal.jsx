import React, { useState, useEffect } from "react";
import "../styles/animations.css";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
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
        className={`relative bg-dark-800/80 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-xl max-w-md w-full mx-4 ${
          isAnimatingOut ? "animate-modal-fade-out" : "animate-modal-fade-in"
        }`}
      >
        <div className="text-center">
          {/* Warning Icon with Gradient */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-red-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-dark-800/90 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-medium text-text-primary mb-3">
            লগ আউট নিশ্চিত করুন
          </h3>
          <p className="text-text-secondary mb-8">
            আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                  লগআউট হচ্ছে...
                </span>
              ) : (
                "লগ আউট করুন"
              )}
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-dark-700/50 hover:bg-dark-700 text-text-secondary py-3 rounded-xl font-medium transition-all border border-dark-600/50"
            >
              বাতিল
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
