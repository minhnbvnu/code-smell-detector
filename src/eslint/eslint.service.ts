import { Injectable } from "@nestjs/common";
import { ESLint } from "eslint";
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
      if (hasError) {
        fs.writeFileSync(
          "eslint-log-positive.txt",
          `${positiveCount} ${fileName}\n`,
          {
            flag: "a",
          }
        );
        positiveCount++;
        positive.push(fileName);
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
