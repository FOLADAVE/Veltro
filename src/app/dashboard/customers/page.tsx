export default function CustomersPage() {
  const customers = [
    { name: "Alice Johnson", email: "alice@example.com", plan: "Pro", status: "Active", joined: "Jan 12, 2025", revenue: "$120" },
    { name: "Bob Smith", email: "bob@example.com", plan: "Free", status: "Active", joined: "Feb 3, 2025", revenue: "$0" },
    { name: "Carol White", email: "carol@example.com", plan: "Pro", status: "Active", joined: "Mar 18, 2025", revenue: "$120" },
    { name: "David Brown", email: "david@example.com", plan: "Free", status: "Inactive", joined: "Apr 5, 2025", revenue: "$0" },
    { name: "Eva Martinez", email: "eva@example.com", plan: "Pro", status: "Active", joined: "May 22, 2025", revenue: "$120" },
    { name: "Frank Lee", email: "frank@example.com", plan: "Pro", status: "Active", joined: "Jun 9, 2025", revenue: "$120" },
    { name: "Grace Kim", email: "grace@example.com", plan: "Free", status: "Inactive", joined: "Jul 14, 2025", revenue: "$0" },
    { name: "Henry Wilson", email: "henry@example.com", plan: "Pro", status: "Active", joined: "Aug 30, 2025", revenue: "$120" },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Customers</h2>
        <p className="text-slate-400 text-sm mt-1">Manage and view all your customers.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Customers", value: "8" },
          { label: "Pro Plan", value: "5" },
          { label: "Free Plan", value: "3" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-white font-semibold">All Customers</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Name</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Email</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Plan</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Status</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Joined</th>
              <th className="text-left text-xs text-slate-400 font-medium px-6 py-3">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white font-medium">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{customer.email}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${customer.plan === "Pro" ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-700 text-slate-400"}`}>
                    {customer.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${customer.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{customer.joined}</td>
                <td className="px-6 py-4 text-sm text-white font-medium">{customer.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}