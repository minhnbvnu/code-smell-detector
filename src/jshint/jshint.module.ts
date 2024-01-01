import { Module } from '@nestjs/common';
import { JshintService } from './jshint.service';
import { JshintController } from './jshint.controller';

@Module({
  controllers: [JshintController],
  providers: [JshintService]
})
export class JshintModule {}
