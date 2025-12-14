"use client";
import { useRouter } from "next/navigation";

// Icon Detector
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
  if (d.includes("milk") || d.includes("cheese") || d.includes("yogurt"))
    return "https://img.icons8.com/color/96/milk-bottle.png";

  return "https://img.icons8.com/color/96/meal.png";
}

export default function FoodClient({ food }) {
  const router = useRouter();

  function getVal(keys) {
    if (!food?.foodNutrients) return "N/A";

    const item = food.foodNutrients.find((n) => {
      const name = n?.nutrient?.name?.toLowerCase() || "";
      return keys.some((k) => name.includes(k));
    });

    return item ? `${item.amount} ${item.nutrient.unitName}` : "N/A";
  }

  return (
    <div className="max-w-xl mx-auto py-6 space-y-6">
      {/* Icon Banner */}
      <div className="flex justify-center">
        <img
          src={getFoodIcon(food.description)}
          alt="icon"
          className="w-28 h-28 object-contain rounded-xl bg-gray-100 dark:bg-slate-800 p-3 shadow"
        />
      </div>

      <button
        onClick={() => router.back()}
        className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
      >
        ← Back
      </button>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow space-y-4 dark:border dark:border-slate-700">
        <h1 className="text-2xl font-bold text-center">{food.description}</h1>

        <div className="grid grid-cols-2 gap-4 text-lg">
          <p>Calories: {getVal(["energy", "kcal"])} </p>
          <p>Protein: {getVal(["protein"])} </p>
          <p>Carbs: {getVal(["carbohydrate"])} </p>
          <p>Fat: {getVal(["fat", "lipid"])} </p>
        </div>

        {food.foodPortions?.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg mb-2">Common Portions</h2>
            <ul className="space-y-1 text-gray-700 dark:text-slate-300">
              {food.foodPortions.slice(0, 5).map((p) => (
                <li key={p.id}>
                  • {p.portionDescription} ({p.gramWeight} g)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
