var source = "https://chipotle.com/nutrition-calculator";

var items = [];

[...document.querySelectorAll(".c-topping-card")].forEach((n) => {
  let title = n.querySelector(".c-topping-card__header").innerText;
  let nutritionValues = {};

  n.querySelectorAll(".c-topping-card__n-item").forEach((n) => {
    if (n.dataset.title === "portion") {
      nutritionValues[n.dataset.title] = n
        .querySelector(".c-topping-card__n-item-value")
        .innerText.replace(/\s/g, "");
    } else {
      nutritionValues[n.dataset.title] = n.dataset.value;
    }
  });

  if (typeof nutritionValues.portion !== "string") {
    return;
  }

  let servingSize = parseFloat(nutritionValues.portion) * 28.349523;

  // Normalize to 100g
  let nutrientValueCoefficient = 100 / servingSize;

  items.push({
    secondary_source: source,
    brand_owner: "Chipotle",
    name: title
      .trim()
      .replace(/(\s+)/g, " ")
      .replace(/[^a-zA-Z0-9-,. \/\(\)&]/g, "")
      .replace(/\S\(/g, " ("),
    id: title
      .trim()
      .toLowerCase()
      .replace(/([^a-z0-9]+)/g, ""),
    serving_size: servingSize,
    serving_size_unit: "g",
    household_serving_amount: 1,
    household_serving_fulltext: "serving",
    calories: nutritionValues.calories * nutrientValueCoefficient,
    fat: nutritionValues["total-fat"] * nutrientValueCoefficient,
    fat_saturated: nutritionValues["saturated-fat"] * nutrientValueCoefficient,
    fat_trans: nutritionValues["trans-fat"] * nutrientValueCoefficient,
    cholesterol: nutritionValues["cholesterol"] * nutrientValueCoefficient,
    sodium: nutritionValues["sodium"] * nutrientValueCoefficient,
    carbohydrates: nutritionValues["carbohydrates"] * nutrientValueCoefficient,
    fiber: nutritionValues["dietary-fiber"] * nutrientValueCoefficient,
    sugars: nutritionValues["sugars"] * nutrientValueCoefficient,
    protein: nutritionValues["protein"] * nutrientValueCoefficient,
  });
});

var seenFoods = new Set();

items = items.filter((item) => {
  let key = item.name + item.portion;

  if (seenFoods.has(key)) {
    return false;
  } else {
    seenFoods.add(key);
    return true;
  }
});

items = items.filter((item) =>
  Object.keys(item).every((key) => item[key] !== null)
);

copy(items);
