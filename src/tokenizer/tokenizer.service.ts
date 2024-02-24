import { Injectable } from "@nestjs/common";
import { execSync, spawnSync } from "child_process";
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
  async tokenize(type: "1d" | "2d", tokenizer: "bert" | "normal") {
    let positiveFileCounter = 1;
    let negativeFileCounter = 1;
    // const detectionResult = await this.eslintService.findComplexMethod();
    let detectionResult = {
      positive: [],
      negative: [],
    };

    const eslintLogNegative = fs.readFileSync(
      "eslint-log-negative.txt",
      "utf8"
    );
    const negativeLines = eslintLogNegative.split("\n");
    const processedNegativeFiles = [];

    negativeLines.forEach((line) => {
      const elements = line.split(" ");
      if (elements.length >= 2) {
        processedNegativeFiles.push(elements[1]);
      }
    });

    const eslintLogPositive = fs.readFileSync(
      "eslint-log-positive.txt",
      "utf8"
    );
    const positiveLines = eslintLogPositive.split("\n");
    const processedPositiveFiles = [];

    positiveLines.forEach((line) => {
      const elements = line.split(" ");
      if (elements.length >= 2) {
        processedPositiveFiles.push(elements[1]);
      }
    });

    detectionResult.negative = processedNegativeFiles;
    detectionResult.positive = processedPositiveFiles;

    const positiveTokenizedFiles = [];
    for (const [index, file] of detectionResult.positive.entries()) {
      fs.writeFileSync(
        `tokenizer-positive-log-${tokenizer}-${type}.txt`,
        `${file} ${index}\n`,
        {
          flag: "a",
        }
      );
      const tokenizeRes =
        tokenizer === "bert"
          ? this.runSingleBertTokenization(file, type)
          : this.runSingleTokenization(file, type);
      positiveTokenizedFiles.push(tokenizeRes);
      const writeFile = `data/${tokenizer}/${type}/Positive/tokenized${positiveFileCounter}.tok.cld`;
      fs.writeFileSync(writeFile, tokenizeRes, {
        flag: "a",
      });
      if (fs.statSync(writeFile).size > 52428800) {
        ++positiveFileCounter;
      }
    }

    for (const [index, file] of detectionResult.negative.entries()) {
      fs.writeFileSync(
        `tokenizer-negative-log-${tokenizer}-${type}.txt`,
        `${file} ${index}\n`,
        {
          flag: "a",
        }
      );
      const tokenizeRes = this.runSingleTokenization(file, type);
      const writeFile = `data/${tokenizer}/${type}/Negative/tokenized${negativeFileCounter}.tok.cld`;
      fs.writeFileSync(writeFile, tokenizeRes, {
        flag: "a",
      });
      if (fs.statSync(writeFile).size > 52428800) {
        ++negativeFileCounter;
      }
    }

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
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 10,
    }).toString();
    console.log({ exeRes });

    if (type === "1d") {
      exeRes = exeRes.replace(/\n{2,}/g, "\n");
    }
    return exeRes;
  }

  runSingleBertTokenization(fileName: string, type: "1d" | "2d" = "1d") {
    const cmd = `python3 src/tokenizer/tokenizer.py ${type} scanner/functions/${this.fileService.escapeSpecialCharacter(
      fileName
    )}`;

    let exeRes = execSync(cmd, {
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 10,
    }).toString();
    if (type === "2d") {
      exeRes += "\n";
    }

    return exeRes;
  }
}
