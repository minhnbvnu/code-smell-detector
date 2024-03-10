"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSonarqubeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sonarqube_dto_1 = require("./create-sonarqube.dto");
class UpdateSonarqubeDto extends (0, mapped_types_1.PartialType)(create_sonarqube_dto_1.CreateSonarqubeDto) {
}
exports.UpdateSonarqubeDto = UpdateSonarqubeDto;
//# sourceMappingURL=update-sonarqube.dto.js.map