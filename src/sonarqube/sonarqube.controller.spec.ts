import { Test, TestingModule } from '@nestjs/testing';
import { SonarqubeController } from './sonarqube.controller';
import { SonarqubeService } from './sonarqube.service';

describe('SonarqubeController', () => {
  let controller: SonarqubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SonarqubeController],
      providers: [SonarqubeService],
    }).compile();

    controller = module.get<SonarqubeController>(SonarqubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
