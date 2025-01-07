import React, { useState, useEffect } from "react";
import "../styles/animations.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";

const TodoDetailsModal = ({ isOpen, onClose, todo }) => {
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

  const getPriorityIcon = (priority) => {
    const color =
      priority === "high"
        ? "#ef4444"
        : priority === "medium"
        ? "#eab308"
        : "#22c55e";
    return <FlagIcon sx={{ fontSize: 20, color }} />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "in-progress":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-text-secondary";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isOpen || !todo) return null;

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
        className={`relative bg-dark-800/90 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 shadow-xl max-w-lg w-full mx-4 ${
          isAnimatingOut ? "animate-modal-fade-out" : "animate-modal-fade-in"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <svg
            className="w-6 h-6"
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

        {/* Title with Priority Icon */}
        <div className="flex items-center gap-3 mb-4">
          {getPriorityIcon(todo.priority)}
          <h2 className="text-xl font-semibold text-text-primary">
            {todo.title}
          </h2>
        </div>

        {/* Description */}
        {todo.description && (
          <div className="mb-6">
            <h3 className="text-sm text-text-secondary mb-2">বর্ণনা</h3>
            <p className="text-text-primary bg-dark-700/50 rounded-xl p-4 border border-dark-600/50">
              {todo.description}
            </p>
          </div>
        )}

        {/* Meta Information */}
        <div className="space-y-4">
          {/* Due Date */}
          {todo.dueDate && (
            <div className="flex items-center gap-2 text-text-secondary">
              <AccessTimeIcon sx={{ fontSize: 20 }} />
              <span>শেষ তারিখ: {formatDate(todo.dueDate)}</span>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(
                todo.status
              )} bg-dark-700/50`}
            >
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span>
                {todo.status === "pending"
                  ? "পেন্ডিং"
                  : todo.status === "in-progress"
                  ? "চলমান"
                  : "সম্পন্ন"}
              </span>
            </span>
          </div>

          {/* Priority */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                todo.priority === "high"
                  ? "text-red-500"
                  : todo.priority === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              } bg-dark-700/50`}
            >
              {getPriorityIcon(todo.priority)}
              <span>
                {todo.priority === "high"
                  ? "হাই"
                  : todo.priority === "medium"
                  ? "মিডিয়াম"
                  : "লো"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailsModal;
