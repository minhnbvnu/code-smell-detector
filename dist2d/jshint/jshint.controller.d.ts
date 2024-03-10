import { JshintService } from "./jshint.service";
export declare class JshintController {
    private readonly jshintService;
    constructor(jshintService: JshintService);
    findComplexMethod(): Promise<any[]>;
}
