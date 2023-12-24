import { Module } from '@nestjs/common';
import { EslintService } from './eslint.service';
import { EslintController } from './eslint.controller';

@Module({
  controllers: [EslintController],
  providers: [EslintService]
})
export class EslintModule {}
