import { Injectable } from "@nestjs/common";
import { EslintService } from "src/eslint/eslint.service";
import { JshintService } from "src/jshint/jshint.service";

@Injectable()
export class MismatcherService {
  constructor(
    private readonly eslintService: EslintService,
    private readonly jshintService: JshintService
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
    const jshintRes = await this.jshintService.findComplexMethod();

    const eslintRes = await this.eslintService.findComplexMethod();
    return this.findMismatchedElements(jshintRes, eslintRes);
    // return { sonarqubeRes, eslintRes };
  }
}
