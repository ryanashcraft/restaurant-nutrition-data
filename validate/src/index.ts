import { parse } from "csv-parse";
import path from "path";
import fs from "fs";

import { fieldByCsvHeader, isNumericField } from "./fields";

const csvDirectory = path.resolve("..");

const listCsvFilePaths = async (directory: string): Promise<string[]> => {
  const csvFiles = fs
    .readdirSync(directory)
    .filter((file) => path.extname(file) === ".csv");

  return csvFiles.map((csvFile) => path.join(directory, csvFile));
};

const validateCsv = async (fileContent: string): Promise<string | null> => {
  try {
    await new Promise<void>((resolve, reject) => {
      parse(
        fileContent,
        {
          bom: true,
          delimiter: ",",
        },
        (error, rows: string[][]) => {
          if (error) {
            reject(error);
            return;
          }

          const [headerRow, ...bodyRows] = rows;

          if (headerRow.length <= 1) {
            reject("CSV is empty");
            return;
          }

          // Validate headers

          for (const headerCell of headerRow) {
            if (!Object.keys(fieldByCsvHeader).includes(headerCell)) {
              reject(`Unknown header cell: "${headerCell}"`);
              return;
            }
          }

          // Validate numeric values

          for (const [rowIndex, row] of bodyRows.entries()) {
            for (const [colIndex, headerCell] of headerRow.entries()) {
              const key = fieldByCsvHeader[headerCell];
              // Allow "<" characters; they will be ignored
              const cellValue = row[colIndex].replace(/^</, "");

              if (
                isNumericField(key) &&
                cellValue !== "" &&
                Number.isNaN(parseFloat(cellValue))
              ) {
                reject(
                  `Expected numeric value on row ${rowIndex}, column ${colIndex}: ${cellValue}`
                );
              }
            }
          }

          resolve();
        }
      );
    });

    return null;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};

const main = async () => {
  const csvFilePaths = await listCsvFilePaths(csvDirectory);
  const validationErrorByCsvFilePath = new Map();

  for (let csvFilePath of csvFilePaths) {
    const fileContents = fs.readFileSync(csvFilePath, "utf-8");
    const validationError = await validateCsv(fileContents);

    if (validationError) {
      validationErrorByCsvFilePath.set(csvFilePath, validationError);
    }
  }

  console.log(
    `${csvFilePaths.length - validationErrorByCsvFilePath.size}/${
      csvFilePaths.length
    } files passed validation`
  );

  if (validationErrorByCsvFilePath.size > 0) {
    for (let csvFilePath of csvFilePaths) {
      if (validationErrorByCsvFilePath.has(csvFilePath)) {
        console.log(
          `[${path.basename(csvFilePath)}] ${validationErrorByCsvFilePath.get(
            csvFilePath
          )}`
        );
      }
    }
  }

  process.exit(validationErrorByCsvFilePath.size);
};

main();
