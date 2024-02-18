import { Injectable } from "@nestjs/common";
import { execSync } from "child_process";
import { FileService } from "src/file/file.service";
import * as fs from "fs";
import { EslintService } from "src/eslint/eslint.service";

@Injectable()
export class TokenizerService {
  //https://dspinellis.github.io/manview/?src=https%3A%2F%2Fraw.githubusercontent.com%2Fdspinellis%2Ftokenizer%2Fmaster%2Fsrc%2Ftokenizer.1&name=tokenizer(1)&link=https%3A%2F%2Fgithub.com%2Fdspinellis%2tokenizer
  // -o statement
  constructor(
    private readonly fileService: FileService,
    private readonly eslintService: EslintService
  ) {}
  async tokenize(type: "1d" | "2d") {
    const detectionResult = await this.eslintService.findComplexMethod();
    const positiveTokenizedFiles = [];
    for (const file of detectionResult.positive) {
      console.log({ file });
      const tokenizeRes = this.runSingleTokenization(file, type);
      positiveTokenizedFiles.push(tokenizeRes);
    }

    const negativeTokenizedFiles = [];
    const positiveFileContent = positiveTokenizedFiles.join("");
    fs.writeFileSync(
      `data/${type}/Positive/tokenized1.tok.cld`,
      positiveFileContent
    );

    for (const file of detectionResult.negative) {
      const tokenizeRes = this.runSingleTokenization(file, type);
      negativeTokenizedFiles.push(tokenizeRes);
    }

    const negativeFileContent = negativeTokenizedFiles.join("");
    fs.writeFileSync(
      `data/${type}/Negative/tokenized1.tok.cld`,
      negativeFileContent
    );
    return true;
  }
  runSingleTokenization(fileName: string, type: "1d" | "2d" = "1d") {
    const cmd =
      type === "1d"
        ? `tokenizer -o method -l JavaScript scanner/functions/${this.fileService.escapeSpecialCharacter(
            fileName
          )}`
        : `tokenizer -o statement -l JavaScript scanner/functions/${this.fileService.escapeSpecialCharacter(
            fileName
          )}`;
    let exeRes = execSync(cmd, {
      encoding: "utf8",
    }).toString();

    if (type === "1d") {
      console.log("replaced");
      exeRes = exeRes.replace(/\n{2,}/g, "\n");
    }
    console.log({ exeRes });
    return exeRes;
  }
}
