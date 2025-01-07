import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useFirestore } from "../hooks/useFirestore";
import { useAnalytics } from "../hooks/useAnalytics";
import { useSelector } from "react-redux";

const AnalyticsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto pb-[150px] px-6 py-8 relative z-10 animate-pulse">
      {/* Time Range Selector Skeleton */}
      <div className="flex justify-end mb-6">
        <div className="bg-dark-800/50 backdrop-blur-md rounded-xl p-1 border border-dark-600/50">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-9 bg-dark-700/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-4 border border-dark-600/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 w-20 bg-dark-700/50 rounded"></div>
              <div className="h-6 w-12 bg-dark-700/50 rounded-full"></div>
            </div>
            <div className="h-8 w-16 bg-dark-700/50 rounded mt-2"></div>
          </div>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="space-y-8">
        {/* Bar Chart Skeleton */}
        <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-40 bg-dark-700/50 rounded"></div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-dark-700/50"></div>
                <div className="h-4 w-24 bg-dark-700/50 rounded"></div>
              </div>
            </div>
          </div>
          <div className="h-[300px] bg-dark-700/30 rounded-xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-dark-600/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>

        {/* Two Column Charts Skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Donut Chart Skeleton */}
          <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 w-40 bg-dark-700/50 rounded"></div>
            </div>
            <div className="h-[300px] bg-dark-700/30 rounded-xl flex items-center justify-center">
              <svg
                className="w-12 h-12 text-dark-600/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
          </div>

          {/* Line Chart Skeleton */}
          <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50">
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 w-40 bg-dark-700/50 rounded"></div>
              <div className="flex items-center space-x-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-dark-700/50"></div>
                    <div className="h-4 w-16 bg-dark-700/50 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[300px] bg-dark-700/30 rounded-xl flex items-center justify-center">
              <svg
                className="w-12 h-12 text-dark-600/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Analytics = () => {
  const { isOnline, isRetrying } = useFirestore();
  const [timeRange, setTimeRange] = useState("week");
  const analytics = useAnalytics(timeRange);
  const { isLoading } = useSelector((state) => state.todos);

  // Show skeleton while loading
  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  // Only show connection message if actually offline
  if (!isOnline && isRetrying) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">
          {isRetrying
            ? "পুনরায় সংযোগ চেষ্টা করা হচ্ছে..."
            : "ইন্টারনেট সংযোগ নেই"}
        </p>
      </div>
    );
  }

  // Update the stats section to use real data
  const { stats, chartData } = analytics;

  // Update the series in your charts
  const barChartSeries = chartData.bar.series;
  const donutChartSeries = chartData.donut.series;
  const lineChartSeries = chartData.line.series;

  // Time range options
  const timeRanges = [
    { value: "week", label: "সাপ্তাহিক" },
    { value: "month", label: "মাসিক" },
    { value: "year", label: "বাৎসরিক" },
  ];

  // Enhanced Bar Chart with sparklines
  const barChartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      sparkline: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "50%",
        distributed: true,
        backgroundBarColors: ["#1C1C26"],
        backgroundBarRadius: 8,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: '"Noto Sans Bengali", sans-serif',
        colors: ["#94A3B8"],
      },
      offsetY: -20,
    },
    xaxis: {
      categories: chartData.bar.categories,
      labels: {
        style: {
          colors: "#94A3B8",
          fontFamily: '"Noto Sans Bengali", sans-serif',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: "#8B5CF6",
          width: 1,
          dashArray: 5,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8",
          fontFamily: '"Noto Sans Bengali", sans-serif',
        },
        formatter: (value) => `${value}টি`,
      },
    },
    grid: {
      borderColor: "#2D2D3D",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { top: 20 },
    },
    colors: ["#8B5CF6"],
    theme: { mode: "dark" },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value) => `${value}টি কাজ`,
        title: {
          formatter: () => "কাজের সংখ্যা:",
        },
      },
      style: {
        fontSize: "12px",
        fontFamily: '"Noto Sans Bengali", sans-serif',
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.85,
        },
      },
    },
  };

  // Enhanced Donut Chart Options
  const donutChartOptions = {
    chart: {
      background: "transparent",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: '"Noto Sans Bengali", sans-serif',
              color: "#94A3B8",
              fontSize: "14px",
            },
            value: {
              show: true,
              fontFamily: '"Noto Sans Bengali", sans-serif',
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: 600,
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              label: "মোট",
              fontFamily: '"Noto Sans Bengali", sans-serif',
              color: "#94A3B8",
              formatter: function (w) {
                return "১০০%";
              },
            },
          },
        },
      },
    },
    labels: ["উচ্চ", "মধ্যম", "নিম্ন"],
    colors: ["#EC4899", "#8B5CF6", "#3B82F6"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: '"Noto Sans Bengali", sans-serif',
      labels: { colors: "#94A3B8" },
      markers: {
        width: 8,
        height: 8,
        radius: 12,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    theme: { mode: "dark" },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: (val) => `${val}% কাজ`,
        title: {
          formatter: (seriesName) => `${seriesName} অগ্রাধিকার:`,
        },
      },
      style: {
        fontSize: "12px",
        fontFamily: '"Noto Sans Bengali", sans-serif',
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Enhanced Line Chart Options
  const lineChartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      background: "transparent",
      animations: {
        enabled: true,
        easing: "smooth",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      lineCap: "round",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: chartData.line.categories,
      labels: {
        style: {
          colors: "#94A3B8",
          fontFamily: '"Noto Sans Bengali", sans-serif',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: "#8B5CF6",
          width: 1,
          dashArray: 5,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8",
          fontFamily: '"Noto Sans Bengali", sans-serif',
        },
        formatter: (value) => `${value}টি`,
      },
    },
    grid: {
      borderColor: "#2D2D3D",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { top: 10 },
    },
    colors: ["#8B5CF6", "#EC4899"],
    theme: { mode: "dark" },
    markers: {
      size: 5,
      colors: ["#8B5CF6", "#EC4899"],
      strokeColors: "#1C1C26",
      strokeWidth: 2,
      hover: {
        size: 7,
        sizeOffset: 3,
      },
    },
    tooltip: {
      theme: "dark",
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `${value}টি কাজ`,
      },
      style: {
        fontSize: "12px",
        fontFamily: '"Noto Sans Bengali", sans-serif',
      },
    },
    legend: {
      labels: {
        colors: "#94A3B8",
      },
      markers: {
        width: 8,
        height: 8,
        radius: 12,
      },
    },
  };

  return (
    <main className="max-w-5xl mx-auto pb-[150px] px-6 py-8 relative z-10">
      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="bg-dark-800/50 backdrop-blur-md rounded-xl p-1 border border-dark-600/50">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                timeRange === range.value
                  ? "bg-accent-purple text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-4 border border-dark-600/50 hover:bg-dark-700/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-secondary text-sm">{stat.label}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  stat.isPositive
                    ? "text-green-400 bg-green-400/10"
                    : "text-red-400 bg-red-400/10"
                }`}
              >
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary group-hover:bg-gradient-to-r group-hover:from-accent-purple group-hover:to-accent-pink group-hover:bg-clip-text group-hover:text-transparent transition-all">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Enhanced Charts Section */}
      <div className="space-y-8">
        {/* Weekly Progress Chart */}
        <div className="bg-dark-800/50 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">সাপ্তাহিক অগ্রগতি</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-accent-purple mr-2"></div>
                <span className="text-sm text-text-secondary">সম্পন্ন কাজ</span>
              </div>
            </div>
          </div>
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={300}
          />
        </div>

        {/* Two Column Charts with Enhanced Styling */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark-800/50 max-w-[300px] sm:max-w-full backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 hover:bg-dark-700/50 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">কাজের অগ্রাধিকার</h2>
              {/* <div className="flex items-center space-x-4">
                {["উচ্চ", "মধ্যম", "নিম্ন"].map((priority, index) => (
                  <div key={priority} className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        index === 0
                          ? "bg-accent-pink"
                          : index === 1
                          ? "bg-accent-purple"
                          : "bg-accent-blue"
                      }`}
                    ></div>
                    <span className="text-sm text-text-secondary">
                      {priority}
                    </span>
                  </div>
                ))}
              </div> */}
            </div>
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              // height={300}
            />
          </div>

          <div className="bg-dark-800/50 max-w-[300px] sm:max-w-full backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 hover:bg-dark-700/50 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">কাজের প্রবণতা</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent-purple mr-2"></div>
                  <span className="text-sm text-text-secondary">সম্পন্ন</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent-pink mr-2"></div>
                  <span className="text-sm text-text-secondary">নতুন</span>
                </div>
              </div>
            </div>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              // height={300}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
