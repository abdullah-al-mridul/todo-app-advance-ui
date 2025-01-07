import React, { useState, useEffect } from "react";
import "../styles/animations.css";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, todoTitle }) => {
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-medium text-text-primary mb-3">
            টুডু ডিলিট নিশ্চিত করুন
          </h3>
          <p className="text-text-secondary mb-8">
            আপনি কি নিশ্চিত যে আপনি{" "}
            <span className="text-text-primary font-medium">"{todoTitle}"</span>{" "}
            টুডুটি ডিলিট করতে চান?
          </p>

          <div className="flex space-x-4">
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25"
            >
              ডিলিট করুন
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

export default DeleteConfirmationModal;
