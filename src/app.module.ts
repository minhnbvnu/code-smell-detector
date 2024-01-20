import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SonarqubeModule } from './sonarqube/sonarqube.module';
import { ConfigModule } from '@nestjs/config';
import { SplitterModule } from './splitter/splitter.module';
import { EslintModule } from './eslint/eslint.module';
import { MismatcherModule } from './mismatcher/mismatcher.module';
import { JshintModule } from './jshint/jshint.module';
import { TokenizerModule } from './tokenizer/tokenizer.module';

@Module({
  imports: [SonarqubeModule, ConfigModule.forRoot(), SplitterModule, EslintModule, MismatcherModule, JshintModule, TokenizerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
