"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRepoCrawlerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_repo_crawler_dto_1 = require("./create-repo-crawler.dto");
class UpdateRepoCrawlerDto extends (0, mapped_types_1.PartialType)(create_repo_crawler_dto_1.CreateRepoCrawlerDto) {
}
exports.UpdateRepoCrawlerDto = UpdateRepoCrawlerDto;
//# sourceMappingURL=update-repo-crawler.dto.js.map