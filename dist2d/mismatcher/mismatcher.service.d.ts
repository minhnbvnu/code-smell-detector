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
export declare class MismatcherService {
    private readonly eslintService;
    private readonly jshintService;
    constructor(eslintService: EslintService, jshintService: JshintService);
    compareComplexityArrays(array1: ComplexityObject[], array2: ComplexityObject[]): Mismatch[];
    findMismatch(): Promise<boolean>;
}
export {};
