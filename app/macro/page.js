"use client";
import { useState } from "react";

export default function MacroPage() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("male");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [results, setResults] = useState(null);

  function calculate() {
    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);

    const BMR =
      sex === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const TDEE = Math.round(BMR * Number(activity));

    let daily = TDEE;
    if (goal === "lose") daily -= 300;
    if (goal === "gain") daily += 300;

    setResults({ BMR: Math.round(BMR), TDEE, daily });
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold">Macro Calculator</h1>
      <p className="text-slate-600 text-sm">Estimate your daily calories.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input className="input" placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <input className="input" placeholder="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input className="input" placeholder="Height (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />

          <select className="input" value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select className="input" value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="1.2">Sedentary</option>
            <option value="1.375">Light Active</option>
            <option value="1.55">Moderate Active</option>
            <option value="1.725">Very Active</option>
            <option value="1.9">Extremely Active</option>
          </select>

          <select className="input" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="maintain">Maintain</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        <button className="btn-primary" onClick={calculate}>
          Calculate
        </button>
      </div>

      {results && (
        <div className="card space-y-2">
          <h2 className="text-xl font-semibold">Results</h2>
          <p>BMR: <b>{results.BMR}</b> kcal</p>
          <p>TDEE: <b>{results.TDEE}</b> kcal</p>
          <p>Daily Calories: <b>{results.daily}</b> kcal</p>
        </div>
      )}
    </div>
  );
}
