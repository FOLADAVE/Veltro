"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createClient } from "../lib/supabase";

type MonthData = {
  month: string;
  revenue: number;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenueChart() {
  const [data, setData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRevenueData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const currentYear = new Date().getFullYear();
      const startOfYear = `${currentYear}-01-01`;
      const endOfYear = `${currentYear}-12-31`;

      const { data: invoices } = await supabase
        .from("invoices")
        .select("amount, created_at")
        .eq("user_id", user.id)
        .eq("status", "paid")
        .gte("created_at", startOfYear)
        .lte("created_at", endOfYear);

      // Build monthly revenue map
      const monthlyRevenue: Record<number, number> = {};
      for (let i = 0; i < 12; i++) {
        monthlyRevenue[i] = 0;
      }

      if (invoices) {
        invoices.forEach((invoice) => {
          const month = new Date(invoice.created_at).getMonth();
          monthlyRevenue[month] += invoice.amount;
        });
      }

      const chartData: MonthData[] = MONTHS.map((month, index) => ({
        month,
        revenue: monthlyRevenue[index],
      }));

      setData(chartData);
      setLoading(false);
    }

    loadRevenueData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-55">
        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasData = data.some(d => d.revenue > 0);

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center h-55 text-center">
        <p className="text-slate-500 text-sm">No revenue data yet.</p>
        <p className="text-slate-600 text-xs mt-1">
          Mark an invoice as paid to see your revenue chart.
        </p>
      </div>
    );
  }

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
        <YAxis
          stroke="#475569"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `₦${value.toLocaleString()}`}
        />
        <Tooltip
  contentStyle={{
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#fff",
  }}
  formatter={(value: number | string | undefined) => {
    const numericValue = typeof value === "number" ? value : Number(value) || 0;
    return [`₦${numericValue.toLocaleString()}`, "Revenue"];
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