import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/app/actions/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col fixed h-full">
        <Image src="/veltro.png" alt="Veltro Logo" width={70} height={70} className="mb-6" />
        <nav className="flex flex-col gap-1">
          <Link href="/dashboard" className="text-sm px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            Dashboard
          </Link>
          <Link href="/dashboard/analytics" className="text-sm px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            Analytics
          </Link>
          <Link href="/dashboard/customers" className="text-sm px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            Customers
          </Link>
          <Link href="/dashboard/billing" className="text-sm px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            Billing
          </Link>
          <Link href="/dashboard/settings" className="text-sm px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            Settings
          </Link>
        </nav>
        <div className="mt-auto">
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-slate-400 hover:text-white w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}