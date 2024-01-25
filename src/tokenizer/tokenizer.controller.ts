import { Controller, Post, Query } from "@nestjs/common";
import { TokenizerService } from "./tokenizer.service";

@Controller("tokenizer")
export class TokenizerController {
  constructor(private readonly tokenizerService: TokenizerService) {}

  @Post()
  tokenize(@Query("type") type: "1d" | "2d") {
    return this.tokenizerService.tokenize(type);
  }
}
