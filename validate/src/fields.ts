export const fieldByCsvHeader: { [key: string]: string } = {
  Name: "name",
  "Serving Size Description": "household_serving_fulltext",
  "Serving Size (g)": "serving_size",
  "Serving Size (mL)": "serving_size",
  Calories: "calories",
  "Total Fat (g)": "fat",
  "Saturated Fat (g)": "fat_saturated",
  "Trans Fat (g)": "fat_trans",
  "Monounsaturated Fat (g)": "fat_monounsaturated",
  "Polyunsaturated Fat (g)": "fat_polyunsaturated",
  "Cholesterol (mg)": "cholesterol",
  "Sodium (mg)": "sodium",
  "Carbohydrates (g)": "carbohydrates",
  "Fiber (g)": "fiber",
  "Sugars (g)": "sugars",
  "Sugars Added (g)": "sugars_added",
  "Sugar Alcohols (g)": "sugar_alcohols",
  "Protein (g)": "protein",
  "Alcohol (g)": "alcohol",
  "Water (ml)": "water",
  "Caffeine (mg)": "caffeine",
  "Calcium (mg)": "calcium",
  "Chlorine (mg)": "chlorine",
  "Iron (mg)": "iron",
  "Magnesium (mg)": "magnesium",
  "Phosphorus (mg)": "phosphorus",
  "Potassium (mg)": "potassium",
  "Zinc (mg)": "zinc",
  "Chromium (μg)": "chromium",
  "Copper (mg)": "copper",
  "Iodine (μg)": "iodine",
  "Manganese (mg)": "manganese",
  "Molybdenum (μg)": "molybdenum",
  "Selenium (μg)": "selenium",
  "Vitamin A (μg)": "vitamin_a",
  "Vitamin E (mg)": "vitamin_e",
  "Vitamin D (μg)": "vitamin_d",
  "Vitamin C (mg)": "vitamin_c",
  "Vitamin B6 (mg)": "vitamin_b6",
  "Vitamin B12 (μg)": "vitamin_b12",
  "Vitamin K (μg)": "vitamin_k",
  "Thiamin (mg)": "thiamin",
  "Riboflavin (mg)": "riboflavin",
  "Niacin (mg)": "niacin",
  "Pantothenic Acid (mg)": "pantothenic_acid",
  "Biotin (μg)": "biotin",
  "Folate (μg)": "folate",
};

export const isNumericField = (field: string): boolean => {
  switch (field) {
    case "name":
    case "household_serving_fulltext":
      return false;
    default:
      return true;
  }
};
