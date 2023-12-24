import { Controller, Post } from '@nestjs/common';
import { SonarqubeService } from './sonarqube.service';

@Controller('sonarqube')
export class SonarqubeController {
  constructor(private readonly sonarqubeService: SonarqubeService) {}

  @Post('/find/complex-method')
  findIssues() {
    return this.sonarqubeService.findIssues('complex-method');
  }
}
