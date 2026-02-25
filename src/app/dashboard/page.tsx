import RevenueChart from "@/components/RevenueChart";


export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Good day 👋</h2>
        <p className="text-slate-400 text-sm mt-1">Here&apos;s what&apos;s happening with your business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: "$45,231", change: "+20.1%" },
          { label: "Subscriptions", value: "+2,350", change: "+180.1%" },
          { label: "Active Users", value: "+12,234", change: "+19%" },
          { label: "Active Now", value: "+573", change: "+201" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-green-400 text-xs mt-1">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Revenue Overview</h3>
        <RevenueChart />
      </div>

      {/* Recent Signups */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Recent Signups</h3>
        <div className="flex flex-col gap-3">
          {[
            { name: "Alice Johnson", email: "alice@example.com", plan: "Pro" },
            { name: "Bob Smith", email: "bob@example.com", plan: "Free" },
            { name: "Carol White", email: "carol@example.com", plan: "Pro" },
            { name: "David Brown", email: "david@example.com", plan: "Free" },
          ].map((user) => (
            <div key={user.email} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{user.name}</p>
                <p className="text-slate-400 text-xs">{user.email}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${user.plan === "Pro" ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-700 text-slate-400"}`}>
                {user.plan}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}