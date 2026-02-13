import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const COLORS = ["#875cf5", "#cfbefb", "#60a5fa", "#34d399", "#fbbf24"];
const COLOR_MAP = {
  Salary: "#875cf5", // Purple
  Freelance: "#cfbefb", // Light Purple
  Business: "#60a5fa", // Blue
  Investment: "#34d399", // Green
  Other: "#fbbf24", // Yellow
};

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload.month}
        </p>

        {payload.map((item, index) => (
          <p key={index} className="text-xs text-gray-700">
            {item.name}: <span className="font-medium">{item.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data = [], xKey }) => {
  // Extract stack keys (Salary, Freelance, etc.)
  const stackKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== xKey) : [];

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomToolTip} />

          {/* 🔥 Stacked Bars */}
          {stackKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="income"
              // fill={COLORS[index % COLORS.length]}
              fill={COLOR_MAP[key] || "#cfbefb"}
              radius={[10, 10, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
