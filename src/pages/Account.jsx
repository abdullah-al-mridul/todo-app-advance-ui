import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../contexts/ToastContext";
import ProfileSettingsModal from "../components/ProfileSettingsModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import LogoutConfirmationModal from "../components/LogoutConfirmationModal";
import { useAccountStats } from "../hooks/useAccountStats";
import { formatDate } from "../utils/formatters";

const Account = ({
  onLogoutClick,
  onOpenProfileModal,
  onOpenPasswordModal,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const stats = useAccountStats();

  const settingsItems = [
    {
      label: "প্রোফাইল সেটিংস",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      onClick: onOpenProfileModal,
      description: "প্রোফাইল ছবি এবং নাম পরিবর্তন করুন",
    },
    {
      label: "পাসওয়ার্ড পরিবর্তন",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      ),
      onClick: onOpenPasswordModal,
      description: "আপনার পাসওয়ার্ড পরিবর্তন করুন",
    },
    {
      label: "প্রাইভেসি",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      ),
      description: "প্রাইভেসি সেটিংস পরিবর্তন করুন",
      comingSoon: true,
    },
    {
      label: "থিম",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      ),
      description: "অ্যাপের থিম পরিবর্তন করুন",
      comingSoon: true,
    },
  ];

  return (
    <>
      <main className="max-w-5xl mx-auto pb-[150px] px-6 py-8 relative z-10">
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-8 border border-dark-600/50 hover:bg-dark-700/50 transition-all duration-300">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-pink p-1 transition-all duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-accent-purple">
                        {user?.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-accent-purple/20 blur-xl animate-pulse-slow"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                {user?.name}
              </h1>
              <p className="text-text-secondary mt-1">{user?.email}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-dark-700/50 backdrop-blur-md rounded-xl p-4 border border-dark-600/50 hover:bg-dark-700 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} p-0.5`}
                    >
                      <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={stat.icon}
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold text-text-primary">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Info & Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Account Details */}
            <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 hover:bg-dark-700/50 transition-all duration-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-accent-purple"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                অ্যাকাউন্ট তথ্য
              </h2>
              <div className="space-y-4">
                {/* Account info cards with animations */}
                <div className="bg-dark-700/50 rounded-xl p-4 hover:bg-dark-700/70 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
                  <p className="text-text-secondary text-sm group-hover:text-text-primary transition-colors duration-300">
                    অ্যাকাউন্ট তৈরি
                  </p>
                  <p className="text-text-primary group-hover:text-white transition-colors duration-300">
                    {formatDate(user?.createdAt)}
                  </p>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4 hover:bg-dark-700/70 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
                  <p className="text-text-secondary text-sm group-hover:text-text-primary transition-colors duration-300">
                    সর্বশেষ লগইন
                  </p>
                  <p className="text-text-primary group-hover:text-white transition-colors duration-300">
                    {formatDate(user?.lastLogin)}
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 hover:bg-dark-700/50 transition-all duration-300">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-accent-purple"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                সেটিংস
              </h2>
              <div className="space-y-3">
                {settingsItems.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    disabled={item.comingSoon}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`w-full bg-dark-700/50 rounded-xl p-4 hover:bg-dark-700/70 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group relative overflow-hidden animate-fade-in ${
                      item.comingSoon
                        ? "opacity-50 cursor-not-allowed hover:transform-none"
                        : ""
                    }`}
                  >
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    </div>

                    <div className="flex items-center relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-dark-600/50 flex items-center justify-center group-hover:bg-dark-600 transition-colors duration-300">
                        <svg
                          className="w-5 h-5 text-text-secondary group-hover:text-accent-purple transform group-hover:rotate-12 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {item.icon}
                        </svg>
                      </div>
                      <div className="ml-4 text-left transform group-hover:translate-x-1 transition-transform duration-300">
                        <div className="flex items-center">
                          <p className="text-text-primary group-hover:text-accent-purple transition-colors duration-300">
                            {item.label}
                          </p>
                          {item.comingSoon && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-accent-purple/10 text-accent-purple rounded-full">
                              শীঘ্রই আসছে
                            </span>
                          )}
                        </div>
                        <p className="text-text-tertiary text-sm mt-0.5 group-hover:text-text-secondary transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-text-tertiary group-hover:text-accent-purple transition-colors duration-300 ml-auto transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <button
              onClick={onLogoutClick}
              disabled={isLoggingOut}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden disabled:opacity-50 disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-red-500/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center">
                {isLoggingOut ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
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
                    লগআউট
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
