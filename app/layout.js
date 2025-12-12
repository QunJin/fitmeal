import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    <html lang="en">
      <body>
        <nav className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">FitMeal</h1>

            <div className="space-x-4 text-sm">
              <Link href="/" className="hover:underline">Search</Link>
              <Link href="/macro" className="hover:underline">Macro Calculator</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
