import Link from "next/link";
import { signUp } from "@/app/actions/auth";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
        <p className="text-slate-400 text-sm mb-6">Start your Veltro journey today</p>

        {searchParams.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
            {searchParams.error}
          </div>
        )}

        <form action={signUp} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Daniel Haastrup"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm"
          >
            Create account
          </button>
        </form>

        <p className="text-slate-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}