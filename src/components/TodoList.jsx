import React from "react";

const dummyTodos = [
  {
    id: 1,
    title: "গুগল ক্লাউড সার্টিফিকেশন সম্পূর্ণ করুন",
    completed: false,
    priority: "high",
  },
  {
    id: 2,
    title: "প্রজেক্ট ডকুমেন্টেশন পর্যালোচনা",
    completed: true,
    priority: "medium",
  },
  {
    id: 3,
    title: "দলের সাথে বিকাল ৩টায় মিটিং",
    completed: false,
    priority: "high",
  },
  {
    id: 4,
    title: "প্রেজেন্টেশন স্লাইড আপডেট করুন",
    completed: false,
    priority: "low",
  },
];

const TodoList = () => {
  return (
    <>
      {/* Add Todo Input */}
      <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl shadow-nft mb-8 border border-dark-600/50">
        <div className="px-6 py-4">
          <input
            type="text"
            placeholder="নতুন কাজ যোগ করুন"
            className="w-full text-base bg-dark-700/50 backdrop-blur-sm rounded-xl px-4 py-3 placeholder-text-tertiary text-text-primary border border-dark-600/50 focus:border-accent-purple/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Todo List */}
      <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl shadow-nft border border-dark-600/50">
        <div className="divide-y divide-dark-600/50">
          {dummyTodos.map((todo) => (
            <div
              key={todo.id}
              className="px-6 py-4 flex items-center hover:bg-dark-700/50 transition-colors"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="w-5 h-5 rounded-lg border-2 border-dark-600 checked:border-accent-purple checked:bg-accent-purple focus:ring-accent-purple cursor-pointer appearance-none transition-colors"
                />
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`ml-4 flex-grow ${
                  todo.completed
                    ? "line-through text-text-tertiary"
                    : "text-text-primary"
                }`}
              >
                {todo.title}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  todo.priority === "high"
                    ? "bg-accent-pink"
                    : todo.priority === "medium"
                    ? "bg-accent-purple"
                    : "bg-accent-blue"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Completed Count */}
      <div className="mt-6 text-sm text-text-secondary text-center">
        {dummyTodos.filter((t) => t.completed).length} টি কাজ সম্পন্ন হয়েছে{" "}
        {dummyTodos.length} টির মধ্যে
      </div>
    </>
  );
};

export default TodoList;
