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
    // const functionFiles = this.fileService.getFunctions();
    const positiveTokenizedFiles = [];
    // const tokenized2DFiles = [];
    for (const file of detectionResult.positive) {
      const tokenizeRes = this.runSingleTokenization(file, type);
      // const tokenize2dRes = this.runSingleTokenization(file, "2d");
      positiveTokenizedFiles.push(tokenizeRes);
      // tokenized2DFiles.push(tokenize2dRes);
    }

    const negativeTokenizedFiles = [];
    const positiveFileContent = positiveTokenizedFiles.join("");
    fs.writeFileSync(
      `data/${type}/positive/${type}.tok.cld`,
      positiveFileContent
    );

    for (const file of detectionResult.negative) {
      const tokenizeRes = this.runSingleTokenization(file, type);
      // const tokenize2dRes = this.runSingleTokenization(file, "2d");
      negativeTokenizedFiles.push(tokenizeRes);
      // tokenized2DFiles.push(tokenize2dRes);
    }

    const negativeFileContent = negativeTokenizedFiles.join("");
    fs.writeFileSync(
      `data/${type}/negative/${type}.tok.cld`,
      negativeFileContent
    );
    return true;
  }
  runSingleTokenization(fileName: string, type: "1d" | "2d" = "1d") {
    const cmd =
      type === "1d"
        ? `tokenizer -l JavaScript scanner/functions/${this.fileService.escapeSpecialCharacter(
            fileName
          )}`
        : `tokenizer -o line -l JavaScript scanner/functions/${this.fileService.escapeSpecialCharacter(
            fileName
          )}`;
    const exeRes = execSync(cmd).toString();
    return exeRes;
  }
}
