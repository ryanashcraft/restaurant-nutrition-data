import csv
import re
import pdfplumber

def main():
    items = extract_items()
    with open('../../tim-hortons.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Name",
            "Serving Size Description",
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
        ])
        for item in items:
            writer.writerow([
                format_name(item[0]),
                format_size(item[0]),
                *item[1:],
            ])

def format_name(name: str) -> str:
    '''Change "Coffee® (Large)" to just "Coffee"'''
    formatted = name
    match = re.match(r"(.*)\s-(.*)", name)
    if match:
        formatted = match.group(1)
    return formatted.replace("®", "").title()

def format_size(name: str) -> str | None:
    '''Change "Coffee (Large)" to "large"'''
    match = re.match(r"(.*)\s-\s(.*)", name)
    if match:
        return re.sub(r"\s", "-", match.group(2)).lower()

def extract_items():
    '''Read the tables in the PDF and extract the menu items.'''
    items = []
    with pdfplumber.open("./2023-03 tim hortons.pdf") as pdf:
        for page in pdf.pages:
            table = page.extract_table()
            if table:
                for idx, row in enumerate(table):
                    if idx != 0 and row[1] != None:
                        items.append(row)
    return items


if __name__ == "__main__":
    main()
