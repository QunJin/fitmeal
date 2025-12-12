import FoodClient from "./FoodClient";

async function getFood(id) {
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${process.env.USDA_API_KEY}`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function FoodPage(props) {
  const params = props.params instanceof Promise ? await props.params : props.params;
  const id = params.id;

  const food = await getFood(id);
  return <FoodClient food={food} />;
}
