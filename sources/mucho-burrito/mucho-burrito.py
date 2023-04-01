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
    with open('../../mucho-burrito.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(HEADERS)
        for item in items:
            ingredient = item[1].rstrip(",")
            menu_item = item[0]
            name = f"{ingredient} ({menu_item})".title()
            if not menu_item:
                name = ingredient.title()
            writer.writerow([name, *item[2:13]])

def extract_items():
    items = []
    with pdfplumber.open("./2023-04 mucho burrito.pdf") as pdf:
        for page in pdf.pages:
            table = page.extract_table(table_settings={
                "horizontal_strategy": "text"
            })
            if table:
                for idx, row in enumerate(table):
                    if idx > 2 and not is_empty_line(row) and not row[1] is None:
                        items.append(row)
    return items

def is_empty_line(line: list[str]) -> bool:
     return all(x == "" or x is None for x in line[1:])

if __name__ == "__main__":
    main()
