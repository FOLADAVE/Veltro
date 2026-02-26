"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "@/app/actions/auth";
import { Menu, X, LayoutDashboard, BarChart2, Users, CreditCard, Settings, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — always visible on desktop, hidden on mobile unless open */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-30
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        {/* Logo + close button (close only shows on mobile) */}
        <div className="flex items-center justify-between mb-8">
          <Image src="/veltro.png" alt="Veltro Logo" width={70} height={70} />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-3 text-sm text-slate-400 hover:text-white w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content — offset by sidebar width on desktop only */}
      <div className="flex flex-col flex-1 lg:ml-64 min-w-0">

        {/* Mobile top bar — only shows on small screens */}
        <header className="lg:hidden sticky top-0 z-10 bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white"
          >
            <Menu size={22} />
          </button>
          <Image src="/veltro.png" alt="Veltro" width={40} height={40} />
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
            V
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 px-6 py-4 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Veltro. All rights reserved. Built with Next.js & Supabase.
        </footer>
      </div>
    </div>
  );
}