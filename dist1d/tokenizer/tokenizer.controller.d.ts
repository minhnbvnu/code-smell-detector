import { TokenizerService } from "./tokenizer.service";
export declare class TokenizerController {
    private readonly tokenizerService;
    constructor(tokenizerService: TokenizerService);
    tokenize(): Promise<boolean>;
}
