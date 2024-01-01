import { Test, TestingModule } from '@nestjs/testing';
import { JshintController } from './jshint.controller';
import { JshintService } from './jshint.service';

describe('JshintController', () => {
  let controller: JshintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JshintController],
      providers: [JshintService],
    }).compile();

    controller = module.get<JshintController>(JshintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
