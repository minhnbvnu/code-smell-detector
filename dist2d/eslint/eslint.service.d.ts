export declare class EslintService {
    extractAfterLastSlash(inputString: string): string;
    extractComplexity(message: string): number;
    findComplexMethod(): Promise<{
        positive: any[];
        negative: any[];
    }>;
}
