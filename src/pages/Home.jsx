import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTodos } from "../hooks/useTodos";
import AddTodoModal from "../components/AddTodoModal";
import { useToast } from "../contexts/ToastContext";
import { Select, MenuItem, Menu } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FlagIcon from "@mui/icons-material/Flag";
import { styled } from "@mui/material/styles";
import { useTodoContext } from "../contexts/TodoContext";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

// Styled MenuItem component
const StyledMenuItem = styled(MenuItem)({
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(45, 45, 61, 0.3)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(45, 45, 61, 0.5)",
    "&:hover": {
      backgroundColor: "rgba(45, 45, 61, 0.6)",
    },
  },
});

// Styled Select component
const StyledSelect = styled(Select)({
  "& .MuiSelect-select": {
    padding: "4px 8px",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "#fff",
    backgroundColor: "rgba(17, 17, 25, 0.6)",
    border: "1px solid rgba(45, 45, 61, 0.3)",
    borderRadius: "0.5rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: "#fff",
  },
  "&:hover": {
    backgroundColor: "rgba(26, 26, 36, 0.7)",
  },
  "&.Mui-focused": {
    backgroundColor: "rgba(26, 26, 36, 0.8)",
  },
});

const NoTodos = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case "pending":
        return {
          title: "কোনো পেন্ডিং টাস্ক নেই",
          message: "আপনার কোনো পেন্ডিং টাস্ক নেই",
          icon: (
            <svg
              className="w-16 h-16 text-yellow-500/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case "in-progress":
        return {
          title: "কোনো চলমান টাস্ক নেই",
          message: "আপনার কোনো চলমান টাস্ক নেই",
          icon: (
            <svg
              className="w-16 h-16 text-blue-500/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ),
        };
      case "completed":
        return {
          title: "কোনো সম্পন্ন টাস্ক নেই",
          message: "আপনার কোনো সম্পন্ন টাস্ক নেই",
          icon: (
            <svg
              className="w-16 h-16 text-green-500/20"
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
          ),
        };
      default:
        return {
          title: "কোনো টাস্ক নেই",
          message: "কোনো টাস্ক পাওয়া যায়নি",
          icon: null,
        };
    }
  };

  const { title, message, icon } = getStatusInfo();

  return (
    <div className="bg-dark-700/30 backdrop-blur-md rounded-xl p-8 border border-dark-600/30">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary">{message}</p>
      </div>
    </div>
  );
};

