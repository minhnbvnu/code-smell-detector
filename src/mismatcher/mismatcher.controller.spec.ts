import { Test, TestingModule } from '@nestjs/testing';
import { MismatcherController } from './mismatcher.controller';
import { MismatcherService } from './mismatcher.service';

describe('MismatcherController', () => {
  let controller: MismatcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MismatcherController],
      providers: [MismatcherService],
    }).compile();

    controller = module.get<MismatcherController>(MismatcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
