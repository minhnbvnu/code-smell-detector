"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JshintModule = void 0;
const common_1 = require("@nestjs/common");
const jshint_service_1 = require("./jshint.service");
const jshint_controller_1 = require("./jshint.controller");
let JshintModule = class JshintModule {
};
JshintModule = __decorate([
    (0, common_1.Module)({
        controllers: [jshint_controller_1.JshintController],
        providers: [jshint_service_1.JshintService]
    })
], JshintModule);
exports.JshintModule = JshintModule;
//# sourceMappingURL=jshint.module.js.map