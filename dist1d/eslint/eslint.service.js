"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EslintService = void 0;
const common_1 = require("@nestjs/common");
const eslint_1 = require("eslint");
const fs = require("fs");
let EslintService = class EslintService {
    extractAfterLastSlash(inputString) {
        const lastSlashIndex = inputString.lastIndexOf("/");
        if (lastSlashIndex === -1) {
            return inputString;
        }
        return inputString.substring(lastSlashIndex + 1);
    }
    extractErrorLines(fileName, errorMessages) {
        const fileContent = fs
            .readFileSync(`scanner/functions/${fileName}`, "utf-8")
            .split("\n");
        const errorLines = new Set();
        for (const errorMessage of errorMessages) {
            const { line, endLine } = errorMessage;
            for (let currentLine = line; currentLine <= endLine; currentLine++) {
                errorLines.add(currentLine);
            }
        }
        const extractedCode = Array.from(errorLines)
            .map((lineNumber) => fileContent[lineNumber - 1])
            .join("\n");
        fs.writeFileSync(`scanner/errors/${fileName}`, extractedCode);
        console.log("Error code extracted and written to error_code.js");
    }
    extractComplexity(message) {
        const match = /(?:Function(?: '([^']+)'|)|Method(?: '([^']+)'|)|Arrow function) has a complexity of (\d+). Maximum allowed is (\d+)/.exec(message);
        return match ? parseInt(match[3]) : null;
    }
    async findComplexMethod() {
        const eslint = new eslint_1.ESLint();
        const lintResult = await eslint.lintFiles(["scanner/functions/*.js"]);
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
                fs.writeFileSync("eslint-log-positive.txt", `${positiveCount} ${fileName} ${errorPositionString}\n`, {
                    flag: "a",
                });
                positiveCount++;
                positive.push(fileName);
                this.extractErrorLines(fileName, res.messages);
            }
            else {
                fs.writeFileSync("eslint-log-negative.txt", `${negativeCount} ${fileName}\n`, {
                    flag: "a",
                });
                negativeCount++;
                negative.push(fileName);
            }
        });
        return { positive, negative };
    }
};
EslintService = __decorate([
    (0, common_1.Injectable)()
], EslintService);
exports.EslintService = EslintService;
//# sourceMappingURL=eslint.service.js.map