const Home = ({ onAddTodoClick }) => {
  const {
    todos = [],
    isLoading,
    error,
    fetchTodos,
    updateTodoStatus,
    removeTodo,
  } = useTodos();
  const { showToast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const safeTodos = useMemo(() => (Array.isArray(todos) ? todos : []), [todos]);

  const handleStatusChange = useCallback(
    async (todoId, newStatus) => {
      try {
        await updateTodoStatus(todoId, newStatus);
        showToast("টুডু আপডেট সফল হয়েছে", "success");
      } catch (error) {
        showToast(error.message, "error");
      }
    },
    [updateTodoStatus, showToast]
  );

  const handleDelete = useCallback(
    async (todoId) => {
      try {
        await removeTodo(todoId);
        showToast("টুডু ডিলিট সফল হয়েছে", "success");
      } catch (error) {
        showToast(error.message, "error");
      }
    },
    [removeTodo, showToast]
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-dark-700/50 backdrop-blur-md rounded-xl p-4 border border-dark-600/50 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-5 bg-dark-600/50 rounded w-3/4"></div>
          <div className="h-4 bg-dark-600/50 rounded w-1/2"></div>
          <div className="flex items-center space-x-2 mt-2">
            <div className="h-3 bg-dark-600/50 rounded w-16"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-20 h-7 bg-dark-600/50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-row max-sm:flex-col gap-4 max-sm:items-start items-center justify-between mb-12">
          <div>
            <div className="h-8 bg-dark-600/50 rounded w-64 mb-2"></div>
            <div className="h-4 bg-dark-600/50 rounded w-96"></div>
          </div>
          <div className="w-32 h-11 bg-dark-600/50 rounded-xl"></div>
        </div>

        {/* Categories Skeleton */}
        <div className="space-y-8">
          {/* Pending Section Skeleton */}
          <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-3"></div>
              <div className="h-6 bg-dark-600/50 rounded w-32"></div>
              <div className="h-4 bg-dark-600/50 rounded w-12 ml-3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <LoadingSkeleton key={`pending-${i}`} />
              ))}
            </div>
          </div>

          {/* In Progress Section Skeleton */}
          <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500/50 mr-3"></div>
              <div className="h-6 bg-dark-600/50 rounded w-32"></div>
              <div className="h-4 bg-dark-600/50 rounded w-12 ml-3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <LoadingSkeleton key={`progress-${i}`} />
              ))}
            </div>
          </div>

          {/* Completed Section Skeleton */}
          <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500/50 mr-3"></div>
              <div className="h-6 bg-dark-600/50 rounded w-32"></div>
              <div className="h-4 bg-dark-600/50 rounded w-12 ml-3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <LoadingSkeleton key={`completed-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/50 rounded-xl p-6 text-center max-w-md w-full">
          <svg
            className="w-12 h-12 mx-auto text-red-500 mb-4"
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
          <h3 className="text-lg font-semibold text-red-500 mb-2">
            ত্রুটি ঘটেছে
          </h3>
          <p className="text-text-secondary">{error}</p>
          <button
            onClick={() => fetchTodos()}
            className="mt-4 text-accent-purple hover:text-accent-pink transition-colors"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  if (safeTodos.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">আমার টুডু লিস্ট</h1>
          <button
            onClick={onAddTodoClick}
            className="bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-purple/90 hover:to-accent-pink/90 text-white px-6 py-2 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-purple/20"
          >
            নতুন টুডু
          </button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-6 bg-dark-800/50 backdrop-blur-md rounded-xl p-8 border border-dark-600/50">
          <div className="w-24 h-24 text-text-tertiary opacity-50 animate-float">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">কোনো টুডু নেই</h3>
            <p className="text-text-secondary mb-4">
              আপনার প্রথম টুডু তৈরি করুন
            </p>
            <button
              onClick={onAddTodoClick}
              className="text-accent-purple hover:text-accent-pink transition-colors inline-flex items-center"
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
              নতুন টুডু তৈরি করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-text-secondary";
    }
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

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 pb-[150px]">
      {/* Header */}
      <div className="flex flex-row max-sm:flex-col gap-4 max-sm:items-start items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink text-transparent bg-clip-text">
            আমার টুডু লিস্ট
          </h1>
          <p className="text-text-secondary mt-2">
            আপনার সকল টাস্ক একটি জায়গায় ম্যানেজ করুন
          </p>
        </div>
        <button
          onClick={onAddTodoClick}
          className="bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-purple/90 hover:to-accent-pink/90 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-purple/20 flex items-center"
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
      </div>

      {/* Todo Categories */}
      <div className="space-y-8">
        {/* Pending Section */}
        <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
            <h2 className="text-xl font-semibold text-yellow-500">
              পেন্ডিং টাস্ক
            </h2>
            <span className="ml-3 text-text-secondary text-sm">
              ({safeTodos.filter((todo) => todo.status === "pending").length}টি)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeTodos.filter((todo) => todo.status === "pending").length >
            0 ? (
              safeTodos
                .filter((todo) => todo.status === "pending")
                .map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                    formatDate={formatDate}
                  />
                ))
            ) : (
              <div className="col-span-2">
                <NoTodos status="pending" />
              </div>
            )}
          </div>
        </div>

        {/* In Progress Section */}
        <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
            <h2 className="text-xl font-semibold text-blue-500">চলমান টাস্ক</h2>
            <span className="ml-3 text-text-secondary text-sm">
              (
              {safeTodos.filter((todo) => todo.status === "in-progress").length}
              টি)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeTodos.filter((todo) => todo.status === "in-progress").length >
            0 ? (
              safeTodos
                .filter((todo) => todo.status === "in-progress")
                .map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                    formatDate={formatDate}
                  />
                ))
            ) : (
              <div className="col-span-2">
                <NoTodos status="in-progress" />
              </div>
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
            <h2 className="text-xl font-semibold text-green-500">
              সম্পন্ন টাস্ক
            </h2>
            <span className="ml-3 text-text-secondary text-sm">
              ({safeTodos.filter((todo) => todo.status === "completed").length}
              টি)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeTodos.filter((todo) => todo.status === "completed").length >
            0 ? (
              safeTodos
                .filter((todo) => todo.status === "completed")
                .map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                    formatDate={formatDate}
                  />
                ))
            ) : (
              <div className="col-span-2">
                <NoTodos status="completed" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TodoCard = ({
  todo,
  onStatusChange,
  onDelete,
  getPriorityColor,
  getStatusColor,
  formatDate,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { openTodoDetails, openDeleteModal } = useTodoContext();

  const getPriorityIcon = (priority) => {
    const color =
      priority === "high"
        ? "#ef4444"
        : priority === "medium"
        ? "#eab308"
        : "#22c55e";
    return <FlagIcon sx={{ fontSize: 16, color }} />;
  };

  const menuProps = {
    PaperProps: {
      sx: {
        bgcolor: "rgba(17, 17, 25, 0.95)",
        borderRadius: "0.75rem",
        border: "1px solid rgba(45, 45, 61, 0.3)",
        backdropFilter: "blur(10px)",
        "& .MuiMenuItem-root": {
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(45, 45, 61, 0.3)",
          },
        },
      },
    },
  };

  const handleClick = (e) => {
    if (
      e.target.closest("button") ||
      e.target.closest(".p-dropdown") ||
      e.target.closest(".MuiSelect-select") ||
      e.target.closest(".MuiPopover-root")
    ) {
      e.stopPropagation();
      return;
    }
    openTodoDetails(todo);
  };

  const handleStatusChange = (e) => {
    e.stopPropagation();
    onStatusChange(todo.id, e.target.value);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    openDeleteModal(todo, async () => {
      await onDelete(todo.id);
    });
  };

  return (
    <>
      <div
        className="bg-dark-700/50 backdrop-blur-md rounded-xl p-5 border border-dark-600/50 hover:bg-dark-600/50 transition-all group hover:shadow-lg hover:shadow-dark-900/20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {getPriorityIcon(todo.priority)}
              <h3 className="font-medium text-text-primary group-hover:text-white transition-colors truncate">
                {todo.title}
              </h3>
            </div>
            {todo.description && (
              <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                {todo.description}
              </p>
            )}
            {todo.dueDate && (
              <div className="flex items-center gap-2 text-xs text-text-tertiary">
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <span>{formatDate(todo.dueDate)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <StyledSelect
              value={todo.status}
              onChange={handleStatusChange}
              onClick={(e) => e.stopPropagation()}
              size="small"
              className="min-w-[120px]"
              MenuProps={{
                ...menuProps,
                onClick: (e) => e.stopPropagation(),
              }}
            >
              <StyledMenuItem
                value="pending"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-yellow-500">⬤</span>
                <span className="ml-2">পেন্ডিং</span>
              </StyledMenuItem>
              <StyledMenuItem
                value="in-progress"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-blue-500">⬤</span>
                <span className="ml-2">চলমান</span>
              </StyledMenuItem>
              <StyledMenuItem
                value="completed"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-green-500">⬤</span>
                <span className="ml-2">সম্পন্ন</span>
              </StyledMenuItem>
            </StyledSelect>
            <button
              onClick={handleDelete}
              className={`text-red-500 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-500/10 ${
                isHovered ? "opacity-100" : "opacity-0"
              } group-hover:opacity-100`}
              title="Delete"
            >
              <DeleteOutlineIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dark-600/50">
          <span
            className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(
              todo.priority
            )} bg-dark-800/50`}
          >
            {todo.priority === "high"
              ? "হাই"
              : todo.priority === "medium"
              ? "মিডিয়াম"
              : "লো"}
          </span>
          <span
            className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
              todo.status
            )} bg-dark-800/50`}
          >
            {todo.status === "pending"
              ? "পেন্ডিং"
              : todo.status === "in-progress"
              ? "চলমান"
              : "সম্পন্ন"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Home;
