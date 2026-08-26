import Link from "next/link";
import Image from "next/image";
import { BarChart2, Shield, Users, CreditCard, FolderOpen, FileText } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Client Management",
    description: "Add and manage all your clients in one place. No more scrolling through WhatsApp chats to find a client's details.",
  },
  {
    icon: FolderOpen,
    title: "Project Tracking",
    description: "Track every project, its status, budget and deadline. Know exactly what you're working on and what's due.",
  },
  {
    icon: FileText,
    title: "Invoice Management",
    description: "Create invoices, track who has paid and who hasn't. Stop chasing clients in DMs for your money.",
  },
  {
    icon: BarChart2,
    title: "Revenue Dashboard",
    description: "See your monthly revenue, active clients and pending invoices at a glance. Know your numbers at all times.",
  },
  {
    icon: CreditCard,
    title: "Subscription Billing",
    description: "Simple, transparent pricing. Upgrade to Pro when your business grows and needs more power.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your business data is yours alone. Enterprise-grade security with Supabase keeps everything protected.",
  },
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
          🇳🇬 Built for Nigerian freelancers & agencies
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Stop managing your
          <span className="text-indigo-400"> business in WhatsApp</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Veltro gives Nigerian freelancers and agencies one clean dashboard to manage clients, track projects, send invoices and monitor revenue — all in one place.
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

      {/* Problem Statement */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <p className="text-slate-300 text-lg leading-relaxed">
            You&apos;re a skilled freelancer. You deliver great work. But your business is scattered — client contacts in WhatsApp, project details in your head, invoices in Excel, and revenue tracked with your fingers.
          </p>
          <p className="text-indigo-400 font-medium text-lg mt-4">
            You deserve to run your freelance business like a real business.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Everything you need to run your business</h2>
          <p className="text-slate-400">Built specifically for how Nigerian freelancers actually work.</p>
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

      {/* Social Proof */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Who is Veltro for?</h2>
          <p className="text-slate-400">If you earn from client work, Veltro is for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "💻", role: "Frontend Developers", desc: "Track client projects, manage retainers and know your monthly revenue." },
            { emoji: "🎨", role: "Designers", desc: "Manage design briefs, client feedback rounds and send professional invoices." },
            { emoji: "✍️", role: "Copywriters & Marketers", desc: "Track content projects, client deliverables and chase payments professionally." },
          ].map((item) => (
            <div key={item.role} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-white font-semibold mb-2">{item.role}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Simple, honest pricing</h2>
          <p className="text-slate-400">Start free. Upgrade when your business grows.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-white font-bold text-xl mb-1">Free</h3>
            <p className="text-4xl font-bold text-white mb-1">$0<span className="text-slate-400 text-base font-normal">/month</span></p>
            <p className="text-slate-400 text-sm mb-6">Perfect for getting started</p>
            <ul className="flex flex-col gap-3 mb-8">
              {["Up to 3 clients", "Up to 3 projects", "Basic invoice management", "Revenue dashboard"].map((f) => (
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
            <p className="text-slate-400 text-sm mb-6">For serious freelancers & agencies</p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Unlimited clients",
                "Unlimited projects",
                "Full invoice management",
                "Advanced revenue analytics",
                "Priority support",
                "Early access to new features",
              ].map((f) => (
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

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to run your business properly?
        </h2>
        <p className="text-slate-400 mb-8">
          Join Nigerian freelancers and agencies already using Veltro to manage their business like a professional.
        </p>
        <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-10 py-3 rounded-lg transition-colors text-sm">
          Get started for free
        </Link>
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