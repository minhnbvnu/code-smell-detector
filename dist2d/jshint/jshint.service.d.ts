export declare class JshintService {
    readFilesInDirectory(directoryPath: string): {
        fileContent: string[];
        fileName: string;
    }[];
    findComplexMethod(): Promise<any[]>;
}
