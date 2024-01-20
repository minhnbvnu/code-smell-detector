import { Injectable } from "@nestjs/common";
import { ESLint } from "eslint";

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

    const detectionResult = {};
    lintResult.forEach((res) => {
      const fileName = this.extractAfterLastSlash(res.filePath);
      detectionResult[fileName] = res.errorCount > 0;
    });

    return detectionResult;
  }
}
