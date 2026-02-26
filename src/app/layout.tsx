import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Veltro — Business Analytics, Simplified",
    template: "%s | Veltro",
  },
  description: "Veltro is a modern SaaS dashboard for tracking revenue, users, and business growth in one place.",
  keywords: ["analytics", "dashboard", "SaaS", "business", "revenue", "Next.js", "Supabase"],
  authors: [{ name: "Folarin Obajenihi", url: "https://github.com/FOLADAVE" }],
  creator: "Folarin Dave",
  metadataBase: new URL("https://veltro-plum.vercel.app"),
  openGraph: {
    title: "Veltro — Business Analytics, Simplified",
    description: "Track your revenue, users, and business growth in one clean dashboard.",
    url: "https://veltro-plum.vercel.app",
    siteName: "Veltro",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltro — Business Analytics, Simplified",
    description: "Track your revenue, users, and business growth in one clean dashboard.",
    creator: "@FOLADAVE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}