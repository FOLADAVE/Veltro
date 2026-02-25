export default function BillingPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Billing</h2>
        <p className="text-slate-400 text-sm mt-1">Manage your subscription and billing details.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Current Plan</p>
            <h3 className="text-white text-xl font-bold">Free Plan</h3>
            <p className="text-slate-400 text-sm mt-1">You are currently on the free plan.</p>
          </div>
          <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full font-medium">Free</span>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Free Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-1">Free</h3>
          <p className="text-3xl font-bold text-white mb-1">$0<span className="text-slate-400 text-sm font-normal">/month</span></p>
          <p className="text-slate-400 text-sm mb-6">Perfect for getting started</p>
          <ul className="flex flex-col gap-3 mb-6">
            {["Up to 3 projects", "Basic analytics", "1 team member", "Email support"].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-green-400">✓</span> {feature}
              </li>
            ))}
          </ul>
          <button disabled className="w-full bg-slate-700 text-slate-400 font-medium py-2.5 rounded-lg text-sm cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900 border border-indigo-500 rounded-xl p-6 relative">
          <span className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Popular
          </span>
          <h3 className="text-white font-bold text-lg mb-1">Pro</h3>
          <p className="text-3xl font-bold text-white mb-1">$29<span className="text-slate-400 text-sm font-normal">/month</span></p>
          <p className="text-slate-400 text-sm mb-6">For growing businesses</p>
          <ul className="flex flex-col gap-3 mb-6">
            {["Unlimited projects", "Advanced analytics", "Up to 10 team members", "Priority support", "Custom integrations", "Stripe billing"].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-green-400">✓</span> {feature}
              </li>
            ))}
          </ul>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-white font-semibold">Billing History</h3>
        </div>
        <div className="flex items-center justify-center py-12 text-slate-500 text-sm">
          No billing history yet.
        </div>
      </div>
    </>
  );
}