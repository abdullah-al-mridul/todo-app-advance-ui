import React from "react";

const Search = () => {
  const recentSearches = ["মিটিং", "প্রেজেন্টেশন", "ডকুমেন্টেশন"];
  const suggestedTasks = [
    "প্রজেক্ট প্রস্তাবনা তৈরি",
    "ক্লায়েন্ট মিটিং",
    "রিপোর্ট আপডেট",
  ];

  return (
    <main className="max-w-5xl mx-auto pb-[150px] px-6 py-8 relative z-10">
      {/* Search Input */}
      <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl shadow-nft mb-8 border border-dark-600/50">
        <div className="px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="কাজ খুঁজুন..."
              className="w-full text-base bg-dark-700/50 backdrop-blur-sm rounded-xl pl-12 pr-4 py-3 placeholder-text-tertiary text-text-primary border border-dark-600/50 focus:border-accent-purple/50 focus:outline-none transition-colors"
            />
            <svg
              className="w-5 h-5 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">সাম্প্রতিক অনুসন্ধান</h2>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search) => (
            <button
              key={search}
              className="px-4 py-2 rounded-full bg-dark-800/50 backdrop-blur-md border border-dark-600/50 text-text-secondary hover:text-text-primary transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Tasks */}
      <div>
        <h2 className="text-lg font-bold mb-4">প্রস্তাবিত কাজ</h2>
        <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl border border-dark-600/50">
          <div className="divide-y divide-dark-600/50">
            {suggestedTasks.map((task) => (
              <div
                key={task}
                className="px-6 py-4 flex items-center hover:bg-dark-700/50 transition-colors cursor-pointer"
              >
                <span className="text-text-primary">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Search;
