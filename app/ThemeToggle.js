"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  // Run only on client after hydration
  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);

    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);

    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        text-sm px-3 py-1 rounded-full
        border border-slate-300 dark:border-slate-600
        bg-slate-100 dark:bg-slate-800
        text-slate-800 dark:text-slate-100
        hover:bg-slate-200 dark:hover:bg-slate-700
        transition
      "
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
