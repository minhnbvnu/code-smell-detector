import { Test, TestingModule } from '@nestjs/testing';
import { RepoCrawlerController } from './repo-crawler.controller';
import { RepoCrawlerService } from './repo-crawler.service';

describe('RepoCrawlerController', () => {
  let controller: RepoCrawlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepoCrawlerController],
      providers: [RepoCrawlerService],
    }).compile();

    controller = module.get<RepoCrawlerController>(RepoCrawlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
