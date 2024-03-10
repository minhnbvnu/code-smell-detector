import { EslintService } from "./eslint.service";
export declare class EslintController {
    private readonly eslintService;
    constructor(eslintService: EslintService);
    findComplexMethod(): Promise<{
        positive: any[];
        negative: any[];
    }>;
}
