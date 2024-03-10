import { Injectable } from "@nestjs/common";
import { ESLint, Linter } from "eslint";
import * as fs from "fs";

@Injectable()
export class EslintService {
  extractAfterLastSlash(inputString: string) {
    const lastSlashIndex = inputString.lastIndexOf("/");

    if (lastSlashIndex === -1) {
      return inputString;
    }

    return inputString.substring(lastSlashIndex + 1);
  }

  extractErrorLines(fileName: string, errorMessages: Linter.LintMessage[]) {
    const fileContent = fs
      .readFileSync(`scanner/functions/${fileName}`, "utf-8")
      .split("\n");
    const errorLines = new Set<number>();

    for (const errorMessage of errorMessages) {
      const { line, endLine } = errorMessage;
      for (let currentLine = line; currentLine <= endLine; currentLine++) {
        errorLines.add(currentLine);
      }
    }

    const extractedCode = (Array.from(errorLines) as number[])
      .map((lineNumber) => fileContent[lineNumber - 1])
      .join("\n");

    fs.writeFileSync(`scanner/errors/${fileName}`, extractedCode);
    console.log("Error code extracted and written to error_code.js");
  }

  extractComplexity(message: string) {
    const match =
      /(?:Function(?: '([^']+)'|)|Method(?: '([^']+)'|)|Arrow function) has a complexity of (\d+). Maximum allowed is (\d+)/.exec(
        message
      );
    return match ? parseInt(match[3]) : null;
  }

  async findComplexMethod() {
    const eslint = new ESLint();

    const lintResult = await eslint.lintFiles(["scanner/functions/*.js"]);

    // const detectionResult = {};
    const positive = [];
    const negative = [];
    let positiveCount = 1;
    let negativeCount = 1;
    lintResult.forEach((res, index) => {
      const fileName = this.extractAfterLastSlash(res.filePath);

      const hasError = res.errorCount > 0;
      const isParsingError = res.messages
        .map((error) => error.message)
        .some((message) => message.includes("Parsing error"));
      let errorPositionString = "e";
      res.messages
        .map((message) => {
          return {
            startLine: message.line,
            endLine: message.endLine || -1,
            startColumn: message.column,
            endColumn: message.endColumn || -1,
          };
        })
        .map((position) => {
          errorPositionString += ` ${position.startLine},${position.startColumn} ${position.endLine},${position.endColumn} e`;
        });

      if (hasError && !isParsingError) {
        fs.writeFileSync(
          "eslint-log-positive.txt",
          `${positiveCount} ${fileName} ${errorPositionString}\n`,
          {
            flag: "a",
          }
        );
        positiveCount++;
        positive.push(fileName);
        this.extractErrorLines(fileName, res.messages);
      } else {
        fs.writeFileSync(
          "eslint-log-negative.txt",
          `${negativeCount} ${fileName}\n`,
          {
            flag: "a",
          }
        );
        negativeCount++;
        negative.push(fileName);
      }
      // detectionResult[fileName] = res.errorCount > 0;
    });

    return { positive, negative };
  }
}
