import { Injectable } from "@nestjs/common";
import { ESLint } from "eslint";

@Injectable()
export class EslintService {
  async findComplexMethod() {
    const eslint = new ESLint();

    // 2. Lint files.
    const results = await eslint.lintFiles(["aframe-master/*.js"]);
    console.log({
      results: results
        .filter((res) => res.errorCount > 0)
        .map((res) => res.filePath),
    });

    // 3. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    // return results.map((res) => res.errorCount > 0);
    return resultText;
  }
}
