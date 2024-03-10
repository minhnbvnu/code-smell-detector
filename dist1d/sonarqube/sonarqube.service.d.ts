import { ConfigService } from "@nestjs/config";
export declare class SonarqubeService {
    private readonly configService;
    private sonarqubeFetch;
    constructor(configService: ConfigService);
    extractAfterLastSlash(inputString: any): any;
    findIssues(issueType: string): Promise<unknown[]>;
}
