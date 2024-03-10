"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenizerService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const file_service_1 = require("../file/file.service");
const fs = require("fs");
const eslint_service_1 = require("../eslint/eslint.service");
let TokenizerService = class TokenizerService {
    constructor(fileService, eslintService) {
        this.fileService = fileService;
        this.eslintService = eslintService;
    }
    async tokenize(type, tokenizer) {
        let positiveFileCounter = 1;
        let negativeFileCounter = 1;
        let detectionResult = {
            positive: [],
            negative: [],
        };
        const eslintLogNegative = fs.readFileSync("eslint-log-negative.txt", "utf8");
        const negativeLines = eslintLogNegative.split("\n");
        const processedNegativeFiles = [];
        negativeLines.forEach((line) => {
            const elements = line.split(" ");
            if (elements.length >= 2) {
                processedNegativeFiles.push(elements[1]);
            }
        });
        const eslintLogPositive = fs.readFileSync("eslint-log-positive.txt", "utf8");
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
        for (const [index, file] of detectionResult.positive
            .slice(0, 1000)
            .entries()) {
            fs.writeFileSync(`tokenizer-positive-log-${tokenizer}-${type}.txt`, `${file} ${index}\n`, {
                flag: "a",
            });
            const tokenizeRes = tokenizer === "bert"
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
        for (const [index, file] of detectionResult.negative
            .slice(0, 2000)
            .entries()) {
            fs.writeFileSync(`tokenizer-negative-log-${tokenizer}-${type}.txt`, `${file} ${index}\n`, {
                flag: "a",
            });
            const tokenizeRes = tokenizer === "bert"
                ? this.runSingleBertTokenization(file, type)
                : this.runSingleTokenization(file, type);
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
    runSingleTokenization(fileName, type = "1d") {
        const cmd = type === "1d"
            ? `tokenizer -o method -l JavaScript scanner/functions/${this.fileService.escapeSpecialCharacter(fileName)}`
            : `tokenizer -o statement -l JavaScript scanner/functions/${this.fileService.escapeSpecialCharacter(fileName)}`;
        let exeRes = (0, child_process_1.execSync)(cmd, {
            encoding: "utf-8",
            maxBuffer: 1024 * 1024 * 10,
        }).toString();
        console.log({ exeRes });
        if (type === "1d") {
            exeRes = exeRes.replace(/\n{2,}/g, "\n");
        }
        return exeRes;
    }
    runSingleBertTokenization(fileName, type = "1d") {
        const cmd = `python3 src/tokenizer/tokenizer.py ${type} scanner/functions/${this.fileService.escapeSpecialCharacter(fileName)}`;
        let exeRes = (0, child_process_1.execSync)(cmd, {
            encoding: "utf-8",
            maxBuffer: 1024 * 1024 * 10,
        }).toString();
        if (type === "2d") {
            exeRes += "\n";
        }
        return exeRes;
    }
};
TokenizerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService,
        eslint_service_1.EslintService])
], TokenizerService);
exports.TokenizerService = TokenizerService;
//# sourceMappingURL=tokenizer.service.js.map