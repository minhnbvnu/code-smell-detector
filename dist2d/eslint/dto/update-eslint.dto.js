"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEslintDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_eslint_dto_1 = require("./create-eslint.dto");
class UpdateEslintDto extends (0, mapped_types_1.PartialType)(create_eslint_dto_1.CreateEslintDto) {
}
exports.UpdateEslintDto = UpdateEslintDto;
//# sourceMappingURL=update-eslint.dto.js.map