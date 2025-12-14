"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Food icon helper
function getFoodIcon(desc) {
  const d = desc.toLowerCase();

  if (d.includes("chicken") || d.includes("turkey"))
    return "https://img.icons8.com/color/96/chicken.png";
  if (d.includes("beef") || d.includes("steak") || d.includes("pork"))
    return "https://img.icons8.com/color/96/steak.png";
  if (d.includes("fish") || d.includes("salmon") || d.includes("tuna"))
    return "https://img.icons8.com/color/96/fish-food.png";
  if (d.includes("fruit") || d.includes("apple") || d.includes("banana"))
    return "https://img.icons8.com/color/96/apple.png";
  if (d.includes("vegetable") || d.includes("broccoli") || d.includes("carrot"))
    return "https://img.icons8.com/color/96/broccoli.png";
  if (d.includes("rice") || d.includes("pasta") || d.includes("bread"))
    return "https://img.icons8.com/color/96/rice-bowl.png";

  return "https://img.icons8.com/color/96/meal.png";
}

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!q) {
        setResults([]);
        return;
      }

      setLoading(true);

      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        cache: "no-store",
      });

      const data = await res.json();
      let foods = data.foods || [];

      foods = foods.filter(
        (x, i, arr) =>
          i === arr.findIndex((y) => y.description === x.description)
      );

      setResults(foods);
      setLoading(false);
    }

    fetchResults();
  }, [q]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search foods…"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white shadow
                     focus:ring-2 focus:ring-blue-500
                     dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        />
        <button className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p className="text-slate-500">Searching…</p>}
      {!loading && results.length === 0 && q && (
        <p className="text-slate-500">No results found.</p>
      )}

      <ul className="space-y-4">
        {results.map((food) => (
          <li key={food.fdcId}>
            <a
              href={`/food/${food.fdcId}`}
              className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-md"
            >
              <img
                src={getFoodIcon(food.description)}
                alt=""
                className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-lg p-2"
              />
              <div>
                <p className="font-semibold">{food.description}</p>
                <p className="text-xs text-slate-500">{food.dataType}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
