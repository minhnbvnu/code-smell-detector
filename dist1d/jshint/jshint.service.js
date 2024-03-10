"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JshintService = void 0;
const common_1 = require("@nestjs/common");
const jshint_1 = require("jshint");
const fs = require("fs");
const path = require("path");
let JshintService = class JshintService {
    readFilesInDirectory(directoryPath) {
        const files = fs.readdirSync(directoryPath);
        let fileContents = [];
        files.forEach((fileName) => {
            const fileContent = [];
            const filePath = path.join(directoryPath, fileName);
            const content = fs.readFileSync(filePath, "utf-8");
            content
                .replace(/\t+/g, "")
                .split("\n")
                .forEach((line) => fileContent.push(line));
            fileContents.push({ fileContent, fileName });
        });
        return fileContents;
    }
    async findComplexMethod() {
        const files = this.readFilesInDirectory("scanner/functions");
        console.log({ files });
        let res = [];
        for (let i = 0; i < files.length; i++) {
            const source = files[i].fileContent;
            const options = {
                maxcomplexity: 20,
                asi: true,
                unused: false,
            };
            (0, jshint_1.JSHINT)(source, options);
            const analyzeRes = jshint_1.JSHINT.data();
            const functions = analyzeRes.functions;
            let maxcomplexity = 0;
            functions.forEach((f) => {
                if (f.metrics.complexity > maxcomplexity) {
                    maxcomplexity = f.metrics.complexity;
                }
            });
            if (maxcomplexity > 20) {
                res.push({ file: files[i].fileName, complexity: maxcomplexity });
            }
            console.log("anaylyzing done", i);
        }
        return res;
    }
};
JshintService = __decorate([
    (0, common_1.Injectable)()
], JshintService);
exports.JshintService = JshintService;
//# sourceMappingURL=jshint.service.js.map