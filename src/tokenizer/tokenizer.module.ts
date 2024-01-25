import { Module } from "@nestjs/common";
import { TokenizerService } from "./tokenizer.service";
import { TokenizerController } from "./tokenizer.controller";
import { FileService } from "src/file/file.service";
import { EslintService } from "src/eslint/eslint.service";

@Module({
  controllers: [TokenizerController],
  providers: [TokenizerService, FileService, EslintService],
})
export class TokenizerModule {}
