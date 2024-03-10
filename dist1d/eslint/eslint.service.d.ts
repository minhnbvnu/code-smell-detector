import { Linter } from "eslint";
export declare class EslintService {
    extractAfterLastSlash(inputString: string): string;
    extractErrorLines(fileName: string, errorMessages: Linter.LintMessage[]): void;
    extractComplexity(message: string): number;
    findComplexMethod(): Promise<{
        positive: any[];
        negative: any[];
    }>;
}
