import { Module } from '@nestjs/common';
import { SonarqubeService } from './sonarqube.service';
import { SonarqubeController } from './sonarqube.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SonarqubeController],
  providers: [SonarqubeService],
  imports: [ConfigModule],
})
export class SonarqubeModule {}
