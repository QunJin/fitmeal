import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitMeal",
  description: "Nutrition search + macro calculator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          min-h-screen
          bg-slate-50 text-slate-900
          dark:bg-slate-950 dark:text-slate-100
          ${geistSans.variable} ${geistMono.variable}
        `}
      >
        {/* NAVBAR */}
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow mb-6">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold">
              FitMeal
            </h1>

            <div className="flex items-center gap-4">
              <Link href="/" className="hover:underline">
                Search
              </Link>
              <Link href="/macro" className="hover:underline">
                Macro Calculator
              </Link>

              {/* Dark mode toggle */}
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 pb-10">
          {children}
        </main>
      </body>
    </html>
  );
}
