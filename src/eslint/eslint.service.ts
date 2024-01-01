import { Injectable } from "@nestjs/common";
import { ESLint } from "eslint";

@Injectable()
export class EslintService {
  extractAfterLastSlash(inputString) {
    const lastSlashIndex = inputString.lastIndexOf("/");

    if (lastSlashIndex === -1) {
      // No slash found, return the original string
      return inputString;
    }

    return inputString.substring(lastSlashIndex + 1);
  }

  async findComplexMethod() {
    const eslint = new ESLint();

    const results = await eslint.lintFiles(["scanner/functions/*.js"]);
    const filesWithError = results
      .filter((res) => res.errorCount > 0)
      .filter(
        (res) =>
          res.messages.findIndex(
            (message) => message.ruleId === "complexity"
          ) !== -1
      )
      .map((res) => this.extractAfterLastSlash(res.filePath));

    return filesWithError;
  }
}
