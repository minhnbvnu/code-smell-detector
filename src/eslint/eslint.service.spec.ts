import { Test, TestingModule } from '@nestjs/testing';
import { EslintService } from './eslint.service';

describe('EslintService', () => {
  let service: EslintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EslintService],
    }).compile();

    service = module.get<EslintService>(EslintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
