import { Injectable } from "@nestjs/common";
import { EslintService } from "src/eslint/eslint.service";
import { JshintService } from "src/jshint/jshint.service";

interface ComplexityObject {
  file: string;
  complexity: number;
}

export interface Mismatch {
  file: string;
  complexity1?: number;
  complexity2?: number;
}
@Injectable()
export class MismatcherService {
  constructor(
    private readonly eslintService: EslintService,
    private readonly jshintService: JshintService
  ) {}

  compareComplexityArrays(
    array1: ComplexityObject[],
    array2: ComplexityObject[]
  ): Mismatch[] {
    const mismatches: Mismatch[] = [];

    // Create a map for quick lookup based on the 'file' property
    const map1 = new Map(array1.map((obj) => [obj.file, obj]));
    const map2 = new Map(array2.map((obj) => [obj.file, obj]));

    // Check for mismatches in array1
    array1.forEach((obj1) => {
      const obj2 = map2.get(obj1.file);
      if (!obj2 || obj1.complexity !== obj2.complexity) {
        mismatches.push({
          file: obj1.file,
          complexity1: obj1.complexity,
          complexity2: obj2 ? obj2.complexity : undefined,
        });
      }
    });

    // Check for mismatches in array2 (in case there are additional elements)
    array2.forEach((obj2) => {
      const obj1 = map1.get(obj2.file);
      if (!obj1) {
        mismatches.push({
          file: obj2.file,
          complexity1: undefined,
          complexity2: obj2.complexity,
        });
      }
    });

    return mismatches;
  }
  async findMismatch() {
    const jshintRes = await this.jshintService.findComplexMethod();

    const eslintRes = await this.eslintService.findComplexMethod();
    return true;
  }
}
