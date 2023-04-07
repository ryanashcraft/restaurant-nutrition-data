import csv
import re
import inflect
import pdfplumber

inflector = inflect.engine()

HEADERS = [
    "Name",
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
    us_freshii = extract_items("./2023-03 freshii us.pdf")
    us_freshii_file = open('../../freshii.csv', 'w', newline='')
    us_csv = csv.writer(us_freshii_file)
    us_csv.writerow(HEADERS)
    for item in us_freshii:
        us_csv.writerow(item)

    canada_freshii = extract_items("./2023-03 freshii canada.pdf")
    ca_freshii_file = open('../../freshii-canada.csv', 'w', newline='')
    ca_csv = csv.writer(ca_freshii_file)
    ca_csv.writerow(HEADERS)
    for item in canada_freshii:
        if item in us_freshii:
            continue
        else:
            ca_csv.writerow(item)

    us_freshii_file.close()
    ca_freshii_file.close()


def extract_items(path: str):
    items = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables():
                table_header = ""
                for line in table:
                    if is_empty_line(line) or is_subheader_line(line):
                        continue
                    elif is_table_header(line):
                        table_header = format_table_header(line[0]) or table_header
                    else:
                        name = f"{line[0]} {table_header}".strip()
                        items.append([format_item_name(name), *line[1:]])
    return items

def format_item_name(name: str) -> str:
    return name.replace("\n", " ").replace(".", "").replace("’", "'")

def format_table_header(header: str) -> str | None:
    if header is None:
        return None
    skip_headers = ["Sweet Treats", "Breakfast", "Dressings & Sauces"]
    if header in skip_headers:
        return ""
    if "Smoothies" in header:
        pattern = re.compile(r'\((\d+)\s*oz\)')
        match = pattern.search(header)
        if match:
            return f"Smoothie ({match.group(1)}oz)" 
        else:
            return "Smoothie"
    if header == "Kid’s Menu / School Lunch":
        return "Kids"
    return singularize(header)

def singularize(noun: str) -> str:
    singular = inflector.singular_noun(noun)
    if type(singular) == bool:
        return noun
    else:
        return str(singular)

def is_empty_line(line: list[str]) -> bool:
    return all(x == "" or x is None for x in line[1:])

def is_table_header(line: list[str]) -> bool:
    return line[1] == "Calories" or line[2] == "Fat"

def is_subheader_line(line: list[str]) -> bool:
    return line[2] == "(g)"

if __name__ == "__main__":
    main()
