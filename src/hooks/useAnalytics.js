import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAnalytics = (timeRange = "week") => {
  const todos = useSelector((state) => state.todos.todos);

  const getDayLabels = (timeRange) => {
    const days = [];
    const today = new Date();
    const bengaliDays = {
      0: "রবি",
      1: "সোম",
      2: "মঙ্গল",
      3: "বুধ",
      4: "বৃহঃ",
      5: "শুক্র",
      6: "শনি",
    };

    if (timeRange === "week") {
      // Get last 7 days including today
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        days.push(bengaliDays[date.getDay()]);
      }
    } else if (timeRange === "month") {
      // Get last 30 days
      const date = new Date(today);
      date.setDate(today.getDate() - 29);
      for (let i = 0; i < 30; i++) {
        days.push(bengaliDays[date.getDay()]);
        date.setDate(date.getDate() + 1);
      }
    }

    return days;
  };

  const analytics = useMemo(() => {
    // Convert Bengali numbers to English
    const convertBengaliToEnglish = (bengaliNumber) => {
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
      return bengaliNumber
        .toString()
        .split("")
        .map((char) => bengaliNumerals.indexOf(char))
        .join("");
    };

    // Convert English numbers to Bengali
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

    // Get date ranges based on timeRange
    const getDateRange = () => {
      const now = new Date();
      const start = new Date();

      switch (timeRange) {
        case "week":
          start.setDate(now.getDate() - 7);
          break;
        case "month":
          start.setMonth(now.getMonth() - 1);
          break;
        case "year":
          start.setFullYear(now.getFullYear() - 1);
          break;
        default:
          start.setDate(now.getDate() - 7);
      }

      return { start, end: now };
    };

    const dateRange = getDateRange();
    const filteredTodos = todos.filter((todo) => {
      const todoDate = new Date(todo.createdAt);
      return todoDate >= dateRange.start && todoDate <= dateRange.end;
    });

    // Basic stats
    const totalTodos = filteredTodos.length;
    const completedTodos = filteredTodos.filter(
      (todo) => todo.status === "completed"
    ).length;
    const pendingTodos = filteredTodos.filter(
      (todo) => todo.status === "pending"
    ).length;
    const inProgressTodos = filteredTodos.filter(
      (todo) => todo.status === "in-progress"
    ).length;

    // Calculate completion rate
    const completionRate = totalTodos
      ? Math.round((completedTodos / totalTodos) * 100)
      : 0;

    // Priority distribution
    const priorityStats = {
      high: filteredTodos.filter((todo) => todo.priority === "high").length,
      medium: filteredTodos.filter((todo) => todo.priority === "medium").length,
      low: filteredTodos.filter((todo) => todo.priority === "low").length,
    };

    // Daily stats for charts
    const getDailyStats = () => {
      const days = timeRange === "week" ? 7 : 30;
      const stats = Array(days).fill(0);
      const completedStats = Array(days).fill(0);
      const newTodoStats = Array(days).fill(0);

      filteredTodos.forEach((todo) => {
        const todoDate = new Date(todo.createdAt);
        const dayIndex = Math.floor(
          (dateRange.end - todoDate) / (1000 * 60 * 60 * 24)
        );

        if (dayIndex < days) {
          newTodoStats[dayIndex]++;
          if (todo.status === "completed") {
            completedStats[dayIndex]++;
          }
          stats[dayIndex]++;
        }
      });

      return {
        total: stats.reverse(),
        completed: completedStats.reverse(),
        new: newTodoStats.reverse(),
      };
    };

    const dailyStats = getDailyStats();

    // Calculate trends
    const calculateTrend = (current, previous) => {
      if (!previous) return "+০%";
      const change = ((current - previous) / previous) * 100;
      return `${change >= 0 ? "+" : "-"}${convertToBengaliNumber(
        Math.abs(Math.round(change))
      )}%`;
    };

    // Get previous period stats for trend calculation
    const getPreviousPeriodStats = () => {
      const previousStart = new Date(dateRange.start);
      const previousEnd = new Date(dateRange.start);

      switch (timeRange) {
        case "week":
          previousStart.setDate(previousStart.getDate() - 7);
          break;
        case "month":
          previousStart.setMonth(previousStart.getMonth() - 1);
          break;
        case "year":
          previousStart.setFullYear(previousStart.getFullYear() - 1);
          break;
      }

      const previousTodos = todos.filter((todo) => {
        const todoDate = new Date(todo.createdAt);
        return todoDate >= previousStart && todoDate < previousEnd;
      });

      return {
        total: previousTodos.length,
        completed: previousTodos.filter((todo) => todo.status === "completed")
          .length,
      };
    };

    const previousStats = getPreviousPeriodStats();

    // Get day labels based on timeRange
    const dayLabels = getDayLabels(timeRange);

    return {
      stats: [
        {
          label: "মোট কাজ",
          value: convertToBengaliNumber(totalTodos),
          trend: calculateTrend(totalTodos, previousStats.total),
          isPositive: totalTodos >= previousStats.total,
        },
        {
          label: "সম্পন্ন কাজ",
          value: convertToBengaliNumber(completedTodos),
          trend: calculateTrend(completedTodos, previousStats.completed),
          isPositive: completedTodos >= previousStats.completed,
        },
        {
          label: "বাকি আছে",
          value: convertToBengaliNumber(pendingTodos + inProgressTodos),
          trend: calculateTrend(
            pendingTodos + inProgressTodos,
            previousStats.total - previousStats.completed
          ),
          isPositive: false,
        },
        {
          label: "সক্রিয়তা",
          value: `${convertToBengaliNumber(completionRate)}%`,
          trend: calculateTrend(
            completionRate,
            previousStats.total
              ? (previousStats.completed / previousStats.total) * 100
              : 0
          ),
          isPositive: true,
        },
      ],
      chartData: {
        bar: {
          series: [
            {
              name: "কাজ",
              data: dailyStats.total,
            },
          ],
          categories: dayLabels,
        },
        donut: {
          series: [priorityStats.high, priorityStats.medium, priorityStats.low],
        },
        line: {
          series: [
            {
              name: "সম্পন্ন কাজ",
              data: dailyStats.completed,
            },
            {
              name: "নতুন কাজ",
              data: dailyStats.new,
            },
          ],
          categories: dayLabels,
        },
      },
    };
  }, [todos, timeRange]);

  return analytics;
};
