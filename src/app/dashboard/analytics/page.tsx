"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 4000, users: 240 },
  { month: "Feb", revenue: 6000, users: 350 },
  { month: "Mar", revenue: 5500, users: 410 },
  { month: "Apr", revenue: 8000, users: 520 },
  { month: "May", revenue: 7200, users: 480 },
  { month: "Jun", revenue: 9800, users: 610 },
  { month: "Jul", revenue: 11000, users: 700 },
  { month: "Aug", revenue: 10500, users: 680 },
  { month: "Sep", revenue: 13000, users: 820 },
  { month: "Oct", revenue: 12500, users: 790 },
  { month: "Nov", revenue: 15000, users: 950 },
  { month: "Dec", revenue: 45231, users: 1200 },
];

export default function AnalyticsPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <p className="text-slate-400 text-sm mt-1">Track your growth and performance.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Avg. Monthly Revenue", value: "$11,247" },
          { label: "Total Users", value: "7,750" },
          { label: "Best Month", value: "June" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 12 }} />
            <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }} />
            <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 12 }} />
            <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }} />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#22d3ee" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}