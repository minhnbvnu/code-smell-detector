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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoCrawlerController = void 0;
const common_1 = require("@nestjs/common");
const repo_crawler_service_1 = require("./repo-crawler.service");
const create_repo_crawler_dto_1 = require("./dto/create-repo-crawler.dto");
const update_repo_crawler_dto_1 = require("./dto/update-repo-crawler.dto");
let RepoCrawlerController = class RepoCrawlerController {
    constructor(repoCrawlerService) {
        this.repoCrawlerService = repoCrawlerService;
    }
    create(createRepoCrawlerDto) {
        return this.repoCrawlerService.create(createRepoCrawlerDto);
    }
    findAll() {
        return this.repoCrawlerService.findAll();
    }
    findOne(id) {
        return this.repoCrawlerService.findOne(+id);
    }
    update(id, updateRepoCrawlerDto) {
        return this.repoCrawlerService.update(+id, updateRepoCrawlerDto);
    }
    remove(id) {
        return this.repoCrawlerService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_repo_crawler_dto_1.CreateRepoCrawlerDto]),
    __metadata("design:returntype", void 0)
], RepoCrawlerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RepoCrawlerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepoCrawlerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_repo_crawler_dto_1.UpdateRepoCrawlerDto]),
    __metadata("design:returntype", void 0)
], RepoCrawlerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepoCrawlerController.prototype, "remove", null);
RepoCrawlerController = __decorate([
    (0, common_1.Controller)('repo-crawler'),
    __metadata("design:paramtypes", [repo_crawler_service_1.RepoCrawlerService])
], RepoCrawlerController);
exports.RepoCrawlerController = RepoCrawlerController;
//# sourceMappingURL=repo-crawler.controller.js.map