import { SonarqubeService } from './sonarqube.service';
export declare class SonarqubeController {
    private readonly sonarqubeService;
    constructor(sonarqubeService: SonarqubeService);
    findIssues(): Promise<unknown[]>;
}
