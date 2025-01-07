import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

// Styled Menu component
const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(17, 17, 25, 0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(45, 45, 61, 0.3)",
    borderRadius: "0.75rem",
    marginTop: "0.5rem",
    minWidth: "200px",
    "& .MuiMenuItem-root": {
      padding: "0.75rem 1rem",
      color: "#fff",
      "&:hover": {
        backgroundColor: "rgba(45, 45, 61, 0.3)",
      },
    },
    "& .MuiDivider-root": {
      borderColor: "rgba(45, 45, 61, 0.3)",
    },
  },
});

const Layout = ({
  onLogoutClick,
  onAddTodoClick,
  onOpenProfileModal,
  onOpenPasswordModal,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Get user from Redux store
  const { user, isLoading } = useSelector((state) => state.auth);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    onOpenProfileModal();
  };

  const renderAccountSection = () => {
    if (isLoading) return null;

    // Get the name from either displayName or name property
    const userName = user?.displayName || user?.name || "User";
    const userEmail = user?.email || "demo@mail.com";
    const userPhoto = user?.photoURL || user?.photo;

    return (
      <div className="relative">
        <button
          onClick={handleMenuOpen}
          className="flex items-center space-x-3 bg-dark-700/50 hover:bg-dark-700 rounded-xl px-4 py-2 transition-all border border-dark-600/50"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink p-0.5">
            <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt={userName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${userName}&background=8B5CF6&color=fff`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-accent-purple/10">
                  <span className="text-lg font-bold text-accent-purple">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <span className="text-sm block max-md:hidden font-medium text-text-primary">
            {userName}
          </span>
          <svg
            className="w-5 h-5 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <StyledMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className="px-4 py-3 border-b border-dark-600/50">
            <p className="text-sm font-medium text-text-primary">{userName}</p>
            <p className="text-xs text-text-secondary">{userEmail}</p>
          </div>
          <Link
            to="/account"
            className="flex items-center space-x-3 px-4 py-3 text-text-primary hover:bg-dark-700/50 transition-colors"
            onClick={handleProfileClick}
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>প্রোফাইল</span>
          </Link>
          <button
            onClick={() => {
              handleMenuClose();
              onLogoutClick();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-dark-700/50 transition-colors"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>লগ আউট</span>
          </button>
        </StyledMenu>
      </div>
    );
  };

  return (
    <div className="min-h-app font-bengali text-text-primary relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background */}
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

        {/* Floating orbs with new colors */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-4s" }}
        ></div>

        {/* Additional subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-transparent"></div>
      </div>

      {/* Header */}
      <header className="bg-dark-800/50 backdrop-blur-md border-b border-dark-600/50 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="Todo App Logo"
                className="w-8 h-8 scale-150 object-contain"
              />
              <h1
                className="text-2xl font-bold animate-gradient-x bg-gradient-size bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(
                    to right,
                    #8B5CF6,
                    #EC4899,
                    #8B5CF6
                  )`,
                  backgroundSize: "200% auto",
                }}
              >
                টিকট্যাক
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onAddTodoClick}
                className="bg-gradient-to-r  max-sm:hidden from-accent-purple to-accent-pink hover:from-accent-purple/90 hover:to-accent-pink/90 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-purple/20 flex items-center"
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                নতুন টুডু
              </button>

              {/* Account Section */}
              {renderAccountSection()}
            </div>
          </div>
        </div>
      </header>

      <Outlet />

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-800/50 backdrop-blur-md border-t border-dark-600/50 z-50">
        <div className="max-w-3xl mx-auto px-6 py-3">
          <div className="flex justify-around">
            {[
              { path: "/", icon: "home", label: "হোম" },
              { path: "/analytics", icon: "stats", label: "অ্যানালিটিক্স" },
              { path: "/search", icon: "search", label: "খুঁজুন" },
              { path: "/account", icon: "profile", label: "প্রোফাইল" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2 rounded-xl flex flex-col items-center ${
                  location.pathname === item.path
                    ? "text-accent-purple"
                    : "text-text-tertiary hover:text-text-secondary"
                } hover:bg-dark-700/50 transition-colors`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon === "home" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  )}
                  {item.icon === "stats" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  )}
                  {item.icon === "search" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  )}
                  {item.icon === "profile" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  )}
                </svg>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
