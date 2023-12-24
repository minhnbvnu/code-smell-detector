import { Test, TestingModule } from '@nestjs/testing';
import { SplitterService } from './splitter.service';

describe('SplitterService', () => {
  let service: SplitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplitterService],
    }).compile();

    service = module.get<SplitterService>(SplitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
