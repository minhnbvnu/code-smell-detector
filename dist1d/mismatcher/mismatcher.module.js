"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MismatcherModule = void 0;
const common_1 = require("@nestjs/common");
const mismatcher_service_1 = require("./mismatcher.service");
const mismatcher_controller_1 = require("./mismatcher.controller");
const eslint_service_1 = require("../eslint/eslint.service");
const sonarqube_service_1 = require("../sonarqube/sonarqube.service");
const config_1 = require("@nestjs/config");
const jshint_service_1 = require("../jshint/jshint.service");
let MismatcherModule = class MismatcherModule {
};
MismatcherModule = __decorate([
    (0, common_1.Module)({
        controllers: [mismatcher_controller_1.MismatcherController],
        providers: [
            mismatcher_service_1.MismatcherService,
            eslint_service_1.EslintService,
            sonarqube_service_1.SonarqubeService,
            config_1.ConfigService,
            jshint_service_1.JshintService,
        ],
    })
], MismatcherModule);
exports.MismatcherModule = MismatcherModule;
//# sourceMappingURL=mismatcher.module.js.map