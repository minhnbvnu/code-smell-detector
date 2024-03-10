import { SplitterService } from './splitter.service';
export declare class SplitterController {
    private readonly splitterService;
    constructor(splitterService: SplitterService);
    split(): boolean;
}
