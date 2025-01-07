import React from "react";

const DeveloperInfo = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-dark-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-dark-600/50 shadow-xl">
        <p className="text-xs text-text-secondary flex items-center gap-1">
          <span>Developed by</span>
          <a
            href="https://github.com/abdullah-al-mridul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-purple hover:text-accent-pink transition-colors relative group inline-flex items-center gap-1"
          >
            @abdullah-al-mridul
            <svg
              className="w-4 h-4 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
};

export default DeveloperInfo;
