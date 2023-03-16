# restaurant-nutrition-data

Nutrition data from popular restaurants and fast food chains.

## Contributions

I welcome contributions in the form of pull requests.

- If contributing a new restaurant, please provide a copy of the original raw source in the `sources` directory. Values should match what is in the original source.
- Percentage-based values, like %DV, must be converted to a mass-based amount. %DV amounts vary by country and by year, so please provide evidence to how you handled the conversion. Otherwise, please simply omit %DV values.
- Ensure that your data is formatted according to the specification defined below.
- Please reference existing files as a reference.

If you have any questions, please create an issue.

## Data format

### Columns

- Name
- Serving Size Description
- Serving Size (g)
- Serving Size (mL)
- Calories
- Total Fat (g)
- Saturated Fat (g)
- Trans Fat (g)
- Monounsaturated Fat (g)
- Polyunsaturated Fat (g)
- Cholesterol (mg)
- Sodium (mg)
- Carbohydrates (g)
- Fiber (g)
- Sugars (g)
- Sugars Added (g)
- Sugar Alcohols (g)
- Protein (g)
- Alcohol (g)
- Water (ml)
- Caffeine (mg)
- Calcium (mg)
- Chlorine (mg)
- Iron (mg)
- Magnesium (mg)
- Phosphorus (mg)
- Potassium (mg)
- Zinc (mg)
- Chromium (μg)
- Copper (mg)
- Iodine (μg)
- Manganese (mg)
- Molybdenum (μg)
- Selenium (μg)
- Vitamin A (μg)
- Vitamin E (mg)
- Vitamin D (μg)
- Vitamin C (mg)
- Vitamin B6 (mg)
- Vitamin B12 (μg)
- Vitamin K (μg)
- Thiamin (mg)
- Riboflavin (mg)
- Niacin (mg)
- Pantothenic Acid (mg)
- Biotin (μg)
- Folate (μg)

### Casing

- Values in the "Name" column should be title-cased.
- Values in the "Serving Size Description" column should be lowercased.
- All other values should only contain unformatted numbers, without thousand separators and a "." as the decimal separator.

### Example

```
Egg McMuffin,,136,,300,13,5,0,260,750,31,4,3,17
Sprite (Child),12 fl oz cup,,,100,0,0,0,0,25,27,0,27,0
1% Low Fat Milk Jug,1 carton,,236,100,2.5,1.5,0,10,125,12,0,12,8
```

See existing files for more examples.

## License

See LICENSE.txt.
