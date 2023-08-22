import re
import csv
import pdfplumber

HEADERS = [
    "Name",
    "Serving Size (g)",
    "Calories",
    "Total Fat (g)",
    "Saturated Fat (g)",
    "Trans Fat (g)",
    "Cholesterol (mg)",
    "Sodium (mg)",
    "Carbohydrates (g)",
    "Fiber (g)",
    "Sugars (g)",
    "Protein (g)",
]

def main():
    items = extract_items()
    with open('../../hero-burger.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(HEADERS)
        for item in items:
            writer.writerow([item[0], fix_sizing(item[1]), *item[2:12]])

def extract_items():
    items = []
    with pdfplumber.open("./2023-08-hero-burger.pdf") as pdf:
        for page in pdf.pages:
            table = page.extract_table(table_settings={
                "explicit_vertical_lines": [0]
            })
            if table:
                for idx, row in enumerate(table):
                    if idx > 2:
                        items.append(row)
    return items

def fix_sizing(serving_size: str) -> str:
    oz_pattern = r'(\d+)oz'
    g_pattern = r'(\d+)g'
    ml_pattern = r'(\d+)ml'

    oz_match = re.search(oz_pattern, serving_size)
    g_match = re.search(g_pattern, serving_size)
    ml_match = re.search(ml_pattern, serving_size)

    if oz_match:
        ounces = int(oz_match.group(1))
        grams = round(ounces * 28.3495)
        return str(grams)
    elif g_match:
        return g_match.group(1)
    elif ml_match:
        return ml_match.group(1)
    else:
        raise ValueError(f"No proper serving size for {serving_size}")


if __name__ == "__main__":
    main()
