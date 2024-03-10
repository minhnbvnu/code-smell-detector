"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const sonarqube_module_1 = require("./sonarqube/sonarqube.module");
const config_1 = require("@nestjs/config");
const splitter_module_1 = require("./splitter/splitter.module");
const eslint_module_1 = require("./eslint/eslint.module");
const mismatcher_module_1 = require("./mismatcher/mismatcher.module");
const jshint_module_1 = require("./jshint/jshint.module");
const tokenizer_module_1 = require("./tokenizer/tokenizer.module");
const file_module_1 = require("./file/file.module");
const repo_crawler_module_1 = require("./repo-crawler/repo-crawler.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [sonarqube_module_1.SonarqubeModule, config_1.ConfigModule.forRoot(), splitter_module_1.SplitterModule, eslint_module_1.EslintModule, mismatcher_module_1.MismatcherModule, jshint_module_1.JshintModule, tokenizer_module_1.TokenizerModule, file_module_1.FileModule, repo_crawler_module_1.RepoCrawlerModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map