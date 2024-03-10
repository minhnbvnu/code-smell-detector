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
exports.SonarqubeController = void 0;
const common_1 = require("@nestjs/common");
const sonarqube_service_1 = require("./sonarqube.service");
let SonarqubeController = class SonarqubeController {
    constructor(sonarqubeService) {
        this.sonarqubeService = sonarqubeService;
    }
    findIssues() {
        return this.sonarqubeService.findIssues('complex-method');
    }
};
__decorate([
    (0, common_1.Post)('/find/complex-method'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SonarqubeController.prototype, "findIssues", null);
SonarqubeController = __decorate([
    (0, common_1.Controller)('sonarqube'),
    __metadata("design:paramtypes", [sonarqube_service_1.SonarqubeService])
], SonarqubeController);
exports.SonarqubeController = SonarqubeController;
//# sourceMappingURL=sonarqube.controller.js.map