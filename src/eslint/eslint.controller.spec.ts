import { Test, TestingModule } from '@nestjs/testing';
import { EslintController } from './eslint.controller';
import { EslintService } from './eslint.service';

describe('EslintController', () => {
  let controller: EslintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EslintController],
      providers: [EslintService],
    }).compile();

    controller = module.get<EslintController>(EslintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
