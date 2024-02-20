import { Controller, Post, Query } from "@nestjs/common";
import { TokenizerService } from "./tokenizer.service";

@Controller("tokenizer")
export class TokenizerController {
  constructor(private readonly tokenizerService: TokenizerService) {}

  @Post()
  async tokenize() {
    for(const type in ['1d', '2d']) {
    await this.tokenizerService.tokenize(type as '1d' | '2d');
    }
  return true

  }
}
