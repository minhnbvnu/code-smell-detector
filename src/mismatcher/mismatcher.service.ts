import { Injectable } from "@nestjs/common";
import { EslintService } from "src/eslint/eslint.service";
import { SonarqubeService } from "src/sonarqube/sonarqube.service";

@Injectable()
export class MismatcherService {
  constructor(
    private readonly sonarqubeService: SonarqubeService,
    private readonly eslintService: EslintService
  ) {}

  findMismatchedElements(arr1, arr2) {
    // Combine the arrays and remove duplicates
    const combinedArray = [...new Set([...arr1, ...arr2])];

    // Filter elements that are present in only one of the arrays
    const mismatchedElements = combinedArray.filter(
      (element) => !arr1.includes(element) || !arr2.includes(element)
    );

    return mismatchedElements;
  }
  async findMismatch() {
    const sonarqubeRes = await this.sonarqubeService.findIssues(
      "complex-method"
    );

    const eslintRes = await this.eslintService.findComplexMethod();
    // return this.findMismatchedElements(sonarqubeRes, eslintRes);
    return { sonarqubeRes, eslintRes };
  }
}
