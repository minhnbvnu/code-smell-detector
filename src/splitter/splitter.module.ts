import { Module } from '@nestjs/common';
import { SplitterService } from './splitter.service';
import { SplitterController } from './splitter.controller';

@Module({
  controllers: [SplitterController],
  providers: [SplitterService]
})
export class SplitterModule {}
