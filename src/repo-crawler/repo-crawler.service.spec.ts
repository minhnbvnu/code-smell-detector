import { Test, TestingModule } from '@nestjs/testing';
import { RepoCrawlerService } from './repo-crawler.service';

describe('RepoCrawlerService', () => {
  let service: RepoCrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepoCrawlerService],
    }).compile();

    service = module.get<RepoCrawlerService>(RepoCrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
