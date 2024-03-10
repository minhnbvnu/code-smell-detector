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
exports.RepoCrawlerService = void 0;
const common_1 = require("@nestjs/common");
const octokit_1 = require("octokit");
const fs = require("fs");
let RepoCrawlerService = class RepoCrawlerService {
    constructor() {
        this.octokit = new octokit_1.Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN,
        });
    }
    create(createRepoCrawlerDto) {
        return "This action adds a new repoCrawler";
    }
    async findAll() {
        const crawledRepos = fs.readdirSync('src/splitter/projects');
        console.log(crawledRepos.length);
    }
    findOne(id) {
        return `This action returns a #${id} repoCrawler`;
    }
    update(id, updateRepoCrawlerDto) {
        return `This action updates a #${id} repoCrawler`;
    }
    remove(id) {
        return `This action removes a #${id} repoCrawler`;
    }
};
RepoCrawlerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RepoCrawlerService);
exports.RepoCrawlerService = RepoCrawlerService;
//# sourceMappingURL=repo-crawler.service.js.map