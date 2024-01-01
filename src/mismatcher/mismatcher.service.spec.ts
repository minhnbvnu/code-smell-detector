import { Test, TestingModule } from '@nestjs/testing';
import { MismatcherService } from './mismatcher.service';

describe('MismatcherService', () => {
  let service: MismatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MismatcherService],
    }).compile();

    service = module.get<MismatcherService>(MismatcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
