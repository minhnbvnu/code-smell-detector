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
exports.MismatcherService = void 0;
const common_1 = require("@nestjs/common");
const eslint_service_1 = require("../eslint/eslint.service");
const jshint_service_1 = require("../jshint/jshint.service");
let MismatcherService = class MismatcherService {
    constructor(eslintService, jshintService) {
        this.eslintService = eslintService;
        this.jshintService = jshintService;
    }
    compareComplexityArrays(array1, array2) {
        const mismatches = [];
        const map1 = new Map(array1.map((obj) => [obj.file, obj]));
        const map2 = new Map(array2.map((obj) => [obj.file, obj]));
        array1.forEach((obj1) => {
            const obj2 = map2.get(obj1.file);
            if (!obj2 || obj1.complexity !== obj2.complexity) {
                mismatches.push({
                    file: obj1.file,
                    complexity1: obj1.complexity,
                    complexity2: obj2 ? obj2.complexity : undefined,
                });
            }
        });
        array2.forEach((obj2) => {
            const obj1 = map1.get(obj2.file);
            if (!obj1) {
                mismatches.push({
                    file: obj2.file,
                    complexity1: undefined,
                    complexity2: obj2.complexity,
                });
            }
        });
        return mismatches;
    }
    async findMismatch() {
        const jshintRes = await this.jshintService.findComplexMethod();
        const eslintRes = await this.eslintService.findComplexMethod();
        return true;
    }
};
MismatcherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [eslint_service_1.EslintService,
        jshint_service_1.JshintService])
], MismatcherService);
exports.MismatcherService = MismatcherService;
//# sourceMappingURL=mismatcher.service.js.map