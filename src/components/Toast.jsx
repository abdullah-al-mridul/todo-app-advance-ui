import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            className="w-6 h-6 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-6 h-6 text-red-400"
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-dark-800/50 backdrop-blur-md rounded-xl p-4 border border-dark-600/50 shadow-2xl min-w-[320px] transform transition-all duration-300 hover:scale-102">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <p className="text-text-primary flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-purple to-accent-pink rounded-b-xl animate-shrink"
          style={{ animationDuration: `${duration}ms` }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
