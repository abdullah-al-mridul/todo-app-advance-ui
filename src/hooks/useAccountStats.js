import { useMemo } from "react";
import { useSelector } from "react-redux";

// SVG path constants
const ICONS = {
  total:
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  completed: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  activity: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
};

export const useAccountStats = () => {
  const todos = useSelector((state) => state.todos.todos);

  const stats = useMemo(() => {
    // Convert numbers to Bengali
    const convertToBengaliNumber = (number) => {
      const bengaliNumerals = [
        "০",
        "১",
        "২",
        "৩",
        "৪",
        "৫",
        "৬",
        "৭",
        "৮",
        "৯",
      ];
      return number
        .toString()
        .split("")
        .map((char) => bengaliNumerals[char])
        .join("");
    };

    // Calculate total todos
    const totalTodos = todos.length;

    // Calculate completed todos
    const completedTodos = todos.filter(
      (todo) => todo.status === "completed"
    ).length;

    // Calculate activity rate (completed/total * 100)
    const activityRate = totalTodos
      ? Math.round((completedTodos / totalTodos) * 100)
      : 0;

    return [
      {
        label: "মোট কাজ",
        value: convertToBengaliNumber(totalTodos),
        icon: ICONS.total,
        color: "from-purple-500 to-indigo-500",
      },
      {
        label: "সম্পন্ন",
        value: convertToBengaliNumber(completedTodos),
        icon: ICONS.completed,
        color: "from-green-500 to-emerald-500",
      },
      {
        label: "সক্রিয়তা",
        value: `${convertToBengaliNumber(activityRate)}%`,
        icon: ICONS.activity,
        color: "from-pink-500 to-rose-500",
      },
    ];
  }, [todos]);

  return stats;
};
