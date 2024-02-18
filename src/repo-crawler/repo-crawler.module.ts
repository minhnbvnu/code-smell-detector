import { Module } from '@nestjs/common';
import { RepoCrawlerService } from './repo-crawler.service';
import { RepoCrawlerController } from './repo-crawler.controller';

@Module({
  controllers: [RepoCrawlerController],
  providers: [RepoCrawlerService]
})
export class RepoCrawlerModule {}
