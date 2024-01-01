import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SonarqubeModule } from './sonarqube/sonarqube.module';
import { ConfigModule } from '@nestjs/config';
import { SplitterModule } from './splitter/splitter.module';
import { EslintModule } from './eslint/eslint.module';
import { MismatcherModule } from './mismatcher/mismatcher.module';

@Module({
  imports: [SonarqubeModule, ConfigModule.forRoot(), SplitterModule, EslintModule, MismatcherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
