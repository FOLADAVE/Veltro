import Link from "next/link";
import Image from "next/image";
import { BarChart2, Shield, Zap, Users, CreditCard, Settings } from "lucide-react";

const features = [
  { icon: BarChart2, title: "Real-time Analytics", description: "Track revenue, users, and growth with beautiful interactive charts." },
  { icon: Shield, title: "Secure Authentication", description: "Enterprise-grade auth with Supabase. Your data is always protected." },
  { icon: Zap, title: "Lightning Fast", description: "Built with Next.js 14 and optimized for performance from day one." },
  { icon: Users, title: "Customer Management", description: "View and manage all your customers in one clean, organized table." },
  { icon: CreditCard, title: "Stripe Billing", description: "Accept payments and manage subscriptions with Stripe integration." },
  { icon: Settings, title: "Full Customization", description: "Update your profile, password, and account preferences anytime." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Image src="/veltro.png" alt="Veltro" width={50} height={50} />
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs px-3 py-1.5 rounded-full mb-6">
          <Zap size={12} />
          Now with Stripe billing integration
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your business,
          <span className="text-indigo-400"> at a glance</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Veltro gives you a powerful dashboard to track revenue, manage customers, and grow your business — all in one place.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-sm">
            Start for free
          </Link>
          <Link href="/login" className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium px-8 py-3 rounded-lg transition-colors text-sm">
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Everything you need</h2>
          <p className="text-slate-400">Built for modern businesses that move fast.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-colors">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                <Icon size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Simple pricing</h2>
          <p className="text-slate-400">Start free, upgrade when you need more.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-white font-bold text-xl mb-1">Free</h3>
            <p className="text-4xl font-bold text-white mb-1">$0<span className="text-slate-400 text-base font-normal">/month</span></p>
            <p className="text-slate-400 text-sm mb-6">Perfect for getting started</p>
            <ul className="flex flex-col gap-3 mb-8">
              {["Up to 3 projects", "Basic analytics", "1 team member", "Email support"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-green-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block text-center w-full border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-slate-900 border border-indigo-500 rounded-xl p-8 relative">
            <span className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
              Popular
            </span>
            <h3 className="text-white font-bold text-xl mb-1">Pro</h3>
            <p className="text-4xl font-bold text-white mb-1">$29<span className="text-slate-400 text-base font-normal">/month</span></p>
            <p className="text-slate-400 text-sm mb-6">For growing businesses</p>
            <ul className="flex flex-col gap-3 mb-8">
              {["Unlimited projects", "Advanced analytics", "Up to 10 team members", "Priority support", "Custom integrations", "Stripe billing"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-green-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block text-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/veltro.png" alt="Veltro" width={30} height={30} />
          <span className="text-slate-400 text-sm">© {new Date().getFullYear()} Veltro. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
          <Link href="/signup" className="hover:text-white transition-colors">Sign up</Link>
        </div>
      </footer>
    </div>
  );
}