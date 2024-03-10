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
exports.SonarqubeService = void 0;
const common_1 = require("@nestjs/common");
const sonarqube_entity_1 = require("./entities/sonarqube.entity");
const config_1 = require("@nestjs/config");
let SonarqubeService = class SonarqubeService {
    constructor(configService) {
        this.configService = configService;
        this.sonarqubeFetch = (path, init) => fetch(new URL(path, this.configService.get("SONARQUBE_ENDPOINT")), Object.assign(Object.assign({}, init), { headers: Object.assign({ Authorization: `Bearer ${this.configService.get("SONARQUBE_ACCESS_TOKEN")}` }, init === null || init === void 0 ? void 0 : init.headers) }))
            .then((res) => res.json())
            .catch((e) => console.error(e));
    }
    extractAfterLastSlash(inputString) {
        const lastSlashIndex = inputString.lastIndexOf("/");
        if (lastSlashIndex === -1) {
            return inputString;
        }
        return inputString.substring(lastSlashIndex + 1);
    }
    async findIssues(issueType) {
        const res = await this.sonarqubeFetch(`/api/issues/search?componentKeys=Test&s=FILE_LINE&resolved=false&rules=${sonarqube_entity_1.IssueTypes[issueType]}&inNewCodePeriod=true&types=CODE_SMELL&ps=100&facets=cleanCodeAttributeCategories%2CimpactSoftwareQualities%2CcodeVariants&additionalFields=_all`);
        const issues = res.issues;
        const issueSources = issues.map((issue) => this.extractAfterLastSlash(issue.component));
        return Array.from(new Set(issueSources));
    }
};
SonarqubeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SonarqubeService);
exports.SonarqubeService = SonarqubeService;
//# sourceMappingURL=sonarqube.service.js.map