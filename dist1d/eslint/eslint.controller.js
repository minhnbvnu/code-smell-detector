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
exports.EslintController = void 0;
const common_1 = require("@nestjs/common");
const eslint_service_1 = require("./eslint.service");
let EslintController = class EslintController {
    constructor(eslintService) {
        this.eslintService = eslintService;
    }
    findComplexMethod() {
        return this.eslintService.findComplexMethod();
    }
};
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EslintController.prototype, "findComplexMethod", null);
EslintController = __decorate([
    (0, common_1.Controller)("eslint"),
    __metadata("design:paramtypes", [eslint_service_1.EslintService])
], EslintController);
exports.EslintController = EslintController;
//# sourceMappingURL=eslint.controller.js.map