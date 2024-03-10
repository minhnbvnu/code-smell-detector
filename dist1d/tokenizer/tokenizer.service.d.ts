import { FileService } from "src/file/file.service";
import { EslintService } from "src/eslint/eslint.service";
export declare class TokenizerService {
    private readonly fileService;
    private readonly eslintService;
    constructor(fileService: FileService, eslintService: EslintService);
    tokenize(type: "1d" | "2d", tokenizer: "bert" | "normal"): Promise<boolean>;
    runSingleTokenization(fileName: string, type?: "1d" | "2d"): string;
    runSingleBertTokenization(fileName: string, type?: "1d" | "2d", isPositive?: boolean): string;
}
