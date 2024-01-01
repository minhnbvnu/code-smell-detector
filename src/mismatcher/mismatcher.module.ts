import { Module } from "@nestjs/common";
import { MismatcherService } from "./mismatcher.service";
import { MismatcherController } from "./mismatcher.controller";
import { EslintService } from "src/eslint/eslint.service";
import { SonarqubeService } from "src/sonarqube/sonarqube.service";
import { ConfigService } from "@nestjs/config";
import { EslintModule } from "src/eslint/eslint.module";
import { SonarqubeModule } from "src/sonarqube/sonarqube.module";

@Module({
  controllers: [MismatcherController],
  providers: [
    MismatcherService,
    EslintService,
    SonarqubeService,
    ConfigService,
  ],
})
export class MismatcherModule {}
