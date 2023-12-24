import { Test, TestingModule } from '@nestjs/testing';
import { SplitterController } from './splitter.controller';
import { SplitterService } from './splitter.service';

describe('SplitterController', () => {
  let controller: SplitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SplitterController],
      providers: [SplitterService],
    }).compile();

    controller = module.get<SplitterController>(SplitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
