"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSplitterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_splitter_dto_1 = require("./create-splitter.dto");
class UpdateSplitterDto extends (0, mapped_types_1.PartialType)(create_splitter_dto_1.CreateSplitterDto) {
}
exports.UpdateSplitterDto = UpdateSplitterDto;
//# sourceMappingURL=update-splitter.dto.js.map