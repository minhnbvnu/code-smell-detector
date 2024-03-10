"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenizerModule = void 0;
const common_1 = require("@nestjs/common");
const tokenizer_service_1 = require("./tokenizer.service");
const tokenizer_controller_1 = require("./tokenizer.controller");
const file_service_1 = require("../file/file.service");
const eslint_service_1 = require("../eslint/eslint.service");
let TokenizerModule = class TokenizerModule {
};
TokenizerModule = __decorate([
    (0, common_1.Module)({
        controllers: [tokenizer_controller_1.TokenizerController],
        providers: [tokenizer_service_1.TokenizerService, file_service_1.FileService, eslint_service_1.EslintService],
    })
], TokenizerModule);
exports.TokenizerModule = TokenizerModule;
//# sourceMappingURL=tokenizer.module.js.map