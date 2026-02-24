import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <Image src="/veltro.png" alt="Veltro Logo" width={150} height={150} loading="eager" className="mb-6" />
      <p className="text-slate-400 text-lg mb-8">Business analytics, simplified.</p>
      <div className="flex gap-4">
        <Link href="/login" className="bg-white text-slate-950 px-6 py-2.5 border border-slate-600 rounded-lg font-medium hover:bg-slate-200">
          Log in
        </Link>
        <Link href="/signup" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700">
          Get started
        </Link>
      </div>
    </main>
  );
}