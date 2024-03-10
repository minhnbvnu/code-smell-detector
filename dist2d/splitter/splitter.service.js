"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterService = void 0;
const common_1 = require("@nestjs/common");
const parser = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
const fs = require("fs");
const path = require("path");
let SplitterService = class SplitterService {
    constructor() {
        this.BASE_URL = "src/splitter/projects/";
    }
    readDir(projectPath) {
        try {
            const projectFiles = fs.readdirSync(projectPath);
            for (const file of projectFiles) {
                const filePath = path.join(projectPath, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    if (file !== 'node_modules' && !file.startsWith('.')) {
                        console.log('folder', file);
                        this.readDir(filePath);
                    }
                }
                else if (filePath.endsWith(".js")) {
                    this.splitFunctionFromFile(filePath);
                }
            }
        }
        catch (e) {
            console.log('error orcurred: ', e);
            return;
        }
    }
    splitFunctionFromFile(filePath) {
        const code = fs.readFileSync(filePath, "utf-8");
        try {
            const ast = parser.parse(code, {
                sourceType: "module",
                plugins: ["jsx"],
                errorRecovery: true
            });
            (0, traverse_1.default)(ast, {
                FunctionDeclaration(path) {
                    var _a;
                    const functionCode = code.slice(path.node.start, path.node.end);
                    if ((_a = path.node.id) === null || _a === void 0 ? void 0 : _a.name) {
                        const functionName = path.node.id.name
                            ? path.node.id.name
                            : new Date().getTime();
                        console.log({ functionName });
                        fs.writeFileSync(`scanner/functions/${functionName}.js`, functionCode, "utf-8");
                    }
                },
            });
        }
        catch (e) {
            console.log({ e });
        }
    }
    split() {
        const projects = fs.readdirSync(this.BASE_URL);
        const data = fs.readFileSync('splitter-log.txt', 'utf8');
        const lines = data.split('\n');
        const processedFolders = [];
        lines.forEach(line => {
            const elements = line.split(' ');
            if (elements.length >= 2) {
                processedFolders.push(elements[1]);
            }
        });
        for (const [index, folder] of projects.entries()) {
            if (!processedFolders.includes(folder)) {
                fs.writeFileSync('splitter-log.txt', `${index} ${folder}\n`, { flag: 'a' });
                const filePath = path.join(this.BASE_URL, folder);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    this.readDir(filePath);
                }
            }
        }
        return true;
    }
};
SplitterService = __decorate([
    (0, common_1.Injectable)()
], SplitterService);
exports.SplitterService = SplitterService;
//# sourceMappingURL=splitter.service.js.map