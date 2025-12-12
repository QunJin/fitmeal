import Link from "next/link";

export default function Home() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Search Foods</h1>
      <p className="text-slate-500 mt-2">USDA FoodData Central</p>

      <form
        action="/search"
        className="mt-10 max-w-2xl mx-auto"
      >
        <div className="flex items-center bg-white rounded-full shadow px-5 py-3 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500">
          {/* Icon */}
          <span className="text-slate-400 text-xl mr-3">🔍</span>

          {/* Input */}
          <input
            type="text"
            name="q"
            placeholder="Search for foods..."
            className="w-full outline-none text-slate-700 placeholder-slate-400"
          />
        </div>
      </form>
    </div>
  );
}
