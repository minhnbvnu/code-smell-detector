import { MismatcherService } from "./mismatcher.service";
export declare class MismatcherController {
    private readonly mismatcherService;
    constructor(mismatcherService: MismatcherService);
    findMismatch(): Promise<any>;
}
