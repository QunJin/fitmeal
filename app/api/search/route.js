export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return Response.json({ foods: [] });
  }

  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
    q
  )}&pageSize=50&api_key=${process.env.USDA_API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return Response.json(data);
}
