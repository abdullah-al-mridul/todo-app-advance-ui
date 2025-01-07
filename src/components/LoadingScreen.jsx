import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark-900 z-[9999]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Background */}
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

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-pink/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-[9999] h-full flex flex-col items-center justify-center">
        {/* Logo Container */}
        <div className="relative">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-2xl animate-pulse-slow"></div>

          {/* Logo */}
          <div className="relative w-24 h-24 mb-8 transform animate-float">
            <div className="w-full h-full rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink p-0.5">
              <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Todo App Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent mb-8 animate-pulse">
          লোড হচ্ছে...
        </h1>

        {/* Loading Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-12 h-12 rounded-full border-4 border-dark-600 relative animate-spin-slow">
            {/* Gradient spinner */}
            <div className="absolute -inset-1">
              <div className="w-full h-full rounded-full border-4 border-transparent border-t-accent-purple border-r-accent-pink animate-spin"></div>
            </div>
          </div>

          {/* Inner dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
