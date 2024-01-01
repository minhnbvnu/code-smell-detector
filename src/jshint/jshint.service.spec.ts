import { Test, TestingModule } from '@nestjs/testing';
import { JshintService } from './jshint.service';

describe('JshintService', () => {
  let service: JshintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JshintService],
    }).compile();

    service = module.get<JshintService>(JshintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
