"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 5500 },
  { month: "Apr", revenue: 8000 },
  { month: "May", revenue: 7200 },
  { month: "Jun", revenue: 9800 },
  { month: "Jul", revenue: 11000 },
  { month: "Aug", revenue: 10500 },
  { month: "Sep", revenue: 13000 },
  { month: "Oct", revenue: 12500 },
  { month: "Nov", revenue: 15000 },
  { month: "Dec", revenue: 45231 },
];

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 12 }} />
        <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#6366f1"
          strokeWidth={2}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}