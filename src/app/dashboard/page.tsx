"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase";
import { getDashboardStats } from "../../lib/db";
import RevenueChart from "../../components/RevenueChart";
import { DollarSign, Users, FolderOpen, FileText } from "lucide-react";

type Stats = {
  activeClients: number;
  projectsInProgress: number;
  pendingInvoices: number;
  monthlyRevenue: number;
};

type RecentActivity = {
  id: string;
  type: "client" | "project" | "invoice";
  title: string;
  subtitle: string;
  created_at: string;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    activeClients: 0,
    projectsInProgress: 0,
    pendingInvoices: 0,
    monthlyRevenue: 0,
  });
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, business_name")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserName(profile.business_name || profile.full_name || "there");
      }

      // Get stats
      const dashStats = await getDashboardStats(user.id);
      setStats(dashStats);

      // Get recent activity
      const [clientsRes, projectsRes, invoicesRes] = await Promise.all([
        supabase.from("clients").select("id, name, company, created_at")
          .eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        supabase.from("projects").select("id, title, status, created_at")
          .eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        supabase.from("invoices").select("id, amount, status, created_at")
          .eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
      ]);

      const activity: RecentActivity[] = [
        ...(clientsRes.data ?? []).map((c) => ({
          id: c.id, type: "client" as const,
          title: c.name, subtitle: c.company || "New client",
          created_at: c.created_at,
        })),
        ...(projectsRes.data ?? []).map((p) => ({
          id: p.id, type: "project" as const,
          title: p.title, subtitle: p.status.replace("_", " "),
          created_at: p.created_at,
        })),
        ...(invoicesRes.data ?? []).map((i) => ({
          id: i.id, type: "invoice" as const,
          title: `Invoice — ₦${i.amount.toLocaleString()}`,
          subtitle: i.status, created_at: i.created_at,
        })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

      setRecentActivity(activity);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  const statCards = [
    {
      label: "Monthly Revenue",
      value: `₦${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Active Clients",
      value: stats.activeClients.toString(),
      icon: Users,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Projects In Progress",
      value: stats.projectsInProgress.toString(),
      icon: FolderOpen,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Pending Invoices",
      value: stats.pendingInvoices.toString(),
      icon: FileText,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  const activityIcons: Record<string, string> = {
    client: "👤",
    project: "📁",
    invoice: "🧾",
  };

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          {getGreeting()}, {userName} 👋
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon size={16} className={stat.color} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Revenue Overview</h3>
        <RevenueChart />
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No activity yet.</p>
            <p className="text-slate-600 text-xs mt-1">
              Add your first client to get started.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{activityIcons[item.type]}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-slate-400 text-xs capitalize">{item.subtitle}</p>
                  </div>
                </div>
                <span className="text-slate-500 text-xs">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}